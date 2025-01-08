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
      console.log('=== Quiz Questions Fetch Start ===');
      console.log('Quiz ID:', quizId);
      
      try {
        const { data, error } = await supabase
          .from('quiz_questions')
          .select('*')
          .eq('quiz_id', quizId);
        
        if (error) {
          console.error('=== Supabase Error ===');
          console.error('Error details:', error);
          console.error('Error message:', error.message);
          console.error('Error code:', error.code);
          throw error;
        }
        
        if (!data || data.length === 0) {
          console.log('=== No Questions Found ===');
          console.log('Quiz ID:', quizId);
          console.log('Returned data:', data);
          return [];
        }

        console.log('=== Questions Fetch Success ===');
        console.log('Number of questions:', data.length);
        console.log('First question preview:', {
          id: data[0].id,
          question: data[0].question,
          optionsCount: Object.keys(data[0].options).length
        });

        return data.map(q => ({
          ...q,
          options: q.options as { [key: string]: string }
        })) as Question[];
      } catch (error) {
        console.error('=== Unexpected Error ===');
        console.error('Error:', error);
        throw error;
      }
    },
  });

  const currentQuestion = questions?.[currentQuestionIndex];
  const progress = questions ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const handleSubmitAnswer = () => {
    console.log('=== Submit Answer ===');
    console.log('Current question index:', currentQuestionIndex);
    console.log('Selected answer:', selectedAnswer);
    
    if (!currentQuestion || !selectedAnswer) {
      console.log('No question or answer selected');
      return;
    }

    const correct = selectedAnswer === currentQuestion.correct_answer;
    console.log('Answer correct:', correct);
    console.log('Correct answer:', currentQuestion.correct_answer);
    
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 10);
      console.log('New score:', score + 10);
    }
  };

  const handleNextQuestion = () => {
    console.log('=== Next Question ===');
    console.log('Current index:', currentQuestionIndex);
    console.log('Total questions:', questions?.length);
    
    setShowFeedback(false);
    setSelectedAnswer("");
    
    if (currentQuestionIndex + 1 < (questions?.length ?? 0)) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      console.log('Moving to question:', currentQuestionIndex + 1);
    } else {
      console.log('Quiz complete');
      setIsQuizComplete(true);
    }
  };

  if (isError) {
    console.error('=== Quiz Error State ===');
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load quiz questions. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!questions || questions.length === 0) {
    console.log('=== No Questions Available ===');
    return (
      <Alert>
        <AlertDescription>
          No questions available for this quiz.
        </AlertDescription>
      </Alert>
    );
  }

  if (!currentQuestion) {
    console.log('=== No Current Question ===');
    return null;
  }

  if (isQuizComplete) {
    console.log('=== Quiz Complete ===');
    console.log('Final score:', score);
    console.log('Questions answered correctly:', score / 10);
    console.log('Total questions:', questions.length);
    
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