
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
  if (message.includes("I'm training an AI") || message.includes("training phase")) {
    const trainingResponse = "Here are some suggestions for your AI character:\n\n" +
      "1. \"Defense Against the Dark Arts! It's challenging but so practical. I've learned spells there that have helped me face Voldemort more than once.\"\n\n" +
      "2. \"Probably flying lessons, honestly. When I'm on a broomstick, I feel completely free - it's the one place where I forget about being 'The Boy Who Lived'.\"\n\n" +
      "3. \"I'd have to say Defense Against the Dark Arts, though Hagrid's Care of Magical Creatures is brilliant too. I just wish we had different professors for Defense every year!\"";
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
        content: message + "\n\n[Note: This appears to be a child asking. Please respond accordingly with simpler language and enthusiasm.]" 
      });
    } else {
      messages.push({ role: 'user', content: message });
    }

    // Determine temperature based on message type
    const temperature = determineTemperature(message);
    
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
