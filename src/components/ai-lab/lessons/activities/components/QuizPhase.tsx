
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Character } from '../types';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizPhaseProps {
  character: Character;
  onComplete: () => void;
}

export const QuizPhase: React.FC<QuizPhaseProps> = ({
  character,
  onComplete
}) => {
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  
  // Quiz questions
  const questions: Question[] = [
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
      question: `How might ${character.name} respond differently after training compared to before training?`,
      options: [
        'By speaking in a different language',
        'By using more slang words',
        'By giving more detailed and character-specific answers',
        'By sending emoji instead of text'
      ],
      correctAnswer: 2
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
  
  const handleSelectAnswer = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };
  
  const handleSubmit = () => {
    setShowResults(true);
  };
  
  const getScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-purple-600" />
          Knowledge Check Quiz
        </h2>
        
        {!showResults ? (
          <>
            <p className="mb-6 text-gray-600">
              Let's test what you've learned about AI training! Answer these questions to complete the activity.
            </p>
            
            <div className="space-y-6">
              {questions.map((question, qIndex) => (
                <div key={question.id} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="font-medium text-lg mb-3">
                    {qIndex + 1}. {question.question}
                  </h3>
                  <div className="space-y-2">
                    {question.options.map((option, oIndex) => (
                      <div 
                        key={oIndex}
                        className={`p-3 rounded-lg border-2 cursor-pointer ${
                          answers[question.id] === oIndex ? 
                          'border-purple-500 bg-purple-50' : 
                          'border-gray-200 hover:border-purple-300'
                        }`}
                        onClick={() => handleSelectAnswer(question.id, oIndex)}
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
                onClick={handleSubmit}
                disabled={Object.keys(answers).length < questions.length}
              >
                Submit Answers
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <h2 className="text-xl font-bold text-purple-800">Quiz Results</h2>
              </div>
              <p className="text-lg mb-4">
                You got <span className="font-bold text-green-600">{getScore()}</span> out of <span className="font-bold">{questions.length}</span> questions correct!
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <p className="text-yellow-800">
                  {getScore() === questions.length ? 
                    "Perfect score! You're an AI expert!" : 
                    getScore() >= questions.length * 0.7 ?
                    "Great job! You've learned a lot about AI chatbots." :
                    "Good effort! You might want to review the lesson again to better understand AI chatbots."}
                </p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              {questions.map((question, index) => (
                <div key={question.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-3 border-b border-gray-200">
                    <h3 className="font-medium">{index + 1}. {question.question}</h3>
                  </div>
                  <div className="p-3">
                    {question.options.map((option, oIndex) => (
                      <div 
                        key={oIndex} 
                        className={`p-2 mb-2 rounded-lg flex items-center gap-2 ${
                          oIndex === question.correctAnswer 
                            ? 'bg-green-50 border border-green-200' 
                            : answers[question.id] === oIndex 
                              ? 'bg-red-50 border border-red-200' 
                              : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        {oIndex === question.correctAnswer ? (
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        ) : answers[question.id] === oIndex ? (
                          <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                        ) : null}
                        <span className={oIndex === question.correctAnswer ? 'font-medium' : ''}>
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <Button onClick={onComplete}>
                Complete Lesson
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
