
import React, { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BuzzyAnimation } from '@/components/ai-lab/ui/BuzzyAnimation';
import { BuzzySpeechBubble } from '@/components/ai-lab/ui/BuzzySpeechBubble';

interface LLMBasicsIntroProps {
  onComplete?: () => void;
}

export const LLMBasicsIntro = ({ onComplete }: LLMBasicsIntroProps) => {
  // Call onComplete when component mounts since intro is typically just a single view
  useEffect(() => {
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);
  
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 mb-6">
        <BuzzyAnimation state="teaching" size="md" className="flex-shrink-0" />
        <BuzzySpeechBubble 
          message="Welcome to LLM Basics! In this lesson, you'll learn how to communicate effectively with AI language models like me!"
          state="teaching"
        />
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">About This Lesson</h2>
          
          <div className="space-y-4">
            <p>
              In this lesson, you'll learn about Large Language Models (LLMs) - powerful AI systems that can understand and generate text! 
              You'll discover how they work and how to write effective prompts to get the best results.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">What You'll Learn:</h3>
              <ul className="space-y-1 ml-5 list-disc">
                <li>What language models are and how they work</li>
                <li>How to write clear and effective prompts</li>
                <li>Techniques for getting better responses from AI</li>
                <li>How to use AI tools responsibly</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Why This Matters:</h3>
              <p>
                Understanding how to communicate with AI is becoming an essential skill! By learning how to write good prompts,
                you'll be able to use AI tools more effectively for homework help, creative projects, and more.
              </p>
            </div>
            
            <p>
              Click on the <strong>Tutorial</strong> tab to begin learning about Language Models!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
