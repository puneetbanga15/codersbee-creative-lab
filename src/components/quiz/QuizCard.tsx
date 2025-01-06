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
  const isLocked = quiz.is_premium && !canAccessPremiumQuiz;

  return (
    <Card className="relative transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="flex items-center gap-2">
            {quiz.title}
            {quiz.is_premium && (
              isLocked ? (
                <Lock className="h-5 w-5 text-red-500" />
              ) : (
                <LockOpen className="h-5 w-5 text-green-500" />
              )
            )}
          </CardTitle>
          {quiz.is_premium && (
            <Badge variant={isLocked ? "destructive" : "default"} className="bg-yellow-500">
              Premium
            </Badge>
          )}
        </div>
        <CardDescription>{quiz.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          className="w-full"
          variant={isLocked ? "outline" : "default"}
          onClick={() => {
            if (isLocked) {
              onRequestAccess(quiz.id);
            } else {
              onStartQuiz(quiz.id);
            }
          }}
        >
          {isLocked ? (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Enter Access Code
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Start Quiz
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};