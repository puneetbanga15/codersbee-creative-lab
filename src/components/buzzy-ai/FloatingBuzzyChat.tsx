
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { BuzzyChat } from "./BuzzyChat";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export const FloatingBuzzyChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isMobile = useIsMobile();

  useEffect(() => {
    // Show the button after 2 seconds (reduced from 5)
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Position the button differently on the home page
  const buttonPosition = isHomePage 
    ? "fixed bottom-20 right-6 z-50" 
    : "fixed bottom-6 right-6 z-50";
    
  // Calculate chat window position and size based on mobile or desktop view
  const chatWindowClass = isMobile
    ? "fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-lg shadow-xl w-full max-h-[90vh] overflow-hidden border border-gray-200"
    : "fixed bottom-6 right-6 z-50 bg-white rounded-lg shadow-xl w-[450px] max-h-[600px] overflow-hidden border border-gray-200";

  return (
    <>
      <AnimatePresence>
        {showButton && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className={buttonPosition}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => setIsOpen(true)}
                className="rounded-full h-14 w-14 bg-gradient-to-br from-codersbee-yellow to-amber-400 hover:from-amber-400 hover:to-codersbee-yellow text-black shadow-lg flex items-center justify-center border-2 border-white p-0"
              >
                <div className="relative">
                  <img 
                    src="/lovable-uploads/230855da-e71d-43ac-a6b6-1c45a8569cce.png" 
                    alt="Buzzy Bee"
                    className="h-10 w-10 object-contain"
                  />
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className={chatWindowClass}
            style={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="flex justify-between items-center p-3 border-b bg-gradient-to-r from-codersbee-purple/10 to-codersbee-yellow/10">
              <div className="flex items-center gap-2">
                <img 
                  src="/lovable-uploads/230855da-e71d-43ac-a6b6-1c45a8569cce.png" 
                  alt="Buzzy Bee"
                  className="h-8 w-8 object-contain"
                />
                <h3 className="font-semibold text-codersbee-dark">Chat with Buzzy Bee</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 rounded-full hover:bg-gray-100" 
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className={`${isMobile ? "h-[70vh]" : "h-[calc(100%-48px)]"} overflow-hidden`}>
              <BuzzyChat isCompact={true} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
