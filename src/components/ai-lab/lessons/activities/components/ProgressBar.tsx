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
    { phase: 'advanced', label: 'Advanced Training', color: 'bg-orange-500' },
    { phase: 'complete', label: 'Complete', color: 'bg-purple-500' }
  ];
  
  // Find the current phase index
  const currentPhaseIndex = phases.findIndex(p => p.phase === currentPhase);
  
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-800">Progress</h3>
        <Badge variant="outline" className="bg-purple-100 text-purple-800">
          Phase {currentPhaseIndex + 1} of {phases.length}
        </Badge>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div 
          className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" 
          style={{ width: `${Math.max(5, (currentPhaseIndex / (phases.length - 1)) * 100)}%` }}
        />
      </div>
      
      <div className="grid grid-cols-6 gap-1">
        {phases.map((phase, index) => (
          <div key={phase.phase} className="flex flex-col items-center">
            <div 
              className={`w-4 h-4 rounded-full mb-1 ${
                index <= currentPhaseIndex ? phase.color : 'bg-gray-300'
              }`}
            />
            <span className="text-xs text-center text-gray-600 hidden sm:block">{phase.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
