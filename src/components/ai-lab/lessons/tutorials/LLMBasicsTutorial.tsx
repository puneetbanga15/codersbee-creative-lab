
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BuzzyAnimation } from '@/components/ai-lab/ui/BuzzyAnimation';
import { BuzzySpeechBubble } from '@/components/ai-lab/ui/BuzzySpeechBubble';

interface LLMBasicsTutorialProps {
  onSlideChange?: (currentSlide: number, totalSlides: number) => void;
}

export const LLMBasicsTutorial = ({ onSlideChange }: LLMBasicsTutorialProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBuzzy, setShowBuzzy] = useState(true);
  
  const slides = [
    {
      title: "Understanding Language Models",
      content: (
        <div className="space-y-4">
          <p className="text-center text-lg">
            Language Models are AI systems that can understand and generate text!
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2 text-center">What is a Language Model?</h3>
            <p className="text-sm">
              Language Models are a type of AI that has been trained on lots of text from books, websites, and articles. They can understand questions and generate helpful responses.
            </p>
          </div>
        </div>
      ),
      buzzyMessage: "Hi there! I'm Buzzy, and I'll help you understand how language models work!",
      buzzyState: "teaching"
    },
    {
      title: "How Do Language Models Work?",
      content: (
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-center">
              Language Models predict what words should come next in a sentence.
            </p>
          </div>
          <div className="flex items-center bg-purple-50 p-3 rounded-lg mb-2">
            <div className="bg-purple-200 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
              <span className="font-bold text-purple-800">1</span>
            </div>
            <p className="text-sm">They learn patterns from millions of text examples</p>
          </div>
          <div className="flex items-center bg-purple-50 p-3 rounded-lg mb-2">
            <div className="bg-purple-200 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
              <span className="font-bold text-purple-800">2</span>
            </div>
            <p className="text-sm">When you ask a question, they predict the most likely answer</p>
          </div>
          <div className="flex items-center bg-purple-50 p-3 rounded-lg">
            <div className="bg-purple-200 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
              <span className="font-bold text-purple-800">3</span>
            </div>
            <p className="text-sm">They don't "know" things like humans do, but they can be very helpful!</p>
          </div>
        </div>
      ),
      buzzyMessage: "Language Models work by predicting what words come next, like finishing a sentence you start!",
      buzzyState: "thinking"
    },
    {
      title: "What are Prompts?",
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="font-medium text-green-800 mb-2 text-center">Prompts are Messages to the AI</h3>
            <p className="text-sm">
              A prompt is the text you send to a language model. It tells the AI what you want it to do or answer.
              Good prompts help the AI understand exactly what you're asking for!
            </p>
          </div>
          
          <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="font-medium mb-2">Example Prompt:</h4>
            <div className="bg-gray-100 p-2 rounded text-sm font-mono">
              Write a short poem about a friendly robot.
            </div>
          </div>
        </div>
      ),
      buzzyMessage: "Prompts are instructions you give to AI. The better your prompt, the better the AI's response!",
      buzzyState: "excited"
    },
    {
      title: "Writing Good Prompts",
      content: (
        <div className="space-y-4">
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <h3 className="font-medium text-yellow-800 mb-2 text-center">Tips for Good Prompts</h3>
            
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span><strong>Be specific</strong> - Tell the AI exactly what you want</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span><strong>Give examples</strong> - Show the AI what a good answer looks like</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span><strong>Provide context</strong> - Explain why you need the information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span><strong>Set a format</strong> - Ask for the response in a specific way</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      buzzyMessage: "Good prompts are specific and clear. The more details you provide, the better the AI can help you!",
      buzzyState: "encouraging"
    },
    {
      title: "Let's Practice!",
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <h3 className="text-xl font-bold text-center text-purple-700">
            Ready to try writing some prompts?
          </h3>
          <p className="text-center">
            Click "Start Activity" to practice creating effective prompts!
          </p>
        </div>
      ),
      buzzyMessage: "Let's practice writing prompts! Click 'Start Activity' to begin the hands-on exercises.",
      buzzyState: "default"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      const nextSlide = currentSlide + 1;
      setCurrentSlide(nextSlide);
      setShowBuzzy(true);
      
      // Notify parent about slide change
      if (onSlideChange) {
        onSlideChange(nextSlide, slides.length);
      }
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      const prevSlide = currentSlide - 1;
      setCurrentSlide(prevSlide);
      setShowBuzzy(true);
      
      // Notify parent about slide change
      if (onSlideChange) {
        onSlideChange(prevSlide, slides.length);
      }
    }
  };
  
  // Call onSlideChange on initial render
  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentSlide, slides.length);
    }
  }, []);

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4">
          <h2 className="text-xl font-bold text-blue-900">Language Model Basics</h2>
          <p className="text-sm text-blue-700">Tutorial {currentSlide + 1} of {slides.length}</p>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">{slides[currentSlide].title}</h3>
          
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
          
          {slides[currentSlide].content}
          
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
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
