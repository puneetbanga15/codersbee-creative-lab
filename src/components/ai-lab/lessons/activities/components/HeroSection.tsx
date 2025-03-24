
import React from 'react';
import { Bot } from 'lucide-react';

export const HeroSection: React.FC = () => {
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
