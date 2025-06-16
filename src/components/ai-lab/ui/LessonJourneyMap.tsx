
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Telescope, Map, Compass, Anchor } from 'lucide-react';

interface JourneyMapProps {
  tier: 'discoverers' | 'explorers' | 'builders' | 'creators';
  completedLessons: string[];
  currentLesson?: string;
}

// Story progression for each lesson
const lessonStories = {
  discoverers: [
    {
      id: 'what-is-ai',
      number: 1,
      position: { x: 10, y: 80 },
      title: "The Search Begins",
      story: "Our brave pirate spots a mysterious island in the distance... What could 'AI' mean?",
      sceneImage: "/Ocean Journey Animation.mp4",
      isVideo: true
    },
    {
      id: 'how-ai-learns',
      number: 2,
      position: { x: 25, y: 60 },
      title: "Landing on Shore",
      story: "The pirate reaches the beach and discovers strange patterns in the sand...",
      sceneImage: "/Discoverers (BeachShore).png"
    },
    {
      id: 'meet-ai-friend',
      number: 3,
      position: { x: 45, y: 45 },
      title: "First Contact",
      story: "A friendly AI creature emerges from the jungle, ready to be the pirate's guide!",
      sceneImage: "/Explorers (Jungle).png"
    },
    {
      id: 'llm-basics',
      number: 4,
      position: { x: 70, y: 35 },
      title: "The Ancient Caves",
      story: "Deep in the mountain caves, the pirate discovers the secrets of language magic...",
      sceneImage: "/Builders (Mountain Caves).png"
    },
    {
      id: 'image-ai',
      number: 5,
      position: { x: 90, y: 20 },
      title: "The Magical Peak",
      story: "At the highest peak, the pirate learns to create images from thin air!",
      sceneImage: "/Creators (Magical Peak).png"
    }
  ]
};

// Generate smooth path points between lessons
const generatePath = (lessons: typeof lessonStories.discoverers) => {
  const pathPoints = lessons.map(lesson => `${lesson.position.x},${lesson.position.y}`);
  return `M ${pathPoints.join(' Q ')}`;
};

export const LessonJourneyMap: React.FC<JourneyMapProps> = ({ 
  tier, 
  completedLessons, 
  currentLesson 
}) => {
  const [shipPosition, setShipPosition] = useState({ x: 10, y: 80 });
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [showStoryModal, setShowStoryModal] = useState(false);
  
  const lessons = lessonStories[tier] || lessonStories.discoverers;
  
  // Calculate ship's current position based on progress
  useEffect(() => {
    const completedCount = completedLessons.length;
    if (completedCount < lessons.length) {
      const targetLesson = lessons[completedCount];
      setShipPosition(targetLesson.position);
      setCurrentStoryIndex(completedCount);
    }
  }, [completedLessons, lessons]);

  // Animate ship movement to next lesson
  const moveToNextLesson = (lessonIndex: number) => {
    if (lessonIndex < lessons.length) {
      setShipPosition(lessons[lessonIndex].position);
      setCurrentStoryIndex(lessonIndex);
      setShowStoryModal(true);
    }
  };

  const pathData = generatePath(lessons);

  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-sky-200 via-blue-300 to-blue-600 rounded-2xl overflow-hidden border-4 border-yellow-400 shadow-2xl">
      {/* Background Ocean Animation */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover opacity-30"
          onError={(e) => {
            console.log('Failed to load Ocean Journey Animation:', e);
            e.currentTarget.style.display = 'none';
          }}
        >
          <source src="/Ocean Journey Animation.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Adventure Map Overlay */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/Adventure Map Background.png')" }}
      />

      {/* Journey Path SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Dotted path showing the route */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <path
          d={pathData}
          stroke="#fbbf24"
          strokeWidth="0.5"
          strokeDasharray="2,1"
          fill="none"
          filter="url(#glow)"
          className="animate-pulse"
        />
      </svg>

      {/* Lesson Islands/Markers */}
      {lessons.map((lesson, index) => {
        const isCompleted = completedLessons.includes(lesson.id);
        const isCurrent = currentLesson === lesson.id;
        const isAccessible = index <= completedLessons.length;
        
        return (
          <motion.div
            key={lesson.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ 
              left: `${lesson.position.x}%`, 
              top: `${lesson.position.y}%` 
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => isAccessible && moveToNextLesson(index)}
          >
            {/* Treasure Chest or Island Marker */}
            <div className="relative">
              <motion.img
                src="/Treasure Chest Icon.png"
                alt={`Lesson ${lesson.number} treasure`}
                className={`w-12 h-10 drop-shadow-lg ${
                  isCompleted ? 'filter brightness-110' : 
                  isCurrent ? 'animate-bounce' : 
                  !isAccessible ? 'filter grayscale opacity-50' : ''
                }`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                onError={(e) => {
                  console.log('Failed to load Treasure Chest Icon:', e);
                  // Fallback to styled div
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const fallback = document.createElement('div');
                    fallback.className = 'w-12 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center text-2xl drop-shadow-lg';
                    fallback.innerHTML = '💎';
                    parent.appendChild(fallback);
                  }
                }}
              />
              
              {/* Lesson number badge */}
              <div className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg">
                {lesson.number}
              </div>
              
              {/* Completion indicator */}
              {isCompleted && (
                <motion.div 
                  className="absolute -top-1 -right-1 text-green-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  ✅
                </motion.div>
              )}
            </div>
            
            {/* Lesson tooltip */}
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-3 py-1 text-xs font-medium shadow-lg border-2 border-yellow-300 whitespace-nowrap">
              {lesson.title}
            </div>
          </motion.div>
        );
      })}

      {/* Animated Pirate Ship */}
      <motion.div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
        animate={{ 
          left: `${shipPosition.x}%`, 
          top: `${shipPosition.y}%` 
        }}
        transition={{ 
          duration: 2, 
          type: "spring", 
          damping: 0.8,
          stiffness: 100 
        }}
      >
        <motion.img
          src="/Pirate Ship Icon.png"
          alt="Pirate ship"
          className="w-16 h-16 drop-shadow-2xl"
          animate={{ 
            y: [-2, 2, -2],
            rotate: [-2, 2, -2] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          onError={(e) => {
            console.log('Failed to load Pirate Ship Icon:', e);
            // Fallback to emoji ship
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              const fallback = document.createElement('div');
              fallback.className = 'w-16 h-16 text-4xl flex items-center justify-center';
              fallback.innerHTML = '🚢';
              parent.appendChild(fallback);
            }
          }}
        />
        
        {/* Ship wake effect */}
        <motion.div 
          className="absolute top-1/2 left-full w-8 h-1 bg-white opacity-60 rounded-full"
          animate={{ 
            scaleX: [1, 0.5, 1],
            opacity: [0.6, 0.2, 0.6] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </motion.div>

      {/* Story Modal */}
      <AnimatePresence>
        {showStoryModal && (
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowStoryModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-md mx-4 border-4 border-yellow-400 shadow-2xl"
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-purple-800 mb-3">
                  {lessons[currentStoryIndex]?.title}
                </h3>
                
                {/* Story scene image or video */}
                {lessons[currentStoryIndex]?.isVideo ? (
                  <video
                    autoPlay
                    loop
                    muted
                    className="w-full h-32 object-cover rounded-lg mb-4"
                    src={lessons[currentStoryIndex]?.sceneImage}
                  />
                ) : (
                  <img
                    src={lessons[currentStoryIndex]?.sceneImage}
                    alt="Story scene"
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                )}
                
                <p className="text-amber-800 mb-4 leading-relaxed">
                  {lessons[currentStoryIndex]?.story}
                </p>
                
                <button
                  onClick={() => setShowStoryModal(false)}
                  className="bg-purple-500 text-white px-6 py-2 rounded-full font-bold hover:bg-purple-600 transition-colors"
                >
                  Continue Adventure! ⚔️
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Journey Progress Indicator */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg px-4 py-2 border-2 border-yellow-300">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-800">
            Progress: {completedLessons.length}/{lessons.length} islands discovered
          </span>
        </div>
      </div>
    </div>
  );
};
