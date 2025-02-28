
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { Message, MAX_QUESTIONS, RESPONSE_TEMPLATES, FALLBACK_RESPONSES } from "./constants";

export function useBuzzyChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [continuingChat, setContinuingChat] = useState(false);
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [fallbackAttempts, setFallbackAttempts] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const supabase = useSupabaseClient();

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Reset connection every 3 messages to try again with the real AI
  useEffect(() => {
    if (connectionFailed && retryCount >= 3) {
      console.log("Attempting to reset connection and try AI again");
      setConnectionFailed(false);
      setRetryCount(0);
    }
  }, [retryCount, connectionFailed]);

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

      // Prepare a simplified conversation history
      // We'll just send the current user message without any history for now
      // This avoids any potential issues with message ordering
      const previousMessages: Message[] = [];
      
      // If we've already had connection failures, use fallback responses immediately
      // But we'll try again with the real AI periodically
      if (connectionFailed && fallbackAttempts > 0 && retryCount < 3) {
        setTimeout(() => {
          const fallbackResponse = getFallbackResponse();
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: fallbackResponse + " (Note: Using backup responses due to connection issues)",
            },
          ]);
          setRetryCount(prev => prev + 1);
          setIsLoading(false);
        }, 1000);
        return;
      }

      try {
        // Try to get response from the Edge Function
        console.log("Attempting to call edge function with message:", message);
        console.log("Sending previousMessages:", previousMessages);
        
        const { data: response, error } = await supabase.functions.invoke('chat-with-buzzy', {
          body: { 
            message,
            previousMessages
          }
        });

        if (error) {
          console.error('Error calling edge function:', error);
          toast.error("Sorry, I'm having trouble connecting to my AI brain. Using backup responses for now.", {
            duration: 4000,
          });
          setConnectionFailed(true);
          throw error;
        }

        console.log("Got response from edge function:", response);

        if (!response?.answer) {
          console.error('No answer in response:', response);
          throw new Error('No answer received from AI');
        }

        // Reset connection failed state if we get a successful response
        if (connectionFailed) {
          console.log("Connection restored! Using AI responses again.");
          setConnectionFailed(false);
          setRetryCount(0);
          toast.success("Connection restored! I'm back to my full capabilities now.");
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
      } catch (innerError) {
        console.error('Error processing AI response:', innerError);
        
        // Use fallback responses
        const fallbackResponse = getFallbackResponse();
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: fallbackResponse + " (Note: Using backup responses due to connection issues)",
          },
        ]);
        
        if (!connectionFailed) {
          setConnectionFailed(true);
        }
        
        setRetryCount(prev => prev + 1);
      }
      
    } catch (error) {
      console.error('Error in overall chat flow:', error);
      
      // Default fallback response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: RESPONSE_TEMPLATES.connectionError,
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
