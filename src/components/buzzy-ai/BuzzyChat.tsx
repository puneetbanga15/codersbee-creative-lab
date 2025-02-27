
import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { QuestionCounter } from "./QuestionCounter";
import { Button } from "@/components/ui/button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { Send, Frown, MessageSquare } from "lucide-react";
import { ChatInput } from "@/components/ui/chat-input";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const MAX_QUESTIONS = 5;

const RESPONSE_TEMPLATES = {
  thinking: "Let me think about that...",
  error: "I apologize, but I'm having trouble connecting right now. Please try again in a moment or reach out to our team via WhatsApp for immediate assistance.",
  questionLimit: "You've asked some great questions! To continue this exciting discussion, please click the WhatsApp button above to connect with our teaching team. They're ready to provide personalized guidance for your coding journey!"
};

export const BuzzyChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [continuingChat, setContinuingChat] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const supabase = useSupabaseClient();

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading || (questionsAsked >= MAX_QUESTIONS && !continuingChat)) return;
    
    const message = inputValue.trim();
    setInputValue("");
    
    try {
      // Add user message to chat
      setMessages((prev) => [...prev, { role: "user", content: message }]);
      setIsLoading(true);
      
      // Only increment question count if it's a new question, not a follow-up
      if (!continuingChat) {
        setQuestionsAsked((prev) => prev + 1);
      }

      // Get last 3 message pairs to maintain context
      const conversationHistory = messages.slice(-6);

      const { data: response, error } = await supabase.functions.invoke('chat-with-buzzy', {
        body: { 
          message,
          previousMessages: conversationHistory
        }
      });

      if (error) {
        console.error('Error calling edge function:', error);
        toast.error("Sorry, I'm having trouble connecting. Please try again.");
        throw error;
      }

      if (!response?.answer) {
        throw new Error('No answer received from AI');
      }

      const newResponse = questionsAsked >= MAX_QUESTIONS - 1 && !continuingChat
        ? RESPONSE_TEMPLATES.questionLimit
        : response.answer;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: newResponse,
        },
      ]);
      
      // After first reaching the question limit, allow for follow-ups but in a continuation mode
      if (questionsAsked >= MAX_QUESTIONS - 1 && !continuingChat) {
        setContinuingChat(true);
      }
      
    } catch (error) {
      console.error('Error chatting with Buzzy:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: RESPONSE_TEMPLATES.error,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const reachedLimit = questionsAsked >= MAX_QUESTIONS && !continuingChat;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-4 mt-20">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1A1F2C] mb-2">
          Meet Buzzy
        </h1>
        <p className="text-lg md:text-xl mb-6 bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] bg-clip-text text-transparent font-medium" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          Secure AI chat for parents and kids
        </p>
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/230855da-e71d-43ac-a6b6-1c45a8569cce.png" 
            alt="Buzzy Bee"
            className="w-32 h-32 md:w-40 md:h-40 object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {messages.length === 0 && (
          <form 
            onSubmit={handleSendMessage}
            className="relative max-w-2xl mx-auto rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
          >
            <ChatInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
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
        )}
      </div>

      {messages.length > 0 && (
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
                    onClick={() => setInputValue("This is not the answer I was looking for. Can you help with ")}
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
                onSubmit={handleSendMessage}
                className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
              >
                <ChatInput
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
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
      )}
    </div>
  );
};
