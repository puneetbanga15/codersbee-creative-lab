import { QuizCard } from "./QuizCard";

type Quiz = {
  id: string;
  title: string;
  description: string;
  quiz_type: 'scratch' | 'python' | 'ai';
  is_premium: boolean;
};

type QuizGridProps = {
  quizzes: Quiz[] | undefined;
  canAccessPremiumQuiz: boolean;
  onStartQuiz: (quizId: string) => void;
  onRequestAccess: (quizId: string) => void;
  isLoading?: boolean;
};

export const QuizGrid = ({
  quizzes,
  canAccessPremiumQuiz,
  onStartQuiz,
  onRequestAccess,
  isLoading
}: QuizGridProps) => {
  if (isLoading) {
    return <div className="text-center">Loading quizzes...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes?.map((quiz) => (
        <QuizCard
          key={quiz.id}
          quiz={quiz}
          canAccessPremiumQuiz={canAccessPremiumQuiz}
          onStartQuiz={onStartQuiz}
          onRequestAccess={onRequestAccess}
        />
      ))}
    </div>
  );
};