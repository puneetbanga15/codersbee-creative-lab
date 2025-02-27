
import { RefObject } from "react";
import { ChatMessage } from "./ChatMessage";
import { Button } from "@/components/ui/button";
import { MessageSquare, Frown, Send } from "lucide-react";
import { ChatInput } from "@/components/ui/chat-input";
import { QuestionCounter } from "./QuestionCounter";
import { Message, MAX_QUESTIONS, RESPONSE_TEMPLATES } from "./constants";

interface ChatConversationProps {
  visible: boolean;
  messages: Message[];
  isLoading: boolean;
  questionsAsked: number;
  inputValue: string;
  reachedLimit: boolean;
  chatContainerRef: RefObject<HTMLDivElement>;
  onSetInputValue: (value: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ChatConversation = ({
  visible,
  messages,
  isLoading,
  questionsAsked,
  inputValue,
  reachedLimit,
  chatContainerRef,
  onSetInputValue,
  onInputChange,
  onKeyDown,
  onSubmit
}: ChatConversationProps) => {
  if (!visible) return null;

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] bg-white rounded-lg shadow-lg">
      <div className="bg-[#9b87f5] p-4 rounded-t-lg">
        <h2 className="text-white text-lg font-medium flex items-center gap-2">
          <img 
            src="/lovable-uploads/230855da-e71d-43ac-a6b6-1c45a8569cce.png" 
            alt="Buzzy"
            className="w-12 h-12 object-contain"
          />
          Chat with Buzzy
        </h2>
      </div>

      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 text-base md:text-lg">
        {messages.map((message, index) => (
          <ChatMessage key={index} {...message} />
        ))}
        {isLoading && (
          <ChatMessage
            role="assistant"
            content={RESPONSE_TEMPLATES.thinking}
            isLoading={true}
          />
        )}
        
        {messages.length > 0 && !isLoading && messages[messages.length - 1].role === "assistant" && (
          <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
            <p className="flex items-center gap-1 text-xs">
              <MessageSquare className="w-4 h-4" />
              Not the answer you needed? 
              <Button 
                variant="link" 
                className="p-0 h-auto text-xs text-[#9b87f5]"
                onClick={() => onSetInputValue("This is not the answer I was looking for. Can you help with ")}
              >
                Ask a follow-up question
              </Button>
            </p>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <QuestionCounter remaining={MAX_QUESTIONS - questionsAsked} total={MAX_QUESTIONS} />
        {reachedLimit ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <Frown className="w-4 h-4 text-amber-500" />
              You've reached the free question limit
            </p>
            <Button
              className="w-full bg-green-500 hover:bg-green-600"
              onClick={() => window.open("https://wa.me/919996465023", "_blank")}
            >
              Continue on WhatsApp →
            </Button>
          </div>
        ) : (
          <form 
            onSubmit={onSubmit}
            className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
          >
            <ChatInput
              value={inputValue}
              onChange={onInputChange}
              onKeyDown={onKeyDown}
              placeholder="Type your message here..."
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
        )}
      </div>
    </div>
  );
};
