
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
}

export const ChatMessage = ({ role, content, isLoading }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4",
        role === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-2",
          role === "user"
            ? "bg-[#9b87f5] text-white rounded-tr-none"
            : "bg-gray-100 text-gray-800 rounded-tl-none",
          isLoading && "animate-pulse"
        )}
      >
        {role === "assistant" && (
          <div className="flex items-center gap-2 mb-1">
            <img 
              src="/lovable-uploads/230855da-e71d-43ac-a6b6-1c45a8569cce.png" 
              alt="Buzzy Bee"
              className="w-5 h-5 object-contain"
            />
            <span className="font-medium text-sm">Buzzy Bee</span>
          </div>
        )}
        <p className="text-sm md:text-base whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
};
