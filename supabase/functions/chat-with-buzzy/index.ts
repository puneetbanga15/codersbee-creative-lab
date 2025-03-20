
/// <reference lib="deno.unstable" />

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { CORS_HEADERS, RESPONSE_TEMPLATES } from './constants.ts';
import { processMessage } from './messageHandler.ts';
import type { ChatRequest } from './types.ts';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS });
  }

  try {
    // Parse the request
    const requestData = await req.json() as ChatRequest;
    console.log('Received message:', requestData.message);
    console.log('Conversation history length:', requestData.conversationHistory?.length || 0);

    if (!requestData.message || typeof requestData.message !== 'string') {
      throw new Error('Invalid message format');
    }

    // Get Perplexity API Key from environment variables
    const perplexityKey = Deno.env.get('PERPLEXITYKEY') || Deno.env.get('PERPLEXITY_API_KEY');
    
    // Process the message and get a response
    const response = await processMessage(requestData, perplexityKey);

    // Return the response
    return new Response(
      JSON.stringify(response),
      { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in chat-with-buzzy function:', error);
    
    // Handle specific errors
    if (error instanceof Error && error.message === 'Invalid message format') {
      return new Response(
        JSON.stringify({ 
          answer: "Hi there! I'm having a little trouble with my bee brain right now. Could you try again or reach out to our friendly team on WhatsApp: +919996465023? They're always happy to help! 🐝"
        }),
        { 
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }
    
    // General error response
    return new Response(
      JSON.stringify({ 
        answer: RESPONSE_TEMPLATES.connectionError
      }),
      { 
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
