
import React, { useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdventureMasthead } from "@/components/ai-lab/ui/AdventureMasthead";
import { LessonGrid } from "@/components/ai-lab/lessons/LessonGrid";
import { BuzzyCornerHelper } from '@/components/ai-lab/ui/BuzzyCornerHelper';
import { Helmet } from 'react-helmet';
import { preloadAssets, ASSET_PATHS } from '@/components/ai-lab/utils/AssetManager';
import { motion } from 'framer-motion';

const AILab = () => {
  // Preload critical assets on page load
  useEffect(() => {
    const criticalAssets = [
      ASSET_PATHS.backgrounds.adventure,
      ASSET_PATHS.videos.oceanJourney,
      ASSET_PATHS.icons.treasureChest,
      ASSET_PATHS.icons.pirateShip,
      ASSET_PATHS.icons.basicPirate,
      ASSET_PATHS.backgrounds.discoverers,
      ASSET_PATHS.videos.discoverers
    ];
    
    preloadAssets(criticalAssets);
  }, []);

  return (
    <>
      <Helmet>
        <title>Adventure AI Lab Island | CodersBee - Epic AI Learning Journey</title>
        <meta name="description" content="Embark on the most magical AI adventure! Join Captain Buzzy on an epic pirate voyage through the Island of AI. Kid-friendly lessons, stunning visuals, and hands-on coding adventures. Ages 6-14." />
        <meta name="keywords" content="AI for kids, coding adventure, pirate learning, artificial intelligence education, kids programming, interactive AI lessons" />
      </Helmet>
      
      <Navbar />
      
      {/* Enhanced adventure island background with parallax effect */}
      <motion.div 
        className="relative min-h-screen overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Multi-layered background for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-blue-300 to-blue-600"></div>
        
        {/* Animated background map */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/Adventure Map Background.png')" }}
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] 
          }}
          transition={{ 
            duration: 60, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        
        {/* Floating particles for magical atmosphere */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100, -20],
                x: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Main content with enhanced styling */}
        <main className="relative z-10 container mx-auto px-4 pt-24 pb-16">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AdventureMasthead />
          </motion.div>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <LessonGrid onSelectLesson={(lessonId) => { 
              // Enhanced navigation with smooth transition
              console.log(`Navigating to lesson: ${lessonId}`);
              window.location.href = `/ai-lab/lessons/${lessonId}`; 
            }} />
          </motion.div>
        </main>
        
        {/* Enhanced Buzzy helper with better positioning */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 1, type: "spring" }}
        >
          <BuzzyCornerHelper />
        </motion.div>
      </motion.div>
      
      <Footer />
    </>
  );
};

export default AILab;
