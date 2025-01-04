import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

export const SuccessStories = () => {
  const champions = [
    {
      name: "Alice",
      story: "Alice started coding with us at the age of 8 and has now developed her own game!",
      image: "/images/alice.jpg",
    },
    {
      name: "Bob",
      story: "Bob learned AI concepts and created a chatbot that helps his friends with homework.",
      image: "/images/bob.jpg",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Discover How Our Students Are
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-codersbee-vivid">
            Leading the AI and Coding Revolution
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Through the unique journeys of two CodersBee stars, see how we transform curiosity into expertise
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {champions.map((champion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <img src={champion.image} alt={champion.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-bold text-codersbee-dark">{champion.name}</h3>
              <p className="text-gray-600">{champion.story}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center space-y-6 bg-gradient-to-r from-codersbee-purple/20 to-codersbee-vivid/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-codersbee-dark">
            Ready to Start Your Child's AI Journey?
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button 
              className="bg-codersbee-vivid hover:bg-codersbee-vivid/90 text-white px-8 py-6 text-lg"
              onClick={() => window.open('https://calendly.com/codersbee/class-slot', '_blank')}
            >
              Book Your FREE Trial Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <span className="text-gray-600">or</span>
            <Button
              variant="outline"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-600"
              onClick={() => window.open('https://wa.me/917087884023', '_blank')}
            >
              <MessageCircle className="h-5 w-5" />
              Message us on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};