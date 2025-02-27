
import { Bell, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { RainbowButton } from "@/components/ui/rainbow-button";

export const AnnouncementBar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isBuzzyAIPage = location.pathname === '/buzzy-ai';
  
  if (!isHomePage || isBuzzyAIPage) return null;
  
  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20
      }} 
      className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#9b87f5] to-[#b3a4f7] w-full z-[99] py-0"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center gap-4 text-white rounded-sm py-0 my-0"
        >
          <div className="hidden md:flex items-center gap-2">
            <Bell className="h-4 w-4 animate-bounce" />
            <span className="font-bold">NEW!</span>
          </div>
          <Link to="/buzzy-ai" className="group flex items-center gap-2 hover:opacity-90 transition-opacity">
            <img 
              src="/lovable-uploads/230855da-e71d-43ac-a6b6-1c45a8569cce.png" 
              alt="Buzzy Bee" 
              className="w-6 h-6 object-contain"
            />
            <span className="text-base md:text-lg font-medium">Ask Buzzy Bee AI About CodersBee's Programs</span>
            <RainbowButton className="hidden md:inline-flex text-sm py-1 h-9 px-4">
              Ask Buzzy Now <MessageCircle className="ml-1 h-4 w-4" />
            </RainbowButton>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};
