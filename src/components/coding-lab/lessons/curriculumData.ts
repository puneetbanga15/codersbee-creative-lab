export type LessonType = {
  id: string;
  number: number;
  title: string;
  description: string;
  stage: 'foundation' | 'intermediate' | 'advanced' | 'expert';
  icon: string;
  concepts: string[];
  duration: number; // in minutes
  mathPioneer: {
    name: string;
    origin: string;
    contribution: string;
  };
  completed?: boolean;
  locked?: boolean;
};

export const curriculumData: LessonType[] = [
  // Foundation Stage (1-4)
  {
    id: 'pattern-palace',
    number: 1,
    title: "Pattern Palace: Aryabhatta's Celestial Calculator",
    description: "Explore number patterns and sequences as you help Aryabhatta map astronomical objects and discover the magic of zero.",
    stage: 'foundation',
    icon: 'stars',
    concepts: ['Pattern Recognition', 'Number Sequences', 'Zero as a Placeholder'],
    duration: 30,
    mathPioneer: {
      name: 'Aryabhatta',
      origin: 'India (476-550 CE)',
      contribution: 'Astronomer and mathematician who made significant contributions to the concept of zero and calculated π to 3.1416.'
    },
    completed: false,
    locked: false  // Changed from false to ensure it's unlocked
  },
  {
    id: 'algorithm-archipelago',
    number: 2,
    title: "Algorithm Archipelago: Brahmagupta's Garden Pathways",
    description: "Create step-by-step instructions to navigate through beautiful garden mazes while learning about the first rules of algebra.",
    stage: 'foundation',
    icon: 'map',
    concepts: ['Algorithms', 'Sequential Instructions', 'Path Optimization'],
    duration: 35,
    mathPioneer: {
      name: 'Brahmagupta',
      origin: 'India (598-668 CE)',
      contribution: 'First mathematician to establish rules for computing with zero and negative numbers.'
    },
    completed: false
  },
  {
    id: 'loop-racers',
    number: 3,
    title: "Loop Racers: Grace Hopper's Bug Hunt",
    description: "Help Admiral Grace Hopper find computer 'bugs' by using loops to automate repetitive tasks in this fast-paced racing game.",
    stage: 'foundation',
    icon: 'bug',
    concepts: ['Loops', 'Iteration', 'Automation', 'Debugging'],
    duration: 35,
    mathPioneer: {
      name: 'Grace Hopper',
      origin: 'United States (1906-1992)',
      contribution: 'Computer scientist who invented the first compiler and pioneered the concept of machine-independent programming languages.'
    },
    completed: false
  },
  {
    id: 'if-then-forest',
    number: 4,
    title: "If-Then Forest: Ramanujan's Intuitive Pathways",
    description: "Navigate a magical forest using conditional logic while discovering the beauty of mathematical intuition as practiced by Ramanujan.",
    stage: 'foundation',
    icon: 'git-branch',
    concepts: ['Conditional Logic', 'If-Then Statements', 'Decision Trees'],
    duration: 40,
    mathPioneer: {
      name: 'Srinivasa Ramanujan',
      origin: 'India (1887-1920)',
      contribution: 'Self-taught mathematician known for his extraordinary intuition in mathematical formulas and theorems.'
    },
    locked: true
  },
  
  // Intermediate Stage (5-8)
  {
    id: 'variable-voyage',
    number: 5,
    title: "Variable Voyage: Katherine Johnson's Space Mission",
    description: "Launch rockets by calculating trajectories using variables and mathematical formulas, inspired by NASA's human computer.",
    stage: 'intermediate',
    icon: 'rocket',
    concepts: ['Variables', 'Mathematical Formulas', 'Space Calculations'],
    duration: 45,
    mathPioneer: {
      name: 'Katherine Johnson',
      origin: 'United States (1918-2020)',
      contribution: "Mathematician whose calculations were critical to the success of NASA's first manned spaceflights."
    },
    locked: true
  },
  {
    id: 'function-factory',
    number: 6,
    title: "Function Factory: Harish-Chandra's Symmetry Workshop",
    description: "Build reusable functions that maintain mathematical symmetry to solve increasingly complex challenges.",
    stage: 'intermediate',
    icon: 'factory',
    concepts: ['Functions', 'Reusable Code', 'Parameters', 'Return Values'],
    duration: 45,
    mathPioneer: {
      name: 'Harish-Chandra',
      origin: 'India (1923-1983)',
      contribution: 'Mathematician and physicist known for his work on representation theory and harmonic analysis.'
    },
    locked: true
  },
  {
    id: 'debug-dungeon',
    number: 7,
    title: "Debug Dungeon: Margaret Hamilton's Moonshot",
    description: "Navigate a dungeon by finding and fixing code errors before the lunar landing module reaches its destination.",
    stage: 'intermediate',
    icon: 'bug',
    concepts: ['Debugging', 'Error Types', 'Problem Solving', 'Code Analysis'],
    duration: 40,
    mathPioneer: {
      name: 'Margaret Hamilton',
      origin: 'United States (1936-present)',
      contribution: "Computer scientist who led the team that wrote the onboard flight software for NASA's Apollo missions."
    },
    locked: true
  },
  {
    id: 'animation-studio',
    number: 8,
    title: "Animation Studio: Satyendranath Bose's Quantum Playground",
    description: "Create particle animations that follow quantum principles to understand how code can model physical phenomena.",
    stage: 'intermediate',
    icon: 'atom',
    concepts: ['Animation Logic', 'State Changes', 'Physics Simulation'],
    duration: 50,
    mathPioneer: {
      name: 'Satyendranath Bose',
      origin: 'India (1894-1974)',
      contribution: 'Physicist whose work with Albert Einstein led to the discovery of Bose-Einstein statistics and the concept of bosons.'
    },
    locked: true
  },
  
  // Advanced Stage (9-12)
  {
    id: 'sequence-solver',
    number: 9,
    title: "Sequence Solver: Shakuntala Devi's Mental Math Challenge",
    description: "Race against the clock to solve increasingly complex calculation sequences using the mental math techniques of the 'Human Computer'.",
    stage: 'advanced',
    icon: 'calculator',
    concepts: ['Sequences', 'Mental Math', 'Optimization', 'Performance'],
    duration: 35,
    mathPioneer: {
      name: 'Shakuntala Devi',
      origin: 'India (1929-2013)',
      contribution: 'Known as the "Human Computer" for her ability to perform incredibly complex calculations mentally.'
    },
    locked: true
  },
  {
    id: 'data-explorer',
    number: 10,
    title: "Data Explorer: Ada Lovelace's Analytical Engine",
    description: "Program a simulated Analytical Engine to process different data types, just as Ada Lovelace envisioned in the 1800s.",
    stage: 'advanced',
    icon: 'database',
    concepts: ['Data Types', 'Data Processing', 'Algorithms', 'Early Computing'],
    duration: 45,
    mathPioneer: {
      name: 'Ada Lovelace',
      origin: 'United Kingdom (1815-1852)',
      contribution: "Mathematician who wrote the first algorithm intended to be processed by a machine, making her the world's first computer programmer."
    },
    locked: true
  },
  {
    id: 'logic-labyrinth',
    number: 11,
    title: "Logic Labyrinth: Alan Turing's Decoding Challenge",
    description: "Break secret codes and navigate a maze using logical deduction and pattern recognition, inspired by the father of computer science.",
    stage: 'advanced',
    icon: 'key',
    concepts: ['Logic Gates', 'Cryptography', 'Pattern Analysis', 'Code Breaking'],
    duration: 50,
    mathPioneer: {
      name: 'Alan Turing',
      origin: 'United Kingdom (1912-1954)',
      contribution: 'Mathematician and computer scientist who broke the Enigma code during WWII and established the foundations of computer science.'
    },
    locked: true
  },
  {
    id: 'recursion-kingdom',
    number: 12,
    title: "Recursion Kingdom: C.V. Raman's Light Quest",
    description: "Use recursive functions to trace light paths through crystals, inspired by Raman's Nobel Prize-winning work on light scattering.",
    stage: 'advanced',
    icon: 'sun',
    concepts: ['Recursion', 'Self-Reference', 'Nested Functions', 'Light Physics'],
    duration: 55,
    mathPioneer: {
      name: 'C.V. Raman',
      origin: 'India (1888-1970)',
      contribution: 'Physicist who won the Nobel Prize for his discovery of the Raman effect, which relates to the scattering of light.'
    },
    locked: true
  },
  
  // Expert Stage (13-15)
  {
    id: 'game-creator',
    number: 13,
    title: "Game Creator: Shigeru Miyamoto's Adventure Lab",
    description: "Design your own mini-game using all coding concepts learned, with guidance from the principles of the legendary game designer.",
    stage: 'expert',
    icon: 'gamepad2',
    concepts: ['Game Design', 'User Interaction', 'Event Handling', 'Game Logic'],
    duration: 60,
    mathPioneer: {
      name: 'Shigeru Miyamoto',
      origin: 'Japan (1952-present)',
      contribution: 'Game designer and creator of some of the most influential video game franchises, known for his focus on player experience and creative gameplay.'
    },
    locked: true
  },
  {
    id: 'array-architect',
    number: 14,
    title: "Array Architect: P.C. Mahalanobis' Statistical City",
    description: "Build a city simulation using arrays and data analysis, applying the statistical planning methods of the famous Indian statistician.",
    stage: 'expert',
    icon: 'building2',
    concepts: ['Arrays', 'Data Structures', 'Statistical Analysis', 'Simulation'],
    duration: 55,
    mathPioneer: {
      name: 'P.C. Mahalanobis',
      origin: 'India (1893-1972)',
      contribution: 'Statistician known for the Mahalanobis distance and for applying statistical methods to economic planning and nation-building.'
    },
    locked: true
  },
  {
    id: 'ultimate-challenge',
    number: 15,
    title: "Ultimate Innovator's Challenge: Global Coding Quest",
    description: "Combine all the coding concepts you've learned to create an original project, with guidance from all the featured pioneers.",
    stage: 'expert',
    icon: 'globe',
    concepts: ['Project Planning', 'Full Application Development', 'Creative Problem Solving', 'Integration'],
    duration: 90,
    mathPioneer: {
      name: 'Multiple Mentors',
      origin: 'Global',
      contribution: 'This challenge honors the collaborative nature of computing and mathematics across cultures and time periods.'
    },
    locked: true
  }
];
