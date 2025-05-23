import React, { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

type BuzzyState = 'default' | 'thinking' | 'excited' | 'teaching' | 'encouraging';

interface FixedBuzzyAnimationProps {
  state: BuzzyState;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  uniqueId?: string;
}

// Generate a simple static ID outside of component to avoid runtime errors
let componentCounter = 0;

export const FixedBuzzyAnimation: React.FC<FixedBuzzyAnimationProps> = ({ 
  state = 'default', 
  size = 'md',
  className = '',
  uniqueId = ''
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoDivRef = useRef<HTMLDivElement>(null);
  
  // Create a simple deterministic ID for this component
  const instanceId = useRef(uniqueId || `buzzy-fixed-${componentCounter++}`);
  
  useEffect(() => {
    // Log component lifecycle for debugging
    console.log(`FixedBuzzyAnimation(${instanceId.current}) rendered with state: ${state}`);
    
    // Mark this component with a data attribute for DOM identification
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

  // Get a safe ID for DOM attributes
  const safeId = instanceId?.current || 'fixed-buzzy-fallback';
  
  // If there's an error, use a fallback
  if (error) {
    return (
      <div 
        className={`${sizeMap[size]} ${className} bg-purple-100 rounded-full flex items-center justify-center`}
        data-buzzy-error="true"
        data-buzzy-id={safeId}
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
      data-buzzy-id={safeId}
    >
      <img 
        src={getBuzzyImage()}
        alt={`Buzzy the bee - ${state}`}
        className="w-full h-full object-contain p-2"
      />
    </div>
  );
};