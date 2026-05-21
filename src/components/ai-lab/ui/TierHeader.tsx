
import React from 'react';
import { motion } from 'framer-motion';

interface TierHeaderProps {
  stage: string;
  title: string;
}

export const TierHeader: React.FC<TierHeaderProps> = ({ stage, title }) => {
  const getHeaderBackground = (stage: string) => {
    switch (stage) {
      case 'discoverers': return 'from-sky-400 via-blue-500 to-cyan-600';
      case 'explorers': return 'from-green-400 via-emerald-500 to-teal-600';
      case 'builders': return 'from-orange-400 via-amber-500 to-yellow-600';
      case 'creators': return 'from-purple-400 via-violet-500 to-indigo-600';
      default: return 'from-gray-400 via-gray-500 to-gray-600';
    }
  };

  const getBackgroundImage = (stage: string) => {
    switch (stage) {
      case 'discoverers': return '/Discoverers (BeachShore).png';
      case 'explorers': return '/Explorers (Jungle).png';
      case 'builders': return '/Builders (Mountain Caves).png';
      case 'creators': return '/Creators (Magical Peak).png';
      default: return '/Adventure Map Background.png';
    }
  };

  return (
    <motion.div 
      className="relative w-full h-32 mb-8 rounded-3xl overflow-hidden border-4 border-yellow-400 shadow-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url('${getBackgroundImage(stage)}')` }}
      />
      
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${getHeaderBackground(stage)} opacity-80`} />
      
      {/* Animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, -20, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-extrabold text-white text-center drop-shadow-2xl tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {title}
        </motion.h2>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 left-4">
        <motion.div
          className="w-8 h-8 border-4 border-yellow-300 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="absolute bottom-4 right-4">
        <motion.div
          className="w-6 h-6 bg-yellow-300 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};
