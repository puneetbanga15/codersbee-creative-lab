
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Character, Message } from '../types';
import { Bot, MessageSquare, Send } from 'lucide-react';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  characterName: string;
  suggestedQuestions?: string[];
}

const ChatInterface = ({ messages, onSendMessage, characterName, suggestedQuestions = [] }: ChatInterfaceProps) => {
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
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Trained</span>
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
            {suggestedQuestions.slice(0, 5).map((question, index) => (
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

interface PracticePhaseProps {
  character: Character;
  messages: Message[];
  onMessage: (text: string) => void;
  onComplete: () => void;
}

export const PracticePhase: React.FC<PracticePhaseProps> = ({
  character,
  messages,
  onMessage,
  onComplete
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Bot className="h-5 w-5 text-purple-600" />
          Practice with your trained AI friend
        </h2>
        
        <p className="mb-4 text-gray-600">
          Congratulations! You've trained your AI friend. Now try chatting with them to see how they respond.
          They should be much smarter than before!
        </p>
        
        <ChatInterface
          messages={messages}
          onSendMessage={onMessage}
          characterName={character.name}
          suggestedQuestions={character.suggestedQuestions}
        />
        
        <div className="mt-6 flex justify-end">
          <Button onClick={onComplete}>
            Continue to Summary
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
