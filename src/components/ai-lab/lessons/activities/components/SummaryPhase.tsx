
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LearningOutcome } from '../types';
import { CheckCircle, Brain, RefreshCw, MessageSquare } from 'lucide-react';

interface SummaryPhaseProps {
  learningOutcomes: LearningOutcome[];
  onComplete: () => void;
}

export const SummaryPhase: React.FC<SummaryPhaseProps> = ({
  learningOutcomes,
  onComplete
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">What You've Learned About AI Training</h2>
        
        <div className="space-y-4 mb-6">
          {learningOutcomes.map((outcome) => (
            <div 
              key={outcome.id} 
              className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-100"
            >
              <div className="mt-1">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-purple-900">{outcome.title}</h3>
                <p className="text-sm text-purple-700">{outcome.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 mb-6">
          <h3 className="font-medium text-amber-900 mb-2">Key Concepts in AI Training</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="mt-0.5">
                <Brain className="h-4 w-4 text-amber-600" />
              </div>
              <p className="text-sm text-amber-800">
                <span className="font-medium">Training Data:</span> AI models learn from examples, just like how you trained your AI character with specific responses.
              </p>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="mt-0.5">
                <RefreshCw className="h-4 w-4 text-amber-600" />
              </div>
              <p className="text-sm text-amber-800">
                <span className="font-medium">Feedback Loop:</span> Getting feedback and using it to improve is essential in AI development, just like when you moved from basic to advanced training.
              </p>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="mt-0.5">
                <MessageSquare className="h-4 w-4 text-amber-600" />
              </div>
              <p className="text-sm text-amber-800">
                <span className="font-medium">Progressive Learning:</span> AI gets better with more training over time, as you saw how your character improved from untrained to fully trained.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={onComplete}>
            Take the Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
