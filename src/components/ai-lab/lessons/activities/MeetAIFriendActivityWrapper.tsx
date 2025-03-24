
import React from 'react';
import { Card } from "@/components/ui/card";
import { useAIFriendActivity } from './useAIFriendActivity';
import { CharacterSelection } from './components/CharacterSelection';
import { TrainingPhase } from './components/TrainingPhase';
import { FeedbackPhase } from './components/FeedbackPhase';
import { PracticePhase } from './components/PracticePhase';
import { SummaryPhase } from './components/SummaryPhase';
import { QuizPhase } from './components/QuizPhase';
import { HeroSection } from './components/HeroSection';
import { ProgressBar } from './components/ProgressBar';

export const MeetAIFriendActivityWrapper: React.FC = () => {
  const {
    characters,
    selectedCharacter,
    messages,
    progress,
    learningOutcomes,
    handleCharacterSelect,
    handleMessage,
    handleTrainingResponse,
    moveToNextPhase,
    setLearningOutcomes
  } = useAIFriendActivity();

  const renderCurrentPhase = () => {
    switch (progress.currentPhase) {
      case 'selection':
        return (
          <CharacterSelection
            characters={characters}
            onSelect={handleCharacterSelect}
          />
        );
      case 'pre-training':
      case 'basic':
      case 'advanced':
        return (
          <TrainingPhase
            character={selectedCharacter!}
            messages={messages}
            progress={progress}
            onMessage={handleMessage}
            onTrainingResponse={handleTrainingResponse}
            onComplete={moveToNextPhase}
          />
        );
      case 'feedback':
        return (
          <FeedbackPhase
            character={selectedCharacter!}
            onComplete={moveToNextPhase}
          />
        );
      case 'practice':
        return (
          <PracticePhase
            character={selectedCharacter!}
            messages={messages}
            onMessage={handleMessage}
            onComplete={moveToNextPhase}
          />
        );
      case 'summary':
        return (
          <SummaryPhase
            learningOutcomes={learningOutcomes}
            onComplete={moveToNextPhase}
          />
        );
      case 'quiz':
        return (
          <QuizPhase
            character={selectedCharacter!}
            onComplete={moveToNextPhase}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <HeroSection />
      
      <ProgressBar 
        currentPhase={progress.currentPhase}
        basicComplete={progress.basicComplete}
        advancedComplete={progress.advancedComplete}
      />
      
      <Card className="p-6">
        {renderCurrentPhase()}
      </Card>
    </div>
  );
};
