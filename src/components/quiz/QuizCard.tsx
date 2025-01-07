import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, LockOpen, Play } from "lucide-react";

type QuizCardProps = {
  quiz: {
    id: string;
    title: string;
    description: string;
    quiz_type: 'scratch' | 'python' | 'ai';
    is_premium: boolean;
  };
  canAccessPremiumQuiz: boolean;
  onStartQuiz: (quizId: string) => void;
  onRequestAccess: (quizId: string) => void;
};

export const QuizCard = ({ 
  quiz, 
  canAccessPremiumQuiz, 
  onStartQuiz, 
  onRequestAccess 
}: QuizCardProps) => {
  const handleQuizStart = () => {
    if (quiz.is_premium && !canAccessPremiumQuiz) {
      onRequestAccess(quiz.id);
    } else if (quiz.is_premium) {
      onRequestAccess(quiz.id);
    } else {
      onStartQuiz(quiz.id);
    }
  };

  return (
    <Card className="relative transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="flex items-center gap-2">
            {quiz.title}
            {quiz.is_premium && (
              canAccessPremiumQuiz ? (
                <LockOpen className="h-5 w-5 text-green-500" />
              ) : (
                <Lock className="h-5 w-5 text-yellow-500" />
              )
            )}
          </CardTitle>
          {quiz.is_premium && (
            <Badge variant="secondary" className="bg-yellow-500 text-white">
              Premium
            </Badge>
          )}
        </div>
        <CardDescription>{quiz.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          className="w-full"
          onClick={handleQuizStart}
        >
          <Play className="mr-2 h-4 w-4" />
          Start Quiz
        </Button>
      </CardContent>
    </Card>
  );
};