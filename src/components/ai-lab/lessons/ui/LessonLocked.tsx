
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface LessonLockedProps {
  onBackToLab: () => void;
}

export const LessonLocked: React.FC<LessonLockedProps> = ({ onBackToLab }) => {
  return (
    <div className="text-center py-12">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <Lock className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Lesson Locked</h2>
        <p className="text-gray-600 mb-6">Complete the previous lessons to unlock this one!</p>
        <Button onClick={onBackToLab}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Lessons
        </Button>
      </motion.div>
    </div>
  );
};
