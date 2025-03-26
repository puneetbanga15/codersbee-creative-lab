
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Character } from '../types';
import { Lightbulb } from 'lucide-react';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { BuzzySpeechBubble } from '@/components/ai-lab/ui/BuzzySpeechBubble';
import { motion, AnimatePresence } from 'framer-motion';

// Helper function for character-specific feedback suggestions
const getCharacterSpecificFeedbackSuggestions = (characterName: string): string[] => {
  switch(characterName) {
    case "Harry Potter":
      return [
        "Teach Harry how to talk about his feelings regarding his parents and his connection to Voldemort in a way that shows his emotional depth.",
        "Help Harry discuss his friendships with Ron and Hermione, emphasizing loyalty, trust, and how they complement each other's strengths.",
        "Train Harry to describe his Quidditch experiences and love of flying, as this represents freedom and joy in his often difficult life."
      ];
    case "Albert Einstein":
      return [
        "Develop Einstein's ability to explain complex scientific concepts using simple metaphors and thought experiments accessible to children.",
        "Train Einstein to share personal anecdotes about his discoveries that emphasize curiosity, imagination, and perseverance.",
        "Teach Einstein to express his philosophical views on peace, education, and humanity that showcase his compassionate worldview."
      ];
    default:
      return [
        `Teach ${characterName} about their favorite hobbies and interests to create a more well-rounded personality.`,
        `Help ${characterName} express emotions and reactions in a way that feels authentic to their character.`,
        `Train ${characterName} to respond to complex questions while maintaining their unique worldview and values.`
      ];
  }
};

interface FeedbackPhaseProps {
  character: Character;
  onComplete: () => void;
}

export const FeedbackPhase: React.FC<FeedbackPhaseProps> = ({
  character,
  onComplete
}) => {
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showTip, setShowTip] = useState<boolean>(true);
  const [tipIndex, setTipIndex] = useState<number>(0);
  const supabase = useSupabaseClient();
  
  // Teaching tips that Buzzy can provide
  const buzzyTips = [
    `Great job training ${character.name}! By analyzing what makes this character unique, you're learning how AI chatbots develop realistic personalities.`,
    "When training AI, it's important to give specific examples rather than general rules. This helps the AI learn from patterns!",
    "Did you know? The more diverse your training data, the better your AI will handle different types of questions.",
    "AI training is like teaching a friend about a new subject - you need patience, clear examples, and consistent feedback!"
  ];
  
  useEffect(() => {
    fetchBuzzySuggestions();
    
    // Rotate through tips every 12 seconds
    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % buzzyTips.length);
    }, 12000);
    
    return () => clearInterval(tipInterval);
  }, []);
  
  const fetchBuzzySuggestions = async () => {
    setIsLoading(true);
    try {
      // Create a more detailed prompt for better suggestions
      const prompt = `I'm training an AI character based on ${character.name} and need suggestions for what to teach it next.
      
      The character is ${character.name} who has these traits: ${character.personality.join(', ')}.
      
      Give me 3 specific suggestions for what I should teach this AI character next to make it more realistic and authentic. Format each suggestion as a separate numbered item (1., 2., 3.) with 1-2 sentences using kid-friendly language explaining why it would enhance the character.`;

      // First try using the Supabase client
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
      
    } catch (err) {
      console.error('Error getting Buzzy suggestions:', err);
      
      // Provide character-specific fallback suggestions
      const fallbackSuggestions = getCharacterSpecificFeedbackSuggestions(character.name);
      setSuggestions(fallbackSuggestions);
      toast.error("Couldn't connect to Buzzy. Using default suggestions instead.", { 
        duration: 3000,
        id: "buzzy-fallback-notification"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const parseAndSetSuggestions = (suggestionText: string) => {
    // Try to match numbered list format (1., 2., 3.)
    const numberedMatches = suggestionText.match(/(?:\d+[\.\)]\s*)(.*?)(?=\d+[\.\)]|$)/gs);
    
    let suggestionList: string[] = [];
    
    if (numberedMatches && numberedMatches.length > 0) {
      suggestionList = numberedMatches
        .map(match => match.replace(/^\d+[\.\)]\s*/, '').trim())
        .filter(s => s.length > 0);
    } else {
      // Fallback: split by paragraphs
      suggestionList = suggestionText
        .split(/\n\n/)
        .filter(s => s.trim().length > 0)
        .map(s => s.trim());
    }
    
    // If still couldn't parse suggestions, try splitting by new lines
    if (suggestionList.length < 2) {
      suggestionList = suggestionText
        .split(/\n/)
        .filter(s => s.trim().length > 0 && !s.trim().match(/^\d+[\.\)]$/))
        .map(s => s.trim());
    }
    
    // If we still couldn't parse any suggestions, provide character-specific fallbacks
    if (suggestionList.length < 2) {
      suggestionList = getCharacterSpecificFeedbackSuggestions(character.name);
    }
    
    setSuggestions(suggestionList.slice(0, 3)); // Limit to max 3 suggestions
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setFeedback(suggestion);
    toast.success("Suggestion selected!", { duration: 2000 });
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <AnimatePresence mode="wait">
            {showTip && (
              <motion.div
                key={tipIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <BuzzySpeechBubble
                  message={buzzyTips[tipIndex]}
                  state="teaching"
                  onClose={() => setShowTip(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          How can we improve {character.name}?
        </h2>
        
        <p className="mb-4 text-gray-600">
          Great job with the basic training! What else should {character.name} learn to become more realistic?
        </p>
        
        <Textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="What would you like to teach next?"
          className="mb-4"
        />
        
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Buzzy's suggestions:</p>
          <div className="grid grid-cols-1 gap-2">
            {isLoading ? (
              <div className="flex justify-center p-4">
                <div className="animate-spin h-6 w-6 border-2 border-purple-500 rounded-full border-t-transparent"></div>
              </div>
            ) : (
              suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-purple-50 p-3 rounded-lg border border-purple-100 cursor-pointer hover:bg-purple-100 transition-colors"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <p className="text-sm">{suggestion}</p>
                </motion.div>
              ))
            )}
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onComplete}>
            Skip
          </Button>
          <Button 
            onClick={onComplete}
            disabled={!feedback.trim()}
          >
            Continue to Advanced Training
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
