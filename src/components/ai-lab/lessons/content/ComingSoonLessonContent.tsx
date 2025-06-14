
import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

interface ComingSoonLessonContentProps {
  onComplete: () => void;
}

export const ComingSoonLessonContent: React.FC<ComingSoonLessonContentProps> = ({ onComplete }) => {
  return (
    <div className="text-center py-12">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-20 h-20 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
          <Rocket className="w-10 h-10 text-yellow-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon!</h2>
        <p className="text-gray-600 mb-6">This lesson content is under development.</p>
        
        <Button onClick={onComplete} className="bg-blue-500 hover:bg-blue-600">
          Continue
        </Button>
      </motion.div>
    </div>
  );
};
