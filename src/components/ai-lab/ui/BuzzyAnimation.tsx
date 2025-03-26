import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

type BuzzyState = 'default' | 'thinking' | 'excited' | 'teaching' | 'encouraging';

interface BuzzyAnimationProps {
  state: BuzzyState;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BuzzyAnimation: React.FC<BuzzyAnimationProps> = ({ 
  state = 'default', 
  size = 'md',
  className = '' 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Log component render to help debug duplicates
  console.log(`BuzzyAnimation rendering with state: ${state}, size: ${size}`);

  // Map size to dimensions
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  // Get the local video URL based on state
  const getVideoUrl = () => {
    // Map state to actual filenames in the folder
    const fileMap = {
      'default': 'Talking.mp4',
      'thinking': 'Thinking.mp4',
      'excited': 'Cheerful Dancing.mp4',
      'teaching': 'Helpful Teaching.mp4',
      'encouraging': 'Happy giving heart.mp4'
    };
    
    return `/buzzy-animations/${fileMap[state]}`;
  };

  // If there's an error or we can't load the video, use a fallback image
  if (error) {
    return (
      <div className={`${sizeMap[size]} ${className} bg-purple-100 rounded-full flex items-center justify-center`}>
        <img 
          src="/lovable-uploads/9c4efcb6-761f-4ff5-ac63-613a99070c8b.png" 
          alt={`Buzzy the bee - ${state}`}
          className="w-full h-full object-contain p-2"
        />
      </div>
    );
  }

  return (
    <div className={`${sizeMap[size]} overflow-hidden rounded-full ${className}`}>
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="w-full h-full object-cover"
        onError={() => setError('Failed to load animation')}
      >
        <source src={getVideoUrl()} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
