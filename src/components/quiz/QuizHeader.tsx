import { Button } from "@/components/ui/button";

type QuizHeaderProps = {
  userRole: string | null;
  onManageAccessCodes: () => void;
};

export const QuizHeader = ({ userRole, onManageAccessCodes }: QuizHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-codersbee-dark">
        Learning <span className="text-codersbee-vivid">Quizzes</span>
      </h1>
      {userRole === 'admin' && (
        <Button 
          onClick={onManageAccessCodes}
          className="bg-codersbee-vivid hover:bg-codersbee-vivid/90"
        >
          Manage Access Codes
        </Button>
      )}
    </div>
  );
};