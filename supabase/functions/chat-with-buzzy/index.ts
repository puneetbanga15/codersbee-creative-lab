
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
    // ... all other training data entries
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

// Function to get embeddings from Perplexity
async function getEmbeddings(text: string) {
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
          content: 'You are an embedding generator. Output only the semantic embedding of the input.'
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get embeddings');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Function to calculate cosine similarity
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (magA * magB);
}

// Function to find most similar question
async function findSimilarQuestion(userQuestion: string) {
  const userEmbedding = await getEmbeddings(userQuestion);
  
  let maxSimilarity = -1;
  let mostSimilarQA = null;

  for (const qa of trainingData.questions) {
    const qaEmbedding = await getEmbeddings(qa.question);
    const similarity = cosineSimilarity(userEmbedding, qaEmbedding);
    
    if (similarity > maxSimilarity) {
      maxSimilarity = similarity;
      mostSimilarQA = qa;
    }
  }

  return { mostSimilarQA, similarity: maxSimilarity };
}

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

    // Find similar question from training data
    const { mostSimilarQA, similarity } = await findSimilarQuestion(message);
    console.log('Most similar Q&A:', mostSimilarQA, 'Similarity:', similarity);

    // If we have a good match, use it to enhance the response
    const contextPrompt = similarity > 0.8 
      ? `Here's a relevant previous response to consider: ${mostSimilarQA?.answer}`
      : '';

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
