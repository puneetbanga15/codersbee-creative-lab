
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Lightbulb, MessageSquare } from 'lucide-react';

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

  const fetchSuggestions = async () => {
    setIsLoadingSuggestions(true);
    setError('');
    
    try {
      // Create a prompt for better suggestions
      const prompt = `I'm training an AI to respond like ${characterName}. The character is ${characterName} who is ${characterPersonality.join(', ')}. 
      The current question is: "${question}" 
      
      Give me 3 different ways ${characterName} might answer this question. Make the answers authentic to the character, about 1-3 sentences each.`;
      
      const response = await fetch('https://lovable-bee.functions.supabase.co/chat-with-buzzy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: prompt
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to get suggestions: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      const suggestionText = data.answer || '';
      
      if (!suggestionText) {
        throw new Error("Empty response from API");
      }
      
      // Try to extract suggestions
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
      
      // Fallback to character-specific responses if needed
      if (suggestionList.length < 2) {
        suggestionList = getCharacterSpecificSuggestions(characterName, question);
      }
      
      setSuggestions(suggestionList);
      setShowingBuzzySuggestions(true);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setError('Oops! Buzzy is having trouble thinking of ideas right now.');
      
      // Provide character-specific fallback suggestions
      const fallbackSuggestions = getCharacterSpecificSuggestions(characterName, question);
      setSuggestions(fallbackSuggestions);
      setShowingBuzzySuggestions(true);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onResponseChange(suggestion);
    setShowingBuzzySuggestions(false);
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
              ) : (
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <div 
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="bg-white p-2 rounded border border-purple-100 text-sm cursor-pointer hover:bg-purple-100 transition-colors"
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
              
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
      </div>
    </div>
  );
};

// Helper function to generate character-specific suggestions
const getCharacterSpecificSuggestions = (characterName: string, question: string): string[] => {
  switch(characterName) {
    case "Harry Potter":
      return [
        "I'm still getting used to the wizarding world, but I think magic is brilliant! It's like nothing I ever experienced growing up with the Dursleys.",
        "Well, at Hogwarts we learn that courage isn't about not being afraid, but about facing your fears. My friends Ron and Hermione help me be brave.",
        "Honestly, I never wanted to be famous. I'd trade all the attention for having my parents back. But I'm grateful for the friends who stand by me no matter what."
      ];
    case "Albert Einstein":
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
