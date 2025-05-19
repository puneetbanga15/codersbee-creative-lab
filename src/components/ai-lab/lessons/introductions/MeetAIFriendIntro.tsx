
import React, { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BuzzyAnimation } from '@/components/ai-lab/ui/BuzzyAnimation';
import { BuzzySpeechBubble } from '@/components/ai-lab/ui/BuzzySpeechBubble';

interface MeetAIFriendIntroProps {
  onComplete?: () => void;
}

export const MeetAIFriendIntro = ({ onComplete }: MeetAIFriendIntroProps) => {
  // Call onComplete when component mounts since intro is typically just a single view
  useEffect(() => {
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);
  
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 mb-6">
        <BuzzyAnimation state="excited" size="md" className="flex-shrink-0" />
        <BuzzySpeechBubble 
          message="Hello there! I'm Buzzy, and I'm excited to teach you about AI Friends! Are you ready to learn how to create your own AI buddy?"
          state="excited"
        />
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-purple-900 mb-4">About This Lesson</h2>
          
          <div className="space-y-4">
            <p>
              In this lesson, you'll learn about AI Friends - digital companions that can have conversations with you! 
              You'll discover how they work, how to train them, and then create your very own AI Friend.
            </p>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">What You'll Learn:</h3>
              <ul className="space-y-1 ml-5 list-disc">
                <li>What AI Friends are and how they work</li>
                <li>How to train an AI Friend with examples</li>
                <li>How to give your AI Friend a unique personality</li>
                <li>How to have conversations with your AI Friend</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Why This Matters:</h3>
              <p>
                AI Friends are a fun way to learn about artificial intelligence! By creating your own AI Friend,
                you'll better understand how AI systems learn from examples and how they can be helpful in everyday life.
              </p>
            </div>
            
            <p>
              Click on the <strong>Tutorial</strong> tab to begin learning about AI Friends!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
