import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Question = {
  id: string;
  question: string;
  options: {
    [key: string]: string;
  };
  correct_answer: string;
};

export const Quiz = ({ quizId }: { quizId: string }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const { data: questions } = useQuery({
    queryKey: ['quiz-questions', quizId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('quiz_id', quizId);
      
      if (error) throw error;
      return (data as any[]).map(q => ({
        ...q,
        options: q.options as { [key: string]: string }
      })) as Question[];
    },
  });

  const currentQuestion = questions?.[currentQuestionIndex];
  const progress = questions ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const handleSubmitAnswer = () => {
    if (!currentQuestion || !selectedAnswer) return;

    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + 10);
    }

    if (currentQuestionIndex + 1 < (questions?.length ?? 0)) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
    } else {
      setIsQuizComplete(true);
    }
  };

  if (!currentQuestion || !questions) return null;

  if (isQuizComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center space-y-4">
          <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
          <h2 className="text-2xl font-bold">Your Score</h2>
          <p className="text-4xl font-bold text-green-600">{score}/100</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium">Question {currentQuestionIndex + 1} / {questions.length}</h2>
          <span className="text-green-600">{progress.toFixed(0)} %</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">{currentQuestion.question}</h3>

        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
          {Object.entries(currentQuestion.options).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <RadioGroupItem value={key} id={key} />
              <Label htmlFor={key}>{value}</Label>
            </div>
          ))}
        </RadioGroup>

        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleSubmitAnswer}
          disabled={!selectedAnswer}
        >
          Submit My Answer
        </Button>
      </div>
    </div>
  );
};