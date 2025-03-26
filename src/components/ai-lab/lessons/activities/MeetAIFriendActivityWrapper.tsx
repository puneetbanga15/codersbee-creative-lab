
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { useAIFriendActivity } from './useAIFriendActivity';
import { CharacterSelection } from './components/CharacterSelection';
import { TrainingPhase } from './components/TrainingPhase';
import { FeedbackPhase } from './components/FeedbackPhase';
import { PracticePhase } from './components/PracticePhase';
import { QuizPhase } from './components/QuizPhase';
import { SummaryPhase } from './components/SummaryPhase';
import { HeroSection } from './components/HeroSection';
import { ProgressBar } from './components/ProgressBar';
import { BuzzySpeechBubble } from '@/components/ai-lab/ui/BuzzySpeechBubble';
import { motion, AnimatePresence } from 'framer-motion';

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

  const [showBuzzyTip, setShowBuzzyTip] = useState(true);
  
  // Messages for Buzzy to show based on current phase
  const buzzyMessages = {
    selection: "Welcome to the AI Friend activity! Choose a character you want to train. Each character has their own personality and knowledge.",
    'pre-training': "This is your AI friend before training. Try asking it questions to see how much it knows without any training data!",
    basic: "Basic training helps your AI learn how to respond to simple questions. Be sure to write answers that match the character's personality!",
    advanced: "Great job with basic training! Now we're moving to more complex questions. Think about how your character would respond to these scenarios.",
    feedback: "What other things should your AI learn? This feedback helps customize your AI friend even more.",
    practice: "Time to chat with your trained AI! See how it responds using the patterns it learned from your training examples.",
    summary: "Look at what you've learned about AI training! These concepts apply to real-world AI systems too.",
    quiz: "Let's test what you've learned about AI training concepts. Good luck!"
  };

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
            progress={progress}
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

  // Determine Buzzy's state based on current phase
  const getBuzzyState = () => {
    switch (progress.currentPhase) {
      case 'basic':
      case 'advanced':
        return 'teaching';
      case 'feedback':
        return 'thinking';
      case 'practice':
        return 'excited';
      case 'summary':
      case 'quiz':
        return 'encouraging';
      default:
        return 'default';
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
      
      <AnimatePresence>
        {showBuzzyTip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-4"
          >
            <BuzzySpeechBubble
              message={buzzyMessages[progress.currentPhase]}
              state={getBuzzyState()}
              size="md"
              onClose={() => setShowBuzzyTip(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <Card className="p-6">
        {renderCurrentPhase()}
      </Card>
    </div>
  );
};
