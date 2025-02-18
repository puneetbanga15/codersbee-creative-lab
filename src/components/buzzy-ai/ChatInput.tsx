
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput = ({ onSend, disabled, placeholder }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder || "Ask Buzzy anything about coding and AI..."}
        disabled={disabled}
        className="flex-1"
      />
      <Button 
        type="submit" 
        disabled={disabled || !message.trim()}
        className="bg-[#9b87f5] hover:bg-[#7E69AB]"
      >
        <SendHorizontal className="h-4 w-4" />
      </Button>
    </form>
  );
};
