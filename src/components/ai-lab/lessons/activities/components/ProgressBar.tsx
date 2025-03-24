
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { TrainingProgress } from '../types';

interface ProgressBarProps {
  currentPhase: TrainingProgress['currentPhase'];
  basicComplete: boolean;
  advancedComplete: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentPhase,
  basicComplete,
  advancedComplete
}) => {
  const phases: { phase: TrainingProgress['currentPhase']; label: string; color: string }[] = [
    { phase: 'selection', label: 'Character Selection', color: 'bg-blue-500' },
    { phase: 'pre-training', label: 'Pre-Training', color: 'bg-cyan-500' },
    { phase: 'basic', label: 'Basic Training', color: 'bg-green-500' },
    { phase: 'feedback', label: 'Feedback', color: 'bg-yellow-500' },
    { phase: 'advanced', label: 'Advanced Training', color: 'bg-amber-500' },
    { phase: 'practice', label: 'Practice', color: 'bg-orange-500' },
    { phase: 'summary', label: 'Summary', color: 'bg-red-500' },
    { phase: 'quiz', label: 'Quiz', color: 'bg-purple-500' }
  ];
  
  const currentIndex = phases.findIndex(p => p.phase === currentPhase);
  
  return (
    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
      {phases.map((phase, index) => (
        <React.Fragment key={phase.phase}>
          <Badge 
            variant={currentIndex >= index ? "default" : "outline"} 
            className={currentIndex >= index ? phase.color : ""}
          >
            {phase.label}
          </Badge>
          
          {index < phases.length - 1 && (
            <div className="h-px w-8 bg-gray-300 flex-shrink-0"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
