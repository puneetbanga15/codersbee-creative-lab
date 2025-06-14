type Activity = {
  id: string;
  title: string;
  description: string;
  component: string;
  duration: number; // in minutes
};

export type LessonType = {
  id: string;
  number: number;
  title: string;
  description: string;
  stage: 'discoverers' | 'explorers' | 'builders' | 'creators';
  icon: string;
  concepts: string[];
  duration: number; // in minutes
  completed?: boolean;
  locked?: boolean;
  activities?: Activity[];
};

export const curriculumData: LessonType[] = [
  // Tier 1: Discoverers
  {
    id: 'what-is-ai',
    number: 1,
    title: 'What is AI?',
    description: 'Discover what artificial intelligence is and see examples of AI in everyday life.',
    stage: 'discoverers',
    icon: 'cpu',
    concepts: ['AI Basics', 'Real-world AI', 'AI Capabilities'],
    duration: 25,
    completed: false,
    activities: [
      {
        id: 'ai-or-not',
        title: 'AI or Not?',
        description: "Test your knowledge by identifying which items use AI and which don't!",
        component: 'AiOrNotActivityWrapper',
        duration: 10
      }
    ]
  },
  {
    id: 'how-ai-learns',
    number: 2,
    title: 'How AI Learns',
    description: 'Explore the basics of machine learning and how AI systems learn from data.',
    stage: 'discoverers',
    icon: 'graduation-cap',
    concepts: ['Machine Learning', 'Training Data', 'Patterns'],
    duration: 30,
    completed: false,
    activities: [
      {
        id: 'pattern-detective',
        title: 'Pattern Detective',
        description: 'Train an AI to recognize patterns by providing examples',
        component: 'PatternDetectorActivityWrapper',
        duration: 15
      }
    ]
  },
  {
    id: 'meet-ai-friend',
    number: 3,
    title: 'Meet Your AI Friend',
    description: 'Create a simple chatbot with preset responses and learn how computers "talk" to humans.',
    stage: 'discoverers',
    icon: 'messageSquare',
    concepts: ['What is AI', 'Computer Communication', 'Chatbots'],
    duration: 30,
    completed: false
  },
  {
    id: 'llm-basics',
    number: 4,
    title: 'Understanding LLMs',
    description: 'Learn how large language models work and how to talk to them effectively with prompt engineering.',
    stage: 'discoverers',
    icon: 'brain',
    concepts: ['Large Language Models', 'Prompt Engineering', 'AI Communication'],
    duration: 45,
    completed: false
  },
  {
    id: 'ai-storyteller',
    number: 5,
    title: 'AI Storyteller',
    description: 'Collaborate with AI to create amazing stories using creative prompts and AI assistance.',
    stage: 'discoverers',
    icon: 'book-open',
    concepts: ['Creative AI', 'Storytelling', 'Human-AI Collaboration'],
    duration: 35,
    locked: true
  },
  
  // Tier 2: Explorers
  {
    id: 'image-recognition',
    number: 6,
    title: 'Image Recognition Magic',
    description: 'Use a pre-trained model to identify objects in images, drawings, or camera feed.',
    stage: 'explorers',
    icon: 'image',
    concepts: ['Computer Vision', 'Image Classification', 'Pre-trained Models'],
    duration: 40,
    locked: true
  },
  {
    id: 'sentiment-sleuth',
    number: 7,
    title: 'Sentiment Sleuth',
    description: "Analyze text to determine if it's positive, negative, or neutral and understand emotions in writing.",
    stage: 'explorers',
    icon: 'messageSquare',
    concepts: ['Natural Language Processing', 'Sentiment Analysis', 'Text Classification'],
    duration: 35,
    locked: true
  },
  {
    id: 'voice-command',
    number: 8,
    title: 'Voice Command Creator',
    description: 'Create simple voice commands for a virtual assistant that responds to spoken instructions.',
    stage: 'explorers',
    icon: 'microphone',
    concepts: ['Speech Recognition', 'Command Parsing', 'Voice Interfaces'],
    duration: 50,
    locked: true
  },
  {
    id: 'animal-classifier',
    number: 9,
    title: 'Animal Classifier',
    description: 'Train a model to distinguish between different animals and test its accuracy with new images.',
    stage: 'explorers',
    icon: 'dog',
    concepts: ['Classification', 'Training Data', 'Accuracy Metrics'],
    duration: 45,
    locked: true
  },
  {
    id: 'story-generator',
    number: 10,
    title: 'Story Generator',
    description: 'Create a text generation system that builds stories based on your prompts and ideas.',
    stage: 'explorers',
    icon: 'bookOpen',
    concepts: ['Text Generation', 'Creative AI', 'Story Structure'],
    duration: 55,
    locked: true
  },
  {
    id: 'music-mood-maker',
    number: 11,
    title: 'Music Mood Maker',
    description: 'Use AI to generate simple melodies based on emotions and customize your own music.',
    stage: 'explorers',
    icon: 'music',
    concepts: ['Pattern Generation', 'Creative AI', 'Music Theory Basics'],
    duration: 40,
    locked: false
  },
  {
    id: 'recommendation-engine',
    number: 12,
    title: 'Simple Recommendation Engine',
    description: 'Build a system that recommends books or movies based on user preferences and ratings.',
    stage: 'explorers',
    icon: 'star',
    concepts: ['Recommendation Systems', 'Personalization', 'Preference Matching'],
    duration: 50,
    locked: false
  },
  {
    id: 'translation-explorer',
    number: 13,
    title: 'Translation Explorer',
    description: 'Create a simple translation tool that can convert text between different languages.',
    stage: 'explorers',
    icon: 'languages',
    concepts: ['Language Processing', 'Translation Models', 'Multilingual AI'],
    duration: 45,
    locked: false
  },
  {
    id: 'facial-expression',
    number: 14,
    title: 'Facial Expression Detector',
    description: 'Use AI to recognize basic emotions in faces through your camera or uploaded images.',
    stage: 'explorers',
    icon: 'smile',
    concepts: ['Facial Recognition', 'Emotion Detection', 'Computer Vision'],
    duration: 60,
    locked: false
  },

  // Tier 3: Builders
  {
    id: 'data-detective',
    number: 15,
    title: 'Data Detective',
    description: 'Learn to clean and prepare data for AI training by fixing problems in messy datasets.',
    stage: 'builders',
    icon: 'database',
    concepts: ['Data Preparation', 'Data Cleaning', 'Structured vs. Unstructured Data'],
    duration: 45,
    locked: false
  },
  {
    id: 'neural-network',
    number: 16,
    title: 'Neural Network Playground',
    description: 'Experiment with a simple neural network and see how changing parameters affects results.',
    stage: 'builders',
    icon: 'network',
    concepts: ['Neural Networks', 'Weights', 'Activation Functions', 'Layers'],
    duration: 60,
    locked: false
  },
  {
    id: 'reinforcement-learning',
    number: 17,
    title: 'Reinforcement Learning Games',
    description: 'Train an AI to play a simple game like tic-tac-toe through rewards and practice.',
    stage: 'builders',
    icon: 'gamepad',
    concepts: ['Reinforcement Learning', 'Rewards', 'Exploration vs. Exploitation'],
    duration: 55,
    locked: false
  },
  {
    id: 'style-transfer',
    number: 18,
    title: 'Image Style Transfer',
    description: 'Apply artistic styles to photos and create unique artwork using AI techniques.',
    stage: 'builders',
    icon: 'palette',
    concepts: ['GANs', 'Style Transfer', 'Creative AI'],
    duration: 50,
    locked: false
  },
  {
    id: 'ethical-ai',
    number: 19,
    title: 'Ethical AI Detective',
    description: 'Identify bias in datasets and AI outputs, and learn how to make AI systems more fair.',
    stage: 'builders',
    icon: 'shield',
    concepts: ['AI Ethics', 'Fairness', 'Bias Detection'],
    duration: 45,
    locked: false
  },
  
  // Tier 4: Creators
  {
    id: 'ai-app-builder',
    number: 20,
    title: 'AI App Builder',
    description: 'Combine multiple AI capabilities into a simple application with a user interface.',
    stage: 'creators',
    icon: 'layers',
    concepts: ['System Integration', 'User Experience', 'Application Design'],
    duration: 90,
    locked: false
  },
  {
    id: 'robot-simulator',
    number: 21,
    title: 'Robot Simulator',
    description: 'Program a virtual robot using AI for navigation and object manipulation in simulated environments.',
    stage: 'creators',
    icon: 'robot',
    concepts: ['Robotics', 'Spatial Awareness', 'Sensor Fusion'],
    duration: 75,
    locked: false
  },
  {
    id: 'ai-invention',
    number: 22,
    title: 'Your AI Invention',
    description: 'Create a unique AI solution to solve a problem of your choice in this open-ended project.',
    stage: 'creators',
    icon: 'bot',
    concepts: ['Project Planning', 'Problem Solving', 'Implementation'],
    duration: 120,
    locked: false
  }
];
