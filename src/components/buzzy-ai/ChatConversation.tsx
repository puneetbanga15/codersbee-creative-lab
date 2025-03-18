import { RefObject } from "react";
import { ChatMessage } from "./ChatMessage";
import { Button } from "@/components/ui/button";
import { MessageSquare, Frown, Send, Lightbulb } from "lucide-react";
import { ChatInput } from "@/components/ui/chat-input";
import { QuestionCounter } from "./QuestionCounter";
import { Message, MAX_QUESTIONS, RESPONSE_TEMPLATES } from "./constants";
import { motion } from "framer-motion";

// Quick response templates for the user to select
const QUICK_RESPONSES = [
  "Tell me about your coding courses",
  "What age groups do you teach?",
  "How much do classes cost?",
  "Book a free trial class"
];

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
  onStartJourney?: () => void;
  shouldTriggerJourney?: boolean;
  isCompact?: boolean;
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
  onSubmit,
  onStartJourney,
  shouldTriggerJourney,
  isCompact = false
}: ChatConversationProps) => {
  if (!visible) return null;

  return (
    <div className={`flex flex-col ${isCompact ? 'h-[420px]' : 'h-[600px] max-h-[80vh]'} bg-white rounded-lg ${isCompact ? '' : 'shadow-lg'}`}>
      {!isCompact && (
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
      )}
      
      <div 
        ref={chatContainerRef}
        className={`flex-1 overflow-y-auto p-4 ${isCompact ? 'pb-2' : 'pb-4'} space-y-4`}
      >
        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            message={message} 
            isCompact={isCompact}
          />
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className={`${isCompact ? 'w-8 h-8' : 'w-10 h-10'} rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0`}>
              <MessageSquare className={`${isCompact ? 'w-4 h-4' : 'w-5 h-5'} text-purple-500`} />
            </div>
            <div className="flex-1 bg-purple-50 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-purple-300 rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-purple-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-3 h-3 bg-purple-300 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        
        {shouldTriggerJourney && onStartJourney && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center my-4"
          >
            <Button 
              variant="outline" 
              className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 gap-2"
              onClick={onStartJourney}
            >
              <Lightbulb className="w-4 h-4" />
              Start Learning Journey Quiz
            </Button>
          </motion.div>
        )}
      </div>
      
      <div className={`p-${isCompact ? '2' : '4'} border-t`}>
        {reachedLimit ? (
          <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
            <Frown className="w-5 h-5 text-amber-500 mx-auto mb-2" />
            <p className="text-sm text-amber-800 mb-2">
              You've reached the maximum number of questions for this session.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={() => window.open("https://calendly.com/codersbee/class-slot", "_blank")}
            >
              Book a Free Trial Class
            </Button>
          </div>
        ) : (
          <>
            <QuestionCounter current={questionsAsked} max={MAX_QUESTIONS} isCompact={isCompact} />
            
            <form onSubmit={onSubmit} className="mt-2 relative">
              <ChatInput
                value={inputValue}
                onChange={onInputChange}
                onKeyDown={onKeyDown}
                placeholder="Type your message..."
                className={`min-h-${isCompact ? '8' : '10'} resize-none rounded-lg border-gray-200 p-3 pr-12 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 text-${isCompact ? 'sm' : 'base'}`}
              />
              <Button
                type="submit"
                size="sm"
                className={`absolute right-2 bottom-${isCompact ? '1.5' : '2'} rounded-full p-1.5 h-auto`}
                disabled={!inputValue.trim() || isLoading}
              >
                <Send className={`${isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-purple-500`} />
              </Button>
            </form>
            
            {messages.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {QUICK_RESPONSES.map((template, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`text-${isCompact ? 'xs' : 'sm'} px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors`}
                    onClick={() => onSetInputValue(template)}
                  >
                    {template}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
