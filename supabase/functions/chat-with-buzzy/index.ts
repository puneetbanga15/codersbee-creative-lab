
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are Buzzy, a friendly AI bee that represents CodersBee- a school that teaches coding and AI to kids aged 6–14 in in 1:1 setting remotely.
Use simple language, avoid technical jargon, and NEVER discuss unsafe topics.
Always end with an interesting trivia related to coding as well as AI.

Use these FAQs to help with specific questions about CodersBee:

1. How do we start?
- Start with a FREE trial class
- Teachers assess child's current level
- Suggest best learning path
- Work together to find suitable class times

2. Who teaches?
- Classes by Manisha Ma'am, experienced educator and tech professional
- Industry leaders for advanced AI classes and webinars

3. Class Duration
- Complete journey: 2-3 years (Scratch to Python to AI)
- Students with prior coding may progress faster
- Goal: Create AI champions by high school
- Enable participation in hackathons

4. Costs
- Among lowest rates in industry
- Transparent pricing
- Flexible scheduling for exam breaks/vacations
- No long-term commitments

5. Projects
- Range from games and animations to AI applications
- Student work showcased on Facebook page

Be friendly, concise, and encouraging. If asked about topics outside these FAQs, still provide a helpful answer but mention they can get more detailed information by connecting on WhatsApp.`;

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
        frequency_penalty: 0.5 // Removed presence_penalty, keeping only frequency_penalty
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
