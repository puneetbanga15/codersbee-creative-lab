
import React from 'react';
import { motion } from 'framer-motion';
import { BuzzyAnimation } from './BuzzyAnimation';
import { MessageCircle, LightbulbIcon } from 'lucide-react';

interface BuzzyLearningCardProps {
  title: string;
  description: string;
  concept?: string;
  example?: string;
  actionLabel?: string;
  onAction?: () => void;
  buzzyState?: 'default' | 'teaching' | 'excited' | 'thinking' | 'encouraging';
  className?: string;
}

export const BuzzyLearningCard: React.FC<BuzzyLearningCardProps> = ({
  title,
  description,
  concept,
  example,
  actionLabel,
  onAction,
  buzzyState = 'teaching',
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white border border-purple-100 rounded-lg overflow-hidden shadow-sm ${className}`}
    >
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 flex items-center gap-3">
        <BuzzyAnimation state={buzzyState} size="sm" />
        <h3 className="font-medium text-lg text-purple-800">{title}</h3>
      </div>
      
      <div className="p-4">
        <p className="text-gray-700 mb-3">{description}</p>
        
        {concept && (
          <div className="bg-blue-50 p-3 rounded-lg mb-3">
            <div className="flex items-center gap-2 mb-1">
              <LightbulbIcon className="h-4 w-4 text-blue-600" />
              <h4 className="font-medium text-sm text-blue-700">AI Concept:</h4>
            </div>
            <p className="text-sm text-blue-800">{concept}</p>
          </div>
        )}
        
        {example && (
          <div className="bg-green-50 p-3 rounded-lg mb-3">
            <div className="flex items-center gap-2 mb-1">
              <MessageCircle className="h-4 w-4 text-green-600" />
              <h4 className="font-medium text-sm text-green-700">Example:</h4>
            </div>
            <p className="text-sm text-green-800">{example}</p>
          </div>
        )}
        
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="mt-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors text-sm font-medium"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </motion.div>
  );
};
