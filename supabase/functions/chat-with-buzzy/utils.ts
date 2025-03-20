
import { FALLBACK_RESPONSES, KEYWORDS } from './constants.ts';
import { Message } from './types.ts';

/**
 * Helper function to detect if a message is likely from a child
 */
export function isLikelyChildQuestion(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  
  // Check for child-like language patterns
  const childPatterns = [
    'can i', 'will i', 'do i', 'is it fun', 'is it hard', 'is coding hard', 
    'make games', 'make a game', 'robot', 'cool', 'fun', 'friends',
    'favorite', 'like minecraft', 'roblox', 'fortnite'
  ];
  
  // Check if any child patterns are in the message or if it's very short and simple
  return childPatterns.some(pattern => lowerMessage.includes(pattern)) || 
         (lowerMessage.split(' ').length < 6 && !lowerMessage.includes('cost') && !lowerMessage.includes('price'));
}

/**
 * Get a random response from an array of responses
 */
export function getRandomResponse(responses: string[]): string {
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

/**
 * Get a fallback response based on message content
 */
export function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Check if this appears to be a child asking
  const isChildQuestion = isLikelyChildQuestion(message);
  
  // Check for enrollment-related queries first (highest priority)
  if (KEYWORDS.enrollment.some(word => lowerMessage.includes(word))) {
    return getRandomResponse(FALLBACK_RESPONSES.enrollment);
  }
  
  // Check for greeting patterns
  if (KEYWORDS.greeting.some(word => lowerMessage.includes(word) || lowerMessage === word)) {
    return getRandomResponse(FALLBACK_RESPONSES.greeting);
  }
  
  // Check for kid-specific questions
  if (isChildQuestion && KEYWORDS.kidQuestions.some(word => lowerMessage.includes(word))) {
    return getRandomResponse(FALLBACK_RESPONSES.kidFriendly);
  }
  
  // Check for other keyword matches
  if (KEYWORDS.pricing.some(word => lowerMessage.includes(word))) {
    return getRandomResponse(FALLBACK_RESPONSES.pricing);
  }
  if (KEYWORDS.booking.some(word => lowerMessage.includes(word))) {
    return getRandomResponse(FALLBACK_RESPONSES.booking);
  }
  if (KEYWORDS.programs.some(word => lowerMessage.includes(word))) {
    return getRandomResponse(FALLBACK_RESPONSES.programs);
  }
  if (KEYWORDS.projects.some(word => lowerMessage.includes(word))) {
    return getRandomResponse(FALLBACK_RESPONSES.projects);
  }
  if (KEYWORDS.teachers.some(word => lowerMessage.includes(word))) {
    return getRandomResponse(FALLBACK_RESPONSES.teachers);
  }
  if (KEYWORDS.equipment.some(word => lowerMessage.includes(word))) {
    return getRandomResponse(FALLBACK_RESPONSES.equipment);
  }
  if (KEYWORDS.progress.some(word => lowerMessage.includes(word))) {
    return getRandomResponse(FALLBACK_RESPONSES.progress);
  }
  if (KEYWORDS.scheduling.some(word => lowerMessage.includes(word))) {
    return getRandomResponse(FALLBACK_RESPONSES.scheduling);
  }
  
  // Default to general response
  return getRandomResponse(FALLBACK_RESPONSES.general);
}

/**
 * Delay function for async operations
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check if a query is related to enrollment
 */
export function isEnrollmentQuery(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return KEYWORDS.enrollment.some(word => 
    lowerMessage.includes(word) || 
    (lowerMessage.includes('how') && 
      (lowerMessage.includes('join') || 
      lowerMessage.includes('start') || 
      lowerMessage.includes('sign up') || 
      lowerMessage.includes('register') || 
      lowerMessage.includes('enroll')))
  );
}

/**
 * Create the conversation messages array with system prompt and history
 */
export function createConversationMessages(
  message: string, 
  conversationHistory: Message[] = [], 
  isChildQuestion: boolean
): Message[] {
  // Start with system prompt
  const messages: Message[] = [
    { role: 'system', content: KEYWORDS.SYSTEM_PROMPT }
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
  
  return messages;
}

/**
 * Determine temperature setting based on message type
 */
export function determineTemperature(message: string): number {
  const isChildQuestion = isLikelyChildQuestion(message);
  const isSimpleGreeting = KEYWORDS.greeting.some(
    word => message.toLowerCase().trim() === word || 
           message.toLowerCase().trim() === word + '!'
  );
  
  // Higher for children and greetings to be more dynamic and engaging
  // Lower for detailed questions from parents to be more informative
  return isChildQuestion || isSimpleGreeting ? 0.7 : 0.5;
}
