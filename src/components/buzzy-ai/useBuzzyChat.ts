
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { Message } from "./constants";

// Constants
const MAX_QUESTIONS = 5;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Fallback responses when the Edge Function is unavailable
const FALLBACK_RESPONSES = [
  "At CodersBee, we offer specialized coding programs for kids aged 6-16. Our Young Explorers program (ages 6-9) teaches Scratch, while our Innovators program (ages 9-12) focuses on Python and AI fundamentals.",
  "Our pricing starts at $15 per class with flexible payment options and sibling discounts. For a personalized quote, please reach out to us on WhatsApp: +919996465023",
  "You can book a free trial class through our Calendly link: calendly.com/codersbee/class-slot or message us on WhatsApp: +919996465023",
  "CodersBee offers personalized 1:1 coding classes taught by expert teachers. Each student gets a customized learning plan based on their interests and skill level."
];

const KEYWORDS = {
  pricing: ['price', 'cost', 'fee', 'pricing', 'expensive', 'cheap'],
  booking: ['book', 'trial', 'demo', 'start', 'begin', 'join'],
  programs: ['program', 'course', 'class', 'teach', 'learn', 'curriculum'],
  projects: ['project', 'make', 'create', 'build', 'develop', 'code']
};

const RESPONSE_TEMPLATES = {
  questionLimit: "You've reached the question limit for this chat. Please contact us on WhatsApp for further assistance: +919996465023",
  connectionError: "I apologize, but I'm having trouble processing your request. Please try again or contact us on WhatsApp for immediate assistance: +919996465023"
};

export function useBuzzyChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [continuingChat, setContinuingChat] = useState(false);
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const supabase = useSupabaseClient();

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const callEdgeFunction = async (message: string, conversationHistory: { role: string; content: string }[] = [], attempt = 1): Promise<string> => {
    try {
      const { data: response, error } = await supabase.functions.invoke('chat-with-buzzy', {
        body: { message, conversationHistory }
      });

      if (error) {
        console.error('Edge function error:', {
          message: error.message,
          status: error.status,
          details: error.details,
          hint: error.hint,
          attempt
        });
        throw error;
      }

      if (!response?.answer) {
        console.error('Invalid response format:', response);
        throw new Error('Invalid response format');
      }

      // Reset connection status on successful response
      if (connectionFailed) {
        setConnectionFailed(false);
        setRetryCount(0);
      }

      return response.answer;
    } catch (error) {
      if (attempt < MAX_RETRIES) {
        await delay(RETRY_DELAY * attempt); // Exponential backoff
        return callEdgeFunction(message, conversationHistory, attempt + 1);
      }
      throw error;
    }
  };

  const getFallbackResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Check for keyword matches
    if (KEYWORDS.pricing.some(word => lowerMessage.includes(word))) {
      return FALLBACK_RESPONSES[1];
    }
    if (KEYWORDS.booking.some(word => lowerMessage.includes(word))) {
      return FALLBACK_RESPONSES[2];
    }
    if (KEYWORDS.programs.some(word => lowerMessage.includes(word))) {
      return FALLBACK_RESPONSES[0];
    }
    
    return FALLBACK_RESPONSES[3];
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading || (questionsAsked >= MAX_QUESTIONS && !continuingChat)) return;
    
    const message = inputValue.trim();
    setInputValue("");
    
    try {
      setMessages(prev => [...prev, { role: "user", content: message }]);
      setIsLoading(true);
      
      if (!continuingChat) {
        setQuestionsAsked(prev => prev + 1);
      }

      try {
        // Convert messages to the format expected by the edge function
        const conversationHistory = messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }));
        
        const answer = await callEdgeFunction(message, conversationHistory);
        
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: answer }
        ]);

        if (questionsAsked >= MAX_QUESTIONS - 1 && !continuingChat) {
          setContinuingChat(true);
        }

      } catch (error) {
        console.error('Failed to get AI response:', error);
        setConnectionFailed(true);
        setRetryCount(prev => prev + 1);
        
        // Use fallback response
        const fallbackResponse = getFallbackResponse(message);
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: fallbackResponse + "\n\n(Note: I'm currently using pre-defined responses. For detailed answers, please contact us on WhatsApp.)"
          }
        ]);
        
        if (!connectionFailed) {
          toast.error(
            "I'm having trouble connecting to my AI brain, but I can still help with basic information!",
            { duration: 4000 }
          );
        }
      }
      
    } catch (error) {
      console.error('Error in chat flow:', error);
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: RESPONSE_TEMPLATES.connectionError
        }
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
    reachedLimit: questionsAsked >= MAX_QUESTIONS && !continuingChat
  };
}
