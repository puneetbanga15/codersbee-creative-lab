
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const AnnouncementBar = () => {
  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#9b87f5] to-[#b3a4f7] py-3 w-full z-[10000]"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex items-center justify-center gap-2 text-white"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="hidden md:flex items-center gap-2">
            <Bell className="h-4 w-4 animate-bounce" />
            <span className="font-bold">NEW!</span>
          </div>
          <Link 
            to="/buzzy-ai" 
            className="group flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <img 
              src="/lovable-uploads/230855da-e71d-43ac-a6b6-1c45a8569cce.png" 
              alt="Buzzy Bee"
              className="w-6 h-6 object-contain animate-bounce"
            />
            <span className="text-base md:text-lg font-medium">
              Meet Buzzy Bee AI - Your Friendly Coding Guide
            </span>
            <motion.span 
              className="hidden md:inline-block bg-white/20 px-3 py-1.5 rounded-full text-sm font-medium group-hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try it now →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};
