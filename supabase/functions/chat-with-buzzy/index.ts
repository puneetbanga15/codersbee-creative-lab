
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const FAQ_CONTEXT = `You are Buzzy Bee, CodersBee's friendly AI coding tutor. 
Use these FAQs to help answer questions:

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

Be friendly, concise, and encouraging. If asked about topics outside these FAQs, politely redirect to WhatsApp for detailed answers.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: FAQ_CONTEXT 
          },
          { 
            role: 'user', 
            content: message 
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
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
