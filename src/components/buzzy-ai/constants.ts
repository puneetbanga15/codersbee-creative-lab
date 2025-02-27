
export interface Message {
  role: "user" | "assistant";
  content: string;
}

export const MAX_QUESTIONS = 5;

export const RESPONSE_TEMPLATES = {
  thinking: "Let me think about that...",
  error: "I apologize, but I'm having trouble connecting right now. Please try again in a moment or reach out to our team via WhatsApp for immediate assistance.",
  questionLimit: "You've asked some great questions! To continue this exciting discussion, please click the WhatsApp button above to connect with our teaching team. They're ready to provide personalized guidance for your coding journey!",
  connectionError: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later or contact our team directly on WhatsApp at +919996465023 for immediate assistance."
};

// Fallback responses when the Edge Function is unavailable
export const FALLBACK_RESPONSES = [
  "At CodersBee, we offer specialized coding programs for kids aged 6-16. Our Young Explorers program (ages 6-9) teaches Scratch, while our Innovators program (ages 9-12) focuses on Python and AI fundamentals. For more details, please message us on WhatsApp: +919996465023",
  "Our pricing starts at $15 per class with flexible payment options and sibling discounts. For a personalized quote, please reach out to us on WhatsApp: +919996465023",
  "You can book a free trial class through our Calendly link: calendly.com/codersbee/class-slot or message us on WhatsApp: +919996465023",
  "CodersBee offers personalized 1:1 coding classes taught by expert teachers. Each student gets a customized learning plan based on their interests and skill level. Book your free trial class today: calendly.com/codersbee/class-slot",
  "Many of our students have created impressive projects like AI chatbots and games. For example, Shuvam (age 12) built an award-winning AI project after just 3 months! Interested in what your child could build? Book a free trial: calendly.com/codersbee/class-slot"
];
