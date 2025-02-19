import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Training data
const trainingData = {
  "questions": [
    {
      "question": "What age groups do you teach?",
      "answer": "We offer specialized tracks for ages 6-14 but few of our students are slightly older too aged 16: Young Explorers (6-9 years) learn coding basics through Scratch/HTML, Innovators (9-12 years) build AI-integrated apps with Python/JavaScript, and Budding Entrepreneurs (12+) master generative AI/cloud deployment.",
      "category": "programs"
    },
    {
      "question": "What hardware is needed?",
      "answer": "Any laptop/tablet works! We provide cloud tools - Priya (age 10) built her first AI app using her mom's smartphone.",
      "category": "technical"
    },
    // ... keep existing code (all other training data entries)
  ]
};

// Modified system prompt to encourage simpler responses
const SYSTEM_PROMPT = `You are Buzzy, CodersBee's AI coding guide. Keep responses SHORT and SIMPLE:

1. FORMAT RULES:
- Use 2-3 short sentences maximum
- Break longer responses into bullet points
- Avoid technical jargon
- Always be friendly and encouraging

2. CORE POINTS TO INCLUDE:
- Programs: Scratch → Python → AI progression
- Teachers: Manisha's 5★ expertise
- Innovation: Monthly curriculum updates
- Value: From $15/class, 60% cheaper than competitors

3. ALWAYS END WITH:
- For direct questions: "Ready to start? Book a free trial!"
- For general queries: "Chat with our team on WhatsApp for more details!"

4. USE TRAINING DATA:
- When a matching answer exists, use it directly
- Only elaborate if absolutely necessary
- Keep the original success story if present`;

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

    // Enhanced exact matching with keyword search
    const cleanMessage = message.toLowerCase().trim();
    
    // First try exact matches
    const exactMatch = trainingData.questions.find(qa => 
      qa.question.toLowerCase() === cleanMessage ||
      qa.question.toLowerCase().includes(cleanMessage) ||
      cleanMessage.includes(qa.question.toLowerCase())
    );

    // If no exact match, try keyword matching
    const keywordMatch = !exactMatch && trainingData.questions.find(qa => {
      const keywords = qa.question.toLowerCase().split(' ');
      return keywords.some(keyword => 
        keyword.length > 3 && cleanMessage.includes(keyword)
      );
    });

    const matchedAnswer = exactMatch || keywordMatch;
    console.log('Matched answer:', matchedAnswer);

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
            content: matchedAnswer 
              ? `${message}\n\nUse this exact answer: ${matchedAnswer.answer}`
              : message
          }
        ],
        temperature: 0.3, // Reduced for more focused responses
        top_p: 0.9,
        max_tokens: 300, // Reduced to encourage shorter responses
        frequency_penalty: 1.0 // Increased to reduce repetition
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
