import React from 'react';
import { ActivityWrapper } from './ActivityWrapper';
import { PatternDetector } from './components/pattern-detector/PatternDetector';

interface PatternDetectorActivityWrapperProps {
  onComplete: () => void;
}

const PatternDetectorActivityWrapper: React.FC<PatternDetectorActivityWrapperProps> = ({ onComplete }) => {
  return (
    <ActivityWrapper
      title="Pattern Detective"
      description="Train an AI to recognize patterns by providing examples. See how AI learns from data!"
      onComplete={onComplete}
    >
      <div className="max-w-4xl mx-auto py-8">
        <PatternDetector onComplete={onComplete} />
      </div>
    </ActivityWrapper>
  );
};

export default PatternDetectorActivityWrapper;
