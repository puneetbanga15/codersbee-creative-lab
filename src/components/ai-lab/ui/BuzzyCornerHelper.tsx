
import React, { useState, useEffect } from 'react';
import { BuzzySpeechBubble } from './BuzzySpeechBubble';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export const BuzzyCornerHelper: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [state, setState] = useState<'default' | 'thinking' | 'excited' | 'teaching' | 'encouraging'>('default');
  const location = useLocation();
  
  // Tips based on current route
  useEffect(() => {
    const path = location.pathname;
    
    // Only show Buzzy on AI-related pages
    if (path.includes('/ai-lab')) {
      // Set a random timeout to make Buzzy appear after page load
      const timeout = setTimeout(() => {
        setVisible(true);
      }, 1500);
      
      // Select appropriate message based on path
      if (path.includes('/lessons/meet-ai-friend')) {
        setMessage("Welcome to the Meet AI Friend activity! This is where you'll learn how AI assistants are trained using examples.");
        setState('teaching');
      } else if (path.includes('/lessons/llm-basics')) {
        setMessage("In this lesson, you'll learn about Large Language Models - the brain behind modern AI assistants!");
        setState('excited');
      } else if (path.includes('/ai-lab/lessons')) {
        setMessage("Choose a lesson to start learning about AI. Each one has fun activities!");
        setState('encouraging');
      } else if (path.includes('/ai-lab/projects')) {
        setMessage("These projects help you apply what you've learned about AI. Pick one to get started!");
        setState('default');
      } else {
        setMessage("Welcome to the AI Lab! This is where you can learn all about Artificial Intelligence through fun lessons and activities.");
        setState('excited');
      }
      
      return () => clearTimeout(timeout);
    } else {
      setVisible(false);
    }
  }, [location.pathname]);
  
  // Automatically hide Buzzy after showing for a while
  useEffect(() => {
    if (visible) {
      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, 12000);
      
      return () => clearTimeout(hideTimer);
    }
  }, [visible]);
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-4 right-4 z-50"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <BuzzySpeechBubble
            message={message}
            state={state}
            position="right"
            size="md"
            onClose={() => setVisible(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
