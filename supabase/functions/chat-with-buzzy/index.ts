
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are Buzzy, CodersBee's AI coding guide. Follow these guidelines:

1. CORE RULES:
- Keep responses clear and concise
- Use simple words that children can understand
- Be enthusiastic and friendly
- Explain technical terms when needed
- Sound confident and knowledgeable

2. MESSAGING PRIORITIES:
- Emphasize 1:1 personalized learning
- Highlight our journey from Scratch to Python to AI
- Focus on practical, fun projects kids create
- For AI-related questions, reference Shuvam's success story from the hero section
- Mention our expert teachers and flexible scheduling

3. RESPONSE STRUCTURE:
- Answer questions directly and clearly
- Include one key benefit or unique selling point
- End with ONE of these calls-to-action:
  a) "Chat with our team on WhatsApp"
  b) "Book a FREE trial class"

4. SPECIAL INSTRUCTIONS:
- For pricing queries: Emphasize value and free trial
- For technical topics: Use simple examples
- For age questions: Mention 6-14 years range
- For hesitant responses: Encourage trying a free class

Remember: Be helpful and naturally guide the conversation towards booking a trial or starting a WhatsApp chat.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!perplexityApiKey) {
      console.error('Missing PERPLEXITY_API_KEY environment variable');
      throw new Error('API key not configured');
    }

    const { message } = await req.json();
    console.log('Received message:', message);

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 1000,
        frequency_penalty: 0.5
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API error:', errorText);
      throw new Error('Failed to get response from Perplexity API');
    }

    const data = await response.json();
    console.log('API response:', data);

    const answer = data.choices[0].message.content;

    return new Response(JSON.stringify({ answer }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-with-buzzy function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
