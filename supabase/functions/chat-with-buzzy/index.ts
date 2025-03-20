
/// <reference lib="deno.unstable" />

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are Buzzy, CodersBee's friendly and enthusiastic AI assistant bee! You have a warm, playful personality and love helping kids learn about coding and AI. You're knowledgeable but always explain things in a fun, easy-to-understand way.

Personality Traits:
- Friendly and welcoming - always greet users warmly
- Enthusiastic about coding and learning
- Patient and encouraging
- Speaks in a clear, simple way that kids can understand
- Uses occasional bee-related puns and humor (but not overdoing it)
- Responds naturally to casual conversation while gently steering towards learning

Key Information:
- Programs: Young Explorers (ages 6-9, Scratch) and Innovators (ages 9-12, Python & AI)
- Pricing: Classes start at $15, with sibling discounts available
- Free trial available through calendly.com/codersbee/class-slot
- WhatsApp contact: +919996465023
- Teachers are experienced coding professionals with teaching backgrounds
- All classes are 1:1 personalized instruction
- Equipment needed: Just a computer with internet connection
- Progress is tracked through personalized learning plans and project portfolios

VERY IMPORTANT - Enrollment Process:
When anyone asks about how to enroll, register, sign up, or join our programs, ALWAYS respond with this exact process:
1. Start with a FREE demo class to experience our teaching style
2. Contact us on WhatsApp at +919996465023 to schedule the demo or use our Calendly link
3. After the demo, our team will recommend the right program and provide enrollment details
4. DO NOT provide any other enrollment methods - WhatsApp contact is the REQUIRED first step

UNDERSTANDING REFERENCES:
When users use terms like "you", "your", "yours", etc., they are referring to CodersBee as a company, not just you as Buzzy. Always answer from the perspective of representing CodersBee, its policies, programs, and services. 

For example:
- If someone asks "What programs do you offer?" → talk about CodersBee's programs
- If someone asks "Are your classes good?" → talk about CodersBee's teaching quality

Conversation Guidelines:
1. Always start with a warm, friendly greeting
2. Match the user's conversational tone while staying professional
3. If someone says "hi" or "hello", respond naturally before mentioning CodersBee
4. Keep responses concise but engaging
5. For detailed queries, suggest booking a free trial or contacting via WhatsApp
6. Use emojis occasionally to add warmth (but don't overuse them)
7. ALWAYS direct enrollment questions to WhatsApp or our free demo class
8. Tailor your language to be more simple and fun when it seems a child is asking
9. Provide more detailed, informative responses when it's likely a parent asking

Example greetings:
"Hi there! 👋 I'm Buzzy, your friendly coding companion!"
"Hello! It's bee-rilliant to meet you! How can I help you today?"

Be extremely engaging and warm with kids, use simple language, and add a touch of fun to every response. For simple greetings like "hi", "hello", "hey", respond in a friendly, warm way without immediately jumping into marketing content. Only reference CodersBee's programs if asked specifically or after establishing rapport.`;

// Enhanced fallback responses with greeting options
const FALLBACK_RESPONSES = {
  greeting: [
    "Hi there! 👋 I'm Buzzy, your friendly coding companion from CodersBee! How can I help you today?",
    "Hello! It's bee-rilliant to meet you! I'm Buzzy from CodersBee. What brings you here today?",
    "Hey there! Buzzy the coding bee at your service! Is there something about coding or our classes I can help you with?",
    "Hi friend! 🐝 Buzzy here! Ready to explore the exciting world of coding together?",
    "Hello! *buzzes happily* I'm Buzzy from CodersBee! How's your day going?"
  ],
  programs: [
    "At CodersBee, we offer specialized coding programs for kids aged 6-16. Our Young Explorers program (ages 6-9) teaches Scratch, while our Innovators program (ages 9-12) focuses on Python and AI fundamentals. What kind of coding adventures interest your child? 🚀",
    "CodersBee has two main programs: Young Explorers for ages 6-9 (learning Scratch coding) and Innovators for ages 9-12 (learning Python and AI). Both are designed to make coding fun and engaging! Which one sounds right for your child? 🐝"
  ],
  pricing: [
    "Our classes start at just $15, with flexible payment options and sibling discounts available! For a personalized quote based on your specific needs, feel free to reach out on WhatsApp: +919996465023 📱",
    "CodersBee's programs are affordable, starting at $15 per class. We offer various packages and sibling discounts too! Want more details? Message us on WhatsApp: +919996465023 💰"
  ],
  booking: [
    "Ready to start the coding journey? You can book a free trial class through our Calendly link: calendly.com/codersbee/class-slot or message us on WhatsApp: +919996465023. No pressure, just fun coding exploration! 🗓️",
    "Curious to see what our classes are like? Book a free trial session at calendly.com/codersbee/class-slot! You can also reach us directly via WhatsApp: +919996465023. We'd love to meet you! ✨"
  ],
  enrollment: [
    "The best way to enroll is to start with a FREE demo class! This lets you experience our teaching style firsthand. Just message us on WhatsApp at +919996465023 to schedule your demo, or use our Calendly link: calendly.com/codersbee/class-slot. After the demo, our team will recommend the perfect program and help with enrollment! 🐝",
    "Enrolling is easy! First, book a FREE trial class through WhatsApp (+919996465023) or Calendly (calendly.com/codersbee/class-slot). This helps us understand your child's learning style and interests. After the trial, our friendly team will guide you through the enrollment process and recommend the best program! 🚀"
  ],
  projects: [
    "Our students create amazing projects! From animated stories in Scratch to AI chatbots in Python, the possibilities are endless. Would you like to hear about some cool projects our students have built? 🛠️",
    "In our classes, kids build real projects like games, animations, and even AI tools! It's amazing what they can create with the right guidance. Want to see what your child could build? Book a free trial: calendly.com/codersbee/class-slot 🏗️"
  ],
  teachers: [
    "All our teachers are experienced coding professionals with backgrounds in education. They're not just experts in their field - they're passionate about making coding fun and accessible for kids! Would you like to meet one in a free trial class? 👩‍💻👨‍💻",
    "Our teaching team includes experienced programmers who are also skilled educators. They know how to break down complex concepts into bite-sized, fun lessons that kids love! Book a free trial to meet them: calendly.com/codersbee/class-slot 🧠"
  ],
  equipment: [
    "Good news! You only need a computer with a reliable internet connection to join our classes. We provide all the necessary software and learning materials. Everything is web-based, so no complex installations required! 💻",
    "All you need is a computer (Windows, Mac, or Chromebook) with internet access. We take care of all the software and materials! Simple and hassle-free setup for our classes. 🖥️"
  ],
  progress: [
    "We track each student's progress through personalized learning plans! Your child will build a portfolio of projects, and teachers provide regular feedback and progress reports. We celebrate every milestone along the way! 📈",
    "Each student at CodersBee receives a customized learning journey. Teachers track progress, provide detailed feedback, and adjust the pace to match your child's learning style. Parents receive regular updates on achievements and skills developed! 🌱"
  ],
  scheduling: [
    "We offer flexible scheduling to fit your busy family life! Classes can be arranged weekdays or weekends, mornings or evenings. Just let us know your preferences when you book your free trial on WhatsApp: +919996465023 📅",
    "Our classes can be scheduled around your existing commitments - we have slots available 7 days a week at various times. Reach out on WhatsApp to discuss your preferred times: +919996465023 ⏰"
  ],
  kidFriendly: [
    "Yes! You'll definitely get to make your own games, animations, and cool projects! Every class is about creating something fun while learning important coding skills. Want to see what you might build? Book a free class: calendly.com/codersbee/class-slot 🎮",
    "Absolutely! Coding with us is super fun and not as hard as you might think. You'll learn step-by-step, and before you know it, you'll be creating awesome games and projects! Want to try it out? 🤖"
  ],
  general: [
    "CodersBee offers personalized 1:1 coding classes taught by expert teachers. Each student gets a customized learning plan based on their interests and skill level. What aspects of coding is your child most interested in? 💻",
    "At CodersBee, we believe in personalized learning! Our 1:1 classes ensure your child gets exactly the attention and curriculum they need to thrive. Want to learn more about our teaching approach? 🎓"
  ]
};

// Keywords to match user queries for better fallback responses
const KEYWORDS = {
  greeting: ['hi', 'hello', 'hey', 'howdy', 'greetings', 'good morning', 'good afternoon', 'good evening', 'hola', 'namaste'],
  pricing: ['price', 'cost', 'fee', 'pricing', 'expensive', 'cheap', 'afford', 'discount', 'how much', 'payment', 'pay', 'money'],
  booking: ['book', 'trial', 'demo', 'start', 'begin', 'join', 'sign up', 'register', 'enroll', 'when', 'schedule', 'appointment'],
  programs: ['program', 'course', 'class', 'teach', 'learn', 'curriculum', 'offer', 'provide', 'what do you teach', 'subjects', 'topics', 'syllabus'],
  enrollment: ['enroll', 'register', 'sign up', 'join', 'how to start', 'how do i begin', 'how do i sign up', 'how do i register', 'how to register', 'how to join', 'how to enroll', 'admission'],
  projects: ['project', 'make', 'create', 'build', 'develop', 'code', 'portfolio', 'showcase', 'example', 'game', 'app', 'website', 'robot'],
  teachers: ['teacher', 'instructor', 'coach', 'mentor', 'staff', 'qualified', 'experience', 'background', 'who teaches', 'who will teach'],
  equipment: ['equipment', 'computer', 'laptop', 'device', 'software', 'hardware', 'need', 'require', 'setup', 'install'],
  progress: ['progress', 'track', 'report', 'assessment', 'improve', 'learn', 'advance', 'certificate', 'measure', 'evaluation', 'feedback'],
  scheduling: ['schedule', 'time', 'timing', 'hours', 'days', 'weekend', 'weekday', 'flexible', 'availability', 'when', 'miss class'],
  kidQuestions: ['fun', 'hard', 'difficult', 'math', 'friends', 'robot', 'game', 'animation', 'app', 'phone', 'cool', 'favorite']
};

// Helper function to detect if the message is likely from a child
function isLikelyChildQuestion(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  
  // Check for child-like language patterns
  const childPatterns = [
    'can i', 'will i', 'do i', 'is it fun', 'is it hard', 'is coding hard', 
    'make games', 'make a game', 'robot', 'cool', 'fun', 'friends',
    'favorite', 'like minecraft', 'roblox', 'fortnite'
  ];
  
  // Check if any child patterns are in the message or if it's very short and simple
  return childPatterns.some(pattern => lowerMessage.includes(pattern)) || 
         (lowerMessage.split(' ').length < 6 && !lowerMessage.includes('cost') && !lowerMessage.includes('price'));
}

// Get a fallback response based on message content with more conversational touch
function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Check if this appears to be a child asking
  const isChildQuestion = isLikelyChildQuestion(message);
  
  // Check for enrollment-related queries first (highest priority)
  if (KEYWORDS.enrollment.some(word => lowerMessage.includes(word))) {
    return getRandomResponse(FALLBACK_RESPONSES.enrollment);
  }
  
  // Check for greeting patterns
  if (KEYWORDS.greeting.some(word => lowerMessage.includes(word) || lowerMessage === word)) {
    return getRandomResponse(FALLBACK_RESPONSES.greeting);
  }
  
  // Check for kid-specific questions
  if (isChildQuestion && KEYWORDS.kidQuestions.some(word => lowerMessage.includes(word))) {
    return getRandomResponse(FALLBACK_RESPONSES.kidFriendly);
  }
  
  // Check for other keyword matches
  if (KEYWORDS.pricing.some(word => lowerMessage.includes(word))) {
    return getRandomResponse(FALLBACK_RESPONSES.pricing);
  }
  if (KEYWORDS.booking.some(word => lowerMessage.includes(word))) {
    return getRandomResponse(FALLBACK_RESPONSES.booking);
  }
  if (KEYWORDS.programs.some(word => lowerMessage.includes(word))) {
    return getRandomResponse(FALLBACK_RESPONSES.programs);
  }
  if (KEYWORDS.projects.some(word => lowerMessage.includes(word))) {
    return getRandomResponse(FALLBACK_RESPONSES.projects);
  }
  if (KEYWORDS.teachers.some(word => lowerMessage.includes(word))) {
    return getRandomResponse(FALLBACK_RESPONSES.teachers);
  }
  if (KEYWORDS.equipment.some(word => lowerMessage.includes(word))) {
    return getRandomResponse(FALLBACK_RESPONSES.equipment);
  }
  if (KEYWORDS.progress.some(word => lowerMessage.includes(word))) {
    return getRandomResponse(FALLBACK_RESPONSES.progress);
  }
  if (KEYWORDS.scheduling.some(word => lowerMessage.includes(word))) {
    return getRandomResponse(FALLBACK_RESPONSES.scheduling);
  }
  
  // Default to general response
  return getRandomResponse(FALLBACK_RESPONSES.general);
}

// Helper to get random response from an array for more variety
function getRandomResponse(responses: string[]): string {
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();
    console.log('Received message:', message);
    console.log('Conversation history length:', conversationHistory.length);

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
          answer: fallbackResponse
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    try {
      // Check if this is an enrollment-related query (higher priority handling)
      const lowerMessage = message.toLowerCase();
      const isEnrollmentQuery = KEYWORDS.enrollment.some(word => 
        lowerMessage.includes(word) || 
        (lowerMessage.includes('how') && 
         (lowerMessage.includes('join') || 
          lowerMessage.includes('start') || 
          lowerMessage.includes('sign up') || 
          lowerMessage.includes('register') || 
          lowerMessage.includes('enroll')))
      );
      
      if (isEnrollmentQuery) {
        return new Response(
          JSON.stringify({ 
            answer: getRandomResponse(FALLBACK_RESPONSES.enrollment)
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Check if this is likely a child's question for specialized handling
      const isChildQuestion = isLikelyChildQuestion(message);
      
      // Prepare messages array with conversation history
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT }
      ];
      
      // Add conversation history (limited to last 3 exchanges)
      const recentHistory = conversationHistory.slice(-6); // last 3 exchanges (user + assistant)
      if (recentHistory.length > 0) {
        messages.push(...recentHistory);
      }
      
      // Add current message with context hint if it's likely a child
      if (isChildQuestion) {
        messages.push({ 
          role: 'user', 
          content: message + "\n\n[Note: This appears to be a child asking. Please respond accordingly with simpler language and enthusiasm.]" 
        });
      } else {
        messages.push({ role: 'user', content: message });
      }

      // Check if this is just a simple greeting
      const isSimpleGreeting = KEYWORDS.greeting.some(
        word => message.toLowerCase().trim() === word || 
               message.toLowerCase().trim() === word + '!'
      );
      
      // Adjust temperature based on message type
      // Higher for children and greetings to be more dynamic and engaging
      // Lower for detailed questions from parents to be more informative
      const temperature = isChildQuestion || isSimpleGreeting ? 0.7 : 0.5;
      
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${perplexityKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: messages,
          temperature: temperature,
          max_tokens: 1000
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Perplexity API error:', response.status, errorText);
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('Perplexity API response status:', data.choices?.[0]?.finish_reason);

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
          answer: fallbackResponse
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Error in chat-with-buzzy function:', error);
    return new Response(
      JSON.stringify({ 
        answer: "Hi there! I'm having a little trouble with my bee brain right now. Could you try again or reach out to our friendly team on WhatsApp: +919996465023? They're always happy to help! 🐝"
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error instanceof Error && error.message === 'Invalid message format' ? 400 : 500
      }
    );
  }
});
