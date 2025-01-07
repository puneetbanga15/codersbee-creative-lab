import { Button } from "@/components/ui/button";

type QuizType = 'scratch' | 'python' | 'ai' | 'web' | 'cloud' | null;
type FilterType = QuizType | 'free' | 'premium';

type QuizTypeFilterProps = {
  selectedType: FilterType;
  onTypeSelect: (type: FilterType) => void;
};

export const QuizTypeFilter = ({ selectedType, onTypeSelect }: QuizTypeFilterProps) => {
  const quizTypes = [
    { value: 'scratch', label: 'Scratch' },
    { value: 'python', label: 'Python' },
    { value: 'ai', label: 'AI' },
    { value: 'web', label: 'Web' },
    { value: 'cloud', label: 'Cloud' },
    { value: 'free', label: 'Free' },
    { value: 'premium', label: 'Premium' },
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
          {type.label}
        </Button>
      ))}
    </div>
  );
};