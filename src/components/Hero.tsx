import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-[#E5DEFF] to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="mb-6">
              <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-medium">
                Don't let your child fall behind in the AI revolution
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#1A1F2C] mb-6">
              <span className="text-[#9b87f5]">Future-Ready</span>
              <br />Coding and
              <br />AI School
            </h1>
            <p className="text-xl mb-8 text-[#403E43]">
              While AI is transforming the world at lightning speed, give your child the edge they need. 
              Start their journey with personalized 1:1 classes.
            </p>
            <Button 
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6 text-lg"
              onClick={() => window.open('https://calendly.com/codersbee/class-slot', '_blank')}
            >
              Book Trial Class Now
            </Button>
          </div>
          <motion.div 
            className="flex-1"
            animate={{ y: [-10, 10] }}
            transition={{ 
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <img 
              src="/lovable-uploads/d95b1d69-5a60-4de8-97e4-1cd0f750f9c6.png" 
              alt="Online Classroom" 
              className="w-full max-w-lg mx-auto rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};