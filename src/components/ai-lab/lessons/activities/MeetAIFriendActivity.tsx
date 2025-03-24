import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AlertCircle, CheckCircle, HelpCircle, Info } from 'lucide-react';

// Character types
interface Character {
  id: string;
  name: string;
  image: string;
  description: string;
  personality: string[];
  sampleResponses: string[];
}

// Drag and drop components
interface SortableItemProps {
  id: string;
  character: Character;
  isCorrect: boolean | null;
}

const SortableItem = ({ id, character, isCorrect }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 mb-3 bg-white rounded-lg shadow-sm border-2 cursor-move
        ${isCorrect === true ? 'border-green-500' : 
          isCorrect === false ? 'border-red-500' : 
          'border-gray-200 hover:border-purple-300'}`}
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
          {/* Placeholder for character image */}
          <div className="text-3xl font-bold text-gray-400">{character.name.charAt(0)}</div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{character.name}</h3>
          <p className="text-sm text-gray-600">{character.description}</p>
        </div>
        {isCorrect === true && <CheckCircle className="h-6 w-6 text-green-500" />}
        {isCorrect === false && <AlertCircle className="h-6 w-6 text-red-500" />}
      </div>
    </div>
  );
};

// Main component
export const MeetAIFriendActivity = () => {
  // Characters data
  const characters: Character[] = [
    {
      id: 'harry',
      name: 'Harry Potter',
      image: '/placeholder-harry.png',
      description: 'A young wizard with magical abilities',
      personality: [
        'Brave and courageous',
        'Loyal to friends',
        'Sometimes impulsive',
        'Values fairness and justice'
      ],
      sampleResponses: [
        'Expecto Patronum! That\'s a difficult question...',
        'I\'d rather face a dragon than deal with this homework!',
        'My friends and I can figure this out together.'
      ]
    },
    {
      id: 'einstein',
      name: 'Albert Einstein',
      image: '/placeholder-einstein.png',
      description: 'Brilliant physicist and mathematician',
      personality: [
        'Highly analytical and logical',
        'Curious about how things work',
        'Thoughtful and philosophical',
        'Values knowledge and understanding'
      ],
      sampleResponses: [
        'The important thing is to never stop questioning.',
        'Let me think about this relatively speaking...',
        'Imagination is more important than knowledge.'
      ]
    },
    {
      id: 'krishna',
      name: 'Krishna',
      image: '/placeholder-krishna.png',
      description: 'Divine figure from Hindu mythology',
      personality: [
        'Wise and all-knowing',
        'Playful yet profound',
        'Compassionate guide',
        'Strategic thinker'
      ],
      sampleResponses: [
        'Focus on your actions, not on their fruits.',
        'I am with you always, even in your questions.',
        'The mind can be both your friend and your enemy.'
      ]
    },
    {
      id: 'shakespeare',
      name: 'William Shakespeare',
      image: '/placeholder-shakespeare.png',
      description: 'Legendary playwright and poet',
      personality: [
        'Poetic and eloquent',
        'Deeply understands human nature',
        'Creative and expressive',
        'Dramatic in responses'
      ],
      sampleResponses: [
        'To answer, or not to answer, that is the question!',
        'All the world\'s a stage, and your query a player upon it.',
        'Brevity is the soul of wit, but I shall elaborate...'
      ]
    }
  ];

  // State
  const [items, setItems] = useState<Character[]>(characters);
  const [step, setStep] = useState<number>(1);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [trainingComplete, setTrainingComplete] = useState<boolean>(false);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: string}>({});
  const [quizResults, setQuizResults] = useState<{correct: number, total: number} | null>(null);
  const [dragResults, setDragResults] = useState<{[key: string]: boolean | null}>({
    'harry': null,
    'einstein': null,
    'krishna': null,
    'shakespeare': null
  });

  // Sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Shuffle characters on initial load
  useEffect(() => {
    setItems(shuffleArray([...characters]));
  }, []);

  // Handle drag end
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over?.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  // Helper function to shuffle array
  function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // Check drag order
  const checkDragOrder = () => {
    // This is just a sample check - in a real app you might have a specific correct order
    // For now, we'll say the correct order is alphabetical by name
    const correctOrder = [...characters].sort((a, b) => a.name.localeCompare(b.name));
    
    const results = {} as {[key: string]: boolean};
    items.forEach((item, index) => {
      results[item.id] = item.id === correctOrder[index].id;
    });
    
    setDragResults(results);
    
    // If all correct, allow proceeding to next step
    if (Object.values(results).every(result => result === true)) {
      setTimeout(() => {
        setStep(2);
      }, 1500);
    }
  };

  // Select character for training
  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
    setStep(3);
  };

  // Complete training
  const completeTraining = () => {
    setTrainingComplete(true);
    setStep(4);
  };

  // Start quiz
  const startQuiz = () => {
    setQuizStarted(true);
  };

  // Handle quiz answer
  const handleQuizAnswer = (questionId: string, answer: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Submit quiz
  const submitQuiz = () => {
    // Check answers - in a real app, you'd have correct answers to compare against
    // For now, we'll just count how many questions were answered
    const correctAnswers = 3; // Assuming 3 out of 5 are correct
    setQuizResults({
      correct: correctAnswers,
      total: quizQuestions.length
    });
  };

  // Quiz questions
  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the main purpose of an AI chatbot?',
      options: [
        'To replace human teachers completely',
        'To simulate conversation and provide responses based on input',
        'To access the internet and find information',
        'To play games with users'
      ],
      correctAnswer: 1 // Index of correct answer
    },
    {
      id: 'q2',
      question: 'Which of these is NOT a characteristic of AI?',
      options: [
        'Pattern recognition',
        'Learning from data',
        'Having human emotions',
        'Processing language'
      ],
      correctAnswer: 2
    },
    {
      id: 'q3',
      question: 'How does a simple AI chatbot determine what to say?',
      options: [
        'By reading your mind',
        'By matching keywords in your input to pre-programmed responses',
        'By calling you on the phone',
        'By asking other people what to say'
      ],
      correctAnswer: 1
    },
    {
      id: 'q4',
      question: 'Which character would likely give the most scientific response?',
      options: [
        'Harry Potter',
        'William Shakespeare',
        'Krishna',
        'Albert Einstein'
      ],
      correctAnswer: 3
    },
    {
      id: 'q5',
      question: 'What happens when you "train" an AI character?',
      options: [
        'It becomes smarter than humans',
        'It learns to recognize patterns in data',
        'It develops real feelings',
        'It can solve any problem instantly'
      ],
      correctAnswer: 1
    }
  ];

  // Render different steps
  const renderStep = () => {
    switch (step) {
      case 1: // Drag and drop to rank characters
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium text-blue-800 flex items-center gap-2 mb-2">
                <Info className="h-5 w-5" />
                Step 1: Choose Your AI Friend
              </h3>
              <p className="text-blue-700">
                Drag and drop the characters to rank them from your most favorite (top) to least favorite (bottom).
                Then click "Check My Ranking" to proceed.
              </p>
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={items.map(item => item.id)}
                strategy={verticalListSortingStrategy}
              >
                {items.map((character) => (
                  <SortableItem 
                    key={character.id} 
                    id={character.id} 
                    character={character} 
                    isCorrect={dragResults[character.id]}
                  />
                ))}
              </SortableContext>
            </DndContext>

            <div className="flex justify-end">
              <Button onClick={checkDragOrder}>
                Check My Ranking
              </Button>
            </div>
          </div>
        );
      
      case 2: // Select character to train
        return (
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium text-green-800 flex items-center gap-2 mb-2">
                <Info className="h-5 w-5" />
                Step 2: Select a Character to Train
              </h3>
              <p className="text-green-700">
                Great job ranking the characters! Now, choose one character that you'd like to train as your AI friend.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {characters.map((character) => (
                <Card 
                  key={character.id}
                  className="overflow-hidden hover:shadow-md transition-all cursor-pointer hover:-translate-y-1"
                  onClick={() => handleSelectCharacter(character)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        <div className="text-xl font-bold text-gray-400">{character.name.charAt(0)}</div>
                      </div>
                      <div>
                        <h3 className="font-semibold">{character.name}</h3>
                        <p className="text-sm text-gray-600">{character.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      
      case 3: // Train selected character
        return (
          <div className="space-y-6">
            {selectedCharacter && (
              <>
                <div className="bg-purple-50 p-4 rounded-lg mb-4">
                  <h3 className="font-medium text-purple-800 flex items-center gap-2 mb-2">
                    <Info className="h-5 w-5" />
                    Step 3: Train Your AI Friend
                  </h3>
                  <p className="text-purple-700">
                    You've selected {selectedCharacter.name} as your AI friend! Now let's train them to respond in their unique style.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      <div className="text-4xl font-bold text-gray-400">{selectedCharacter.name.charAt(0)}</div>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{selectedCharacter.name}</h2>
                      <p className="text-gray-600">{selectedCharacter.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium text-lg mb-2">Personality Traits:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedCharacter.personality.map((trait, index) => (
                        <li key={index} className="text-gray-700">{trait}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium text-lg mb-2">Sample Responses:</h3>
                    <div className="space-y-3">
                      {selectedCharacter.sampleResponses.map((response, index) => (
                        <div key={index} className="bg-purple-50 p-3 rounded-lg">
                          <p className="text-purple-800 italic">"{response}"</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                    <h3 className="font-medium text-yellow-800 flex items-center gap-2 mb-2">
                      <HelpCircle className="h-5 w-5" />
                      Training Tips
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-yellow-700">
                      <li>AI characters respond based on patterns they recognize in data</li>
                      <li>The more examples you provide, the better your AI will understand how to respond</li>
                      <li>Think about what makes this character unique and how that affects their communication style</li>
                      <li>Consider how the character's background influences their knowledge and perspective</li>
                    </ul>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={completeTraining}>
                      Complete Training
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      
      case 4: // Training complete, take quiz
        return (
          <div className="space-y-6">
            {!quizStarted ? (
              <>
                <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <h2 className="text-xl font-bold text-green-800">Training Complete!</h2>
                  </div>
                  <p className="text-green-700 mb-4">
                    Congratulations! You've successfully trained your AI friend. Now it's time to test your knowledge
                    about AI chatbots with a short quiz.
                  </p>
                  {selectedCharacter && (
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        <div className="text-xl font-bold text-gray-400">{selectedCharacter.name.charAt(0)}</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="italic text-purple-800">
                          "{selectedCharacter.name === 'Harry Potter' ? 'Brilliant! I\'m ready to help with your magical questions!' : 
                            selectedCharacter.name === 'Albert Einstein' ? 'Relatively speaking, I believe we make a good team!' :
                            selectedCharacter.name === 'Krishna' ? 'Our journey of learning together has just begun.' :
                            'To learn, or not to learn—there is no question!'}"
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end mt-6">
                    <Button onClick={startQuiz}>
                      Take the Quiz
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-blue-800 flex items-center gap-2 mb-2">
                    <Info className="h-5 w-5" />
                    Knowledge Check Quiz
                  </h3>
                  <p className="text-blue-700">
                    Answer these questions to test your understanding of AI chatbots.
                  </p>
                </div>

                {quizResults ? (
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                      <h2 className="text-xl font-bold">Quiz Results</h2>
                    </div>
                    <p className="text-lg mb-4">
                      You got <span className="font-bold text-green-600">{quizResults.correct}</span> out of <span className="font-bold">{quizResults.total}</span> questions correct!
                    </p>
                    <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                      <p className="text-yellow-800">
                        {quizResults.correct === quizResults.total ? 
                          "Perfect score! You're an AI expert!" : 
                          quizResults.correct >= quizResults.total * 0.7 ?
                          "Great job! You've learned a lot about AI chatbots." :
                          "Good effort! You might want to review the lesson again to better understand AI chatbots."}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <Button>
                        Complete Lesson
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="space-y-6">
                      {quizQuestions.map((question, qIndex) => (
                        <div key={question.id} className="border-b border-gray-200 pb-6 last:border-0">
                          <h3 className="font-medium text-lg mb-3">
                            {qIndex + 1}. {question.question}
                          </h3>
                          <div className="space-y-2">
                            {question.options.map((option, oIndex) => (
                              <div 
                                key={oIndex}
                                className={`p-3 rounded-lg border-2 cursor-pointer ${
                                  quizAnswers[question.id] === option ? 
                                  'border-purple-500 bg-purple-50' : 
                                  'border-gray-200 hover:border-purple-300'
                                }`}
                                onClick={() => handleQuizAnswer(question.id, option)}
                              >
                                <p>{option}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end mt-6">
                      <Button 
                        onClick={submitQuiz}
                        disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                      >
                        Submit Answers
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Badge variant={step >= 1 ? "default" : "outline"} className="bg-blue-500">Step 1</Badge>
        <div className="h-px w-8 bg-gray-300"></div>
        <Badge variant={step >= 2 ? "default" : "outline"} className="bg-green-500">Step 2</Badge>
        <div className="h-px w-8 bg-gray-300"></div>
        <Badge variant={step >= 3 ? "default" : "outline"} className="bg-purple-500">Step 3</Badge>
        <div className="h-px w-8 bg-gray-300"></div>
        <Badge variant={step >= 4 ? "default" : "outline"} className="bg-amber-500">Step 4</Badge>
      </div>

      {renderStep()}
    </div>
  );
};
