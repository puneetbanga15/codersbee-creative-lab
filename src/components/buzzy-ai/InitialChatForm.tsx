
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/ui/chat-input";
import { KeyboardEvent } from "react";

interface InitialChatFormProps {
  visible: boolean;
  inputValue: string;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const InitialChatForm = ({ 
  visible, 
  inputValue, 
  isLoading, 
  onInputChange, 
  onKeyDown, 
  onSubmit 
}: InitialChatFormProps) => {
  if (!visible) return null;
  
  return (
    <form 
      onSubmit={onSubmit}
      className="relative max-w-2xl mx-auto rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
    >
      <ChatInput
        value={inputValue}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        placeholder="Ask me anything about coding, AI, and CodersBee's programs!"
        className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0 text-base md:text-lg"
      />
      <div className="flex items-center p-3 pt-0">
        <Button
          type="submit"
          size="sm"
          className="ml-auto gap-1.5"
          disabled={!inputValue.trim() || isLoading}
        >
          Send Message
          <Send className="w-3.5 h-3.5" />
        </Button>
      </div>
    </form>
  );
};
