
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { TrainingItem } from './TrainingItem';
import { Character } from '../../types';

interface TrainingCarouselProps {
  character: Character;
  trainingResponses: {[key: string]: string};
  onResponseChange: (questionId: string, response: string) => void;
  trainingLevel: 'basic' | 'advanced';
  onComplete: () => void;
}

export const TrainingCarousel = ({ 
  character, 
  trainingResponses, 
  onResponseChange, 
  trainingLevel, 
  onComplete 
}: TrainingCarouselProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questions = trainingLevel === 'basic' ? character.trainingQuestions.basic : character.trainingQuestions.advanced;

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const response = trainingResponses[currentQuestion.id] || '';
  const isComplete = response.trim().length > 0;
  
  const allQuestionsAnswered = questions.every(q => 
    trainingResponses[q.id] && trainingResponses[q.id].trim().length > 0
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-purple-50 p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
              <span className="font-bold text-purple-800">{currentQuestionIndex + 1}</span>
            </div>
            <div>
              <h3 className="font-medium">Training Question {currentQuestionIndex + 1} of {questions.length}</h3>
              <p className="text-xs text-gray-500">
                {trainingLevel === 'basic' ? 'Basic Training' : 'Advanced Training'}
              </p>
            </div>
          </div>
          {isComplete && (
            <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span>Complete</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <TrainingItem 
          question={currentQuestion.question}
          characterName={character.name}
          onResponseChange={(response) => onResponseChange(currentQuestion.id, response)}
          response={response}
          characterPersonality={character.personality}
          context={currentQuestion.context}
        />
      </div>
      
      <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-gray-50">
        <Button 
          variant="outline" 
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex gap-1">
          {questions.map((_, index) => (
            <div 
              key={index} 
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === currentQuestionIndex 
                  ? 'bg-purple-600' 
                  : trainingResponses[questions[index].id] 
                    ? 'bg-green-400' 
                    : 'bg-gray-300'
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
            />
          ))}
        </div>
        
        <Button 
          onClick={nextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
          className="flex items-center gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {allQuestionsAnswered && (
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <Button onClick={onComplete}>
            Complete {trainingLevel === 'basic' ? 'Basic' : 'Advanced'} Training
          </Button>
        </div>
      )}
    </div>
  );
};
