import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BuzzyAnimation } from '@/components/ai-lab/ui/BuzzyAnimation';
import { BuzzySpeechBubble } from '@/components/ai-lab/ui/BuzzySpeechBubble';

/**
 * This version specifically targets the duplicated Buzzy images in the first slide
 * by using a completely different layout and structure.
 */
export const SingleSlideFixTutorial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBuzzy, setShowBuzzy] = useState(true);
  
  // State to control whether we should show debug info
  const [showDebug, setShowDebug] = useState(false);
  
  // Debug: log all images on the page
  useEffect(() => {
    setTimeout(() => {
      const allImages = document.querySelectorAll('img');
      console.log(`Total images on page: ${allImages.length}`);
      
      // Check for images with src or alt containing "buzzy"
      const buzzyImages = Array.from(document.querySelectorAll('img[src*="buzzy" i], img[alt*="buzzy" i]'));
      console.log(`Found ${buzzyImages.length} Buzzy images`);
      
      buzzyImages.forEach((img, i) => {
        const imgEl = img as HTMLImageElement;
        console.log(`Buzzy image #${i+1}: ${imgEl.src}`);
        console.log(`Parent: ${img.parentElement?.tagName}, ${img.parentElement?.className}`);
      });
    }, 1000);
  }, [currentSlide]);
  
  // Different slides with their content and Buzzy states
  const slides = [
    {
      title: "What is an AI Friend?",
      content: () => (
        <div className="space-y-4">
          {/* ABSOLUTELY NO IMAGES HERE - ONLY TEXT */}
          <p className="text-center text-lg font-medium">
            An AI Friend is like a digital buddy that can talk with you!
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <h4 className="text-amber-800 font-medium text-center text-sm mb-2">
                Learning
              </h4>
              <p className="text-center text-sm">
                It learns from examples you give it
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="text-blue-800 font-medium text-center text-sm mb-2">
                Conversation
              </h4>
              <p className="text-center text-sm">
                It responds like it's having a conversation
              </p>
            </div>
          </div>
        </div>
      ),
      buzzyMessage: "Hi there! I'm Buzzy, and I'm excited to teach you about AI Friends!",
      buzzyState: "teaching"
    },
    {
      title: "How AI Friends Work",
      content: () => (
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-center">
              AI Friends process your words, understand what you're asking, and create responses.
            </p>
          </div>
          
          <div className="flex items-center bg-purple-50 p-3 rounded-lg mb-2">
            <div className="bg-purple-200 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
              <span className="font-bold text-purple-800">1</span>
            </div>
            <p className="text-sm">AI Friends recognize patterns in your messages</p>
          </div>
          
          <div className="flex items-center bg-purple-50 p-3 rounded-lg mb-2">
            <div className="bg-purple-200 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
              <span className="font-bold text-purple-800">2</span>
            </div>
            <p className="text-sm">They pick the best response from what they've learned</p>
          </div>
          
          <div className="flex items-center bg-purple-50 p-3 rounded-lg">
            <div className="bg-purple-200 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
              <span className="font-bold text-purple-800">3</span>
            </div>
            <p className="text-sm">They don't really understand like humans, but they seem real!</p>
          </div>
        </div>
      ),
      buzzyMessage: "When you talk to me, I process your words, understand what you're asking, and create a response!",
      buzzyState: "thinking"
    },
    {
      title: "Training Your AI Friend",
      content: () => (
        <div className="space-y-4 mt-2">
          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg border border-green-100">
            <h3 className="font-semibold text-green-800 mb-3 text-center">How AI Training Works</h3>
            
            <div className="space-y-4">
              <div className="bg-white p-3 rounded-lg border border-green-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full w-7 h-7 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-green-800 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-green-800 font-medium">Give Examples</p>
                    <p className="text-sm text-gray-600">Show your AI Friend how to respond to different questions</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-3 rounded-lg border border-green-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full w-7 h-7 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-green-800 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-green-800 font-medium">Pattern Recognition</p>
                    <p className="text-sm text-gray-600">Your AI Friend learns patterns from your examples</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-3 rounded-lg border border-green-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full w-7 h-7 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-green-800 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-green-800 font-medium">Test It Out</p>
                    <p className="text-sm text-gray-600">Try talking to your AI Friend to see what it learned</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      buzzyMessage: "Training an AI Friend is like teaching a pet tricks! You show examples of what to do, and they learn to copy it.",
      buzzyState: "excited"
    },
    {
      title: "Different AI Personalities",
      content: () => (
        <div className="space-y-4">
          <p className="text-center">
            AI Friends can have different personalities!
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <h3 className="font-medium text-amber-800 mb-2 text-center">Magical Friend</h3>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span>Brave and adventurous</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span>Loves magical stories</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span>Very loyal</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2 text-center">Science Friend</h3>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Smart and curious</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Loves to explain things</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Very thoughtful</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
      buzzyMessage: "AI Friends can have different personalities! They can be magical, brave, and loyal, or smart, curious, and thoughtful.",
      buzzyState: "encouraging"
    },
    {
      title: "Let's Get Started!",
      content: () => (
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <h3 className="text-xl font-bold text-center text-purple-700">
            Ready to create your AI Friend?
          </h3>
          <p className="text-center">
            Click "Start Activity" to begin your AI adventure!
          </p>
        </div>
      ),
      buzzyMessage: "Ready to create your AI Friend? Click 'Start Activity' to begin your AI adventure!",
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
      {/* Debug toggle button (hidden in production) */}
      <div className="hidden">
        <button onClick={() => setShowDebug(!showDebug)}>
          {showDebug ? 'Hide Debug' : 'Show Debug'}
        </button>
        {showDebug && (
          <div className="bg-gray-100 p-2 text-xs">
            <p>CurrentSlide: {currentSlide}</p>
            <p>ShowBuzzy: {showBuzzy.toString()}</p>
          </div>
        )}
      </div>
      
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4">
          <h2 className="text-xl font-bold text-purple-900">Meet Your AI Friend</h2>
          <p className="text-sm text-purple-700">Tutorial {currentSlide + 1} of {slides.length}</p>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">{slides[currentSlide].title}</h3>
          
          {/* Absolutely critical: Buzzy appears ONLY ONCE here */}
          {showBuzzy && (
            <div className="mb-6 flex items-start gap-4">
              <div className="flex-shrink-0">
                <BuzzyAnimation 
                  state={slides[currentSlide].buzzyState as any} 
                  size="md" 
                />
              </div>
              <BuzzySpeechBubble 
                message={slides[currentSlide].buzzyMessage}
                state={slides[currentSlide].buzzyState as any}
                onClose={() => setShowBuzzy(false)}
              />
            </div>
          )}
          
          {/* Content is now a function to delay rendering until needed */}
          {slides[currentSlide].content()}
          
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
