import { SidebarProvider } from "@/components/ui/sidebar";
import { QuizHeader } from "@/components/quiz/QuizHeader";
import { QuizTypeFilter } from "@/components/quiz/QuizTypeFilter";
import { QuizGrid } from "@/components/quiz/QuizGrid";
import { QuizSidebar, QuizType } from "@/components/quiz/QuizSidebar";
import { Navbar } from "@/components/Navbar";

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
  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <QuizSidebar 
            selectedType={selectedType}
            onTypeSelect={onTypeSelect}
          />
          <main className="flex-1">
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
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};