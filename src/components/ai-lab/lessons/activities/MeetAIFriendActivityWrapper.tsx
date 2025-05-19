
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
import { BuzzyAnimation } from '@/components/ai-lab/ui/BuzzyAnimation';
import { motion, AnimatePresence } from 'framer-motion';

export const MeetAIFriendActivityWrapper: React.FC<{
  onComplete?: () => void;
}> = ({ onComplete }) => {
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
  const [sectionCompleted, setSectionCompleted] = useState(false);
  
  // Buzzy animation states for different phases
  const buzzyAnimationStates = {
    selection: 'default',
    'pre-training': 'teaching',
    basic: 'encouraging',
    advanced: 'thinking',
    feedback: 'excited',
    practice: 'default',
    summary: 'teaching',
    quiz: 'encouraging'
  };

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

  // Handle completion of current section
  const handleSectionComplete = () => {
    setSectionCompleted(true);
  };

  // Handle moving to next phase
  const handleNextPhase = () => {
    setSectionCompleted(false);
    moveToNextPhase();
    
    // If we've completed the quiz (final phase), notify parent component
    if (progress.currentPhase === 'quiz' && onComplete) {
      onComplete();
    }
  };

  const renderCurrentPhase = () => {
    switch (progress.currentPhase) {
      case 'selection':
        return (
          <CharacterSelection
            characters={characters}
            onSelect={(character) => {
              handleCharacterSelect(character);
              handleSectionComplete();
            }}
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
            onComplete={handleSectionComplete}
          />
        );
      case 'feedback':
        return (
          <FeedbackPhase
            character={selectedCharacter!}
            onComplete={handleSectionComplete}
          />
        );
      case 'practice':
        return (
          <PracticePhase
            character={selectedCharacter!}
            messages={messages}
            onMessage={handleMessage}
            onComplete={handleSectionComplete}
            progress={progress}
          />
        );
      case 'summary':
        return (
          <SummaryPhase
            learningOutcomes={learningOutcomes}
            onComplete={handleSectionComplete}
          />
        );
      case 'quiz':
        return (
          <QuizPhase
            character={selectedCharacter!}
            onComplete={handleSectionComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <HeroSection />
      
      <div className="flex flex-col items-center justify-center space-y-6 p-6">
        <ProgressBar 
          currentPhase={progress.currentPhase}
          basicComplete={progress.basicComplete}
          advancedComplete={progress.advancedComplete}
        />
        
        <AnimatePresence>
          {showBuzzyTip && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-xl mb-4"
            >
              <div className="flex items-start gap-4">
                <BuzzyAnimation 
                  state={buzzyAnimationStates[progress.currentPhase] as any} 
                  size="md" 
                  className="flex-shrink-0" 
                />
                <BuzzySpeechBubble 
                  message={buzzyMessages[progress.currentPhase]}
                  state={buzzyAnimationStates[progress.currentPhase] as any}
                  onClose={() => setShowBuzzyTip(false)}
                >
                </BuzzySpeechBubble>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Card className="p-6">
          {renderCurrentPhase()}
          
          {sectionCompleted && (
            <div className="flex justify-end mt-6">
              <button 
                onClick={handleNextPhase}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Next Step
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
