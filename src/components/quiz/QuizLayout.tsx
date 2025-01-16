import { Navbar } from "@/components/Navbar";
import { QuizHeader } from "@/components/quiz/QuizHeader";
import { QuizTypeFilter } from "@/components/quiz/QuizTypeFilter";
import { QuizGrid } from "@/components/quiz/QuizGrid";

type FilterType = 'scratch' | 'python' | 'ai' | 'web' | 'cloud' | 'free' | 'premium' | null;

type QuizLayoutProps = {
  userRole: string | null;
  selectedType: FilterType;
  onTypeSelect: (type: FilterType) => void;
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
  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <QuizHeader 
          userRole={userRole} 
          onManageAccessCodes={undefined} 
        />

        <QuizTypeFilter 
          selectedType={selectedType}
          onTypeSelect={onTypeSelect}
        />

        <QuizGrid
          quizzes={quizzes}
          canAccessPremiumQuiz={canAccessPremiumQuiz}
          onStartQuiz={onStartQuiz}
          onRequestAccess={onRequestAccess}
          isLoading={isLoadingQuizzes}
        />
      </div>
    </div>
  );
};