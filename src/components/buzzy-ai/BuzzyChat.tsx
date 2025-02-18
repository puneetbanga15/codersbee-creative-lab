
import { useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { QuestionCounter } from "./QuestionCounter";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const MAX_QUESTIONS = 5;

const RESPONSE_TEMPLATES = {
  welcome: "Hi! I'm Buzzy Bee, your AI tutor for coding and AI learning. How can I help you today? 🐝",
  thinking: "Buzzing through my knowledge base... 🐝",
  outOfScope: "I specialize in coding and AI topics for kids. For detailed information about this topic, please click the WhatsApp button above to connect directly with our experienced teaching team! They'll be happy to help you.",
  questionLimit: "You've asked some great questions! 🌟 To continue this exciting discussion, please click the WhatsApp button above to connect with our teaching team. They're ready to provide personalized guidance for your coding journey!",
  fallback: "That's an interesting question! While I'm still learning, our experienced teachers would love to provide you with detailed insights. Click the WhatsApp button above to start a conversation with them right away!"
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

  const handleSendMessage = async (message: string) => {
    if (questionsAsked >= MAX_QUESTIONS) return;
    
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setIsLoading(true);
    setQuestionsAsked((prev) => prev + 1);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: questionsAsked >= MAX_QUESTIONS - 1
            ? RESPONSE_TEMPLATES.questionLimit
            : RESPONSE_TEMPLATES.fallback,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const reachedLimit = questionsAsked >= MAX_QUESTIONS;

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] bg-white rounded-lg shadow-lg">
      <div className="bg-[#9b87f5] p-4 rounded-t-lg">
        <h2 className="text-white text-lg font-medium flex items-center gap-2">
          <img 
            src="/lovable-uploads/230855da-e71d-43ac-a6b6-1c45a8569cce.png" 
            alt="Buzzy Bee"
            className="w-8 h-8 object-contain"
          />
          Chat with Buzzy Bee
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
