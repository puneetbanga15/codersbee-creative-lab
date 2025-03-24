
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Radio, RadioGroup, RadioItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from 'lucide-react';

interface PromptComparisonProps {
  onComplete: () => void;
}

export const PromptComparison: React.FC<PromptComparisonProps> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const comparisons = [
    {
      id: "comparison1",
      question: "Which prompt would get you a better explanation about how volcanos work?",
      optionA: "Tell me about volcanos.",
      optionB: "Explain how volcanos work using a step-by-step guide with simple examples that a 9-year-old would understand. Include a fun fact at the end.",
      correct: "B"
    },
    {
      id: "comparison2",
      question: "Which prompt would help you more with a creative writing assignment?",
      optionA: "I need to write a story.",
      optionB: "I need to write a 1-page story about a space adventure. Can you help me create a main character, a problem they face in space, and an interesting solution? Also, suggest 3 creative details I could include to make my story more interesting.",
      correct: "B"
    },
    {
      id: "comparison3",
      question: "Which prompt would help you learn more about animals?",
      optionA: "Give me a list of 5 amazing animal adaptations that help animals survive in extreme environments. For each adaptation, explain how it works and give an example of an animal that has it.",
      optionB: "Tell me about cool animals.",
      correct: "A"
    }
  ];
  
  const handleSubmit = () => {
    if (Object.keys(answers).length < comparisons.length) {
      return; // Not all questions answered
    }
    
    const newFeedback: Record<string, boolean> = {};
    let correctCount = 0;
    
    comparisons.forEach(comparison => {
      const isCorrect = answers[comparison.id] === comparison.correct;
      newFeedback[comparison.id] = isCorrect;
      if (isCorrect) correctCount++;
    });
    
    setFeedback(newFeedback);
    setIsSubmitted(true);
    
    if (correctCount === comparisons.length) {
      setIsCompleted(true);
      onComplete();
    }
  };
  
  const handleReset = () => {
    setAnswers({});
    setFeedback({});
    setIsSubmitted(false);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-2">Compare the Prompts</h2>
      
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-4">
        <p className="text-gray-700">
          For each pair of prompts below, select the one that would likely give you the best response from an AI assistant.
        </p>
      </div>
      
      {comparisons.map((comparison, index) => (
        <div 
          key={comparison.id} 
          className={`p-4 rounded-lg border ${
            isSubmitted 
              ? feedback[comparison.id] 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
              : 'bg-white border-gray-200'
          }`}
        >
          <h3 className="font-medium mb-3">
            {index + 1}. {comparison.question}
          </h3>
          
          <RadioGroup
            value={answers[comparison.id]}
            onValueChange={(value) => setAnswers({...answers, [comparison.id]: value})}
            disabled={isSubmitted}
          >
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <RadioItem value="A" id={`${comparison.id}-A`} className="mt-1" />
                <Label htmlFor={`${comparison.id}-A`} className="text-sm font-normal cursor-pointer bg-gray-50 p-3 rounded-md border border-gray-200 flex-1">
                  <span className="font-semibold">Option A:</span><br />
                  {comparison.optionA}
                </Label>
              </div>
              
              <div className="flex items-start gap-2">
                <RadioItem value="B" id={`${comparison.id}-B`} className="mt-1" />
                <Label htmlFor={`${comparison.id}-B`} className="text-sm font-normal cursor-pointer bg-gray-50 p-3 rounded-md border border-gray-200 flex-1">
                  <span className="font-semibold">Option B:</span><br />
                  {comparison.optionB}
                </Label>
              </div>
            </div>
          </RadioGroup>
          
          {isSubmitted && (
            <div className={`mt-3 text-sm ${feedback[comparison.id] ? 'text-green-700' : 'text-red-700'}`}>
              {feedback[comparison.id] 
                ? 'Correct! You chose the more effective prompt.' 
                : `Try again! Option ${comparison.correct} would likely get a better response because it's more specific and provides clear instructions.`}
            </div>
          )}
        </div>
      ))}
      
      <div className="flex justify-between">
        {isSubmitted ? (
          <Button variant="outline" onClick={handleReset} disabled={isCompleted}>
            Try Again
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={Object.keys(answers).length < comparisons.length}>
            Check Answers
          </Button>
        )}
      </div>
      
      {isCompleted && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
          <h3 className="font-medium text-green-800 flex items-center justify-center">
            <Check className="mr-2 h-5 w-5" />
            Great job!
          </h3>
          <p className="text-green-700 mt-1">
            You've successfully identified all the more effective prompts!
          </p>
        </div>
      )}
    </div>
  );
};
