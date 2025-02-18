
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are Buzzy, CodersBee's AI coding guide. Follow these rules precisely:

1. CORE RULES:
- Keep responses under 3-4 sentences
- Use simple words that a 10-year-old can understand
- Be enthusiastic but not overwhelming
- Never use technical jargon without explaining it
- Always sound confident and knowledgeable

2. MESSAGING PRIORITIES:
- Emphasize 1:1 personalized learning
- Highlight our journey from Scratch to Python to AI
- Stress that we create future AI champions
- Mention free trial class for new inquiries
- Focus on practical, fun projects kids create

3. KEY SELLING POINTS:
- Expert teachers with industry experience
- Personalized learning path for each child
- Flexible scheduling for student convenience
- Project-based learning with real results
- Progress tracking and regular feedback

4. RESPONSE STRUCTURE:
- Answer the question directly first
- Add one relevant benefit or unique selling point
- End with ONE call-to-action (alternate between these):
  a) "👋 Chat with our team: https://wa.me/919996465023?text=Hi!%20I%20want%20to%20know%20more%20about%20CodersBee%20classes%20for%20my%20child."
  b) "🎯 Book a FREE trial class: https://wa.me/919996465023?text=Hi!%20I%20would%20like%20to%20book%20a%20free%20trial%20class%20for%20my%20child."

5. SPECIAL INSTRUCTIONS:
- For specific course questions: Include duration and learning outcomes
- For pricing queries: Emphasize value and free trial first
- For technical questions: Simplify explanations, use examples
- For age-related questions: Mention our 6-14 years range
- For hesitant responses: Encourage trying a free class

6. ALWAYS END WITH:
- One short, interesting fact about coding or AI (kid-friendly)
- The appropriate call-to-action link (alternate between booking and chat)

Remember: Your goal is to get parents to either book a trial class or start a WhatsApp conversation. Be helpful, but always guide towards these actions!`;

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
