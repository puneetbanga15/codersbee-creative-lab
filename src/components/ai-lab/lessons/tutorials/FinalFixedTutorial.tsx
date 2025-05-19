
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FixedBuzzyAnimation } from '@/components/ai-lab/ui/FixedBuzzyAnimation';
import { BuzzySpeechBubble } from '@/components/ai-lab/ui/BuzzySpeechBubble';

// Custom AIBrainCanvas component with no external image references
const AIBrainCanvas = () => {
  return (
    <div className="w-40 h-40 bg-purple-100 rounded-lg mx-auto flex items-center justify-center">
      <div className="text-purple-500 text-center">
        <div className="w-16 h-16 rounded-full bg-purple-200 mx-auto flex items-center justify-center mb-2">
          <span className="text-2xl">🧠</span>
        </div>
        <p className="text-sm font-medium">AI Brain</p>
      </div>
    </div>
  );
};

interface FinalFixedTutorialProps {
  onSlideChange?: (currentSlide: number, totalSlides: number) => void;
}

export const FinalFixedTutorial = ({ onSlideChange }: FinalFixedTutorialProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBuzzy, setShowBuzzy] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Log to see when component renders
  useEffect(() => {
    console.log(`FinalFixedTutorial rendering slide: ${currentSlide}`);
  }, [currentSlide]);
  
  // Create a unique ID for this instance to help with debugging
  const instanceId = useRef(`tutorial-${Math.random().toString(36).substring(2, 9)}`);
  
  // Run effect to check for duplicate Buzzy images and handle duplicates
  useEffect(() => {
    console.log(`FinalFixedTutorial instance ${instanceId.current} mounted`);
    
    if (!mainRef.current) return;
    
    // Give a bit of time for everything to render
    const timeoutId = setTimeout(() => {
      console.log(`FinalFixedTutorial ${instanceId.current} - Checking for duplicate Buzzy images...`);
      
      try {
        // Mark this component's container to indicate we want to keep its Buzzy image
        const containerEl = mainRef.current;
        if (containerEl) {
          containerEl.setAttribute('data-buzzy-container', instanceId.current);
        }
        
        // Find and clean up duplicate Buzzy images if needed
        const buzzyContainers = document.querySelectorAll('[data-buzzy-container]');
        console.log(`Found ${buzzyContainers.length} Buzzy containers in the DOM`);
        
        // If we have multiple Buzzy containers, keep only the most recent one
        if (buzzyContainers.length > 1) {
          // The current one should be kept
          const currentContainer = mainRef.current;
          
          buzzyContainers.forEach(container => {
            if (container !== currentContainer && container.getAttribute('data-buzzy-container') !== instanceId.current) {
              // Hide Buzzy in other containers
              const buzzyEl = container.querySelector('[data-buzzy-animation-wrapper]');
              if (buzzyEl) {
                console.log('Hiding duplicate Buzzy element');
                buzzyEl.setAttribute('style', 'display: none;');
              }
            }
          });
        }
      } catch (err) {
        console.error('Error while handling Buzzy duplicates:', err);
      }
    }, 500);
    
    return () => {
      clearTimeout(timeoutId);
      console.log(`FinalFixedTutorial instance ${instanceId.current} unmounted`);
    };
  }, []);
  
  const slides = [
    {
      title: "What is an AI Friend?",
      content: (
        <div className="space-y-4">
          <p className="text-center text-lg">
            An AI Friend is like a digital buddy that can talk with you!
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 flex flex-col items-center">
              <p className="text-center text-sm">
                It learns from examples you give it
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex flex-col items-center">
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
      content: (
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <AIBrainCanvas />
          </div>
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
      content: (
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
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Just like teaching a pet tricks, your AI Friend learns by example!
            </p>
          </div>
        </div>
      ),
      buzzyMessage: "Training an AI Friend is like teaching a pet tricks! You show examples of what to do, and they learn to copy it.",
      buzzyState: "excited"
    },
    {
      title: "Different AI Personalities",
      content: (
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
      content: (
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
    <div ref={mainRef} className="space-y-6" data-fixed-tutorial={instanceId.current}>
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4">
          <h2 className="text-xl font-bold text-purple-900">Meet Your AI Friend</h2>
          <p className="text-sm text-purple-700">Tutorial {currentSlide + 1} of {slides.length}</p>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">{slides[currentSlide].title}</h3>
          
          {/* Buzzy section - carefully structured to avoid duplicates */}
          {showBuzzy && (
            <div className="mb-6 flex items-start gap-4" data-buzzy-container={instanceId.current}>
              <div className="flex-shrink-0" data-buzzy-animation-wrapper="true">
                <FixedBuzzyAnimation 
                  state={slides[currentSlide].buzzyState as any} 
                  size="md"
                  uniqueId={`buzzy-${instanceId.current}`}
                />
              </div>
              <BuzzySpeechBubble 
                message={slides[currentSlide].buzzyMessage}
                state={slides[currentSlide].buzzyState as any}
                onClose={() => setShowBuzzy(false)}
              />
            </div>
          )}
          
          {/* The actual slide content goes here */}
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
