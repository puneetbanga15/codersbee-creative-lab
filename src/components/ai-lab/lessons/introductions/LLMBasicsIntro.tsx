
import React, { useState, useEffect } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';

interface LLMBasicsIntroProps {
  onComplete?: () => void;
}

export const LLMBasicsIntro: React.FC<LLMBasicsIntroProps> = ({ onComplete }) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  
  // Emit event when component mounts to indicate we're at the end of the section
  useEffect(() => {
    // Create and dispatch a custom event to notify the parent component
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
  
  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  return (
    <div className="space-y-6">
      <div className="rounded-lg overflow-hidden bg-gradient-to-r from-purple-50 to-blue-50 p-6 border border-purple-100">
        <h1 className="text-2xl font-bold text-purple-900 mb-4">Understanding Large Language Models (LLMs)</h1>
        <p className="text-purple-800 mb-6">
          After creating your first AI friend, let's learn how modern AI language models really work
          and how you can communicate with them effectively!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2 text-purple-700">What You'll Learn</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="bg-purple-100 text-purple-600 p-1 rounded">✓</span>
                <span>How modern LLMs are actually trained</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-purple-100 text-purple-600 p-1 rounded">✓</span>
                <span>The basics of prompt engineering</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-purple-100 text-purple-600 p-1 rounded">✓</span>
                <span>How to create effective prompts for AI tools</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-purple-100 text-purple-600 p-1 rounded">✓</span>
                <span>How to use popular AI tools safely</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2 text-purple-700">Why This Matters</h3>
            <p className="text-gray-700">
              Large Language Models like ChatGPT, Claude, and others are becoming important tools in our daily lives. 
              Understanding how they work and how to use them effectively will help you:
            </p>
            <ul className="mt-2 space-y-1">
              <li>• Get better answers from AI tools</li>
              <li>• Use AI safely and responsibly</li>
              <li>• Know when AI can help (and when it can't)</li>
              <li>• Create amazing things with AI assistance</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <Collapsible open={openItems['item1']} onOpenChange={() => toggleItem('item1')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            <span className="flex items-center text-lg font-medium">
              <Plus className="h-5 w-5 mr-2" /> What are Large Language Models (LLMs)?
            </span>
            {openItems['item1'] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 bg-white rounded-b-lg border-t border-gray-100 mt-1">
            <p className="mb-3">
              Large Language Models (LLMs) are advanced AI systems that can understand and generate 
              human language. Unlike the simple AI friend you created in the previous lesson that had 
              pre-programmed responses, modern LLMs like ChatGPT and Claude are trained on massive 
              amounts of text from the internet, books, articles, and other sources.
            </p>
            <p>
              This training allows them to recognize patterns in language and generate text that 
              sounds like it was written by a human. They can answer questions, write stories, 
              explain complex topics, and even create code - all based on the patterns they learned 
              during training.
            </p>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible open={openItems['item2']} onOpenChange={() => toggleItem('item2')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            <span className="flex items-center text-lg font-medium">
              <Plus className="h-5 w-5 mr-2" /> How are LLMs Different from Your AI Friend?
            </span>
            {openItems['item2'] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 bg-white rounded-b-lg border-t border-gray-100 mt-1">
            <div className="space-y-3">
              <p>
                In Lesson 1, you created an AI friend by training it with specific responses to 
                specific questions. Your AI friend only knew what you taught it - it had a fixed set of 
                responses that you programmed.
              </p>
              <p>
                LLMs, on the other hand, are trained on billions of examples of text. This gives them 
                the ability to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Respond to questions they've never seen before</li>
                <li>Understand complex instructions</li>
                <li>Generate creative and varied responses</li>
                <li>Adapt to different types of requests</li>
                <li>Remember context throughout a conversation</li>
              </ul>
              <p>
                This difference makes LLMs much more flexible, but it also means they need to be guided 
                carefully to get the best results - which is where prompt engineering comes in!
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible open={openItems['item3']} onOpenChange={() => toggleItem('item3')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            <span className="flex items-center text-lg font-medium">
              <Plus className="h-5 w-5 mr-2" /> What is Prompt Engineering?
            </span>
            {openItems['item3'] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 bg-white rounded-b-lg border-t border-gray-100 mt-1">
            <div className="space-y-3">
              <p>
                Prompt engineering is the art and science of creating effective instructions or questions 
                (prompts) for AI systems like large language models.
              </p>
              <p>
                A good prompt is like giving clear directions to a helper. The clearer and more specific 
                your instructions, the better the results you'll get from the AI. 
              </p>
              <p>
                In this lesson, you'll learn how to create effective prompts that help LLMs understand 
                exactly what you want, which will help you get better, more accurate, and more creative 
                responses!
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible open={openItems['item4']} onOpenChange={() => toggleItem('item4')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            <span className="flex items-center text-lg font-medium">
              <Plus className="h-5 w-5 mr-2" /> Popular AI Tools for Kids
            </span>
            {openItems['item4'] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 bg-white rounded-b-lg border-t border-gray-100 mt-1">
            <div className="space-y-3">
              <p>
                There are several kid-friendly AI tools that use Large Language Models:
              </p>
              <ul className="space-y-4 mt-4">
                <li className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-blue-700">ChatGPT</h4>
                  <p className="text-sm">A popular AI assistant that can answer questions, help with homework, 
                  tell stories, and explain complex topics in simple terms.</p>
                </li>
                <li className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-purple-700">Claude</h4>
                  <p className="text-sm">Another AI assistant that's particularly good at explaining things clearly 
                  and can be more careful about providing accurate information.</p>
                </li>
                <li className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-green-700">Perplexity</h4>
                  <p className="text-sm">An AI that helps with research and can search the internet to find the 
                  latest information on topics you're interested in.</p>
                </li>
              </ul>
              <p className="mt-4 text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
                <strong>Safety Tip:</strong> Remember to always use these tools with parent or 
                teacher supervision, and never share personal information with AI assistants.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};
