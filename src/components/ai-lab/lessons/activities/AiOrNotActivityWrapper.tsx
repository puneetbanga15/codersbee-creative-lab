import React from 'react';
import { ActivityWrapper } from '@/components/ai-lab/lessons/activities/ActivityWrapper';
import { AiOrNotGame } from '@/components/ai-lab/lessons/activities/components/ai-or-not/AiOrNotGame';

export const AiOrNotActivityWrapper: React.FC = () => {
  const handleComplete = () => {
    // Handle activity completion (e.g., mark lesson as complete)
    console.log('AI or Not activity completed');
  };

  return (
    <ActivityWrapper
      title="AI or Not?"
      description="Can you spot what's powered by AI and what's not? Test your knowledge!"
      onComplete={handleComplete}
    >
      <div className="max-w-4xl mx-auto py-8">
        <AiOrNotGame onComplete={handleComplete} />
      </div>
    </ActivityWrapper>
  );
};

export default AiOrNotActivityWrapper;
