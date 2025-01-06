import { Button } from "@/components/ui/button";

type QuizType = 'scratch' | 'python' | 'ai' | null;

type QuizTypeFilterProps = {
  selectedType: QuizType;
  onTypeSelect: (type: QuizType) => void;
};

export const QuizTypeFilter = ({ selectedType, onTypeSelect }: QuizTypeFilterProps) => {
  const quizTypes = [
    { value: 'scratch', label: 'Scratch' },
    { value: 'python', label: 'Python' },
    { value: 'ai', label: 'AI' },
  ];

  return (
    <div className="flex justify-center gap-4 mb-8">
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
          onClick={() => onTypeSelect(type.value as QuizType)}
          className={selectedType === type.value ? "bg-codersbee-vivid text-white" : ""}
        >
          {type.label}
        </Button>
      ))}
    </div>
  );
};