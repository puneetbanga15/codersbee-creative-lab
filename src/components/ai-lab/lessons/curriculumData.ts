
export type LessonType = {
  id: string;
  number: number;
  title: string;
  description: string;
  stage: 'foundation' | 'application' | 'understanding' | 'advanced';
  icon: string;
  concepts: string[];
  duration: number; // in minutes
  completed?: boolean;
  locked?: boolean;
};

export const curriculumData: LessonType[] = [
  // Foundation Stage (1-5)
  {
    id: 'meet-ai-friend',
    number: 1,
    title: 'Meet Your AI Friend',
    description: 'Create a simple chatbot with preset responses and learn how computers "talk" to humans.',
    stage: 'foundation',
    icon: 'messageSquare',
    concepts: ['What is AI', 'Computer Communication', 'Chatbots'],
    duration: 30,
    completed: true
  },
  {
    id: 'pattern-detective',
    number: 2,
    title: 'Pattern Detective',
    description: 'Train an AI to recognize simple patterns like shapes, colors, and numbers.',
    stage: 'foundation',
    icon: 'shapes',
    concepts: ['Pattern Recognition', 'Basic Machine Learning', 'Training Data'],
    duration: 40,
    completed: true
  },
  {
    id: 'decision-trees',
    number: 3,
    title: 'Decision Trees Adventure',
    description: 'Build a "choose your own adventure" game using decision trees and logical reasoning.',
    stage: 'foundation',
    icon: 'sparkles',
    concepts: ['Decision Trees', 'Logical Reasoning', 'If-Then Structures'],
    duration: 45
  },
  {
    id: 'image-recognition',
    number: 4,
    title: 'Image Recognition Magic',
    description: 'Use a pre-trained model to identify objects in images, drawings, or camera feed.',
    stage: 'foundation',
    icon: 'image',
    concepts: ['Computer Vision', 'Image Classification', 'Pre-trained Models'],
    duration: 40,
    locked: true
  },
  {
    id: 'sentiment-sleuth',
    number: 5,
    title: 'Sentiment Sleuth',
    description: 'Analyze text to determine if it\'s positive, negative, or neutral and understand emotions in writing.',
    stage: 'foundation',
    icon: 'messageSquare',
    concepts: ['Natural Language Processing', 'Sentiment Analysis', 'Text Classification'],
    duration: 35,
    locked: true
  },
  
  // Application Stage (6-12)
  {
    id: 'voice-command',
    number: 6,
    title: 'Voice Command Creator',
    description: 'Create simple voice commands for a virtual assistant that responds to spoken instructions.',
    stage: 'application',
    icon: 'microphone',
    concepts: ['Speech Recognition', 'Command Parsing', 'Voice Interfaces'],
    duration: 50,
    locked: true
  },
  {
    id: 'animal-classifier',
    number: 7,
    title: 'Animal Classifier',
    description: 'Train a model to distinguish between different animals and test its accuracy with new images.',
    stage: 'application',
    icon: 'dog',
    concepts: ['Classification', 'Training Data', 'Accuracy Metrics'],
    duration: 45,
    locked: true
  },
  {
    id: 'story-generator',
    number: 8,
    title: 'Story Generator',
    description: 'Create a text generation system that builds stories based on your prompts and ideas.',
    stage: 'application',
    icon: 'bookOpen',
    concepts: ['Text Generation', 'Creative AI', 'Story Structure'],
    duration: 55,
    locked: true
  },
  {
    id: 'music-mood-maker',
    number: 9,
    title: 'Music Mood Maker',
    description: 'Use AI to generate simple melodies based on emotions and customize your own music.',
    stage: 'application',
    icon: 'music',
    concepts: ['Pattern Generation', 'Creative AI', 'Music Theory Basics'],
    duration: 40,
    locked: true
  },
  {
    id: 'recommendation-engine',
    number: 10,
    title: 'Simple Recommendation Engine',
    description: 'Build a system that recommends books or movies based on user preferences and ratings.',
    stage: 'application',
    icon: 'star',
    concepts: ['Recommendation Systems', 'Personalization', 'Preference Matching'],
    duration: 50,
    locked: true
  },
  {
    id: 'translation-explorer',
    number: 11,
    title: 'Translation Explorer',
    description: 'Create a simple translation tool that can convert text between different languages.',
    stage: 'application',
    icon: 'languages',
    concepts: ['Language Processing', 'Translation Models', 'Multilingual AI'],
    duration: 45,
    locked: true
  },
  {
    id: 'facial-expression',
    number: 12,
    title: 'Facial Expression Detector',
    description: 'Use AI to recognize basic emotions in faces through your camera or uploaded images.',
    stage: 'application',
    icon: 'smile',
    concepts: ['Facial Recognition', 'Emotion Detection', 'Computer Vision'],
    duration: 60,
    locked: true
  },
  
  // Understanding Stage (13-17)
  {
    id: 'data-detective',
    number: 13,
    title: 'Data Detective',
    description: 'Learn to clean and prepare data for AI training by fixing problems in messy datasets.',
    stage: 'understanding',
    icon: 'database',
    concepts: ['Data Preparation', 'Data Cleaning', 'Structured vs. Unstructured Data'],
    duration: 45,
    locked: true
  },
  {
    id: 'neural-network',
    number: 14,
    title: 'Neural Network Playground',
    description: 'Experiment with a simple neural network and see how changing parameters affects results.',
    stage: 'understanding',
    icon: 'network',
    concepts: ['Neural Networks', 'Weights', 'Activation Functions', 'Layers'],
    duration: 60,
    locked: true
  },
  {
    id: 'reinforcement-learning',
    number: 15,
    title: 'Reinforcement Learning Games',
    description: 'Train an AI to play a simple game like tic-tac-toe through rewards and practice.',
    stage: 'understanding',
    icon: 'gamepad',
    concepts: ['Reinforcement Learning', 'Rewards', 'Exploration vs. Exploitation'],
    duration: 55,
    locked: true
  },
  {
    id: 'style-transfer',
    number: 16,
    title: 'Image Style Transfer',
    description: 'Apply artistic styles to photos and create unique artwork using AI techniques.',
    stage: 'understanding',
    icon: 'palette',
    concepts: ['GANs', 'Style Transfer', 'Creative AI'],
    duration: 50,
    locked: true
  },
  {
    id: 'ethical-ai',
    number: 17,
    title: 'Ethical AI Detective',
    description: 'Identify bias in datasets and AI outputs, and learn how to make AI systems more fair.',
    stage: 'understanding',
    icon: 'shield',
    concepts: ['AI Ethics', 'Fairness', 'Bias Detection'],
    duration: 45,
    locked: true
  },
  
  // Advanced Creation Stage (18-20)
  {
    id: 'ai-app-builder',
    number: 18,
    title: 'AI App Builder',
    description: 'Combine multiple AI capabilities into a simple application with a user interface.',
    stage: 'advanced',
    icon: 'layers',
    concepts: ['System Integration', 'User Experience', 'Application Design'],
    duration: 90,
    locked: true
  },
  {
    id: 'robot-simulator',
    number: 19,
    title: 'Robot Simulator',
    description: 'Program a virtual robot using AI for navigation and object manipulation in simulated environments.',
    stage: 'advanced',
    icon: 'robot',
    concepts: ['Robotics', 'Spatial Awareness', 'Sensor Fusion'],
    duration: 75,
    locked: true
  },
  {
    id: 'ai-invention',
    number: 20,
    title: 'Your AI Invention',
    description: 'Create a unique AI solution to solve a problem of your choice in this open-ended project.',
    stage: 'advanced',
    icon: 'bot',
    concepts: ['Project Planning', 'Problem Solving', 'Implementation'],
    duration: 120,
    locked: true
  }
];
