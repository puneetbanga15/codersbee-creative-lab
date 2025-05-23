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
  
  // Handle tab change to ensure proper state updates
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setShowBuzzy(true);
    // Dispatch section end event on every tab change
    const event = new CustomEvent('sectionEndReached', { 
      detail: { isAtEnd: true, autoAdvance: false }
    });
    window.dispatchEvent(event);
  };

  // Always dispatch sectionEndReached on mount and on every inner tab change
  useEffect(() => {
    const event = new CustomEvent('sectionEndReached', { 
      detail: { isAtEnd: true, autoAdvance: false }
    });
    window.dispatchEvent(event);
    return () => {
      const resetEvent = new CustomEvent('sectionEndReached', { 
        detail: { isAtEnd: false, autoAdvance: false }
      });
      window.dispatchEvent(resetEvent);
    };
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
  
  // HandleTabChange is now defined above with additional functionality
  
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
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-100">
            <p className="text-center text-lg mb-4 font-medium text-purple-800">
              LLMs are like super-smart reading and writing assistants that learn from billions of books, articles, and websites!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <h3 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                  <Brain className="h-5 w-5" /> How They Learn
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>Read more text than a human could in thousands of lifetimes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>Find patterns in how words and sentences fit together</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>Create a special 'word math' to predict what comes next</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
                <h3 className="font-semibold text-purple-700 mb-3 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" /> What They Can Do
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    <span>Answer questions in complete sentences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    <span>Write stories, poems, or code</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    <span>Translate between languages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    <span>Explain complex topics simply</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Transformer Brain",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-center mb-4 text-blue-800">
              The Transformer: The Special Brain Inside LLMs
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-blue-700 mb-2 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" /> How It Works
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>Breaks sentences into tiny pieces called <span className="font-medium">tokens</span> (like words or parts of words)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>Looks at all words at once (not just one after another)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>Uses <span className="font-medium">attention</span> to see which words are most important</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="text-xs text-center mb-2 text-gray-500">
                  Like a chef paying attention to key ingredients!
                </div>
                <div className="flex justify-center">
                  <div className="relative w-48 h-32 bg-blue-50 rounded-lg border-2 border-dashed border-blue-200 flex items-center justify-center">
                    <div className="text-center px-2">
                      <div className="text-blue-500 text-4xl mb-1">🤖</div>
                      <div className="text-xs text-gray-600">Transformer Architecture</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Training & Learning Process",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-100">
            <h3 className="text-lg font-semibold text-center mb-6 text-indigo-800">
              How LLMs Learn: The Training Process
            </h3>
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg border border-indigo-100">
                <h4 className="font-medium text-indigo-700 mb-3">Step 1: Reading Everything</h4>
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <p className="text-sm text-gray-700">
                      The model reads billions of sentences from books, websites, and articles. It's like reading the biggest library in the world!
                    </p>
                    <div className="mt-2 text-xs text-indigo-600 bg-indigo-50 p-2 rounded">
                      <span className="font-medium">Fun Fact:</span> Some models read more text than all the books in the Library of Congress!
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-indigo-100">
                <h4 className="font-medium text-indigo-700 mb-3">Step 2: Playing Fill-in-the-Blank</h4>
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <p className="text-sm text-gray-700">
                      The model practices by trying to guess missing words in sentences. It's like a super-charged version of the game Mad Libs!
                    </p>
                    <div className="mt-2 text-xs text-indigo-600 bg-indigo-50 p-2 rounded">
                      <span className="font-medium">Example:</span> "The cat sat on the [blank]" → The model learns that "mat" is more likely than "mountain" here.
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-indigo-100">
                <h4 className="font-medium text-indigo-700 mb-3">Step 3: Getting Feedback</h4>
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <p className="text-sm text-gray-700">
                      The model adjusts its 'thinking' based on how close its guesses were to the actual words. Good guesses get reinforced, while bad ones get corrected.
                    </p>
                    <div className="mt-2 text-xs text-indigo-600 bg-indigo-50 p-2 rounded">
                      <span className="font-medium">Like learning to ride a bike:</span> You learn from every wobble and fall!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Limitations & Fun Facts",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-100">
            <h3 className="text-lg font-semibold text-center mb-6 text-purple-800">
              Cool Facts & Things to Know
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-purple-100">
                <h4 className="font-medium text-purple-700 mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5" /> Important Limitations
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="text-pink-500 mt-1">⚠️</div>
                    <div>
                      <span className="font-medium">Not Always Right:</span> Can make up information that sounds real but isn't
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="text-pink-500 mt-1">⚠️</div>
                    <div>
                      <span className="font-medium">No Real Understanding:</span> Doesn't truly understand like humans do, just predicts text
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="text-pink-500 mt-1">⚠️</div>
                    <div>
                      <span className="font-medium">Can Be Biased:</span> May reflect biases in its training data
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-pink-100">
                <h4 className="font-medium text-pink-700 mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" /> Fun Facts
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="text-purple-500">•</div>
                    <div>
                      <span className="font-medium">Word Math:</span> Words are turned into numbers (vectors) that the model can work with
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="text-purple-500">•</div>
                    <div>
                      <span className="font-medium">Context Windows:</span> Most models can only 'see' a few thousand words at once
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="text-purple-500">•</div>
                    <div>
                      <span className="font-medium">Parameters:</span> Some models have over 1 trillion parameters (that's a 1 with 12 zeros!)
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-700 mb-2">Try This!</h4>
              <p className="text-sm text-gray-700 mb-3">
                Ask an AI to tell you a story about a robot learning to cook. Then ask it to continue the story. Notice how it remembers what came before?
              </p>
              <div className="text-xs text-blue-600 bg-blue-100 p-2 rounded">
                <span className="font-medium">Tip:</span> The more specific your prompt, the better the AI can help you!
              </div>
            </div>
          </div>
        </div>
      )
    },
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
