import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

type Question = {
  id: string;
  question: string;
  options: {
    [key: string]: string;
  };
  correct_answer: string;
  explanation: string | null;
};

export const Quiz = ({ quizId }: { quizId: string }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const { data: questions, isError } = useQuery({
    queryKey: ['quiz-questions', quizId],
    queryFn: async () => {
      console.log('Fetching questions for quiz:', quizId);
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('quiz_id', quizId);
      
      if (error) {
        console.error('Error fetching questions:', error);
        throw error;
      }
      
      if (!data || data.length === 0) {
        console.log('No questions found for quiz:', quizId);
        return [];
      }

      console.log('Found questions:', data.length);
      return data.map(q => ({
        ...q,
        options: q.options as { [key: string]: string }
      })) as Question[];
    },
  });

  const currentQuestion = questions?.[currentQuestionIndex];
  const progress = questions ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const handleSubmitAnswer = () => {
    if (!currentQuestion || !selectedAnswer) return;

    const correct = selectedAnswer === currentQuestion.correct_answer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 10);
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer("");
    
    if (currentQuestionIndex + 1 < (questions?.length ?? 0)) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load quiz questions. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          No questions available for this quiz.
        </AlertDescription>
      </Alert>
    );
  }

  if (!currentQuestion) return null;

  if (isQuizComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center space-y-4">
          <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
          <h2 className="text-2xl font-bold">Quiz Complete!</h2>
          <p className="text-4xl font-bold text-green-600">{score}/{questions.length * 10}</p>
          <p className="text-gray-600">
            You answered {score / 10} out of {questions.length} questions correctly
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium">Question {currentQuestionIndex + 1} / {questions.length}</h2>
          <span className="text-green-600">{progress.toFixed(0)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">{currentQuestion.question}</h3>

        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-3">
          {Object.entries(currentQuestion.options).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <RadioGroupItem value={key} id={key} disabled={showFeedback} />
              <Label htmlFor={key}>{value}</Label>
            </div>
          ))}
        </RadioGroup>

        {showFeedback && (
          <Alert className={isCorrect ? "bg-green-50" : "bg-red-50"}>
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <AlertDescription className={isCorrect ? "text-green-800" : "text-red-800"}>
                {isCorrect ? "Correct!" : `Incorrect. The correct answer is: ${currentQuestion.options[currentQuestion.correct_answer]}`}
                {currentQuestion.explanation && (
                  <p className="mt-2 text-gray-600">{currentQuestion.explanation}</p>
                )}
              </AlertDescription>
            </div>
          </Alert>
        )}

        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={showFeedback ? handleNextQuestion : handleSubmitAnswer}
          disabled={!selectedAnswer && !showFeedback}
        >
          {showFeedback ? "Next Question" : "Submit Answer"}
        </Button>
      </div>
    </div>
  );
};