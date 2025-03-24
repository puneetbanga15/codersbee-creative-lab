
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LearningOutcome } from '../types';
import { Award, Book, Brain, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

interface SummaryPhaseProps {
  learningOutcomes: LearningOutcome[];
  onComplete: () => void;
}

export const SummaryPhase: React.FC<SummaryPhaseProps> = ({
  learningOutcomes,
  onComplete
}) => {
  const [isLLMTheoryOpen, setIsLLMTheoryOpen] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-600" />
            Congratulations on Training Your AI Friend!
          </h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">What You've Learned:</h3>
            <ul className="space-y-4">
              {learningOutcomes.map((outcome) => (
                <li key={outcome.id} className="flex items-start gap-3">
                  <div className="bg-green-100 text-green-800 p-1 rounded-full mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{outcome.title}</h4>
                    <p className="text-gray-600 text-sm">{outcome.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Collapsible open={isLLMTheoryOpen} onOpenChange={setIsLLMTheoryOpen} className="mb-6">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-purple-100 rounded-lg text-purple-800 hover:bg-purple-200 transition-colors">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span className="font-medium">How Real LLMs Are Trained</span>
              </div>
              {isLLMTheoryOpen ? <ChevronUp className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 bg-purple-50 rounded-lg mt-2 text-sm border border-purple-200">
              <p className="mb-2">
                <strong>Scale:</strong> Real AI models like GPT-4 and others are trained on billions or even trillions of 
                words from books, articles, websites, and other text sources.
              </p>
              <p className="mb-2">
                <strong>Compute Power:</strong> Training uses thousands of specialized computer chips (GPUs/TPUs) 
                running for weeks or months, consuming enormous amounts of electricity.
              </p>
              <p className="mb-2">
                <strong>Self-Supervised Learning:</strong> Unlike our simple example, real LLMs learn by predicting 
                the next word in a sequence, not from explicit right/wrong answers.
              </p>
              <p>
                <strong>Reinforcement Learning from Human Feedback (RLHF):</strong> After initial training, 
                human feedback helps refine the model's outputs to be more helpful, harmless, and honest.
              </p>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
            <div className="flex items-start gap-3">
              <Book className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium text-blue-800 mb-1">Ready for the next lesson?</h3>
                <p className="text-blue-700 text-sm mb-3">
                  Continue your AI learning journey with our next lesson about Large Language Models (LLMs) 
                  and how they're actually trained in the real world!
                </p>
                <Link to="/ai-lab" className="inline-block">
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    Explore Next Lesson: Understanding LLMs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={onComplete}>
              Take Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
