
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';
import { Character, Message } from '../../types';

interface PreTrainingChatProps {
  character: Character;
  messages: Message[];
  onMessage: (text: string) => void;
}

export const PreTrainingChat = ({ character, messages, onMessage }: PreTrainingChatProps) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onMessage(inputValue);
      setInputValue('');
    }
  };
  
  // Add suggested questions for pre-training phase
  const suggestedQuestions = [
    "What's your favorite hobby?",
    "How would you handle a difficult situation?",
    "What's your philosophy on life?"
  ];
  
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
      
      <div className="p-2 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-500 mb-2">Try asking:</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => onMessage(question)}
              className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-purple-50 hover:border-purple-200 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
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
