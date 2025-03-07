
import { Bell, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useIsMobile } from "@/hooks/use-mobile";

export const AnnouncementBar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isBuzzyAIPage = location.pathname === '/buzzy-ai';
  const isMobile = useIsMobile();
  
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
      className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#9b87f5] to-[#b3a4f7] w-full z-[99] py-1.5"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center gap-2 md:gap-4 text-white"
        >
          <div className="hidden md:flex items-center gap-2">
            <Bell className="h-4 w-4 animate-bounce" />
            <span className="font-bold">NEW!</span>
          </div>
          
          <Link 
            to="/buzzy-ai" 
            className="flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <img 
              src="/lovable-uploads/230855da-e71d-43ac-a6b6-1c45a8569cce.png" 
              alt="Buzzy Bee" 
              className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
            />
            
            <span className="text-sm font-medium truncate max-w-[210px] sm:max-w-none">
              Ask Buzzy Bee AI About CodersBee's Programs
            </span>
            
            {isMobile ? (
              <span className="text-xs font-medium underline ml-1">
                Ask Now
              </span>
            ) : (
              <RainbowButton className="hidden md:inline-flex text-sm py-1 h-8 px-3 ml-2">
                Ask Buzzy Now <MessageCircle className="ml-1 h-4 w-4" />
              </RainbowButton>
            )}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};
