
import React, { useState, useEffect } from 'react';

interface AssetManagerProps {
  src: string;
  alt: string;
  className?: string;
  fallbackContent?: React.ReactNode;
  isVideo?: boolean;
  onLoad?: () => void;
  onError?: (error: any) => void;
}

export const AssetManager: React.FC<AssetManagerProps> = ({
  src,
  alt,
  className = '',
  fallbackContent,
  isVideo = false,
  onLoad,
  onError
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = (error: any) => {
    console.warn(`Failed to load asset: ${src}`, error);
    setHasError(true);
    onError?.(error);
  };

  // Reset states when src changes
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  // Show fallback if there's an error
  if (hasError) {
    return (
      <div className={`${className} bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center`}>
        {fallbackContent || (
          <div className="text-purple-600 font-medium text-center p-4">
            <div className="text-2xl mb-2">🎨</div>
            <div className="text-sm">{alt}</div>
          </div>
        )}
      </div>
    );
  }

  // Render video element
  if (isVideo) {
    return (
      <video
        className={className}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={handleLoad}
        onError={handleError}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  // Render image element
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onLoad={handleLoad}
      onError={handleError}
      draggable={false}
    />
  );
};

// Centralized asset paths for easy management
export const ASSET_PATHS = {
  backgrounds: {
    adventure: '/Adventure Map Background.png',
    discoverers: '/Discoverers (BeachShore).png',
    explorers: '/Explorers (Jungle).png',
    builders: '/Builders (Mountain Caves).png',
    creators: '/Creators (Magical Peak).png'
  },
  videos: {
    oceanJourney: '/Ocean Journey Animation.mp4',
    discoverers: '/Discoverers Instructor Video.mp4',
    explorers: '/Explorers Instructor Video.mp4',
    builders: '/Builders Instructor Video.mp4',
    creators: '/Creators Instructor Video.mp4'
  },
  icons: {
    treasureChest: '/Treasure Chest Icon.png',
    pirateShip: '/Pirate Ship Icon.png',
    basicPirate: '/Basic Pirate Kid (Starting Avatar).png',
    buzzy: '/lovable-uploads/230855da-e71d-43ac-a6b6-1c45a8569cce.png'
  }
};

// Preload critical assets
export const preloadAssets = (assetPaths: string[]) => {
  assetPaths.forEach(path => {
    if (path.includes('.mp4')) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = path;
    } else {
      const img = new Image();
      img.src = path;
    }
  });
};

// Hook for asset loading status
export const useAssetLoader = (assets: string[]) => {
  const [loadedAssets, setLoadedAssets] = useState<Set<string>>(new Set());
  const [failedAssets, setFailedAssets] = useState<Set<string>>(new Set());

  useEffect(() => {
    assets.forEach(asset => {
      const isVideo = asset.includes('.mp4');
      
      if (isVideo) {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => setLoadedAssets(prev => new Set([...prev, asset]));
        video.onerror = () => setFailedAssets(prev => new Set([...prev, asset]));
        video.src = asset;
      } else {
        const img = new Image();
        img.onload = () => setLoadedAssets(prev => new Set([...prev, asset]));
        img.onerror = () => setFailedAssets(prev => new Set([...prev, asset]));
        img.src = asset;
      }
    });
  }, [assets]);

  return {
    loadedAssets,
    failedAssets,
    allLoaded: loadedAssets.size === assets.length,
    hasFailures: failedAssets.size > 0
  };
};
