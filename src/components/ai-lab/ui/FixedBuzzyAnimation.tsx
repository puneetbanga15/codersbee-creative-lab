
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

type BuzzyState = 'default' | 'thinking' | 'excited' | 'teaching' | 'encouraging';

interface FixedBuzzyAnimationProps {
  state: BuzzyState;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  uniqueId?: string;
}

export const FixedBuzzyAnimation: React.FC<FixedBuzzyAnimationProps> = ({ 
  state = 'default', 
  size = 'md',
  className = '',
  uniqueId = 'fixed-buzzy-default'
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Log component render to help debug duplicates
  console.log(`FixedBuzzyAnimation(${uniqueId}) rendering with state: ${state}, size: ${size}`);

  // Map size to dimensions
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  // Use a static buzzy image as a fallback
  const getBuzzyImage = () => {
    return "/lovable-uploads/230855da-e71d-43ac-a6b6-1c45a8569cce.png";
  };

  return (
    <div 
      className={`${sizeMap[size]} ${className} bg-purple-100 rounded-full flex items-center justify-center overflow-hidden`}
      data-buzzy-id={uniqueId}
    >
      <img 
        src={getBuzzyImage()}
        alt={`Buzzy the bee - ${state}`}
        className="w-full h-full object-contain p-2"
      />
    </div>
  );
};
