
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

export const BuzzyChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Buzzy Bee, your AI tutor for coding and AI learning. How can I help you today? 🐝",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [questionsAsked, setQuestionsAsked] = useState(0);

  const handleSendMessage = async (message: string) => {
    if (questionsAsked >= MAX_QUESTIONS) return;
    
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setIsLoading(true);
    setQuestionsAsked((prev) => prev + 1);

    // Temporary response until we implement the actual AI
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: questionsAsked >= MAX_QUESTIONS - 1
            ? "You've reached the limit of 5 questions. To learn more, please connect with our team on WhatsApp at +91 999-646-5023."
            : "Thank you for your question! I'm still learning, but I'll be fully functional soon. For now, please connect with our team on WhatsApp for detailed answers.",
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
          <span>🐝</span> Chat with Buzzy Bee
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} {...message} />
        ))}
        {isLoading && (
          <ChatMessage
            role="assistant"
            content="Buzzing away... 🐝"
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
