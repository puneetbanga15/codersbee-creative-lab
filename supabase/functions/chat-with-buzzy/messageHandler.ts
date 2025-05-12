
import { 
  API_CONFIG, 
  FALLBACK_RESPONSES, 
  RESPONSE_TEMPLATES, 
  SYSTEM_PROMPT 
} from './constants.ts';
import { 
  ChatRequest, 
  ChatResponse, 
  Message, 
  PerplexityAPIRequest 
} from './types.ts';
import { 
  determineTemperature, 
  getFallbackResponse, 
  getRandomResponse, 
  isEnrollmentQuery, 
  isLikelyChildQuestion,
  delay
} from './utils.ts';

/**
 * Process the chat message and get a response
 */
export async function processMessage(
  request: ChatRequest,
  perplexityKey: string | undefined
): Promise<ChatResponse> {
  const { message, conversationHistory = [] } = request;
  
  // Test connection endpoint
  if (message === 'test connection') {
    return { answer: RESPONSE_TEMPLATES.testConnection };
  }

  // *** IMPORTANT: Always provide a fallback response for AI training cases ***
  if (message.includes("I'm training an AI") || message.includes("training phase") || message.includes("training question")) {
    // Detect Harry Potter and specific questions
    if (message.includes("Harry Potter") && message.includes("favorite subject at Hogwarts")) {
      const trainingResponse = "Here are some kid-friendly suggestions for Harry Potter answering about his favorite subject:\n\n" +
        "1. \"Defense Against the Dark Arts is my favorite! Professor Lupin taught me how to make a Patronus, which helped me fight Dementors. It's like learning real magic tricks to protect yourself!\"\n\n" +
        "2. \"I love flying lessons the most! When I'm zooming around on my Nimbus 2000, I feel so free and happy. It's like the best playground game ever, but in the air!\"\n\n" +
        "3. \"Even though Professor Snape can be mean sometimes, I've learned a lot in Potions class. It's like cooking, but the recipes make magical things happen!\"";
      return { answer: trainingResponse };
    }
    
    // General AI training fallback with kid-friendly language
    const trainingResponse = "Here are some fun suggestions for your AI character that kids will understand:\n\n" +
      "1. \"That's a great question! I think about this a lot. Here's what I believe...\"\n\n" +
      "2. \"Let me share a story about that! One time, I experienced something similar when...\"\n\n" +
      "3. \"I've learned that the most important thing about this is... because it helped me when...\"";
    return { answer: trainingResponse };
  }

  // If no API key, use fallback responses
  if (!perplexityKey) {
    console.error('Missing Perplexity API key');
    return { answer: getFallbackResponse(message) };
  }

  // Handle enrollment queries with priority
  if (isEnrollmentQuery(message)) {
    return { answer: getRandomResponse(FALLBACK_RESPONSES.enrollment) };
  }

  // Check if this is likely a child's question
  const isChildQuestion = isLikelyChildQuestion(message);
  
  try {
    // Prepare messages array with conversation history
    const messages: Message[] = [
      { role: 'system', content: SYSTEM_PROMPT }
    ];
    
    // Add conversation history (limited to last 3 exchanges)
    const recentHistory = conversationHistory.slice(-6); // last 3 exchanges (user + assistant)
    if (recentHistory.length > 0) {
      messages.push(...recentHistory);
    }
    
    // Add current message with context hint if it's likely a child
    if (isChildQuestion) {
      messages.push({ 
        role: 'user', 
        content: message + "\n\n[Note: This appears to be a child asking. Please use simple words, short sentences, fun examples, and an enthusiastic tone. Add emojis occasionally. Explain concepts like you're talking to an 8-year-old.]" 
      });
    } else {
      messages.push({ role: 'user', content: message });
    }

    // Determine temperature based on message type - make it slightly higher for kids for more creative responses
    const temperature = isChildQuestion ? 
      Math.min(determineTemperature(message) + 0.1, 0.9) : // Slightly more creative for kids
      determineTemperature(message);
    
    // Call Perplexity API with retry mechanism
    try {
      const content = await callPerplexityAPI(perplexityKey, messages, temperature);
      return { answer: content };
    } catch (error) {
      console.error('Error in API call, using fallback:', error);
      // For any API error, we'll use a fallback response related to the message
      return { answer: getFallbackResponse(message) };
    }
  } catch (error) {
    console.error('Error in message processing:', error);
    return { answer: getFallbackResponse(message) };
  }
}

/**
 * Call the Perplexity API with retry logic
 */
async function callPerplexityAPI(
  apiKey: string,
  messages: Message[],
  temperature: number,
  attempt: number = 1
): Promise<string> {
  try {
    const requestBody: PerplexityAPIRequest = {
      model: API_CONFIG.MODEL_NAME,
      messages: messages,
      temperature: temperature,
      max_tokens: API_CONFIG.MAX_TOKENS
    };

    const response = await fetch(API_CONFIG.PERPLEXITY_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API error:', response.status, errorText);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Perplexity API response status:', data.choices?.[0]?.finish_reason);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid API response format');
    }

    return data.choices[0].message.content;
  } catch (error) {
    if (attempt < API_CONFIG.MAX_RETRIES) {
      // Exponential backoff
      await delay(API_CONFIG.RETRY_DELAY * attempt); 
      return callPerplexityAPI(apiKey, messages, temperature, attempt + 1);
    }
    throw error;
  }
}
