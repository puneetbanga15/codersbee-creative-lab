
import { useState, useCallback } from 'react';
import { Character, Message, TrainingProgress, LearningOutcome } from './types';
import { characters } from './charactersData';
import { v4 as uuidv4 } from 'uuid';

const initialLearningOutcomes: LearningOutcome[] = [
  {
    id: 'lo1',
    title: 'AI Training Basics',
    description: 'Understanding how AI characters learn from examples and patterns',
    achieved: false
  },
  {
    id: 'lo2',
    title: 'Feedback Loop',
    description: 'Learning the importance of feedback in AI training for continuous improvement',
    achieved: false
  },
  {
    id: 'lo3',
    title: 'Progressive Learning',
    description: 'Seeing how AI improves through multiple training phases from basic to advanced',
    achieved: false
  },
  {
    id: 'lo4',
    title: 'Data Quality and Variety',
    description: 'Recognizing that the quality and variety of training data affects AI performance',
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
  const [learningOutcomes, setLearningOutcomes] = useState<LearningOutcome[]>(initialLearningOutcomes);

  const handleCharacterSelect = useCallback((character: Character) => {
    setSelectedCharacter(character);
    setProgress(prev => ({ ...prev, currentPhase: 'pre-training' }));
    setMessages([{
      id: uuidv4(),
      sender: 'ai',
      text: `Hi! I'm excited to learn from you. I'm supposed to be ${character.name}, but right now I can only give very basic responses. Would you like to help train me?`,
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
    
    // Check if we have a trained response for this exact question
    if (progress.responses[text]) {
      response = progress.responses[text];
    } 
    // Check for character's default responses
    else if (selectedCharacter.defaultResponses[text.toLowerCase()]) {
      response = selectedCharacter.defaultResponses[text.toLowerCase()];
    }
    // For pre-training phase, give very limited responses
    else if (progress.currentPhase === 'pre-training') {
      response = selectedCharacter.defaultResponses['default'] || 
                `I'm still learning to be ${selectedCharacter.name}. I don't know how to answer that yet.`;
    } 
    // For more advanced phases, give slightly better responses
    else if (progress.basicComplete && !progress.advancedComplete) {
      response = `I've learned some basics about being ${selectedCharacter.name}, but I'm still thinking about how to answer that specific question.`;
    }
    // After advanced training, give even better generic responses
    else if (progress.advancedComplete) {
      response = `As ${selectedCharacter.name}, I would say that's an interesting question. I've been trained on several topics, but I don't have a specific answer for that particular question yet.`;
    }
    // Fallback
    else {
      response = selectedCharacter.defaultResponses['default'] || 
                `I'm still learning to be ${selectedCharacter.name}. I don't know how to answer that yet.`;
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
    // Store the response by question ID
    setProgress(prev => ({
      ...prev,
      responses: { ...prev.responses, [questionId]: response }
    }));
    
    // Also store the response by question text so we can look it up in chat
    const basicQuestion = selectedCharacter?.trainingQuestions.basic.find(q => q.id === questionId);
    const advancedQuestion = selectedCharacter?.trainingQuestions.advanced.find(q => q.id === questionId);
    
    const questionText = basicQuestion?.question || advancedQuestion?.question;
    
    if (questionText && response) {
      setProgress(prev => ({
        ...prev,
        responses: { ...prev.responses, [questionText]: response }
      }));
    }
  }, [selectedCharacter]);

  const moveToNextPhase = useCallback(() => {
    setProgress(prev => {
      const phases: TrainingProgress['currentPhase'][] = [
        'selection', 'pre-training', 'basic', 'feedback', 
        'advanced', 'practice', 'summary', 'quiz'
      ];
      const currentIndex = phases.indexOf(prev.currentPhase);
      
      // Special handling when completing training phases
      if (prev.currentPhase === 'basic') {
        return {
          ...prev,
          basicComplete: true,
          currentPhase: phases[currentIndex + 1] as TrainingProgress['currentPhase']
        };
      } else if (prev.currentPhase === 'advanced') {
        return {
          ...prev,
          advancedComplete: true,
          currentPhase: phases[currentIndex + 1] as TrainingProgress['currentPhase']
        };
      }
      
      // Update learning outcomes when reaching summary
      if (phases[currentIndex + 1] === 'summary') {
        setLearningOutcomes(prev => prev.map(outcome => ({ ...outcome, achieved: true })));
      }
      
      return {
        ...prev,
        currentPhase: phases[currentIndex + 1] as TrainingProgress['currentPhase']
      };
    });
    
    // When moving to practice phase, add an introductory message
    if (progress.currentPhase === 'advanced' && selectedCharacter) {
      setMessages([{
        id: uuidv4(),
        sender: 'ai',
        text: `Thanks for all your training! I now understand much better how to respond as ${selectedCharacter.name}. Ask me anything, especially the questions you've trained me on!`,
        timestamp: new Date()
      }]);
    }
  }, [progress.currentPhase, selectedCharacter]);

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
