import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Brain, MessageSquare, Lightbulb, Shield } from 'lucide-react';
import { FixedBuzzyAnimation } from '@/components/ai-lab/ui/FixedBuzzyAnimation';
import { BuzzySpeechBubble } from '@/components/ai-lab/ui/BuzzySpeechBubble';
import { CollapsibleSection } from '@/components/ai-lab/ui/CollapsibleSection';

interface LLMBasicsTutorialProps {
  onComplete?: () => void;
}

export const LLMBasicsTutorial: React.FC<LLMBasicsTutorialProps> = ({ onComplete }) => {
  const [activeTab, setActiveTab] = useState("how-llms-work");
  const [showBuzzy, setShowBuzzy] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Emit event when on the last tab to indicate section end
  useEffect(() => {
    if (activeTab === "ai-tools") {
      const event = new CustomEvent('sectionEndReached', { 
        detail: { isAtEnd: true }
      });
      window.dispatchEvent(event);
    } else {
      const event = new CustomEvent('sectionEndReached', { 
        detail: { isAtEnd: false }
      });
      window.dispatchEvent(event);
    }
  }, [activeTab]);
  
  // Buzzy messages and states for each tab
  const buzzyContent = {
    "how-llms-work": {
      message: "Let me explain how Large Language Models work! These are special AI systems that understand and generate human language.",
      state: "teaching"
    },
    "prompt-engineering": {
      message: "Prompt engineering is all about how to talk to AI effectively. It's like knowing the right questions to ask!",
      state: "thinking"
    },
    "example-prompts": {
      message: "Here are some examples of good prompts. Notice how they're specific and clear about what they want the AI to do!",
      state: "excited"
    },
    "ai-tools": {
      message: "AI tools are powerful, but we need to use them responsibly. Let me show you how to use AI safely!",
      state: "encouraging"
    }
  };
  
  // Run effect to check for duplicate Buzzy images
  useEffect(() => {
    if (!mainRef.current) return;
    
    // Wait for everything to render
    setTimeout(() => {
      console.log('LLMBasicsTutorial - Checking for duplicate Buzzy images...');
      
      // Find all Buzzy images in the DOM
      const allImages = document.querySelectorAll('img');
      allImages.forEach((img, i) => {
        const imgEl = img as HTMLImageElement;
        const src = imgEl.src || '';
        const alt = imgEl.alt || '';
        
        // Check if this image is a Buzzy image
        if (src.toLowerCase().includes('buzzy') || alt.toLowerCase().includes('buzzy')) {
          // Create a safe substring preview of the source
          const sourcePreview = src && src.length > 0 ? src.substring(0, Math.min(50, src.length)) : '';
          console.log(`Found Buzzy image #${i+1}: ${sourcePreview}...`);
          
          // Add visible highlight for debugging
          imgEl.style.border = '3px solid red';
          
          // Hide duplicate images
          if (imgEl.parentElement && !imgEl.parentElement.hasAttribute('data-buzzy-keep')) {
            console.log('Hiding duplicate Buzzy image');
            imgEl.style.display = 'none';
          }
        }
      });
    }, 1000);
  }, []);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setShowBuzzy(true);
  };
  
  return (
    <div ref={mainRef} className="space-y-6">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="how-llms-work" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>How LLMs Work</span>
          </TabsTrigger>
          <TabsTrigger value="prompt-engineering" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Prompt Engineering</span>
          </TabsTrigger>
          <TabsTrigger value="example-prompts" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span>Example Prompts</span>
          </TabsTrigger>
          <TabsTrigger value="ai-tools" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>AI Tools & Safety</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="how-llms-work" className="mt-4">
          {showBuzzy && (
            <div className="mb-6 flex items-start gap-4" data-buzzy-container="true" data-buzzy-keep="true">
              <div className="flex-shrink-0" data-buzzy-animation-wrapper="true">
                <FixedBuzzyAnimation 
                  state={buzzyContent[activeTab].state as any} 
                  size="md" 
                />
              </div>
              <BuzzySpeechBubble 
                message={buzzyContent[activeTab].message}
                state={buzzyContent[activeTab].state as any}
                onClose={() => setShowBuzzy(false)}
              />
            </div>
          )}
          <div className="mb-6" data-slide-content-container="true">
            <CollapsibleSection 
              title="How Large Language Models Work" 
              defaultOpen={true}
            >
              <HowLLMsWorkSlides />
            </CollapsibleSection>
          </div>
        </TabsContent>
        
        <TabsContent value="prompt-engineering" className="mt-4">
          {showBuzzy && (
            <div className="mb-6 flex items-start gap-4" data-buzzy-container="true" data-buzzy-keep="true">
              <div className="flex-shrink-0" data-buzzy-animation-wrapper="true">
                <FixedBuzzyAnimation 
                  state={buzzyContent[activeTab].state as any} 
                  size="md" 
                />
              </div>
              <BuzzySpeechBubble 
                message={buzzyContent[activeTab].message}
                state={buzzyContent[activeTab].state as any}
                onClose={() => setShowBuzzy(false)}
              />
            </div>
          )}
          <div className="mb-6" data-slide-content-container="true">
            <CollapsibleSection 
              title="Prompt Engineering" 
              defaultOpen={true}
            >
              <PromptEngineeringSlides />
            </CollapsibleSection>
          </div>
        </TabsContent>
        
        <TabsContent value="example-prompts" className="mt-4">
          {showBuzzy && (
            <div className="mb-6 flex items-start gap-4" data-buzzy-container="true" data-buzzy-keep="true">
              <div className="flex-shrink-0" data-buzzy-animation-wrapper="true">
                <FixedBuzzyAnimation 
                  state={buzzyContent[activeTab].state as any} 
                  size="md" 
                />
              </div>
              <BuzzySpeechBubble 
                message={buzzyContent[activeTab].message}
                state={buzzyContent[activeTab].state as any}
                onClose={() => setShowBuzzy(false)}
              />
            </div>
          )}
          <div className="mb-6" data-slide-content-container="true">
            <CollapsibleSection 
              title="Example Prompts" 
              defaultOpen={true}
            >
              <ExamplePromptsSlides />
            </CollapsibleSection>
          </div>
        </TabsContent>
        
        <TabsContent value="ai-tools" className="mt-4">
          {showBuzzy && (
            <div className="mb-6 flex items-start gap-4" data-buzzy-container="true" data-buzzy-keep="true">
              <div className="flex-shrink-0" data-buzzy-animation-wrapper="true">
                <FixedBuzzyAnimation 
                  state={buzzyContent[activeTab].state as any} 
                  size="md" 
                />
              </div>
              <BuzzySpeechBubble 
                message={buzzyContent[activeTab].message}
                state={buzzyContent[activeTab].state as any}
                onClose={() => setShowBuzzy(false)}
              />
            </div>
          )}
          <div className="mb-6" data-slide-content-container="true">
            <CollapsibleSection 
              title="AI Tools & Safety" 
              defaultOpen={true}
            >
              <AIToolsSlides />
            </CollapsibleSection>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const HowLLMsWorkSlides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "What are Large Language Models?",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
            <p className="text-center">
              Large Language Models (LLMs) are AI systems trained on massive amounts of text data.
            </p>
            <div className="flex justify-center mt-4">
              <div className="bg-white p-3 rounded-lg shadow-sm max-w-md">
                <p className="text-sm text-gray-700">
                  They learn patterns in language by analyzing billions of examples from books, articles, websites, and other text sources.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 text-center mb-2">Key Features</h3>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Pattern recognition</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Text generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Understanding context</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
              <h3 className="font-medium text-purple-800 text-center mb-2">Examples</h3>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>ChatGPT</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>Claude</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>Gemini</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    // Add more slides as needed
  ];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">{slides[currentSlide].title}</h3>
          {slides[currentSlide].content}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
              disabled={currentSlide === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            
            <Button
              onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
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

const PromptEngineeringSlides = () => {
  // Similar structure to HowLLMsWorkSlides
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">The Art of Prompt Engineering</h3>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
              <p className="text-center">
                Prompt engineering is the skill of crafting effective instructions for AI models.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mt-2">
              <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                <h3 className="font-medium text-blue-800 mb-2">Key Principles</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-blue-800 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Be Specific</p>
                      <p className="text-sm text-gray-600">Clear instructions lead to better results</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-2">
                    <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-blue-800 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Provide Context</p>
                      <p className="text-sm text-gray-600">Help the AI understand the background</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-2">
                    <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-blue-800 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Use Examples</p>
                      <p className="text-sm text-gray-600">Show the AI what you want</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ExamplePromptsSlides = () => {
  // Similar structure to HowLLMsWorkSlides
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Example Prompts</h3>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg">
              <p className="text-center">
                Here are some examples of effective prompts for different tasks.
              </p>
            </div>
            
            <div className="space-y-4 mt-2">
              <div className="bg-white p-4 rounded-lg border border-amber-100 shadow-sm">
                <h3 className="font-medium text-amber-800 mb-2">Creative Writing</h3>
                <div className="bg-amber-50 p-3 rounded-lg text-sm">
                  <p className="font-mono">Write a short story about a robot who discovers emotions. Include themes of friendship and self-discovery. The story should be appropriate for middle school students and end on a hopeful note.</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                <h3 className="font-medium text-green-800 mb-2">Educational Content</h3>
                <div className="bg-green-50 p-3 rounded-lg text-sm">
                  <p className="font-mono">Explain how photosynthesis works to a 10-year-old. Use simple analogies and avoid technical terms where possible. Include 3-4 key points that are important to understand.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AIToolsSlides = () => {
  // Similar structure to HowLLMsWorkSlides
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">AI Tools & Safety</h3>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
              <p className="text-center">
                Using AI tools responsibly is important for everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mt-2">
              <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                <h3 className="font-medium text-purple-800 mb-2">Safety Guidelines</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Shield className="h-3 w-3 text-purple-800" />
                    </div>
                    <div>
                      <p className="font-medium">Verify Information</p>
                      <p className="text-sm text-gray-600">AI can make mistakes, always double-check important facts</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Shield className="h-3 w-3 text-purple-800" />
                    </div>
                    <div>
                      <p className="font-medium">Protect Privacy</p>
                      <p className="text-sm text-gray-600">Don't share personal information with AI systems</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Shield className="h-3 w-3 text-purple-800" />
                    </div>
                    <div>
                      <p className="font-medium">Use Responsibly</p>
                      <p className="text-sm text-gray-600">AI should help you learn, not do all the work for you</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
