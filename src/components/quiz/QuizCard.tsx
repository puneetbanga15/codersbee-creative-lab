import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, LockOpen } from "lucide-react";

type QuizCardProps = {
  quiz: {
    id: string;
    title: string;
    description: string;
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
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="flex items-center gap-2">
            {quiz.title}
            {quiz.is_premium && (
              quiz.is_premium && !canAccessPremiumQuiz ? (
                <Lock className="h-5 w-5 text-red-500" />
              ) : (
                <LockOpen className="h-5 w-5 text-green-500" />
              )
            )}
          </CardTitle>
          {quiz.is_premium && (
            <Badge className="bg-yellow-500">Premium</Badge>
          )}
        </div>
        <CardDescription>{quiz.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          className="w-full"
          onClick={() => {
            if (quiz.is_premium && !canAccessPremiumQuiz) {
              onRequestAccess(quiz.id);
            } else {
              onStartQuiz(quiz.id);
            }
          }}
        >
          {quiz.is_premium && !canAccessPremiumQuiz ? "Enter Access Code" : "Start Quiz"}
        </Button>
      </CardContent>
    </Card>
  );
};