
export interface Message {
  role: string;
  content: string;
}

export interface ChatRequest {
  message: string;
  conversationHistory?: Message[];
}

export interface ChatResponse {
  answer: string;
}

export interface PerplexityAPIRequest {
  model: string;
  messages: Message[];
  temperature: number;
  max_tokens: number;
}

export interface PerplexityAPIResponse {
  choices: Array<{
    message: {
      content: string;
    };
    finish_reason: string;
  }>;
}
