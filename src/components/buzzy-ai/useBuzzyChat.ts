
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import { Message, MAX_QUESTIONS, RESPONSE_TEMPLATES, FALLBACK_RESPONSES } from "./constants";

export function useBuzzyChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [continuingChat, setContinuingChat] = useState(false);
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [fallbackAttempts, setFallbackAttempts] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const supabase = useSupabaseClient();

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const getFallbackResponse = () => {
    const index = fallbackAttempts % FALLBACK_RESPONSES.length;
    setFallbackAttempts(prev => prev + 1);
    return FALLBACK_RESPONSES[index];
  };

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

      // If we've already had connection failures, use fallback responses immediately
      if (connectionFailed && fallbackAttempts > 0) {
        setTimeout(() => {
          const fallbackResponse = getFallbackResponse();
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: fallbackResponse,
            },
          ]);
          setIsLoading(false);
        }, 1500);
        return;
      }

      // Try to get response from the Edge Function
      const { data: response, error } = await supabase.functions.invoke('chat-with-buzzy', {
        body: { 
          message,
          previousMessages: conversationHistory
        }
      });

      if (error) {
        console.error('Error calling edge function:', error);
        toast.error("Sorry, I'm having trouble connecting. Using backup responses instead.", {
          icon: <AlertTriangle className="h-5 w-5 text-amber-500" />
        });
        setConnectionFailed(true);
        throw error;
      }

      if (!response?.answer) {
        throw new Error('No answer received from AI');
      }

      // Reset connection failed state if we get a successful response
      if (connectionFailed) {
        setConnectionFailed(false);
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
      
      // Use fallback responses if connection fails
      if (connectionFailed) {
        const fallbackResponse = getFallbackResponse();
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: fallbackResponse,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: RESPONSE_TEMPLATES.connectionError,
          },
        ]);
      }
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

  return {
    messages,
    isLoading,
    questionsAsked,
    inputValue,
    setInputValue,
    connectionFailed,
    chatContainerRef,
    handleSendMessage,
    handleKeyPress,
    reachedLimit
  };
}
