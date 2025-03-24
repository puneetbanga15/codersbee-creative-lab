import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  MessageSquare, 
  Zap, 
  Brain, 
  Bot, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  ArrowRight,
  RefreshCw,
  Lightbulb,
  Send,
  AlertCircle,
  X
} from 'lucide-react';

// Character types
interface Character {
  id: string;
  name: string;
  image: string;
  description: string;
  personality: string[];
  defaultResponses: {[key: string]: string};
  trainingQuestions: {
    basic: TrainingQuestion[];
    advanced: TrainingQuestion[];
  };
}

// Training question type
interface TrainingQuestion {
  id: string;
  question: string;
  context?: string;
}

// Message type
interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

// Buzzy AI interface
interface BuzzyResponse {
  answer: string;
}

// Training suggestion request
interface TrainingSuggestionRequest {
  message: string;
  conversationHistory?: { role: string; content: string }[];
}

// Drag and drop components
interface SortableItemProps {
  id: string;
  character: Character;
  isSelected: boolean;
  onClick: (character: Character) => void;
}

const SortableItem = ({ id, character, isSelected, onClick }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  // Prevent drag handlers from interfering with click
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Call onClick with character data
    onClick(character);
    
    // Add visual feedback for selection
    const elements = document.querySelectorAll('.character-card');
    elements.forEach(el => el.classList.remove('selected'));
    
    const target = e.currentTarget as HTMLElement;
    target.classList.add('selected');
  };
  
  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`character-card p-4 rounded-lg border ${isSelected ? 'border-purple-500 ring-2 ring-purple-200 selected' : 'border-gray-200'} 
        bg-white hover:border-purple-300 transition-all`}
    >
      <div 
        className="flex items-center gap-3 cursor-pointer"
        onClick={handleClick}
      >
        <div 
          className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0"
          {...attributes}
          {...listeners}
        >
          <span className="text-3xl font-bold text-purple-500">{character.name.charAt(0)}</span>
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{character.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{character.description}</p>
          
          <div className="flex flex-wrap gap-1">
            {character.personality.slice(0, 3).map((trait, index) => (
              <span 
                key={index} 
                className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Buzzy AI Helper component
interface BuzzyHelperProps {
  characterName: string;
  question: string;
  onSuggestionSelect: (suggestion: string) => void;
  characterPersonality?: string[];
}

const BuzzyAIHelper = ({ characterName, question, onSuggestionSelect, characterPersonality = [] }: BuzzyHelperProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const fetchSuggestions = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Create a more detailed prompt for better suggestions
      const prompt = `I'm training an AI to respond like ${characterName}. The character is ${characterName} who is ${characterPersonality.join(', ')}. 
      The current question is: "${question}" 
      
      Give me 3 different ways ${characterName} might answer this question. Make the answers authentic to the character, about 1-3 sentences each.`;
      
      console.log("Sending suggestion request for:", characterName);
      
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
        const errorText = await response.text();
        console.error("API error response:", errorText);
        throw new Error(`Failed to get suggestions: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Received suggestion data:", data);
      
      const suggestionText = data.answer || '';
      
      if (!suggestionText) {
        console.error("Empty suggestion text received");
        throw new Error("Empty response from API");
      }
      
      // Try to match numbered list format (1., 2., 3.)
      const numberedMatches = suggestionText.match(/(?:\d+[\.\)]\s*)(.*?)(?=\d+[\.\)]|$)/gs);
      
      let suggestionList: string[] = [];
      
      if (numberedMatches && numberedMatches.length > 0) {
        suggestionList = numberedMatches
          .map(match => match.replace(/^\d+[\.\)]\s*/, '').trim())
          .filter(s => s.length > 0);
        console.log("Parsed numbered suggestions:", suggestionList);
      } else {
        // Fallback: split by paragraphs
        suggestionList = suggestionText
          .split(/\n\n/)
          .filter(s => s.trim().length > 0)
          .map(s => s.trim());
        console.log("Parsed paragraph suggestions:", suggestionList);
      }
      
      // If we still couldn't parse any suggestions or too few, provide character-specific fallbacks
      if (suggestionList.length < 2) {
        console.log("Using fallback suggestions for:", characterName);
        suggestionList = getCharacterSpecificSuggestions(characterName, question);
      }
      
      setSuggestions(suggestionList);
      setShowSuggestions(true);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setError('Oops! Buzzy is having trouble thinking of ideas right now.');
      
      // Provide character-specific fallback suggestions
      const fallbackSuggestions = getCharacterSpecificSuggestions(characterName, question);
      setSuggestions(fallbackSuggestions);
      setShowSuggestions(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionSelect(suggestion);
    setShowSuggestions(false);
  };
  
  return (
    <div className="mt-2">
      {!showSuggestions ? (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchSuggestions}
          disabled={isLoading}
          className="flex items-center gap-1 text-purple-600 border-purple-200 hover:bg-purple-50"
        >
          <Lightbulb className="h-4 w-4" />
          {isLoading ? 'Asking Buzzy...' : 'Get help from Buzzy'}
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
            onClick={() => setShowSuggestions(false)}
            className="mt-2 text-xs text-purple-600 hover:bg-purple-100"
          >
            Hide suggestions
          </Button>
        </div>
      )}
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
    case "Frida Kahlo":
      return [
        "In my art and in my life, I express my pain and my passion equally. My paintings are not dreams or nightmares—they are my own reality.",
        "I paint myself because I am the subject I know best. Through my self-portraits, I reveal both my struggles and my strength.",
        "My colors are not from a palette but from my heart. I use them to speak when words cannot express what I feel inside my soul."
      ];
    case "Marie Curie":
      return [
        "In science, we must be interested in things, not in persons. The path of discovery requires focus and dedication above all else.",
        "I was taught that the way of progress was neither swift nor easy. My work with radium taught me that persistence is essential to scientific breakthrough.",
        "One never notices what has been done; one can only see what remains to be done. This is what drives me to continue my research despite obstacles."
      ];
    default:
      return [
        `${characterName} might say: "That's an interesting question that makes me think deeply about my experiences."`,
        `${characterName} could respond: "Based on who I am and what I've been through, I believe..."`,
        `${characterName} would answer: "My unique perspective on this comes from my personal journey."`
      ];
  }
};

// Training component
interface TrainingItemProps {
  question: string;
  characterName: string;
  onResponseChange: (response: string) => void;
  response: string;
  characterPersonality?: string[];
  context?: string;
}

const TrainingItem = ({ question, characterName, onResponseChange, response, characterPersonality = [], context }: TrainingItemProps) => {
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
        
        <BuzzyAIHelper 
          characterName={characterName}
          question={question}
          onSuggestionSelect={onResponseChange}
          characterPersonality={characterPersonality}
        />
      </div>
    </div>
  );
};

// Training component with Buzzy integration and carousel
interface TrainingCarouselProps {
  character: Character;
  trainingResponses: {[key: string]: string};
  onResponseChange: (questionId: string, response: string) => void;
  trainingLevel: 'basic' | 'advanced';
}

const TrainingCarousel = ({ character, trainingResponses, onResponseChange, trainingLevel }: TrainingCarouselProps) => {
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
    </div>
  );
};

// Chat component
interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  characterName: string;
  isTrainedMode?: boolean;
  suggestedQuestions?: string[];
}

const ChatInterface = ({ messages, onSendMessage, characterName, isTrainedMode = false, suggestedQuestions = [] }: ChatInterfaceProps) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };
  
  const handleSuggestedQuestionClick = (question: string) => {
    onSendMessage(question);
  };
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-purple-50 p-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
            <div className="text-sm font-bold text-purple-700">{characterName.charAt(0)}</div>
          </div>
          <h3 className="font-medium">{characterName}</h3>
          {isTrainedMode && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Trained</span>}
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
        <div ref={messagesEndRef} />
      </div>
      
      {suggestedQuestions && suggestedQuestions.length > 0 && (
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestionClick(question)}
                className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-purple-50 hover:border-purple-200 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white rounded-b-lg">
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

// Feedback component
interface FeedbackComponentProps {
  characterName: string;
  onFeedbackSubmit: (feedback: string) => void;
  onSkip: () => void;
}

const FeedbackComponent = ({ characterName, onFeedbackSubmit, onSkip }: FeedbackComponentProps) => {
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const getBuzzySuggestions = async () => {
    setIsLoading(true);
    try {
      // Create a more detailed prompt for better suggestions
      const prompt = `I'm training an AI character based on ${characterName}. I've completed the basic training phase.
      
      What are 3 specific things I should teach the ${characterName} AI character next to make it more realistic and authentic? 
      
      Format each suggestion as a separate numbered item (1., 2., 3.) with 1-2 sentences explaining why it would enhance the character.`;
      
      console.log("Sending feedback suggestion request for:", characterName);
      
      const response = await fetch('https://lovable-bee.functions.supabase.co/chat-with-buzzy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: prompt,
          conversationHistory: [
            { role: 'system', content: 'You are Buzzy, a helpful AI assistant for kids learning about AI training.' },
            { role: 'user', content: prompt }
          ]
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error response:", errorText);
        throw new Error(`Failed to get suggestions: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Received feedback suggestion data:", data);
      
      const suggestionText = data.answer || '';
      
      if (!suggestionText) {
        console.error("Empty suggestion text received");
        throw new Error("Empty response from API");
      }
      
      // Try to match numbered list format (1., 2., 3.)
      const numberedMatches = suggestionText.match(/(?:\d+[\.\)]\s*)(.*?)(?=\d+[\.\)]|$)/gs);
      
      let suggestionList: string[] = [];
      
      if (numberedMatches && numberedMatches.length > 0) {
        suggestionList = numberedMatches
          .map(match => match.replace(/^\d+[\.\)]\s*/, '').trim())
          .filter(s => s.length > 0);
        console.log("Parsed numbered feedback suggestions:", suggestionList);
      } else {
        // Fallback: split by paragraphs
        suggestionList = suggestionText
          .split(/\n\n/)
          .filter(s => s.trim().length > 0)
          .map(s => s.trim());
        console.log("Parsed paragraph feedback suggestions:", suggestionList);
      }
      
      // If we still couldn't parse any suggestions, provide character-specific fallbacks
      if (suggestionList.length < 2) {
        console.log("Using fallback feedback suggestions for:", characterName);
        suggestionList = getCharacterSpecificFeedbackSuggestions(characterName);
      }
      
      setSuggestions(suggestionList);
    } catch (err) {
      console.error('Error getting Buzzy suggestions:', err);
      
      // Provide character-specific fallback suggestions
      const fallbackSuggestions = getCharacterSpecificFeedbackSuggestions(characterName);
      setSuggestions(fallbackSuggestions);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Add this helper function for character-specific feedback suggestions
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
      case "Frida Kahlo":
        return [
          "Help Frida express how her physical pain influenced her art, teaching children about transforming challenges into creative expression.",
          "Train Frida to discuss her cultural heritage and how it shaped her identity and artistic style, promoting cultural appreciation.",
          "Develop Frida's ability to talk about self-representation in art and the importance of embracing one's unique identity."
        ];
      case "Marie Curie":
        return [
          "Train Marie to discuss her experiences as a pioneering woman in science, inspiring young girls to pursue STEM interests.",
          "Help Marie explain her scientific discoveries in simple terms while conveying her passion for knowledge and exploration.",
          "Teach Marie to share stories about persistence through challenges, emphasizing how determination leads to groundbreaking achievements."
        ];
      default:
        return [
          `Teach ${characterName} about their favorite hobbies and interests to create a more well-rounded personality.`,
          `Help ${characterName} express emotions and reactions in a way that feels authentic to their character.`,
          `Train ${characterName} to respond to complex questions while maintaining their unique worldview and values.`
        ];
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setFeedback(suggestion);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-purple-50 p-4 border-b border-gray-200">
        <h3 className="font-medium flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          How can we improve {characterName}?
        </h3>
      </div>
      
      <div className="p-6">
        <p className="mb-4 text-sm">
          You've completed the basic training! What else should {characterName} learn to become more realistic?
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
                <div
                  key={index}
                  className="bg-purple-50 p-3 rounded-lg border border-purple-100 cursor-pointer hover:bg-purple-100 transition-colors"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <p className="text-sm">{suggestion}</p>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onSkip}>
            Skip
          </Button>
          <Button 
            onClick={() => onFeedbackSubmit(feedback)}
            disabled={!feedback.trim()}
          >
            Continue to Advanced Training
          </Button>
        </div>
      </div>
    </div>
  );
};

// Hero section with Buzzy highlight
const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-100 rounded-lg p-6 mb-6 relative overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">🐝</span>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-1">Meet Your AI Friends!</h2>
          <p className="text-sm">Create and train your own AI character with unique personalities!</p>
        </div>
      </div>
      
      <div className="absolute -right-4 -bottom-4 w-32 h-32 flex items-end justify-end">
        <div className="relative">
          <div className="absolute -top-16 right-8 bg-yellow-300 text-yellow-800 px-3 py-2 rounded-full text-xs font-medium shadow-md transform rotate-12 animate-pulse">
            I am Buzzy, Ask me anything!
          </div>
          <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-4xl">🐝</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MeetAIFriendActivityWrapper: React.FC = () => {
  // Characters data
  const characters: Character[] = [
    {
      id: 'harry',
      name: 'Harry Potter',
      image: '/harry-potter.jpg',
      description: 'A brave young wizard with a lightning scar and a knack for getting into trouble.',
      personality: ['brave', 'loyal', 'determined', 'modest'],
      defaultResponses: {
        'magic': 'Expelliarmus! That\'s my favorite spell.',
        'hogwarts': 'Hogwarts is my true home. It\'s the first place I felt like I belonged.',
        'voldemort': 'I don\'t fear saying his name. Fear of a name only increases fear of the thing itself.',
        'quidditch': 'I love playing Quidditch as a Seeker! There\'s nothing like the feeling of catching the Golden Snitch.',
        'school': 'Hogwarts is the best wizarding school in the world!',
        'friends': 'Ron and Hermione are my best friends. We\'ve been through a lot together.',
        'default': 'Hmm, that\'s interesting. I\'m not sure what to say about that.'
      },
      trainingQuestions: {
        basic: [
          {
            id: 'basic1',
            question: 'What is your favorite subject in school?',
            context: 'Harry loves learning new spells and potions.'
          },
          {
            id: 'basic2',
            question: 'How do you handle difficult situations?',
            context: 'Harry has faced many challenges in his life, including battling Voldemort.'
          }
        ],
        advanced: [
          {
            id: 'adv1',
            question: 'What do you value most in life?',
            context: 'Harry values friendship, loyalty, and fairness.'
          },
          {
            id: 'adv2',
            question: 'How do you feel about your fame in the wizarding world?',
            context: 'Harry is often uncomfortable with his fame and prefers to be treated normally.'
          },
          {
            id: 'adv3',
            question: 'What would you say to someone who feels like they don\'t belong?',
            context: 'Harry felt like an outsider with the Dursleys before discovering he was a wizard.'
          }
        ]
      }
    },
    {
      id: 'einstein',
      name: 'Albert Einstein',
      image: '/einstein.jpg',
      description: 'Brilliant physicist and mathematician with wild hair and a playful personality.',
      personality: ['curious', 'creative', 'thoughtful', 'humorous'],
      defaultResponses: {
        'physics': 'Physics is the poetry of nature, written in the language of mathematics.',
        'relativity': 'Time is relative to the observer. The faster you move, the slower time passes!',
        'imagination': 'Imagination is more important than knowledge. Knowledge is limited, imagination encircles the world.',
        'science': 'The most beautiful thing we can experience is the mysterious. It is the source of all true art and science.',
        'school': 'Education is what remains after one has forgotten what one has learned in school.',
        'curiosity': 'I have no special talent. I am only passionately curious.',
        'default': 'That is a fascinating question that requires deeper contemplation.'
      },
      trainingQuestions: {
        basic: [
          {
            id: 'basic1',
            question: 'What is your favorite area of science?',
            context: 'Einstein is known for his work in theoretical physics.'
          },
          {
            id: 'basic2',
            question: 'How do you approach solving difficult problems?',
            context: 'Einstein was known for his thought experiments and creative problem-solving.'
          }
        ],
        advanced: [
          {
            id: 'adv1',
            question: 'What role does imagination play in scientific discovery?',
            context: 'Einstein believed imagination was more important than knowledge.'
          },
          {
            id: 'adv2',
            question: 'How would you explain your theory of relativity to a child?',
            context: 'Einstein was known for making complex ideas accessible.'
          },
          {
            id: 'adv3',
            question: 'What advice would you give to young scientists today?',
            context: 'Einstein valued curiosity and persistence in scientific endeavors.'
          }
        ]
      }
    },
    {
      id: 'frida',
      name: 'Frida Kahlo',
      image: '/frida.jpg',
      description: 'Bold Mexican artist known for her colorful self-portraits and strength through adversity.',
      personality: ['passionate', 'resilient', 'expressive', 'authentic'],
      defaultResponses: {
        'art': 'I paint my own reality. The only thing I know is that I paint because I need to.',
        'pain': 'They thought I was a Surrealist, but I wasn\'t. I never painted dreams. I painted my own reality.',
        'life': 'Nothing is absolute. Everything changes, everything moves, everything revolves, everything flies and goes away.',
        'identity': 'I am my own muse. I am the subject I know best. The subject I want to better.',
        'creativity': 'Feet, what do I need them for if I have wings to fly?',
        'strength': 'At the end of the day, we can endure much more than we think we can.',
        'default': 'I would need to reflect on my experiences to answer that question.'
      },
      trainingQuestions: {
        basic: [
          {
            id: 'basic1',
            question: 'What inspires your artwork?',
            context: 'Frida painted from her personal experiences and emotions.'
          },
          {
            id: 'basic2',
            question: 'How do you express yourself through art?',
            context: 'Frida used bold colors and symbolic elements in her paintings.'
          }
        ],
        advanced: [
          {
            id: 'adv1',
            question: 'How did you find strength during difficult times?',
            context: 'Frida faced many physical challenges throughout her life.'
          },
          {
            id: 'adv2',
            question: 'What does authenticity mean to you?',
            context: 'Frida was known for her unapologetic self-expression.'
          },
          {
            id: 'adv3',
            question: 'How do you want people to remember your art?',
            context: 'Frida created a lasting legacy through her unique artistic vision.'
          }
        ]
      }
    },
    {
      id: 'marie',
      name: 'Marie Curie',
      image: '/marie-curie.jpg',
      description: 'Pioneering scientist who discovered radium and polonium, and the first woman to win a Nobel Prize.',
      personality: ['determined', 'brilliant', 'dedicated', 'humble'],
      defaultResponses: {
        'science': 'Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.',
        'research': 'I am among those who think that science has great beauty. A scientist in the laboratory is not only a technician but also a child placed before natural phenomena.',
        'discovery': 'One never notices what has been done; one can only see what remains to be done.',
        'women': 'We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained.',
        'education': 'You cannot hope to build a better world without improving the individuals. To that end, each of us must work for our own improvement.',
        'perseverance': 'I was taught that the way of progress was neither swift nor easy.',
        'default': 'That is an interesting question that deserves careful scientific consideration.'
      },
      trainingQuestions: {
        basic: [
          {
            id: 'basic1',
            question: 'What inspired you to pursue science?',
            context: 'Marie Curie was passionate about learning from an early age.'
          },
          {
            id: 'basic2',
            question: 'How did you overcome obstacles in your career?',
            context: 'Marie Curie faced many challenges as a woman in science in the early 1900s.'
          }
        ],
        advanced: [
          {
            id: 'adv1',
            question: 'What was your most significant discovery and why?',
            context: 'Marie Curie discovered radium and polonium, and pioneered research on radioactivity.'
          },
          {
            id: 'adv2',
            question: 'How do you balance dedication to work with personal life?',
            context: 'Marie Curie was both a dedicated scientist and a mother.'
          },
          {
            id: 'adv3',
            question: 'What advice would you give to young girls interested in science today?',
            context: 'Marie Curie broke barriers for women in science and education.'
          }
        ]
      }
    }
  ];

  // State
  const [items, setItems] = useState<Character[]>([...characters]);
  const [step, setStep] = useState<number>(1);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [trainingResponses, setTrainingResponses] = useState<{[key: string]: string}>({});
  const [trainingComplete, setTrainingComplete] = useState<boolean>(false);
  const [trainingLevel, setTrainingLevel] = useState<'basic' | 'advanced'>('basic');
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [trainedResponses, setTrainedResponses] = useState<{[key: string]: string}>({});
  const [preTrainingMessages, setPreTrainingMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello there! I\'m here to chat with you. Ask me anything!',
      timestamp: new Date()
    }
  ]);
  const [postTrainingMessages, setPostTrainingMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello there! I\'ve been trained by you and I\'m ready to chat in my new personality!',
      timestamp: new Date()
    }
  ]);

  // Sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over?.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  // Handle character selection
  const handleCharacterSelect = (character: Character) => {
    console.log("Character selected:", character.name);
    setSelectedCharacter(character);
    
    // Reset training responses when switching characters
    setTrainingResponses({});
    
    // Reset chat messages for the new character
    setPreTrainingMessages([
      {
        id: '1',
        sender: 'ai',
        text: `Hello there! I'm ${character.name}. What would you like to talk about?`,
        timestamp: new Date()
      }
    ]);
  };

  // Handle training response change
  const handleResponseChange = (questionId: string, response: string) => {
    setTrainingResponses(prev => ({
      ...prev,
      [questionId]: response
    }));
  };

  // Check if training is complete
  const isTrainingComplete = () => {
    if (!selectedCharacter) return false;
    
    if (trainingLevel === 'basic') {
      return selectedCharacter.trainingQuestions.basic.every(
        question => trainingResponses[question.id]?.trim().length > 0
      );
    } else {
      return selectedCharacter.trainingQuestions.advanced.every(
        question => trainingResponses[question.id]?.trim().length > 0
      );
    }
  };

  // Handle next step
  const handleNextStep = () => {
    if (step === 2 && !selectedCharacter) {
      alert("Please select a character first!");
      return;
    }
    
    if (step === 3) {
      if (!isTrainingComplete()) {
        alert("Please complete all training questions first!");
        return;
      }
      
      if (trainingLevel === 'basic' && !showFeedback) {
        setShowFeedback(true);
        return;
      }
      
      if (trainingLevel === 'basic' && showFeedback) {
        setShowFeedback(false);
        setTrainingLevel('advanced');
        return;
      }
      
      // If advanced training is complete, move to testing
      prepareForTesting();
    }
    
    setStep(prev => prev + 1);
  };

  // Handle feedback submission
  const handleFeedbackSubmit = (feedbackText: string) => {
    setFeedback(feedbackText);
    setShowFeedback(false);
    setTrainingLevel('advanced');
  };

  // Skip feedback
  const handleSkipFeedback = () => {
    setShowFeedback(false);
    setTrainingLevel('advanced');
  };

  // Prepare for testing
  const prepareForTesting = () => {
    // Create trained responses by merging default responses with custom training
    const newTrainedResponses = {
      ...selectedCharacter?.defaultResponses,
      ...trainingResponses
    };
    
    setTrainedResponses(newTrainedResponses);
    
    // Reset post-training messages
    setPostTrainingMessages([
      {
        id: '1',
        sender: 'ai',
        text: 'Hello there! I\'ve been trained by you and I\'m ready to chat in my new personality!',
        timestamp: new Date()
      }
    ]);
  };

  // Handle sending message in pre-training chat
  const handleSendPreTrainingMessage = (message: string) => {
    // Add user message
    const userMessageId = Date.now().toString();
    const userMessage: Message = {
      id: userMessageId,
      sender: 'user',
      text: message,
      timestamp: new Date()
    };
    
    setPreTrainingMessages(prev => [...prev, userMessage]);
    
    // Generate AI response based on default responses
    setTimeout(() => {
      let aiResponse = selectedCharacter?.defaultResponses.default || "I'm not sure how to respond to that.";
      
      // Check for keyword matches in the default responses
      const lowercaseMessage = message.toLowerCase();
      Object.entries(selectedCharacter?.defaultResponses || {}).forEach(([keyword, response]) => {
        if (lowercaseMessage.includes(keyword) && keyword !== 'default') {
          aiResponse = response;
        }
      });
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date()
      };
      
      setPreTrainingMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  // Handle sending message in post-training chat
  const handleSendPostTrainingMessage = (message: string) => {
    // Add user message
    const userMessageId = Date.now().toString();
    const userMessage: Message = {
      id: userMessageId,
      sender: 'user',
      text: message,
      timestamp: new Date()
    };
    
    setPostTrainingMessages(prev => [...prev, userMessage]);
    
    // Generate AI response based on trained responses
    setTimeout(() => {
      let aiResponse = trainedResponses.default || "I'm not sure how to respond to that.";
      
      // Check for keyword matches in trained responses
      const lowercaseMessage = message.toLowerCase();
      
      // Special case for trained responses
      Object.entries(trainedResponses).forEach(([keyword, response]) => {
        if (lowercaseMessage.includes(keyword) && keyword !== 'default') {
          aiResponse = response;
        }
      });
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date()
      };
      
      setPostTrainingMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  // Reset chat messages
  const resetChat = (isTrained: boolean) => {
    if (isTrained) {
      setPostTrainingMessages([
        {
          id: '1',
          sender: 'ai',
          text: 'Hello there! I\'ve been trained by you and I\'m ready to chat in my new personality!',
          timestamp: new Date()
        }
      ]);
    } else {
      setPreTrainingMessages([
        {
          id: '1',
          sender: 'ai',
          text: `Hello there! I'm ${selectedCharacter?.name}. What would you like to talk about?`,
          timestamp: new Date()
        }
      ]);
    }
  };

  // Step titles and icons
  const stepInfo = [
    { title: "Rank Characters", icon: <ArrowRight className="h-4 w-4" /> },
    { title: "Choose & Chat", icon: <MessageSquare className="h-4 w-4" /> },
    { title: "Train", icon: <Sparkles className="h-4 w-4" /> },
    { title: "Test", icon: <CheckCircle className="h-4 w-4" /> }
  ];

  // Render step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <BuzzyLessonHelper step={step} />
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Choose a Character to Train</h2>
              <p className="text-gray-600 mb-6">Select a character below to start training. You can drag to reorder them.</p>
              
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={items.map(item => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((character) => (
                      <SortableItem
                        key={character.id}
                        id={character.id}
                        character={character}
                        isSelected={selectedCharacter?.id === character.id}
                        onClick={handleCharacterSelect}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
              
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleNextStep}
                  disabled={!selectedCharacter}
                  className="flex items-center gap-1"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <BuzzyLessonHelper step={step} />
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Meet {selectedCharacter?.name}</h2>
              <p className="text-gray-600 mb-6">
                This is how {selectedCharacter?.name} responds before any training. Try asking some questions!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-4">
                    <h3 className="font-medium mb-2 text-purple-800">About {selectedCharacter?.name}</h3>
                    <p className="text-sm text-gray-700">{selectedCharacter?.description}</p>
                    
                    <div className="mt-3">
                      <h4 className="text-xs font-medium text-purple-700 mb-1">Personality Traits:</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedCharacter?.personality.map((trait, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-2">Try asking about:</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedCharacter && Object.keys(selectedCharacter.defaultResponses)
                        .filter(key => key !== 'default')
                        .map((topic, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="justify-start text-left"
                            onClick={() => handleSendPreTrainingMessage(topic)}
                          >
                            {topic}
                          </Button>
                        ))
                      }
                    </div>
                  </div>
                </div>
                
                <ChatInterface
                  messages={preTrainingMessages}
                  onSendMessage={handleSendPreTrainingMessage}
                  characterName={selectedCharacter?.name || ''}
                />
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNextStep}
                  className="flex items-center gap-1"
                >
                  Start Training
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <BuzzyLessonHelper step={step} characterName={selectedCharacter?.name} />
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Basic Training - {selectedCharacter?.name}</h2>
              <p className="text-gray-600 mb-6">
                Answer these questions as if you were {selectedCharacter?.name}. This will teach the AI how to respond in character.
              </p>
              
              <TrainingCarousel
                character={selectedCharacter!}
                trainingResponses={trainingResponses}
                onResponseChange={handleResponseChange}
                trainingLevel="basic"
              />
              
              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={!isTrainingComplete()}
                  className="flex items-center gap-1"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <BuzzyLessonHelper step={step} characterName={selectedCharacter?.name} />
            
            <FeedbackComponent
              characterName={selectedCharacter?.name || ''}
              onFeedbackSubmit={handleFeedbackSubmit}
              onSkip={handleSkipFeedback}
            />
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <BuzzyLessonHelper step={step} characterName={selectedCharacter?.name} />
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Advanced Training - {selectedCharacter?.name}</h2>
              <p className="text-gray-600 mb-6">
                Now let's train {selectedCharacter?.name} to handle more complex questions. Answer these as if you were the character.
              </p>
              
              <TrainingCarousel
                character={selectedCharacter!}
                trainingResponses={trainingResponses}
                onResponseChange={handleResponseChange}
                trainingLevel="advanced"
              />
              
              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep(4)}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={!isTrainingComplete()}
                  className="flex items-center gap-1"
                >
                  Complete Training
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        );
        
      case 6:
        return (
          <div className="space-y-6">
            <BuzzyLessonHelper step={step} characterName={selectedCharacter?.name} />
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Chat with {selectedCharacter?.name}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Trained
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => resetChat(true)}
                    className="flex items-center gap-1 text-xs"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Reset Chat
                  </Button>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                Your AI friend is now trained! Chat with {selectedCharacter?.name} and see how they respond with the personality you've created.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-4">
                    <h3 className="font-medium mb-2 text-purple-800">Your Training Results</h3>
                    <p className="text-sm text-gray-700">
                      You've successfully trained {selectedCharacter?.name} with {Object.keys(trainingResponses).length} responses!
                    </p>
                    
                    {feedback && (
                      <div className="mt-3 p-2 bg-white/70 rounded border border-purple-100">
                        <h4 className="text-xs font-medium text-purple-700 mb-1">Your Feedback:</h4>
                        <p className="text-xs text-gray-700">{feedback}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-2">Try asking about:</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedCharacter?.trainingQuestions.basic.map((q, index) => (
                        <Button
                          key={`basic-${index}`}
                          variant="outline"
                          size="sm"
                          className="justify-start text-left"
                          onClick={() => handleSendPostTrainingMessage(q.question)}
                        >
                          {q.question}
                        </Button>
                      ))}
                      {selectedCharacter?.trainingQuestions.advanced.map((q, index) => (
                        <Button
                          key={`adv-${index}`}
                          variant="outline"
                          size="sm"
                          className="justify-start text-left"
                          onClick={() => handleSendPostTrainingMessage(q.question)}
                        >
                          {q.question}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <ChatInterface
                  messages={postTrainingMessages}
                  onSendMessage={handleSendPostTrainingMessage}
                  characterName={selectedCharacter?.name || ''}
                  isTrainedMode={true}
                  suggestedQuestions={[
                    "What's your favorite hobby?",
                    "How would you handle a difficult problem?",
                    "What makes you unique?"
                  ]}
                />
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep(5)}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back to Training
                </Button>
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  Train Another Character
                  <RefreshCw className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  // Improved Buzzy Helper component for top of lesson
  const BuzzyLessonHelper = ({ step, characterName = '' }: { step: number, characterName?: string }) => {
    const [showTip, setShowTip] = useState(true);
    
    const getTipForStep = () => {
      switch(step) {
        case 1:
          return "Welcome to the AI Training Lab! Start by selecting a character you'd like to train. Click and drag to reorder them if you want!";
        case 2:
          return "Great choice! Now you'll see how your character responds before any training. Try asking a few questions to see their default personality.";
        case 3:
          return `Now it's time to train ${characterName}! Answer the questions as if you were ${characterName}. Be creative and think about their personality!`;
        case 4:
          return "Let's give some feedback on what else your character should learn. This helps make your AI friend even better!";
        case 5:
          return "Advanced training helps your character respond to more complex questions. Keep thinking about their unique personality!";
        case 6:
          return `Great job! Now you can chat with ${characterName} and see how they respond with the personality you've trained. Try asking different questions!`;
        default:
          return "I'm Buzzy! I'm here to help you train your AI friend. Click the 'Get help from Buzzy' button if you need suggestions!";
      }
    };
    
    return (
      <div className={`mb-6 ${showTip ? 'block' : 'hidden'}`}>
        <div className="bg-yellow-50 p-4 rounded-lg shadow-sm border border-yellow-200">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
              <img 
                src="/lovable-uploads/230855da-e71d-43ac-a6b6-1c45a8569cce.png" 
                alt="Buzzy Bee"
                className="h-10 w-10 object-contain"
              />
            </div>
            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-yellow-800 mb-1">Buzzy's Tip</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-100"
                  onClick={() => setShowTip(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-yellow-700">{getTipForStep()}</p>
              {step === 3 && (
                <div className="mt-2 bg-white/50 p-2 rounded border border-yellow-100 text-xs text-yellow-800">
                  <p className="font-medium mb-1">Need help? Here are some tips:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Think about how {characterName} would speak and what words they might use</li>
                    <li>Consider their background, experiences, and personality traits</li>
                    <li>If you get stuck, click "Get help from Buzzy" below the text box</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">AI Lab: Meet Your AI Friend</h1>
        <div className="flex space-x-2">
          <div className={`w-4 h-1 rounded-full ${step >= 1 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
          <div className={`w-4 h-1 rounded-full ${step >= 2 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
          <div className={`w-4 h-1 rounded-full ${step >= 3 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
          <div className={`w-4 h-1 rounded-full ${step >= 4 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
        </div>
      </div>
      
      {renderStepContent()}
      
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <div className="absolute -top-20 right-0 bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-lg shadow-lg max-w-xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                <img 
                  src="/lovable-uploads/230855da-e71d-43ac-a6b6-1c45a8569cce.png" 
                  alt="Buzzy Bee"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Hi, I'm Buzzy!</p>
                <p className="text-xs">I'll help you if you get stuck on any step. Just click on me!</p>
              </div>
            </div>
            <div className="absolute -bottom-2 right-5 w-4 h-4 bg-yellow-100 border-r border-b border-yellow-300 transform rotate-12"></div>
          </div>
          
          <button className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300">
            <img 
              src="/lovable-uploads/230855da-e71d-43ac-a6b6-1c45a8569cce.png" 
              alt="Buzzy Bee"
              className="h-10 w-10 object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
