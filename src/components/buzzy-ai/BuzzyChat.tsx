
import { useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { QuestionCounter } from "./QuestionCounter";
import { Button } from "@/components/ui/button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const MAX_QUESTIONS = 5;

const RESPONSE_TEMPLATES = {
  welcome: "Hi! I'm Buzzy, your AI tutor for coding and AI learning. How can I help you today?",
  thinking: "Let me think about that...",
  error: "I apologize, but I'm having trouble connecting right now. Please try again in a moment or reach out to our team via WhatsApp for immediate assistance.",
};

export const BuzzyChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: RESPONSE_TEMPLATES.welcome,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const supabase = useSupabaseClient();

  const handleSendMessage = async (message: string) => {
    if (questionsAsked >= MAX_QUESTIONS) return;
    
    try {
      setMessages((prev) => [...prev, { role: "user", content: message }]);
      setIsLoading(true);
      setQuestionsAsked((prev) => prev + 1);

      const { data: response, error } = await supabase.functions.invoke('chat-with-buzzy', {
        body: { message }
      });

      console.log('Edge function response:', response);
      console.log('Edge function error:', error);

      if (error) {
        console.error('Error calling edge function:', error);
        toast.error("Sorry, I'm having trouble connecting. Please try again.");
        throw error;
      }

      if (!response?.answer) {
        throw new Error('No answer received from AI');
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: questionsAsked >= MAX_QUESTIONS - 1
            ? RESPONSE_TEMPLATES.questionLimit
            : response.answer,
        },
      ]);
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

  const reachedLimit = questionsAsked >= MAX_QUESTIONS;

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] bg-white rounded-lg shadow-lg">
      <div className="bg-[#9b87f5] p-4 rounded-t-lg">
        <h2 className="text-white text-lg font-medium flex items-center gap-2">
          <img 
            src="/lovable-uploads/230855da-e71d-43ac-a6b6-1c45a8569cce.png" 
            alt="Buzzy"
            className="w-8 h-8 object-contain"
          />
          Chat with Buzzy
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
      </div>

      <div className="p-4 border-t">
        <QuestionCounter remaining={MAX_QUESTIONS - questionsAsked} total={MAX_QUESTIONS} />
        {reachedLimit ? (
          <Button
            className="w-full bg-green-500 hover:bg-green-600"
            onClick={() => window.open("https://wa.me/919996465023", "_blank")}
          >
            Continue on WhatsApp →
          </Button>
        ) : (
          <ChatInput
            onSend={handleSendMessage}
            disabled={isLoading || reachedLimit}
          />
        )}
      </div>
    </div>
  );
};
