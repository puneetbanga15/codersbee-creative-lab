
import React, { useState } from 'react';
import { Bot, ChevronDown, ChevronUp, Lightbulb, Plus } from 'lucide-react';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

export const HeroSection: React.FC = () => {
  const [isTheoryOpen, setIsTheoryOpen] = useState(false);
  
  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-100 rounded-lg p-6 mb-6 relative overflow-hidden">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">🤖</span>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-1">Meet Your AI Friends!</h2>
          <p className="text-sm">Create and train your own AI character with unique personalities!</p>
        </div>
      </div>
      
      <Collapsible open={isTheoryOpen} onOpenChange={setIsTheoryOpen} className="mb-4">
        <CollapsibleTrigger className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-lg text-amber-800 hover:bg-amber-200 transition-colors w-full">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span className="font-medium">AI Training Theory</span>
          </div>
          {isTheoryOpen ? <ChevronUp className="h-4 w-4 ml-auto" /> : <Plus className="h-4 w-4 ml-auto" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="bg-amber-50 p-4 rounded-lg mt-2 text-sm text-amber-900 border border-amber-200">
          <p className="mb-2">
            <strong>How AI Training Works:</strong> AI models learn from examples that demonstrate the desired behavior. 
            This is similar to how humans learn - through patterns and repetition.
          </p>
          <p className="mb-2">
            <strong>Feedback Loop:</strong> AI systems improve through continuous feedback. When an AI makes an error, 
            that feedback helps it refine its responses for future interactions.
          </p>
          <p>
            <strong>Progressive Learning:</strong> AI training typically happens in stages, with basic concepts taught 
            first before moving to more complex scenarios - just like how we'll train our AI friend in this lesson!
          </p>
        </CollapsibleContent>
      </Collapsible>
      
      <div className="absolute -right-4 -bottom-4 w-32 h-32 flex items-end justify-end">
        <div className="relative">
          <div className="absolute -top-16 right-8 bg-yellow-300 text-yellow-800 px-3 py-2 rounded-full text-xs font-medium shadow-md transform rotate-12 animate-pulse">
            Let's train an AI friend!
          </div>
          <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-4xl">🤖</span>
          </div>
        </div>
      </div>
    </div>
  );
};
