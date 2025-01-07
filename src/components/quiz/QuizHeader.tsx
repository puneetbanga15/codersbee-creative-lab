import { Button } from "@/components/ui/button";

type QuizHeaderProps = {
  userRole: string | null;
  onManageAccessCodes?: () => void;
};

export const QuizHeader = ({ userRole, onManageAccessCodes }: QuizHeaderProps) => {
  return (
    <div className="space-y-6 mb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-codersbee-dark">
          Learning <span className="text-codersbee-vivid">Quizzes</span>
        </h1>
        {userRole === 'admin' && onManageAccessCodes && (
          <Button 
            onClick={onManageAccessCodes}
            className="bg-codersbee-vivid hover:bg-codersbee-vivid/90"
          >
            Manage Access Codes
          </Button>
        )}
      </div>
      
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <p className="text-lg text-gray-600 leading-relaxed">
          These quizzes are designed to test and reinforce your knowledge of programming concepts.
          At CodersBee, we encourage our students to attempt these quizzes as part of their learning journey.
        </p>
        <p className="text-lg text-codersbee-vivid font-medium">
          All CodersBee students receive complimentary access to our premium quiz content!
        </p>
      </div>
    </div>
  );
};