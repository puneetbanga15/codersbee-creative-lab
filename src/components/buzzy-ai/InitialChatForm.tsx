
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/ui/chat-input";
import { KeyboardEvent } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface InitialChatFormProps {
  visible: boolean;
  inputValue: string;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isCompact?: boolean;
}

export const InitialChatForm = ({ 
  visible, 
  inputValue, 
  isLoading, 
  onInputChange, 
  onKeyDown, 
  onSubmit,
  isCompact = false
}: InitialChatFormProps) => {
  const isMobile = useIsMobile();
  
  if (!visible) return null;
  
  return (
    <form 
      onSubmit={onSubmit}
      className={`relative ${isCompact ? 'max-w-full mx-2' : 'max-w-2xl mx-auto'} rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1`}
    >
      <ChatInput
        value={inputValue}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        placeholder={isMobile ? "Ask about our programs..." : "Ask about our programs, enrollment, AI or coding"}
        className={`min-h-${isCompact ? '10' : '12'} resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0 text-${isCompact ? 'sm' : 'base'} md:text-${isCompact ? 'base' : 'lg'}`}
      />
      <div className="flex items-center p-3 pt-0">
        <Button
          type="submit"
          size="sm"
          className={`ml-auto gap-1.5 ${isCompact ? 'h-8 px-2' : ''}`}
          disabled={!inputValue.trim() || isLoading}
        >
          {isCompact || isMobile ? <Send className="w-3 h-3" /> : (
            <>
              Send Message
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
