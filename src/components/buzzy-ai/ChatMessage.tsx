import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Message } from "./constants";

interface ChatMessageProps {
  message: Message;
  isCompact?: boolean;
}

export const ChatMessage = ({ message, isCompact = false }: ChatMessageProps) => {
  const { role, content } = message;
  const [formattedContent, setFormattedContent] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Process the message content when it changes
    formatMessage(content);
  }, [content]);

  // Improved message formatter with better link detection and formatting
  const formatMessage = (text: string) => {
    // Handle WhatsApp links, calendly links, and special formatting
    const parts: React.ReactNode[] = [];
    
    // Split by sentences or phrases
    const sentences = text.split(/(?<=\. |\! |\? )/);
    
    sentences.forEach((sentence, idx) => {
      // Check for WhatsApp mentions
      if (sentence.toLowerCase().includes('whatsapp') || sentence.includes('919996465023')) {
        parts.push(
          <div key={`wa-${idx}`} className="mt-2">
            <Button
              className="bg-green-500 hover:bg-green-600 text-white"
              size={isCompact ? "sm" : "default"}
              onClick={() => window.open("https://wa.me/919996465023", "_blank")}
            >
              Chat with our team on WhatsApp →
            </Button>
          </div>
        );
      } 
      // Check for Calendly mentions
      else if (sentence.toLowerCase().includes('calendly') || sentence.toLowerCase().includes('book your free trial')) {
        parts.push(
          <div key={`cal-${idx}`} className="mt-2">
            <Button
              className="bg-[#9b87f5] hover:bg-[#8A78E0] text-white"
              size={isCompact ? "sm" : "default"}
              onClick={() => window.open("https://calendly.com/codersbee/class-slot", "_blank")}
            >
              Book a FREE trial class →
            </Button>
          </div>
        );
      }
      // Add the regular text
      else {
        parts.push(<span key={`txt-${idx}`}>{sentence}</span>);
      }
    });
    
    setFormattedContent(parts);
  };

  return (
    <div
      className={cn(
        "flex w-full mb-4",
        role === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          `max-w-[80%] md:max-w-[70%] rounded-2xl px-${isCompact ? '3' : '4'} py-${isCompact ? '1.5' : '2'}`,
          role === "user"
            ? "bg-[#9b87f5] text-white rounded-tr-none"
            : "bg-gray-100 text-gray-800 rounded-tl-none"
        )}
      >
        {role === "assistant" && (
          <div className="flex items-center gap-2 mb-1">
            <img 
              src="/lovable-uploads/230855da-e71d-43ac-a6b6-1c45a8569cce.png" 
              alt="Buzzy Bee"
              className={`w-${isCompact ? '4' : '5'} h-${isCompact ? '4' : '5'} object-contain`}
            />
            <span className={`font-medium text-${isCompact ? 'xs' : 'sm'}`}>Buzzy Bee</span>
          </div>
        )}
        <div className={`text-${isCompact ? 'xs' : 'sm'} md:text-${isCompact ? 'sm' : 'base'} whitespace-pre-wrap flex flex-col`}>
          {formattedContent}
        </div>
      </div>
    </div>
  );
};
