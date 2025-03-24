
export interface Character {
  id: string;
  name: string;
  image: string;
  description: string;
  personality: string[];
  defaultResponses: {[key: string]: string};
  trainingQuestions: {
    basic: TrainingQuestion[];
    advanced: TrainingQuestion[];
  };
  suggestedQuestions: string[];
}

export interface TrainingQuestion {
  id: string;
  question: string;
  context?: string;
  expectedConcepts?: string[];
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export interface TrainingProgress {
  basicComplete: boolean;
  advancedComplete: boolean;
  currentPhase: 'selection' | 'pre-training' | 'basic' | 'feedback' | 'advanced' | 'practice' | 'summary' | 'quiz';
  responses: {[key: string]: string};
}

export interface LearningOutcome {
  id: string;
  title: string;
  description: string;
  achieved: boolean;
}
