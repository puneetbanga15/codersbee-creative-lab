import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BuzzyAnimation } from '@/components/ai-lab/ui/BuzzyAnimation';
import { BuzzySpeechBubble } from '@/components/ai-lab/ui/BuzzySpeechBubble';

// This is a minimal version with absolutely no duplicate Buzzy images
export const MinimalMeetAIFriendTutorial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBuzzy, setShowBuzzy] = useState(true);
  
  // Very simple slides with minimal content and no images
  const slides = [
    {
      title: "What is an AI Friend?",
      content: "An AI Friend is like a digital buddy that can talk with you. It learns from examples you give it and responds like it's having a conversation.",
      buzzyMessage: "Hi there! I'm Buzzy, and I'm excited to teach you about AI Friends!",
      buzzyState: "teaching"
    },
    {
      title: "How AI Friends Work",
      content: "AI Friends recognize patterns in your messages. They pick the best response from what they've learned. They don't really understand like humans, but they seem real!",
      buzzyMessage: "When you talk to me, I process your words and create a response. It's like a conversation!",
      buzzyState: "thinking"
    },
    {
      title: "Training Your AI Friend",
      content: "Training an AI Friend is like teaching a pet tricks! You show examples of what to do, and they learn to copy it.",
      buzzyMessage: "Training an AI Friend is all about showing good examples!",
      buzzyState: "excited"
    },
    {
      title: "Different AI Personalities",
      content: "AI Friends can have different personalities! They can be magical, brave, and loyal, or smart, curious, and thoughtful.",
      buzzyMessage: "AI Friends can have different personalities! Which one do you like?",
      buzzyState: "encouraging"
    },
    {
      title: "Let's Get Started!",
      content: "Ready to create your AI Friend? Click 'Start Activity' to begin your AI adventure!",
      buzzyMessage: "Ready to create your AI Friend? Let's go!",
      buzzyState: "default"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setShowBuzzy(true);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setShowBuzzy(true);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4">
          <h2 className="text-xl font-bold text-purple-900">Meet Your AI Friend</h2>
          <p className="text-sm text-purple-700">Tutorial {currentSlide + 1} of {slides.length}</p>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">{slides[currentSlide].title}</h3>
          
          {/* Buzzy section - this is the only place Buzzy appears */}
          {showBuzzy && (
            <div className="mb-6 flex items-start gap-4">
              <BuzzyAnimation 
                state={slides[currentSlide].buzzyState as any} 
                size="md" 
                className="flex-shrink-0" 
              />
              <BuzzySpeechBubble 
                message={slides[currentSlide].buzzyMessage}
                state={slides[currentSlide].buzzyState as any}
                onClose={() => setShowBuzzy(false)}
              />
            </div>
          )}
          
          {/* Very simple content with no images */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-gray-700">{slides[currentSlide].content}</p>
          </div>
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={currentSlide === slides.length - 1}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
