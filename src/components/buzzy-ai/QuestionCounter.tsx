
import { cn } from "@/lib/utils";

interface QuestionCounterProps {
  remaining: number;
  total: number;
}

export const QuestionCounter = ({ remaining, total }: QuestionCounterProps) => {
  return (
    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
      <span>{remaining} questions remaining</span>
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full",
              i < remaining ? "bg-[#9b87f5]" : "bg-gray-200"
            )}
          />
        ))}
      </div>
    </div>
  );
};
