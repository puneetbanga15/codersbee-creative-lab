
import React from "react";

type TierHeaderProps = {
  stage: "discoverers" | "explorers" | "builders" | "creators";
  title: string;
};

const tierBgMap: Record<string, string> = {
  discoverers: "/Discoverers (BeachShore).png",
  explorers: "/Explorers (Jungle).png",
  builders: "/Builders (Mountain Caves).png",
  creators: "/Creators (Magical Peak).png",
};

export const TierHeader: React.FC<TierHeaderProps> = ({ stage, title }) => {
  const bgImage = tierBgMap[stage];
  
  return (
    <div className="relative mb-6 rounded-xl overflow-hidden shadow-xl border-2 border-teal-300">
      {/* Background art */}
      <img
        src={bgImage}
        alt={`${title} background`}
        className="w-full h-32 object-cover object-center"
        draggable={false}
        onError={(e) => {
          console.log(`Failed to load ${stage} background image:`, e);
          console.log('Attempted path:', e.currentTarget.src);
          // Show a fallback gradient background
          e.currentTarget.style.display = 'none';
          const parent = e.currentTarget.parentElement;
          if (parent) {
            parent.style.background = `linear-gradient(135deg, 
              ${stage === 'discoverers' ? '#fbbf24, #f59e0b' : 
                stage === 'explorers' ? '#10b981, #059669' : 
                stage === 'builders' ? '#8b5cf6, #7c3aed' : 
                '#ec4899, #be185d'})`;
          }
        }}
        onLoad={() => console.log(`Successfully loaded ${stage} background image`)}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-white/10" />
      <div className="absolute inset-0 flex items-end p-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-sky-900 drop-shadow-md tracking-wide">
          {title}
        </h2>
      </div>
    </div>
  );
};
