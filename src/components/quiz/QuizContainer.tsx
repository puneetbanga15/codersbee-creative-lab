import { ChevronLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Quiz } from "@/components/Quiz";
import { Button } from "@/components/ui/button";

type QuizContainerProps = {
  quizId: string;
  onBack: () => void;
};

export const QuizContainer = ({ quizId, onBack }: QuizContainerProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <Button 
          onClick={onBack} 
          className="mb-8 hover:bg-codersbee-vivid hover:text-white"
          variant="outline"
          size="lg"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Quizzes
        </Button>
        <Quiz quizId={quizId} />
      </div>
    </div>
  );
};