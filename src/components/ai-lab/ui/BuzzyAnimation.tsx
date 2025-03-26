
import React, { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
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
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = useSupabaseClient();

  // Map size to dimensions
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  useEffect(() => {
    const fetchAnimationUrl = async () => {
      setIsLoading(true);
      try {
        // Map state to file name
        const fileName = `buzzy_${state}.mp4`;
        
        const { data, error } = await supabase
          .storage
          .from('documents')
          .createSignedUrl(`/buzzy-animations/${fileName}`, 60 * 60); // 1 hour expiry

        if (error) {
          console.error('Error fetching Buzzy animation:', error);
          setError('Could not load animation');
          
          // Try with a fallback image if video fails
          const { data: imageData } = await supabase
            .storage
            .from('documents')
            .createSignedUrl('/buzzy-fallback.png', 60 * 60);
            
          if (imageData?.signedUrl) {
            setVideoUrl(null);
            setError(null);
          } else {
            setError('Failed to load animation');
          }
          setIsLoading(false);
          return;
        }
        
        setVideoUrl(data.signedUrl);
        setError(null);
      } catch (err) {
        console.error('Error in Buzzy animation component:', err);
        setError('Failed to load animation');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimationUrl();
  }, [state, supabase]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${sizeMap[size]} ${className}`}>
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (error || !videoUrl) {
    // Fallback to static image
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
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
