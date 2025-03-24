
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Character, Message, TrainingProgress } from '../types';
import { Brain, ChevronLeft, ChevronRight, CheckCircle, MessageSquare, Lightbulb, Send } from 'lucide-react';

interface TrainingItemProps {
  question: string;
  characterName: string;
  onResponseChange: (response: string) => void;
  response: string;
  characterPersonality?: string[];
  context?: string;
}

const TrainingItem = ({ question, characterName, onResponseChange, response, characterPersonality = [], context }: TrainingItemProps) => {
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
          message: prompt,
          conversationHistory: [
            { role: 'system', content: `You are a helpful AI assistant that helps users train an AI character to respond like ${characterName}.` },
            { role: 'user', content: prompt }
          ]
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

interface TrainingCarouselProps {
  character: Character;
  trainingResponses: {[key: string]: string};
  onResponseChange: (questionId: string, response: string) => void;
  trainingLevel: 'basic' | 'advanced';
  onComplete: () => void;
}

const TrainingCarousel = ({ character, trainingResponses, onResponseChange, trainingLevel, onComplete }: TrainingCarouselProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questions = trainingLevel === 'basic' ? character.trainingQuestions.basic : character.trainingQuestions.advanced;

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const response = trainingResponses[currentQuestion.id] || '';
  const isComplete = response.trim().length > 0;
  
  const allQuestionsAnswered = questions.every(q => 
    trainingResponses[q.id] && trainingResponses[q.id].trim().length > 0
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-purple-50 p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
              <span className="font-bold text-purple-800">{currentQuestionIndex + 1}</span>
            </div>
            <div>
              <h3 className="font-medium">Training Question {currentQuestionIndex + 1} of {questions.length}</h3>
              <p className="text-xs text-gray-500">
                {trainingLevel === 'basic' ? 'Basic Training' : 'Advanced Training'}
              </p>
            </div>
          </div>
          {isComplete && (
            <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span>Complete</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <TrainingItem 
          question={currentQuestion.question}
          characterName={character.name}
          onResponseChange={(response) => onResponseChange(currentQuestion.id, response)}
          response={response}
          characterPersonality={character.personality}
          context={currentQuestion.context}
        />
      </div>
      
      <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-gray-50">
        <Button 
          variant="outline" 
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex gap-1">
          {questions.map((_, index) => (
            <div 
              key={index} 
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === currentQuestionIndex 
                  ? 'bg-purple-600' 
                  : trainingResponses[questions[index].id] 
                    ? 'bg-green-400' 
                    : 'bg-gray-300'
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
            />
          ))}
        </div>
        
        <Button 
          onClick={nextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
          className="flex items-center gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {allQuestionsAnswered && (
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <Button onClick={onComplete}>
            Complete {trainingLevel === 'basic' ? 'Basic' : 'Advanced'} Training
          </Button>
        </div>
      )}
    </div>
  );
};

// Chat component for pre-training phase
const PreTrainingChat = ({ character, messages, onMessage }: { 
  character: Character, 
  messages: Message[], 
  onMessage: (text: string) => void 
}) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onMessage(inputValue);
      setInputValue('');
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-purple-50 p-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
            <div className="text-sm font-bold text-purple-700">{character.name.charAt(0)}</div>
          </div>
          <h3 className="font-medium">{character.name}</h3>
          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Untrained</span>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 h-[300px] overflow-y-auto">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white border border-gray-200'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="sm" className="bg-purple-600 hover:bg-purple-700">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

interface TrainingPhaseProps {
  character: Character;
  messages: Message[];
  progress: TrainingProgress;
  onMessage: (text: string) => void;
  onTrainingResponse: (questionId: string, response: string) => void;
  onComplete: () => void;
}

export const TrainingPhase: React.FC<TrainingPhaseProps> = ({
  character,
  messages,
  progress,
  onMessage,
  onTrainingResponse,
  onComplete
}) => {
  if (progress.currentPhase === 'pre-training') {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Meet Your Untrained AI Friend
            </h2>
            <p className="text-gray-600 mb-6">
              Your AI friend doesn't know much yet! Try asking a few questions to see its limitations.
              Then we'll start training it to respond better.
            </p>
            
            <PreTrainingChat 
              character={character}
              messages={messages}
              onMessage={onMessage}
            />
            
            <div className="mt-6 flex justify-end">
              <Button onClick={onComplete}>
                Start Training
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            {progress.currentPhase === 'basic' ? 'Basic Training' : 'Advanced Training'}
          </h2>
          <p className="text-gray-600 mb-6">
            {progress.currentPhase === 'basic' 
              ? "Let's start with some basic training. Answer these questions as your character would respond."
              : "Great job with the basic training! Now let's make your AI friend even smarter with some advanced training."
            }
          </p>
          
          <TrainingCarousel
            character={character}
            trainingResponses={progress.responses}
            onResponseChange={onTrainingResponse}
            trainingLevel={progress.currentPhase === 'basic' ? 'basic' : 'advanced'}
            onComplete={onComplete}
          />
        </CardContent>
      </Card>
    </div>
  );
};
