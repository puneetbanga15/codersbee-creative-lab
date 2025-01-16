import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuizHeader } from "@/components/quiz/QuizHeader";
import { QuizTypeFilter } from "@/components/quiz/QuizTypeFilter";
import { QuizGrid } from "@/components/quiz/QuizGrid";

export type QuizType = 'scratch' | 'python' | 'ai' | 'web' | 'cloud' | 'free' | 'premium' | null;

type QuizLayoutProps = {
  userRole: string | null;
  selectedType: QuizType;
  onTypeSelect: (type: QuizType) => void;
  quizzes: any[];
  canAccessPremiumQuiz: boolean;
  onStartQuiz: (quizId: string) => void;
  onRequestAccess: (quizId: string) => void;
  isLoadingQuizzes: boolean;
};

export const QuizLayout = ({
  userRole,
  selectedType,
  onTypeSelect,
  quizzes,
  canAccessPremiumQuiz,
  onStartQuiz,
  onRequestAccess,
  isLoadingQuizzes,
}: QuizLayoutProps) => {
  const filteredQuizzes = selectedType 
    ? quizzes.filter(quiz => {
        if (selectedType === 'free') return !quiz.is_premium;
        if (selectedType === 'premium') return quiz.is_premium;
        return quiz.quiz_type === selectedType;
      })
    : quizzes;

  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 flex-grow">
        <QuizHeader 
          userRole={userRole} 
          onManageAccessCodes={undefined} 
        />
        <QuizTypeFilter 
          selectedType={selectedType}
          onTypeSelect={onTypeSelect}
        />
        <QuizGrid
          quizzes={filteredQuizzes}
          canAccessPremiumQuiz={canAccessPremiumQuiz}
          onStartQuiz={onStartQuiz}
          onRequestAccess={onRequestAccess}
          isLoading={isLoadingQuizzes}
        />
      </div>
      <Footer />
    </div>
  );
};