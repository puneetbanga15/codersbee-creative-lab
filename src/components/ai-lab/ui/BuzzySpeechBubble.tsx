
import React from 'react';
import { BuzzyAnimation } from './BuzzyAnimation';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface BuzzySpeechBubbleProps {
  message: string;
  state?: 'default' | 'thinking' | 'excited' | 'teaching' | 'encouraging';
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  onClose?: () => void;
  className?: string;
}

export const BuzzySpeechBubble: React.FC<BuzzySpeechBubbleProps> = ({
  message,
  state = 'default',
  position = 'left',
  size = 'md',
  onClose,
  className = ''
}) => {
  // Animations
  const bubbleAnimation = {
    initial: { opacity: 0, y: 10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 10, scale: 0.95 }
  };

  // Size mapping
  const bubbleSizes = {
    sm: 'max-w-[200px]',
    md: 'max-w-[300px]',
    lg: 'max-w-[400px]'
  };

  return (
    <div className={`flex items-end gap-2 ${position === 'right' ? 'flex-row-reverse' : 'flex-row'} ${className}`}>
      <BuzzyAnimation state={state} size={size} />
      
      <motion.div
        className={`${bubbleSizes[size]} bg-white border border-purple-100 p-3 rounded-lg shadow-sm relative`}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={bubbleAnimation}
      >
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 rounded-full w-5 h-5 flex items-center justify-center"
            aria-label="Close"
          >
            <X className="h-3 w-3" />
          </button>
        )}
        
        <div className="text-sm text-gray-700">
          {message}
        </div>
        
        {/* Triangle pointer */}
        <div 
          className={`absolute bottom-3 ${position === 'right' ? 'right-[-8px]' : 'left-[-8px]'} w-4 h-4 bg-white border-b border-${position === 'right' ? 'r' : 'l'} border-purple-100 transform ${position === 'right' ? 'rotate-[315deg]' : 'rotate-[45deg]'}`}
        />
      </motion.div>
    </div>
  );
};
