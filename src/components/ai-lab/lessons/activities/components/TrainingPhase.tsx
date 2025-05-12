
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain } from 'lucide-react';
import { Character, Message, TrainingProgress } from '../types';
import { TrainingCarousel } from './training/TrainingCarousel';
import { PreTrainingChat } from './training/PreTrainingChat';

interface TrainingPhaseProps {
  character: Character;
  messages: Message[];
  progress: TrainingProgress;
  onMessage: (text: string) => void;
  onTrainingResponse: (questionId: string, response: string) => void;
  onComplete: () => void;
}

export const TrainingPhase: React.FC<TrainingPhaseProps> = ({
  character,
  messages,
  progress,
  onMessage,
  onTrainingResponse,
  onComplete
}) => {
  if (progress.currentPhase === 'pre-training') {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Meet Your Untrained AI Friend
            </h2>
            <p className="text-gray-600 mb-6">
              Your AI friend doesn't know much yet! Try asking a few questions to see its limitations.
              Then we'll start training it to respond better.
            </p>
            
            <PreTrainingChat 
              character={character}
              messages={messages}
              onMessage={onMessage}
            />
            
            <div className="mt-6 flex justify-end">
              <Button onClick={onComplete}>
                Start Training
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            {progress.currentPhase === 'basic' ? 'Basic Training' : 'Advanced Training'}
          </h2>
          <p className="text-gray-600 mb-6">
            {progress.currentPhase === 'basic' 
              ? "Let's start with some basic training. Answer these questions as your character would respond."
              : "Great job with the basic training! Now let's make your AI friend even smarter with some advanced training."
            }
          </p>
          
          <TrainingCarousel
            character={character}
            trainingResponses={progress.responses}
            onResponseChange={onTrainingResponse}
            trainingLevel={progress.currentPhase === 'basic' ? 'basic' : 'advanced'}
            onComplete={onComplete}
          />
        </CardContent>
      </Card>
    </div>
  );
};
