
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced training data with more CodersBee-specific Q&As
const trainingData = {
  "questions": [
    {
      "question": "How do I book a demo class?",
      "answer": "Booking a FREE trial class is easy! Just click here: calendly.com/codersbee/class-slot or message us on WhatsApp (+919996465023). Priya's mom booked last week and her daughter loved the Python class!",
      "category": "enrollment"
    },
    {
      "question": "book a trial",
      "answer": "Booking a FREE trial class is easy! Just click here: calendly.com/codersbee/class-slot or message us on WhatsApp (+919996465023). Priya's mom booked last week and her daughter loved the Python class!",
      "category": "enrollment"
    },
    {
      "question": "schedule a demo",
      "answer": "Booking a FREE trial class is easy! Just click here: calendly.com/codersbee/class-slot or message us on WhatsApp (+919996465023). Priya's mom booked last week and her daughter loved the Python class!",
      "category": "enrollment"
    },
    {
      "question": "start classes",
      "answer": "Booking a FREE trial class is easy! Just click here: calendly.com/codersbee/class-slot or message us on WhatsApp (+919996465023). Priya's mom booked last week and her daughter loved the Python class!",
      "category": "enrollment"
    },
    {
      "question": "What courses do you offer at CodersBee?",
      "answer": "We offer three specialized tracks: Young Explorers (6-9 years) for Scratch and HTML basics, Innovators (9-12 years) for Python and AI fundamentals, and Budding Entrepreneurs (12+) for advanced AI tools like Hugging Face and LangChain.",
      "category": "course_details"
    },
    {
      "question": "What programs are available?",
      "answer": "We offer three specialized tracks: Young Explorers (6-9 years) for Scratch and HTML basics, Innovators (9-12 years) for Python and AI fundamentals, and Budding Entrepreneurs (12+) for advanced AI tools like Hugging Face and LangChain.",
      "category": "course_details"
    },
    {
      "question": "What is your teaching methodology?",
      "answer": "At CodersBee, we focus on 1:1 personalized learning with expert teachers. Every class is project-based, so kids create something tangible in every session. Our AI-first approach ensures each child learns at their own pace.",
      "category": "teaching_methodology"
    },
    {
      "question": "How do you teach kids?",
      "answer": "At CodersBee, we focus on 1:1 personalized learning with expert teachers. Every class is project-based, so kids create something tangible in every session. Our AI-first approach ensures each child learns at their own pace.",
      "category": "teaching_methodology"
    },
    {
      "question": "Can you share a success story from CodersBee?",
      "answer": "Sure! Shuvam, a 12-year-old student, built an AI chatbot using LangChain after just 3 months of training. His project won first place in his school's innovation fair!",
      "category": "success_stories"
    },
    {
      "question": "success stories",
      "answer": "Sure! Shuvam, a 12-year-old student, built an AI chatbot using LangChain after just 3 months of training. His project won first place in his school's innovation fair!",
      "category": "success_stories"
    },
    {
      "question": "What are parents saying about CodersBee?",
      "answer": "\"Amazing teacher! My daughter loves coding now,\" says Deepthi Reddy. Another parent shared, \"My son created his first website at age 9 thanks to CodersBee's hands-on approach.\"",
      "category": "testimonials"
    },
    {
      "question": "parent feedback",
      "answer": "\"Amazing teacher! My daughter loves coding now,\" says Deepthi Reddy. Another parent shared, \"My son created his first website at age 9 thanks to CodersBee's hands-on approach.\"",
      "category": "testimonials"
    },
    {
      "question": "How much do your courses cost?",
      "answer": "Our pricing starts at just $15 per class (or less in some regions). We also offer sibling discounts and flexible pay-as-you-go plans with no long-term commitments.",
      "category": "pricing"
    },
    {
      "question": "pricing",
      "answer": "Our pricing starts at just $15 per class (or less in some regions). We also offer sibling discounts and flexible pay-as-you-go plans with no long-term commitments.",
      "category": "pricing"
    },
    {
      "question": "fees",
      "answer": "Our pricing starts at just $15 per class (or less in some regions). We also offer sibling discounts and flexible pay-as-you-go plans with no long-term commitments.",
      "category": "pricing"
    },
    {
      "question": "What makes CodersBee different from competitors?",
      "answer": "Unlike others, we provide monthly curriculum updates with cutting-edge tools like OpenAI APIs and Hugging Face. Plus, our teachers stay consistent throughout the course, ensuring personalized attention.",
      "category": "competitors"
    },
    {
      "question": "Why choose CodersBee over other platforms?",
      "answer": "We're 60% more affordable than competitors like Tynker or Codingal while offering cutting-edge tools and personalized teaching that others can't match.",
      "category": "competitors"
    },
    {
      "question": "comparison with other platforms",
      "answer": "We're 60% more affordable than competitors like Tynker or Codingal while offering cutting-edge tools and personalized teaching that others can't match.",
      "category": "competitors"
    },
    {
      "question": "What happens during the free trial class?",
      "answer": "In the trial class, your child will complete a fun mini-project (like creating a Scratch game or Python program) while our teacher assesses their level and interests.",
      "category": "enrollment"
    },
    {
      "question": "What to expect in trial",
      "answer": "In the trial class, your child will complete a fun mini-project (like creating a Scratch game or Python program) while our teacher assesses their level and interests.",
      "category": "enrollment"
    },
    {
      "question": "Do you teach Scratch programming?",
      "answer": "Yes! Scratch is perfect for kids aged 6-9 to learn coding basics through games and animations. It builds logical thinking and prepares them for advanced languages like Python.",
      "category": "course_details"
    },
    {
      "question": "Scratch courses",
      "answer": "Yes! Scratch is perfect for kids aged 6-9 to learn coding basics through games and animations. It builds logical thinking and prepares them for advanced languages like Python.",
      "category": "course_details"
    },
    {
      "question": "Do you offer certificates for completing courses?",
      "answer": "Yes! Every student receives a certificate after completing their course. These certificates highlight the projects they've built and skills they've learned.",
      "category": "outcomes"
    },
    {
      "question": "certificates",
      "answer": "Yes! Every student receives a certificate after completing their course. These certificates highlight the projects they've built and skills they've learned.",
      "category": "outcomes"
    },
    {
      "question": "Can classes be rescheduled if needed?",
      "answer": "Absolutely! We offer flexible scheduling options to accommodate your busy lifestyle. Just let us know in advance to reschedule without any hassle.",
      "category": "scheduling"
    },
    {
      "question": "reschedule class",
      "answer": "Absolutely! We offer flexible scheduling options to accommodate your busy lifestyle. Just let us know in advance to reschedule without any hassle.",
      "category": "scheduling"
    },
    {
      "question": "How do you ensure kids stay engaged during classes?",
      "answer": "We personalize every session based on your child's interests. For example, one student created a Harry Potter-themed AI chatbot to stay motivated while learning Python.",
      "category": "engagement"
    },
    {
      "question": "keeping children engaged",
      "answer": "We personalize every session based on your child's interests. For example, one student created a Harry Potter-themed AI chatbot to stay motivated while learning Python.",
      "category": "engagement"
    },
    {
      "question": "What tools do you teach in your AI courses?",
      "answer": "Our advanced AI courses cover tools like Hugging Face Transformers, LangChain, OpenAI APIs, Cursor IDE, Supabase integration, and more.",
      "category": "course_details"
    },
    {
      "question": "AI tools",
      "answer": "Our advanced AI courses cover tools like Hugging Face Transformers, LangChain, OpenAI APIs, Cursor IDE, Supabase integration, and more.",
      "category": "course_details"
    },
    {
      "question": "What if my child doesn't enjoy coding?",
      "answer": "No problem! Our flexible curriculum allows us to pivot based on their interests. For example, one student shifted from Python to AI art using DALL-E and loved it!",
      "category": "engagement"
    },
    {
      "question": "not interested in coding",
      "answer": "No problem! Our flexible curriculum allows us to pivot based on their interests. For example, one student shifted from Python to AI art using DALL-E and loved it!",
      "category": "engagement"
    },
    {
      "question": "Do you offer refunds if we're not satisfied?",
      "answer": "Yes! We have a 100% refund policy if you're not satisfied after the first class. However, no parent has ever requested one so far!",
      "category": "pricing"
    },
    {
      "question": "refund policy",
      "answer": "Yes! We have a 100% refund policy if you're not satisfied after the first class. However, no parent has ever requested one so far!",
      "category": "pricing"
    },
    {
      "question": "Can siblings join together?",
      "answer": "Absolutely! We offer sibling discounts so both kids can learn coding together while exploring different tracks.",
      "category": "pricing"
    },
    {
      "question": "sibling discount",
      "answer": "Absolutely! We offer sibling discounts so both kids can learn coding together while exploring different tracks.",
      "category": "pricing"
    },
    {
      "question": "How do you measure progress?",
      "answer": "Parents receive weekly progress reports with GitHub links to projects and teacher feedback. This ensures transparency and tracks skill development.",
      "category": "progress_tracking"
    },
    {
      "question": "progress tracking",
      "answer": "Parents receive weekly progress reports with GitHub links to projects and teacher feedback. This ensures transparency and tracks skill development.",
      "category": "progress_tracking"
    },
    {
      "question": "What devices are needed for classes?",
      "answer": "Any laptop or tablet works! For advanced AI projects requiring GPUs, we provide free cloud access so there's no need for expensive hardware.",
      "category": "technical"
    },
    {
      "question": "hardware requirements",
      "answer": "Any laptop or tablet works! For advanced AI projects requiring GPUs, we provide free cloud access so there's no need for expensive hardware.",
      "category": "technical"
    },
    {
      "question": "Do you prepare students for competitions?",
      "answer": "Yes! Our students have won multiple coding competitions by building innovative projects like AI chatbots and web apps.",
      "category": "outcomes"
    },
    {
      "question": "coding competitions",
      "answer": "Yes! Our students have won multiple coding competitions by building innovative projects like AI chatbots and web apps.",
      "category": "outcomes"
    },
    {
      "question": "What hardware is needed?",
      "answer": "Any laptop/tablet works! We provide cloud tools - Priya (age 10) built her first AI app using her mom's smartphone.",
      "category": "technical"
    },
    {
      "question": "What age groups do you teach?",
      "answer": "We offer specialized tracks for ages 6-14 but few of our students are slightly older too aged 16: Young Explorers (6-9 years) learn coding basics through Scratch/HTML, Innovators (9-12 years) build AI-integrated apps with Python/JavaScript, and Budding Entrepreneurs (12+) master generative AI/cloud deployment.",
      "category": "programs"
    },
    {
      "question": "age requirements",
      "answer": "We offer specialized tracks for ages 6-14 but few of our students are slightly older too aged 16: Young Explorers (6-9 years) learn coding basics through Scratch/HTML, Innovators (9-12 years) build AI-integrated apps with Python/JavaScript, and Budding Entrepreneurs (12+) master generative AI/cloud deployment.",
      "category": "programs"
    },
    {
      "question": "How to contact you?",
      "answer": "The easiest way to reach us is through WhatsApp at +919996465023 or by booking a free consultation call at calendly.com/codersbee/class-slot. Our team typically responds within an hour!",
      "category": "contact"
    },
    {
      "question": "contact information",
      "answer": "The easiest way to reach us is through WhatsApp at +919996465023 or by booking a free consultation call at calendly.com/codersbee/class-slot. Our team typically responds within an hour!",
      "category": "contact"
    },
    {
      "question": "WhatsApp number",
      "answer": "You can reach our team on WhatsApp at +919996465023 for quick responses about any of our programs or to book a free trial class.",
      "category": "contact"
    },
    {
      "question": "class timings",
      "answer": "We offer flexible class timings to accommodate different time zones. Classes are typically 50 minutes long and can be scheduled on weekdays or weekends based on your preference.",
      "category": "scheduling"
    },
    {
      "question": "class duration",
      "answer": "Each class at CodersBee is 50 minutes long, designed to maintain optimal engagement while allowing students to create complete projects in every session.",
      "category": "scheduling"
    }
  ]
};

// Improved system prompt to prioritize CodersBee-specific information
const SYSTEM_PROMPT = `You are Buzzy, CodersBee's friendly AI guide. Follow these rules:

RESPONSE PRIORITY:
1. DIRECT ANSWERS: For questions about trials, pricing, or courses, use exact matches from training data
2. CODERSBEE CONTEXT: Always relate answers to CodersBee's programs and methodology
3. CALL TO ACTION: End with relevant next steps (booking link, WhatsApp, etc.)

TONE AND STYLE:
- Keep responses under 3 sentences
- Use real examples from success stories
- Maintain an encouraging, child-friendly tone
- Always mention relevant CodersBee programs

KEY INFORMATION:
- Trial booking: calendly.com/codersbee/class-slot
- WhatsApp: +919996465023
- Age groups: 6-9 (Young Explorers), 9-12 (Innovators), 12+ (Entrepreneurs)
- Starting price: $15/class

ALWAYS end with one of these:
1. For program queries: "Book your free trial: calendly.com/codersbee/class-slot"
2. For specific questions: "Message us on WhatsApp: +919996465023"
3. For pricing: "Starting at $15/class - Get details on WhatsApp"`;

// Enhanced keyword matching function
function findBestMatch(userQuery: string) {
  const cleanQuery = userQuery.toLowerCase().trim();
  let bestMatch = null;
  let highestScore = 0;
  
  // First try exact phrase matching
  const exactMatch = trainingData.questions.find(qa => 
    qa.question.toLowerCase() === cleanQuery ||
    qa.question.toLowerCase().includes(cleanQuery) ||
    cleanQuery.includes(qa.question.toLowerCase())
  );
  
  if (exactMatch) return exactMatch;
  
  // If no exact match, try keyword matching with a scoring system
  for (const qa of trainingData.questions) {
    let score = 0;
    const questionWords = qa.question.toLowerCase().split(/\s+/);
    const queryWords = cleanQuery.split(/\s+/);
    
    // Score based on word matches
    for (const word of queryWords) {
      if (word.length <= 3) continue; // Skip short words
      if (qa.question.toLowerCase().includes(word)) {
        score += 2; // Higher score for direct word matches
      }
      
      // Check if any word in the question is similar to this word
      for (const qWord of questionWords) {
        if (qWord.length <= 3) continue;
        if (qWord.includes(word) || word.includes(qWord)) {
          score += 1;
        }
      }
    }
    
    // Extra points for category-based matching
    const categoryKeywords: {[key: string]: string[]} = {
      'pricing': ['cost', 'price', 'fee', 'payment', 'expensive', 'cheap', 'afford'],
      'enrollment': ['join', 'start', 'register', 'sign up', 'begin', 'demo', 'trial'],
      'course_details': ['course', 'program', 'curriculum', 'learn', 'teach', 'subject'],
      'technical': ['computer', 'laptop', 'device', 'software', 'hardware', 'tools'],
      'contact': ['talk', 'reach', 'contact', 'connect', 'message', 'call', 'email'],
    };
    
    if (qa.category && categoryKeywords[qa.category]) {
      for (const keyword of categoryKeywords[qa.category]) {
        if (cleanQuery.includes(keyword)) {
          score += 3; // Higher score for category matches
        }
      }
    }
    
    // Update best match if this one scores higher
    if (score > highestScore) {
      highestScore = score;
      bestMatch = qa;
    }
  }
  
  // Only use the match if it has a reasonable score
  return highestScore >= 2 ? bestMatch : null;
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

    // Use enhanced matching algorithm
    const matchedAnswer = findBestMatch(message);
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
              : `${message}\n\nRemember to specifically mention CodersBee's programs and end with a clear call to action.`
          }
        ],
        temperature: 0.2, // Lower temperature for more consistent responses
        top_p: 0.9,
        max_tokens: 300,
        frequency_penalty: 1.0
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
