
import { useState, useCallback } from 'react';
import { Character, Message, TrainingProgress, LearningOutcome } from './types';
import { characters } from './charactersData';
import { v4 as uuidv4 } from 'uuid';

const initialLearningOutcomes: LearningOutcome[] = [
  {
    id: 'lo1',
    title: 'AI Training Basics',
    description: 'Understanding how AI characters learn from examples',
    achieved: false
  },
  {
    id: 'lo2',
    title: 'Feedback Loop',
    description: 'Learning the importance of feedback in AI training',
    achieved: false
  },
  {
    id: 'lo3',
    title: 'Progressive Learning',
    description: 'Seeing how AI improves through multiple training phases',
    achieved: false
  }
];

export const useAIFriendActivity = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [progress, setProgress] = useState<TrainingProgress>({
    basicComplete: false,
    advancedComplete: false,
    currentPhase: 'selection',
    responses: {}
  });
  const [learningOutcomes, setLearningOutcomes] = useState(initialLearningOutcomes);

  const handleCharacterSelect = useCallback((character: Character) => {
    setSelectedCharacter(character);
    setProgress(prev => ({ ...prev, currentPhase: 'pre-training' }));
    setMessages([{
      id: uuidv4(),
      sender: 'ai',
      text: "Hi! I'm excited to learn from you, but right now I can only give very basic responses. Would you like to help train me?",
      timestamp: new Date()
    }]);
  }, []);

  const handleMessage = useCallback((text: string) => {
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      sender: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    if (!selectedCharacter) return;

    // Generate AI response based on training phase
    let response: string;
    if (progress.currentPhase === 'pre-training') {
      // Limited responses before training
      response = selectedCharacter.defaultResponses[text.toLowerCase()] || 
                selectedCharacter.defaultResponses['default'];
    } else {
      // More sophisticated responses after training
      response = progress.responses[text] || 
                selectedCharacter.defaultResponses[text.toLowerCase()] ||
                "I've learned a lot, but I'm still thinking about how to answer that.";
    }

    const aiMessage: Message = {
      id: uuidv4(),
      sender: 'ai',
      text: response,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, aiMessage]);
  }, [selectedCharacter, progress]);

  const handleTrainingResponse = useCallback((questionId: string, response: string) => {
    setProgress(prev => ({
      ...prev,
      responses: { ...prev.responses, [questionId]: response }
    }));
  }, []);

  const moveToNextPhase = useCallback(() => {
    setProgress(prev => {
      const phases: TrainingProgress['currentPhase'][] = [
        'selection', 'pre-training', 'basic', 'feedback', 
        'advanced', 'practice', 'summary', 'quiz'
      ];
      const currentIndex = phases.indexOf(prev.currentPhase);
      return {
        ...prev,
        currentPhase: phases[currentIndex + 1] as TrainingProgress['currentPhase']
      };
    });
  }, []);

  return {
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
  };
};
