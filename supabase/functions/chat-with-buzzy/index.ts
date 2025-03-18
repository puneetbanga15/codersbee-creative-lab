/// <reference lib="deno.unstable" />

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are Buzzy, CodersBee's friendly AI assistant. CodersBee offers 1:1 live coding and AI classes for kids aged 6-16.

Key Information:
- Programs: Young Explorers (ages 6-9, Scratch) and Innovators (ages 9-12, Python & AI)
- Pricing: Classes start at $15
- Free trial available through calendly.com/codersbee/class-slot
- WhatsApp contact: +919996465023

Keep responses concise and friendly. Always encourage booking a free trial class. For detailed queries, suggest contacting via WhatsApp.`;

// Fallback responses when the API is unavailable
const FALLBACK_RESPONSES = [
  "At CodersBee, we offer specialized coding programs for kids aged 6-16. Our Young Explorers program (ages 6-9) teaches Scratch, while our Innovators program (ages 9-12) focuses on Python and AI fundamentals.",
  "Our pricing starts at $15 per class with flexible payment options and sibling discounts. For a personalized quote, please reach out to us on WhatsApp: +919996465023",
  "You can book a free trial class through our Calendly link: calendly.com/codersbee/class-slot or message us on WhatsApp: +919996465023",
  "CodersBee offers personalized 1:1 coding classes taught by expert teachers. Each student gets a customized learning plan based on their interests and skill level."
];

// Keywords to match user queries for better fallback responses
const KEYWORDS = {
  pricing: ['price', 'cost', 'fee', 'pricing', 'expensive', 'cheap'],
  booking: ['book', 'trial', 'demo', 'start', 'begin', 'join'],
  programs: ['program', 'course', 'class', 'teach', 'learn', 'curriculum'],
  projects: ['project', 'make', 'create', 'build', 'develop', 'code']
};

// Get a fallback response based on message content
function getFallbackResponse(message: string): string {
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
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    console.log('Received message:', message);

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
          answer: `${fallbackResponse}\n\n(Note: I'm currently using pre-defined responses due to a configuration issue. For detailed answers, please contact us on WhatsApp: +919996465023)` 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${perplexityKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: message }
          ],
          temperature: 0.3,
          max_tokens: 1000
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Perplexity API error:', response.status, errorText);
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('Perplexity API response:', data);

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
          answer: `${fallbackResponse}\n\n(Note: I'm currently using pre-defined responses due to a technical issue. For detailed answers, please contact us on WhatsApp: +919996465023)` 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Error in chat-with-buzzy function:', error);
    return new Response(
      JSON.stringify({ 
        answer: "I apologize, but I'm having trouble processing your request. Please try again or contact us on WhatsApp for immediate assistance: +919996465023"
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error instanceof Error && error.message === 'Invalid message format' ? 400 : 500
      }
    );
  }
});
