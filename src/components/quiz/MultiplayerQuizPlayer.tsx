import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, Timer, Trophy, ArrowRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuizSession } from "@/hooks/useQuizSession";
import { cn } from "@/lib/utils";

interface MultiplayerQuizPlayerProps {
  sessionId: string;
  playerId: string | null;
  isHost: boolean;
  onComplete: () => void;
}

export const MultiplayerQuizPlayer = ({
  sessionId,
  playerId,
  isHost,
  onComplete,
}: MultiplayerQuizPlayerProps) => {
  const { toast } = useToast();
  const {
    session,
    questions,
    players,
    submitAnswer,
    nextQuestion,
    endSession,
    broadcastAnswer,
  } = useQuizSession(sessionId);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestionIndex = session?.current_question_index || 0;
  const currentQuestion = questions?.[currentQuestionIndex];
  const totalQuestions = questions?.length || 0;
  const timePerQuestion = session?.time_per_question || 30;

  // Timer countdown
  useEffect(() => {
    if (!currentQuestion || hasAnswered || showExplanation) return;

    setTimeLeft(timePerQuestion);
    setQuestionStartTime(Date.now());

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, hasAnswered, showExplanation, timePerQuestion]);

  // Reset answer state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    setShowExplanation(false);
  }, [currentQuestionIndex]);

  const handleTimeUp = async () => {
    if (hasAnswered || !currentQuestion || !playerId) return;

    // Auto-submit with no answer when time runs out
    try {
      const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
      await submitAnswer({
        playerId,
        questionId: currentQuestion.id,
        selectedAnswer: "",
        correctAnswer: currentQuestion.correct_answer,
        timeTaken,
      });
      setHasAnswered(true);
      broadcastAnswer(playerId);

      toast({
        title: "Time's Up!",
        description: "Moving to next question...",
        variant: "destructive",
      });
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const handleAnswerSelect = async (answer: string) => {
    if (hasAnswered || !currentQuestion || !playerId) return;

    setSelectedAnswer(answer);
    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);

    try {
      await submitAnswer({
        playerId,
        questionId: currentQuestion.id,
        selectedAnswer: answer,
        correctAnswer: currentQuestion.correct_answer,
        timeTaken,
      });

      setHasAnswered(true);
      setShowExplanation(true);
      broadcastAnswer(playerId);

      const isCorrect = answer === currentQuestion.correct_answer;
      toast({
        title: isCorrect ? "Correct!" : "Incorrect",
        description: isCorrect ? "+10 points" : "Better luck next time",
        variant: isCorrect ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Error submitting answer:", error);
      toast({
        title: "Error",
        description: "Failed to submit answer",
        variant: "destructive",
      });
    }
  };

  const handleNextQuestion = async () => {
    if (!isHost) return;

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < totalQuestions) {
      try {
        await nextQuestion(nextIndex);
        setShowExplanation(false);
      } catch (error) {
        console.error("Error moving to next question:", error);
      }
    } else {
      // Quiz completed
      try {
        await endSession();
        onComplete();
      } catch (error) {
        console.error("Error ending session:", error);
      }
    }
  };

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const timeProgressPercentage = (timeLeft / timePerQuestion) * 100;
  const isCorrect = selectedAnswer === currentQuestion.correct_answer;

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {/* Progress Header */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <span className="flex items-center gap-1">
            <Timer className="h-4 w-4" />
            {timeLeft}s
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="capitalize">
              {session?.status}
            </Badge>
            {!hasAnswered && (
              <div className="flex items-center gap-2">
                <Progress value={timeProgressPercentage} className="h-2 w-24" />
                <span className={cn(
                  "font-bold",
                  timeLeft <= 5 && "text-red-500"
                )}>
                  {timeLeft}s
                </span>
              </div>
            )}
          </div>
          <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
          <CardDescription>Select your answer below</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Answer Options */}
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectAnswer = option === currentQuestion.correct_answer;
              const showCorrectAnswer = hasAnswered && isCorrectAnswer;
              const showWrongAnswer = hasAnswered && isSelected && !isCorrect;

              return (
                <Button
                  key={index}
                  variant="outline"
                  className={cn(
                    "h-auto p-4 text-left justify-start text-base transition-all",
                    isSelected && !hasAnswered && "border-purple-500 bg-purple-50",
                    showCorrectAnswer && "border-green-500 bg-green-50 text-green-900",
                    showWrongAnswer && "border-red-500 bg-red-50 text-red-900"
                  )}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={hasAnswered}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-8 w-8 rounded-full border-2 flex items-center justify-center font-bold",
                        showCorrectAnswer && "border-green-500 bg-green-500 text-white",
                        showWrongAnswer && "border-red-500 bg-red-500 text-white",
                        !hasAnswered && "border-muted-foreground"
                      )}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                    {showCorrectAnswer && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && currentQuestion.explanation && (
            <div className={cn(
              "p-4 rounded-lg border-l-4",
              isCorrect ? "bg-green-50 border-green-500" : "bg-blue-50 border-blue-500"
            )}>
              <p className="font-semibold mb-1">Explanation:</p>
              <p className="text-sm">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Next Button (Host Only) */}
          {isHost && hasAnswered && (
            <Button
              onClick={handleNextQuestion}
              className="w-full"
              size="lg"
            >
              {currentQuestionIndex + 1 < totalQuestions ? (
                <>
                  Next Question
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              ) : (
                <>
                  Finish Quiz
                  <Trophy className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          )}

          {/* Waiting Message (Non-Host) */}
          {!isHost && hasAnswered && (
            <div className="text-center p-4 bg-accent/50 rounded-lg">
              <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Waiting for next question...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Live Leaderboard (Mini) */}
      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Live Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {players?.slice(0, 5).map((player, index) => (
              <div
                key={player.id}
                className="flex items-center justify-between p-2 bg-accent/30 rounded"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-muted-foreground">#{index + 1}</span>
                  <span className="font-medium">{player.student_name}</span>
                  {player.id === playerId && (
                    <Badge variant="outline" className="text-xs">You</Badge>
                  )}
                </div>
                <span className="font-bold text-purple-600">{player.score} pts</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
