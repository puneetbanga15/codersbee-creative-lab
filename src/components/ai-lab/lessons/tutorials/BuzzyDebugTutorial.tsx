import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * A special tutorial component with NO Buzzy animations at all to debug the issue
 */
export const BuzzyDebugTutorial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Each time component renders, check for Buzzy images
  useEffect(() => {
    // Wait for DOM to fully render
    setTimeout(() => {
      console.log('======= DEBUG: LOOKING FOR BUZZY IMAGES =======');
      
      // Look for images with 'buzzy' in src or alt
      const buzzyImages = document.querySelectorAll('img[src*="buzzy" i], img[alt*="buzzy" i]');
      console.log(`Found ${buzzyImages.length} Buzzy images on page`);
      
      buzzyImages.forEach((img, i) => {
        const imgEl = img as HTMLImageElement;
        // Safely get a preview of the source
        const sourcePreview = imgEl.src && imgEl.src.length > 0 ? imgEl.src.substring(0, Math.min(50, imgEl.src.length)) : '';
        console.log(`Buzzy #${i+1}: src=${sourcePreview}... alt=${imgEl.alt || ''}`);
        
        // Log parent elements to help trace where it's coming from
        let parent = img.parentElement;
        let parentPath = [];
        while (parent && parentPath.length < 5) {
          // Safely get a preview of the class name
          const classPreview = parent.className && parent.className.length > 0 ? 
            parent.className.substring(0, Math.min(20, parent.className.length)) : '';
          parentPath.push(`${parent.tagName}${parent.id ? '#'+parent.id : ''}.${classPreview}`);
          parent = parent.parentElement;
        }
        console.log(`  Parent path: ${parentPath.join(' > ')}`);
        
        // Add a red border to make it visible
        (img as HTMLElement).style.border = '3px solid red';
      });
      
      console.log('======= DEBUG: CHECKING FOR BUZZY IN ALL ELEMENTS =======');
      
      // Also look for elements with 'buzzy' in their innerHTML
      const allElements = document.querySelectorAll('*');
      const buzzyContainingElements = Array.from(allElements).filter(el => 
        el.innerHTML.toLowerCase().includes('buzzy') && 
        !el.innerHTML.toLowerCase().includes('<img') // Exclude elements we've already found
      );
      
      console.log(`Found ${buzzyContainingElements.length} elements with 'buzzy' in content`);
      buzzyContainingElements.forEach((el, i) => {
        // Safely get previews of className and innerHTML
        const classPreview = el.className && el.className.length > 0 ? 
          el.className.substring(0, Math.min(20, el.className.length)) : '';
        const contentPreview = el.innerHTML && el.innerHTML.length > 0 ? 
          el.innerHTML.substring(0, Math.min(50, el.innerHTML.length)) : '';
        console.log(`Element #${i+1}: ${el.tagName}.${classPreview} - Content: ${contentPreview}...`);
      });
    }, 1000);
  }, [currentSlide]);
  
  // Super simple slides with NO Buzzy references at all
  const slides = [
    {
      title: "What is an AI Friend?",
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-purple-100 rounded-lg">
            <h3 className="text-center font-medium mb-2">AI Friends</h3>
            <p className="text-center">
              AI Friends are digital buddies that can have conversations with you!
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-center text-sm">
                  They learn from examples you give them
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-center text-sm">
                  They respond like they're having a conversation
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "How AI Friends Work",
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="text-center font-medium mb-2">AI Processing</h3>
            <p className="text-center">
              AI Friends process your words and create thoughtful responses
            </p>
            
            <div className="space-y-2 mt-3">
              <div className="bg-white p-2 rounded-lg">
                <p className="text-sm">1. They analyze your messages</p>
              </div>
              <div className="bg-white p-2 rounded-lg">
                <p className="text-sm">2. They pick the best response</p>
              </div>
              <div className="bg-white p-2 rounded-lg">
                <p className="text-sm">3. They seem real, but they're code!</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4">
          <h2 className="text-xl font-bold text-purple-900">Meet Your AI Friend</h2>
          <p className="text-sm text-purple-700">Debug Tutorial {currentSlide + 1} of {slides.length}</p>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">{slides[currentSlide].title}</h3>
          
          {/* Absolutely NO Buzzy here at all */}
          <div className="p-4 border border-purple-200 rounded-lg bg-purple-50 mb-4">
            <p className="text-sm text-purple-800">
              This is a special debug version with no Buzzy animations to help identify where
              the duplicate images are coming from.
            </p>
          </div>
          
          {/* Slide content */}
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
