import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Lightbulb, MessageSquare } from 'lucide-react';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { BuzzySpeechBubble } from '@/components/ai-lab/ui/BuzzySpeechBubble';
import { motion, AnimatePresence } from 'framer-motion';

interface TrainingItemProps {
  question: string;
  characterName: string;
  onResponseChange: (response: string) => void;
  response: string;
  characterPersonality?: string[];
  context?: string;
}

export const TrainingItem = ({ 
  question, 
  characterName, 
  onResponseChange, 
  response, 
  characterPersonality = [], 
  context 
}: TrainingItemProps) => {
  const [showingBuzzySuggestions, setShowingBuzzySuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showBuzzyTip, setShowBuzzyTip] = useState(false);
  const supabase = useSupabaseClient();

  const fetchSuggestions = async () => {
    setIsLoadingSuggestions(true);
    setError('');
    setShowBuzzyTip(true);
    
    try {
      // Create a prompt for better suggestions
      const prompt = `I'm training an AI to respond like ${characterName}. The character is ${characterName} who is ${characterPersonality.join(', ')}. 
      The current question is: "${question}" 
      
      Give me 3 different ways ${characterName} might answer this question. Make the answers authentic to the character, about 1-3 sentences each. Use simple, kid-friendly language.`;
      
      // First try the Supabase edge function
      try {
        const { data, error } = await supabase.functions.invoke('chat-with-buzzy', {
          body: {
            message: prompt,
            conversationHistory: [
              { role: 'system', content: 'You are Buzzy, a helpful AI assistant for kids learning about AI training.' },
              { role: 'user', content: prompt }
            ]
          }
        });
        
        if (error) throw new Error(`Supabase edge function error: ${error.message}`);
        
        if (data?.answer) {
          const suggestionText = data.answer;
          parseAndSetSuggestions(suggestionText);
          setShowingBuzzySuggestions(true);
          return;
        }
      } catch (supabaseError) {
        console.warn('Supabase edge function failed, trying direct fetch:', supabaseError);
        // Continue to fallback approach
      }
      
      // Fallback: Try direct fetch as a backup
      const response = await fetch('https://lovable-bee.functions.supabase.co/chat-with-buzzy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: prompt
        }),
        // Shorter timeout to fail faster
        signal: AbortSignal.timeout(5000)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to get suggestions: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      const suggestionText = data.answer || '';
      
      if (!suggestionText) {
        throw new Error("Empty response from API");
      }
      
      parseAndSetSuggestions(suggestionText);
      setShowingBuzzySuggestions(true);
      
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setError('Oops! Buzzy is having trouble thinking of ideas right now.');
      
      // Handle specifically for the "Meet AI Friend" lesson - check if it's Harry Potter
      if (characterName === "Harry Potter" && question.includes("favorite subject at Hogwarts")) {
        // Special case fallback for this particular question in the lesson
        const specialFallback = [
          "Defense Against the Dark Arts! It's challenging but so practical. I've learned spells there that have helped me face Voldemort more than once.",
          "Probably flying lessons, honestly. When I'm on a broomstick, I feel completely free - it's the one place where I forget about being 'The Boy Who Lived'.",
          "I'd have to say Defense Against the Dark Arts, though Hagrid's Care of Magical Creatures is brilliant too. I just wish we had different professors for Defense every year!"
        ];
        setSuggestions(specialFallback);
        setShowingBuzzySuggestions(true);
        return;
      }
      
      // Provide character-specific fallback suggestions
      const fallbackSuggestions = getCharacterSpecificSuggestions(characterName, question);
      setSuggestions(fallbackSuggestions);
      setShowingBuzzySuggestions(true);
    } finally {
      setIsLoadingSuggestions(false);
      // Keep Buzzy tip visible for a few seconds
      setTimeout(() => {
        setShowBuzzyTip(false);
      }, 5000);
    }
  };

  const parseAndSetSuggestions = (suggestionText: string) => {
    // Try to extract suggestions using multiple approaches
    
    // Method 1: Try to match numbered list format (1., 2., 3.)
    const numberedMatches = suggestionText.match(/(?:\d+[\.\)]\s*)(.*?)(?=\d+[\.\)]|$)/gs);
    
    let suggestionList: string[] = [];
    
    if (numberedMatches && numberedMatches.length > 0) {
      suggestionList = numberedMatches
        .map(match => match.replace(/^\d+[\.\)]\s*/, '').trim())
        .filter(s => s.length > 0);
    } else {
      // Method 2: Fallback to splitting by paragraphs
      suggestionList = suggestionText
        .split(/\n\n/)
        .filter(s => s.trim().length > 0)
        .map(s => s.trim());
    }
    
    // If still couldn't parse suggestions, try splitting by new lines
    if (suggestionList.length < 2) {
      suggestionList = suggestionText
        .split(/\n/)
        .filter(s => s.trim().length > 0 && !s.trim().match(/^\d+[\.\)]$/)) // Filter out lone numbers
        .map(s => s.trim());
    }
    
    // If we still couldn't parse any suggestions, provide character-specific fallbacks
    if (suggestionList.length < 2) {
      suggestionList = getCharacterSpecificSuggestions(characterName, question);
    }
    
    setSuggestions(suggestionList.slice(0, 3)); // Limit to 3 suggestions
  };

  const handleSuggestionClick = (suggestion: string) => {
    onResponseChange(suggestion);
    setShowingBuzzySuggestions(false);
    toast.success("Response added to your training!", { duration: 2000 });
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-start gap-3 mb-3">
        <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
          <MessageSquare className="h-4 w-4 text-purple-600" />
        </div>
        <div>
          <p className="font-medium mb-1">{question}</p>
          {context && (
            <p className="text-sm text-gray-600 mb-2 bg-gray-50 p-2 rounded">{context}</p>
          )}
        </div>
      </div>
      
      <div className="pl-11">
        <Textarea
          placeholder={`How would ${characterName} respond?`}
          value={response}
          onChange={(e) => onResponseChange(e.target.value)}
          className="min-h-[100px] mb-2"
        />
        
        <div className="mt-2">
          {!showingBuzzySuggestions ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchSuggestions}
              disabled={isLoadingSuggestions}
              className="flex items-center gap-1 text-purple-600 border-purple-200 hover:bg-purple-50"
            >
              <Lightbulb className="h-4 w-4" />
              {isLoadingSuggestions ? 'Asking Buzzy...' : 'Get help from Buzzy'}
            </Button>
          ) : (
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-purple-600" />
                <h4 className="font-medium text-sm text-purple-700">Buzzy's Suggestions:</h4>
              </div>
              
              {error ? (
                <div className="text-red-500 text-sm mb-2">{error}</div>
              ) : null}
              
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-white p-2 rounded border border-purple-100 text-sm cursor-pointer hover:bg-purple-100 transition-colors"
                  >
                    {suggestion}
                  </motion.div>
                ))}
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowingBuzzySuggestions(false)}
                className="mt-2 text-xs text-purple-600 hover:bg-purple-100"
              >
                Hide suggestions
              </Button>
            </div>
          )}
        </div>
        
        <AnimatePresence>
          {showBuzzyTip && isLoadingSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-3"
            >
              <BuzzySpeechBubble
                message="I'm thinking about how this character would respond! Remember that good AI training means capturing their unique personality and way of talking."
                state="thinking"
                size="sm"
                onClose={() => setShowBuzzyTip(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Helper function to generate character-specific suggestions
const getCharacterSpecificSuggestions = (characterName: string, question: string): string[] => {
  switch(characterName) {
    case "Harry Potter":
      if (question.includes("favorite subject")) {
        return [
          "Defense Against the Dark Arts! It's challenging but so practical. I've learned spells there that have helped me face Voldemort more than once.",
          "Probably flying lessons, honestly. When I'm on a broomstick, I feel completely free - it's the one place where I forget about being 'The Boy Who Lived'.",
          "I'd have to say Defense Against the Dark Arts, though Hagrid's Care of Magical Creatures is brilliant too. I just wish we had different professors for Defense every year!"
        ];
      } 
      if (question.includes("first learned you were a wizard")) {
        return [
          "I was shocked! Hagrid burst in on my 11th birthday and told me I was a wizard. After living with the Dursleys who hated magic, it was the best news I'd ever heard.",
          "It was amazing and confusing at the same time. I'd spent my whole life being treated like I was nothing by the Dursleys, and suddenly I found out I belonged to this whole magical world!",
          "Honestly, it was hard to believe at first. Strange things always happened around me, but finding out there was a reason for it - that I was a wizard - changed everything for me."
        ];
      }
      if (question.includes("friendship mean to you")) {
        return [
          "Friendship is everything to me. Ron and Hermione have stuck with me through the darkest times - they're the family I chose and who chose me back.",
          "It means having people who stand by you no matter what. My friends have risked their lives for me, and I'd do the same for them without hesitation.",
          "To me, friendship means acceptance and trust. Ron and Hermione know the real me - not 'The Boy Who Lived' - just Harry, and they're still there for me every day."
        ];
      }
      return [
        "I'm still getting used to the wizarding world, but I think magic is brilliant! It's like nothing I ever experienced growing up with the Dursleys.",
        "Well, at Hogwarts we learn that courage isn't about not being afraid, but about facing your fears. My friends Ron and Hermione help me be brave.",
        "Honestly, I never wanted to be famous. I'd trade all the attention for having my parents back. But I'm grateful for the friends who stand by me no matter what."
      ];
    case "Albert Einstein":
      if (question.includes("favorite thing about science")) {
        return [
          "My favorite aspect of science is the sense of wonder it provides. When you understand how the universe works, even in a small way, it's like uncovering a magnificent secret.",
          "What I love most about science is that it never ends - there's always another question, another mystery to solve. The pursuit of knowledge is eternal.",
          "The beauty of science is in its simplicity beneath complexity. When you find an elegant equation that explains a complex phenomenon, it's like hearing the harmony of the cosmos."
        ];
      }
      return [
        "What a fascinating question! In my view, curiosity is the key to unlocking the mysteries of the universe. I've always been driven by wonder.",
        "You know, the most beautiful experience we can have is the mysterious. It is the fundamental emotion that stands at the cradle of true art and science.",
        "I think imagination is more important than knowledge. Knowledge is limited, but imagination encircles the world and points to all there is yet to discover."
      ];
    default:
      return [
        `${characterName} might say: "That's an interesting question that makes me think deeply about my experiences."`,
        `${characterName} could respond: "Based on who I am and what I've been through, I believe..."`,
        `${characterName} would answer: "My unique perspective on this comes from my personal journey."`
      ];
  }
};
