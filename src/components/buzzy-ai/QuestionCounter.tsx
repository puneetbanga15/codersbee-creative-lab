import { cn } from "@/lib/utils";

interface QuestionCounterProps {
  current: number;
  max: number;
  isCompact?: boolean;
}

export const QuestionCounter = ({ current, max, isCompact = false }: QuestionCounterProps) => {
  const remaining = max - current;
  
  return (
    <div className={`flex items-center justify-center gap-2 text-${isCompact ? 'xs' : 'sm'} text-gray-600 mb-${isCompact ? '2' : '4'}`}>
      <span>{remaining} questions remaining</span>
      <div className="flex gap-1">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={cn(
              `w-${isCompact ? '1.5' : '2'} h-${isCompact ? '1.5' : '2'} rounded-full`,
              i < remaining ? "bg-[#9b87f5]" : "bg-gray-200"
            )}
          />
        ))}
      </div>
    </div>
  );
};
