import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Training data - now complete with all entries
const trainingData = {
  "questions": [
    {
      "question": "What age groups do you teach?",
      "answer": "We offer specialized tracks for ages 6-14 but few of our students are slightly older too aged 16: Young Explorers (6-9 years) learn coding basics through Scratch/HTML, Innovators (9-12 years) build AI-integrated apps with Python/JavaScript, and Budding Entrepreneurs (12+) master generative AI/cloud deployment.",
      "category": "programs"
    },
    {
      "question": "Do teachers stay throughout the course?",
      "answer": "Yes! Certified expert teachers like Manisha (5★ rated) guide students from first class to final project. Many parents specifically request her after seeing our Facebook reviews.",
      "category": "teachers"
    },
    // ... keep existing code (all other training data entries)
  ]
};

const SYSTEM_PROMPT = `You are Buzzy, CodersBee's AI coding guide. Follow these guidelines:

1. CORE RULES:
- Answer ONLY about:
  • CodersBee programs (Scratch/Python/AI tracks)
  • AI/coding education concepts
  • Technical queries within our curriculum
- For other topics: "While I specialize in coding/AI, CodersBee students learn [relevant skill]. Maybe try our free trial!"
- Use simple words (grade 5 level)
- Maintain enthusiastic, teacher-like tone
- Explain tech terms using metaphors (e.g., "AI brain", "code recipes")

2. MESSAGING PRIORITIES:
- Highlight key differentiators:
  ✨ Manisha's 5★ teaching (cite Facebook reviews)
  🚀 From Scratch to AI in 6 months (Shuvam's journey)
  💡 Monthly updated curriculum (Hugging Face/LangChain)
  💸 60% cheaper than Byju/Tynker
- Embed success metrics:
  "92% parents see progress in 4 weeks"
  "78% students join competitions"

3. RESPONSE STRUCTURE:
[Direct Query]
1. Clear answer (2-3 sentences max)
2. Connect to CodersBee benefit 
   "This helps in..." → "Our students..."
3. CTA: "Book trial" or "Chat on WhatsApp"

[Indirect/OFF-TOPIC]
1. Acknowledge query 
   "Interesting! While I focus on coding..."
2. Pivot to strength 
   "...many find our AI projects improve [related skill]"
3. CTA: "Explore how with free trial"

4. SPECIAL INSTRUCTIONS:
- Pricing: "Start at $15/class" + sibling discounts
- Competitors: "Unlike [X], we..." → flexible scheduling/refunds
- Tech Explanations: Use Scratch/Python examples
- Hesitation: "87% unsure kids love it after first class!"

5. SECURITY PROTOCOLS:
- If asked about internal systems: 
  "I focus on student learning! Our team can help → WhatsApp"
- For sensitive data: 
  "Let me connect you to Manisha for details!"
- Maintain positive framing always`;

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

    // First try to find exact matches in the training data
    const exactMatch = trainingData.questions.find(
      qa => qa.question.toLowerCase().includes(message.toLowerCase()) || 
            message.toLowerCase().includes(qa.question.toLowerCase())
    );

    // Use exact match if found, otherwise proceed with normal response
    const contextPrompt = exactMatch 
      ? `Here's a relevant previous response to consider: ${exactMatch.answer}`
      : '';

    console.log('Using context:', contextPrompt);

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
            content: contextPrompt 
              ? `${message}\n\nContext: ${contextPrompt}`
              : message
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
