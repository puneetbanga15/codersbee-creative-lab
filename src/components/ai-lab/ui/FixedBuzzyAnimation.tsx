import React, { useState, useEffect, useRef } from 'react';
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
  const videoDivRef = useRef<HTMLDivElement>(null);
  
  // Create a unique ID for this component instance to help debugging
  const instanceId = useRef(uniqueId || `buzzy-${Math.random().toString(36).substring(2, 9)}`);
  
  useEffect(() => {
    console.log(`FixedBuzzyAnimation(${instanceId.current}) rendered with state: ${state}`);
    
    // Mark this component with a data attribute so we can find it in the DOM
    if (videoDivRef.current) {
      videoDivRef.current.setAttribute('data-buzzy-instance', instanceId.current);
    }
    
    return () => {
      console.log(`FixedBuzzyAnimation(${instanceId.current}) unmounted`);
    };
  }, [state]);
  
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
  
  // Get the local video URL based on state
  const getVideoUrl = () => {
    // Map state to actual filenames in the folder
    const fileMap: {[key in BuzzyState]: string} = {
      'default': 'Talking.mp4',
      'thinking': 'Thinking.mp4',
      'excited': 'Cheerful Dancing.mp4',
      'teaching': 'Helpful Teaching.mp4',
      'encouraging': 'Happy giving heart.mp4'
    };
    
    return `/buzzy-animations/${fileMap[state]}`;
  };

  // If there's an error, use a fallback
  if (error) {
    return (
      <div 
        className={`${sizeMap[size]} ${className} bg-purple-100 rounded-full flex items-center justify-center`}
        data-buzzy-error="true"
        data-buzzy-id={instanceId.current}
      >
        <span className="text-purple-500 text-xs">Error</span>
      </div>
    );
  }

  // Use the static image instead of videos to prevent duplication issues
  return (
    <div 
      ref={videoDivRef}
      className={`${sizeMap[size]} ${className} bg-purple-100 rounded-full flex items-center justify-center overflow-hidden`}
      data-buzzy-state={state}
      data-buzzy-id={instanceId.current}
    >
      <img 
        src={getBuzzyImage()}
        alt={`Buzzy the bee - ${state}`}
        className="w-full h-full object-contain p-2"
      />
    </div>
  );
};