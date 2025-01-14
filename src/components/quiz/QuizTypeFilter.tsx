import { Button } from "@/components/ui/button";
import { Menu, ListCheck, ListOrdered, Crown, Sparkles } from "lucide-react";
import { QuizType } from "./QuizLayout";

type QuizTypeFilterProps = {
  selectedType: QuizType;
  onTypeSelect: (type: QuizType) => void;
};

export const QuizTypeFilter = ({ selectedType, onTypeSelect }: QuizTypeFilterProps) => {
  const quizTypes = [
    { value: null, label: 'All Quizzes', icon: Menu },
    { value: 'scratch', label: 'Scratch', icon: ListCheck },
    { value: 'python', label: 'Python', icon: ListOrdered },
    { value: 'web', label: 'Web Development', icon: Menu },
    { value: 'cloud', label: 'Cloud Computing', icon: Menu },
    { value: 'ai', label: 'AI & ML', icon: Sparkles },
    { value: 'free', label: 'Free Quizzes', icon: Menu },
    { value: 'premium', label: 'Premium', icon: Crown },
  ] as const;

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {quizTypes.map((type) => (
        <Button
          key={type.value ?? 'all'}
          variant="outline"
          onClick={() => onTypeSelect(type.value)}
          className={selectedType === type.value ? "bg-codersbee-vivid text-white" : ""}
        >
          <type.icon className="w-4 h-4 mr-2" />
          {type.label}
        </Button>
      ))}
    </div>
  );
};