import { Button } from "@/components/ui/button";
import { Menu, ListCheck, ListOrdered } from "lucide-react";

type QuizType = 'scratch' | 'python' | 'ai' | 'web' | 'cloud' | null;
type FilterType = QuizType | 'free' | 'premium';

type QuizTypeFilterProps = {
  selectedType: FilterType;
  onTypeSelect: (type: FilterType) => void;
};

export const QuizTypeFilter = ({ selectedType, onTypeSelect }: QuizTypeFilterProps) => {
  const quizTypes = [
    { value: 'scratch', label: 'Scratch', icon: ListCheck },
    { value: 'python', label: 'Python', icon: ListOrdered },
    { value: 'web', label: 'Web Development', icon: Menu },
    { value: 'cloud', label: 'Cloud Computing', icon: Menu },
    { value: 'ai', label: 'AI & ML', icon: Menu },
    { value: 'free', label: 'Free Quizzes', icon: Menu },
    { value: 'premium', label: 'Premium', icon: Menu },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <Button
        variant="outline"
        onClick={() => onTypeSelect(null)}
        className={!selectedType ? "bg-codersbee-vivid text-white" : ""}
      >
        All
      </Button>
      {quizTypes.map((type) => (
        <Button
          key={type.value}
          variant="outline"
          onClick={() => onTypeSelect(type.value as FilterType)}
          className={selectedType === type.value ? "bg-codersbee-vivid text-white" : ""}
        >
          <type.icon className="w-4 h-4 mr-2" />
          {type.label}
        </Button>
      ))}
    </div>
  );
};