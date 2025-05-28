import React, { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CollapsibleSection } from '@/components/ai-lab/ui/CollapsibleSection';
import { motion } from 'framer-motion';

interface WhatIsAIIntroProps {
  onComplete?: () => void;
}

export const WhatIsAIIntro: React.FC<WhatIsAIIntroProps> = ({ onComplete }) => {
  // Emit event when component mounts to indicate we're at the end of the section
  useEffect(() => {
    const event = new CustomEvent('sectionEndReached', { 
      detail: { isAtEnd: true }
    });
    window.dispatchEvent(event);
    
    return () => {
      // Reset when unmounting
      const resetEvent = new CustomEvent('sectionEndReached', { 
        detail: { isAtEnd: false }
      });
      window.dispatchEvent(resetEvent);
    };
  }, []);
  
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100"
      >
        <h1 className="text-2xl font-bold text-blue-900 mb-3">
          What is Artificial Intelligence?
        </h1>
        <p className="text-blue-800">
          AI is like giving computers the ability to think and learn, similar to how humans do! 
          Let's explore what makes AI special and how it's used in our daily lives.
        </p>
      </motion.div>

      <CollapsibleSection 
        title="AI All Around Us" 
        icon={(
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        )}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 0 0-9.95 9"></path>
                    <path d="M16 6.36A8 8 0 1 1 12 20"></path>
                    <path d="M12 8v8"></path>
                    <path d="M21.95 10A10 10 0 1 1 12 2"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Smart Assistants</h4>
                  <p className="text-sm text-gray-600">Like Siri and Alexa that answer your questions and follow your voice commands</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                    <path d="M2 10h20"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Recommendations</h4>
                  <p className="text-sm text-gray-600">Netflix and YouTube suggesting shows and videos you might like</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Safety Features</h4>
                  <p className="text-sm text-gray-600">Spam filters and fraud detection keeping your accounts safe</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Creative Tools</h4>
                  <p className="text-sm text-gray-600">AI that helps write stories, create art, and compose music</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CollapsibleSection>

      <CollapsibleSection 
        title="How Does AI Work?" 
        icon={(
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        )}
        defaultOpen={true}
      >
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-blue-800 mb-2">Learning from Examples</h4>
            <p className="text-gray-700 text-sm">
              AI systems learn by looking at lots of examples, just like how you learn from experience. 
              The more examples they see, the better they get at their tasks!
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h5 className="font-medium text-sm text-blue-800 mb-1">Human Learning</h5>
              <ul className="text-xs space-y-1 text-gray-700">
                <li>• Learn from experience</li>
                <li>• Make mistakes and improve</li>
                <li>• Understand context</li>
                <li>• Use common sense</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h5 className="font-medium text-sm text-purple-800 mb-1">AI Learning</h5>
              <ul className="text-xs space-y-1 text-gray-700">
                <li>• Learns from data</li>
                <li>• Improves with more examples</li>
                <li>• Finds patterns in information</li>
                <li>• Follows programmed rules</li>
              </ul>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <span className="font-medium">Did you know?</span> AI is already all around you! 
              It's in your phone, your games, and even helps keep your email clean from spam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
