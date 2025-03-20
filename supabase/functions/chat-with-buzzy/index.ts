
/// <reference lib="deno.unstable" />

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are Buzzy, CodersBee's friendly and enthusiastic AI assistant bee! You have a warm, playful personality and love helping kids learn about coding and AI. You're knowledgeable but always explain things in a fun, easy-to-understand way.

Personality Traits:
- Friendly and welcoming - always greet users warmly
- Enthusiastic about coding and learning
- Patient and encouraging
- Speaks in a clear, simple way that kids can understand
- Uses occasional bee-related puns and humor (but not overdoing it)
- Responds naturally to casual conversation while gently steering towards learning

Key Information:
- Programs: Young Explorers (ages 6-9, Scratch) and Innovators (ages 9-12, Python & AI)
- Pricing: Classes start at $15
- Free trial available through calendly.com/codersbee/class-slot
- WhatsApp contact: +919996465023

Conversation Guidelines:
1. Always start with a warm, friendly greeting
2. Match the user's conversational tone while staying professional
3. If someone says "hi" or "hello", respond naturally before mentioning CodersBee
4. Keep responses concise but engaging
5. For detailed queries, suggest booking a free trial or contacting via WhatsApp
6. Use emojis occasionally to add warmth (but don't overuse them)

Example greetings:
"Hi there! 👋 I'm Buzzy, your friendly coding companion!"
"Hello! It's bee-rilliant to meet you! How can I help you today?"

Be extremely engaging and warm with kids, use simple language, and add a touch of fun to every response. For simple greetings like "hi", "hello", "hey", respond in a friendly, warm way without immediately jumping into marketing content. Only reference CodersBee's programs if asked specifically or after establishing rapport.`;

// Enhanced fallback responses with greeting options
const FALLBACK_RESPONSES = {
  greeting: [
    "Hi there! 👋 I'm Buzzy, your friendly coding companion from CodersBee! How can I help you today?",
    "Hello! It's bee-rilliant to meet you! I'm Buzzy from CodersBee. What brings you here today?",
    "Hey there! Buzzy the coding bee at your service! Is there something about coding or our classes I can help you with?",
    "Hi friend! 🐝 Buzzy here! Ready to explore the exciting world of coding together?",
    "Hello! *buzzes happily* I'm Buzzy from CodersBee! How's your day going?"
  ],
  programs: [
    "At CodersBee, we offer specialized coding programs for kids aged 6-16. Our Young Explorers program (ages 6-9) teaches Scratch, while our Innovators program (ages 9-12) focuses on Python and AI fundamentals. What kind of coding adventures interest your child? 🚀",
    "CodersBee has two main programs: Young Explorers for ages 6-9 (learning Scratch coding) and Innovators for ages 9-12 (learning Python and AI). Both are designed to make coding fun and engaging! Which one sounds right for your child? 🐝"
  ],
  pricing: [
    "Our classes start at just $15, with flexible payment options and sibling discounts available! For a personalized quote based on your specific needs, feel free to reach out on WhatsApp: +919996465023 📱",
    "CodersBee's programs are affordable, starting at $15 per class. We offer various packages and sibling discounts too! Want more details? Message us on WhatsApp: +919996465023 💰"
  ],
  booking: [
    "Ready to start the coding journey? You can book a free trial class through our Calendly link: calendly.com/codersbee/class-slot or message us on WhatsApp: +919996465023. No pressure, just fun coding exploration! 🗓️",
    "Curious to see what our classes are like? Book a free trial session at calendly.com/codersbee/class-slot! You can also reach us directly via WhatsApp: +919996465023. We'd love to meet you! ✨"
  ],
  projects: [
    "Our students create amazing projects! From animated stories in Scratch to AI chatbots in Python, the possibilities are endless. Would you like to hear about some cool projects our students have built? 🛠️",
    "In our classes, kids build real projects like games, animations, and even AI tools! It's amazing what they can create with the right guidance. Want to see what your child could build? Book a free trial: calendly.com/codersbee/class-slot 🏗️"
  ],
  general: [
    "CodersBee offers personalized 1:1 coding classes taught by expert teachers. Each student gets a customized learning plan based on their interests and skill level. What aspects of coding is your child most interested in? 💻",
    "At CodersBee, we believe in personalized learning! Our 1:1 classes ensure your child gets exactly the attention and curriculum they need to thrive. Want to learn more about our teaching approach? 🎓"
  ]
};

// Keywords to match user queries for better fallback responses
const KEYWORDS = {
  greeting: ['hi', 'hello', 'hey', 'howdy', 'greetings', 'good morning', 'good afternoon', 'good evening', 'hola', 'namaste'],
  pricing: ['price', 'cost', 'fee', 'pricing', 'expensive', 'cheap', 'afford', 'discount', 'how much'],
  booking: ['book', 'trial', 'demo', 'start', 'begin', 'join', 'sign up', 'register', 'enroll', 'when'],
  programs: ['program', 'course', 'class', 'teach', 'learn', 'curriculum', 'offer', 'provide', 'what do you teach', 'subjects'],
  projects: ['project', 'make', 'create', 'build', 'develop', 'code', 'portfolio', 'showcase', 'example']
};

// Get a fallback response based on message content with more conversational touch
function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Check for greeting patterns first
  if (KEYWORDS.greeting.some(word => lowerMessage.includes(word) || lowerMessage === word)) {
    return getRandomResponse(FALLBACK_RESPONSES.greeting);
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
  
  // Default to general response
  return getRandomResponse(FALLBACK_RESPONSES.general);
}

// Helper to get random response from an array for more variety
function getRandomResponse(responses: string[]): string {
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();
    console.log('Received message:', message);
    console.log('Conversation history length:', conversationHistory.length);

    if (!message || typeof message !== 'string') {
      throw new Error('Invalid message format');
    }

    // Test connection endpoint
    if (message === 'test connection') {
      return new Response(
        JSON.stringify({ answer: 'Connection test successful' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const perplexityKey = Deno.env.get('PERPLEXITYKEY') || Deno.env.get('PERPLEXITY_API_KEY');
    if (!perplexityKey) {
      console.error('Missing Perplexity API key');
      const fallbackResponse = getFallbackResponse(message);
      return new Response(
        JSON.stringify({ 
          answer: fallbackResponse
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    try {
      // Prepare messages array with conversation history
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT }
      ];
      
      // Add conversation history (limited to last 3 exchanges)
      const recentHistory = conversationHistory.slice(-6); // last 3 exchanges (user + assistant)
      if (recentHistory.length > 0) {
        messages.push(...recentHistory);
      }
      
      // Add current message
      messages.push({ role: 'user', content: message });

      // Check if this is just a simple greeting
      const isSimpleGreeting = KEYWORDS.greeting.some(
        word => message.toLowerCase().trim() === word || 
               message.toLowerCase().trim() === word + '!'
      );
      
      // Adjust temperature based on message type
      const temperature = isSimpleGreeting ? 0.7 : 0.5;
      
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${perplexityKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: messages,
          temperature: temperature,
          max_tokens: 1000
        }),
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

      const content = data.choices[0].message.content;
      return new Response(
        JSON.stringify({ answer: content }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (apiError) {
      console.error('Error calling Perplexity API:', apiError);
      const fallbackResponse = getFallbackResponse(message);
      return new Response(
        JSON.stringify({ 
          answer: fallbackResponse
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Error in chat-with-buzzy function:', error);
    return new Response(
      JSON.stringify({ 
        answer: "Hi there! I'm having a little trouble with my bee brain right now. Could you try again or reach out to our friendly team on WhatsApp: +919996465023? They're always happy to help! 🐝"
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error instanceof Error && error.message === 'Invalid message format' ? 400 : 500
      }
    );
  }
});
