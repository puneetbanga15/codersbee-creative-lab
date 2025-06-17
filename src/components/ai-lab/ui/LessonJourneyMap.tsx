
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Telescope, Map, Compass, Sparkles, Star } from 'lucide-react';

interface JourneyMapProps {
  tier: 'discoverers' | 'explorers' | 'builders' | 'creators';
  completedLessons: string[];
  currentLesson?: string;
}

// Enhanced story progression with seamless connections to actual lessons
const lessonStories = {
  discoverers: [
    {
      id: 'what-is-ai',
      number: 1,
      position: { x: 15, y: 75 },
      title: "The Mysterious Signal",
      story: "Captain Buzzy receives a strange, glowing signal from a distant island. 'What could this AI mean?' she wonders. The mysterious island calls to you - what secrets does it hold?",
      sceneImage: "/Ocean Journey Animation.mp4",
      isVideo: true,
      character: "Captain Buzzy",
      mood: "curious",
      xpReward: 100,
      questDescription: "Discover what AI really means and why it's everywhere around us!"
    },
    {
      id: 'how-ai-learns',
      number: 2,
      position: { x: 35, y: 55 },
      title: "The Learning Shores",
      story: "Landing on sandy beaches, Buzzy discovers magical footprints that change and adapt. 'These patterns... they're learning from each step!' How does AI learn from examples just like you do?",
      sceneImage: "/Discoverers (BeachShore).png",
      character: "Beach Pattern Guardian",
      mood: "wonder",
      xpReward: 150,
      questDescription: "Train an AI to recognize patterns and see how machines learn!"
    },
    {
      id: 'meet-ai-friend',
      number: 3,
      position: { x: 55, y: 40 },
      title: "The AI Companion Awakens",
      story: "Deep in the jungle, a friendly AI spirit materializes! 'I've been waiting for someone like you,' it whispers. Your first AI friend is born - what adventures await together?",
      sceneImage: "/Explorers (Jungle).png",
      character: "Pixel the AI Spirit",
      mood: "friendly",
      xpReward: 200,
      questDescription: "Create and chat with your very own AI companion!"
    },
    {
      id: 'llm-basics',
      number: 4,
      position: { x: 75, y: 30 },
      title: "The Cave of Ancient Words",
      story: "In mystical mountain caves, ancient runes glow with the power of language. 'Here lies the secret of how AI understands and speaks!' whispers your AI friend. What magic will you unlock?",
      sceneImage: "/Builders (Mountain Caves).png",
      character: "Word Sage Oracle",
      mood: "wise",
      xpReward: 250,
      questDescription: "Master the art of talking to AI and unlock its language powers!"
    },
    {
      id: 'image-ai',
      number: 5,
      position: { x: 90, y: 15 },
      title: "The Summit of Creation",
      story: "At the magical peak, reality bends as thoughts become images! 'You've mastered the art of AI creation!' cheers Pixel as pure magic swirls around you. You are now an AI Master!",
      sceneImage: "/Creators (Magical Peak).png",
      character: "Master Creator",
      mood: "triumphant",
      xpReward: 300,
      questDescription: "Create amazing images with AI and become a true AI wizard!"
    }
  ]
};

// Weather and particle effects
const WeatherEffect: React.FC<{ type: 'sparkles' | 'mist' | 'stars' }> = ({ type }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: type === 'stars' ? 20 : 10 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${
            type === 'sparkles' ? 'w-2 h-2 bg-yellow-300 rounded-full' :
            type === 'mist' ? 'w-4 h-4 bg-blue-200 rounded-full opacity-30' :
            'w-1 h-1 bg-white rounded-full'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
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
  );
};

// Enhanced path generation with curves
const generateSmoothPath = (lessons: typeof lessonStories.discoverers) => {
  if (lessons.length < 2) return '';
  
  let path = `M ${lessons[0].position.x} ${lessons[0].position.y}`;
  
  for (let i = 1; i < lessons.length; i++) {
    const prev = lessons[i - 1].position;
    const curr = lessons[i].position;
    const controlX = (prev.x + curr.x) / 2;
    const controlY = Math.min(prev.y, curr.y) - 10;
    
    path += ` Q ${controlX} ${controlY} ${curr.x} ${curr.y}`;
  }
  
  return path;
};

export const LessonJourneyMap: React.FC<JourneyMapProps> = ({ 
  tier, 
  completedLessons, 
  currentLesson 
}) => {
  const [shipPosition, setShipPosition] = useState({ x: 15, y: 75 });
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [totalXP, setTotalXP] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const lessons = lessonStories[tier] || lessonStories.discoverers;
  
  // Calculate progress and XP
  useEffect(() => {
    const completedCount = completedLessons.length;
    const earnedXP = lessons
      .slice(0, completedCount)
      .reduce((sum, lesson) => sum + lesson.xpReward, 0);
    
    setTotalXP(earnedXP);
    
    if (completedCount < lessons.length) {
      const targetLesson = lessons[completedCount];
      setShipPosition(targetLesson.position);
      setCurrentStoryIndex(completedCount);
    }
  }, [completedLessons, lessons]);

  const moveToNextLesson = (lessonIndex: number) => {
    if (lessonIndex < lessons.length) {
      setShipPosition(lessons[lessonIndex].position);
      setCurrentStoryIndex(lessonIndex);
      setShowStoryModal(true);
      
      // Show celebration for completing lessons
      if (lessonIndex > 0) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      }
    }
  };

  const pathData = generateSmoothPath(lessons);

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-b from-sky-100 via-blue-200 to-blue-400 rounded-3xl overflow-hidden border-4 border-yellow-400 shadow-2xl">
      {/* Enhanced Background with Lighter Opacity */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
          <source src="/Ocean Journey Animation.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Adventure Map Overlay with Reduced Opacity */}
      <div 
        className="absolute inset-0 opacity-15 bg-cover bg-center"
        style={{ backgroundImage: "url('/Adventure Map Background.png')" }}
      />

      {/* Weather Effects */}
      <WeatherEffect type="sparkles" />
      <WeatherEffect type="mist" />

      {/* Enhanced Journey Path SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="pathGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
        
        {/* Main path */}
        <path
          d={pathData}
          stroke="url(#pathGradient)"
          strokeWidth="1"
          strokeDasharray="3,2"
          fill="none"
          filter="url(#pathGlow)"
          className="animate-pulse"
        />
        
        {/* Progress path */}
        <path
          d={pathData}
          stroke="#10b981"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray={`${completedLessons.length * 20} 1000`}
          className="transition-all duration-1000"
        />
      </svg>

      {/* Enhanced Lesson Islands with Story Connections */}
      {lessons.map((lesson, index) => {
        const isCompleted = completedLessons.includes(lesson.id);
        const isCurrent = currentLesson === lesson.id;
        const isAccessible = index <= completedLessons.length;
        
        return (
          <motion.div
            key={lesson.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            style={{ 
              left: `${lesson.position.x}%`, 
              top: `${lesson.position.y}%` 
            }}
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => isAccessible && moveToNextLesson(index)}
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ delay: index * 0.3, duration: 0.8, type: "spring" }}
          >
            {/* Island base with glow effect */}
            <div className="relative">
              {/* Enhanced treasure chest with story theme */}
              <div className="relative group">
                <motion.div
                  className={`w-16 h-14 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg border-4 border-yellow-600 shadow-2xl flex items-center justify-center text-2xl ${
                    isCompleted ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 
                    isCurrent ? 'bg-gradient-to-br from-purple-400 to-violet-500 animate-bounce' : 
                    !isAccessible ? 'grayscale opacity-50' : ''
                  }`}
                  animate={isCurrent ? { y: [-3, 3, -3] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {lesson.id === 'what-is-ai' ? '📡' :
                   lesson.id === 'how-ai-learns' ? '🧠' :
                   lesson.id === 'meet-ai-friend' ? '🤖' :
                   lesson.id === 'llm-basics' ? '💬' : '🎨'}
                </motion.div>
                
                {/* Floating XP indicator */}
                {isAccessible && (
                  <motion.div 
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold"
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    +{lesson.xpReward} XP
                  </motion.div>
                )}
              </div>
              
              {/* Lesson number badge */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white">
                {lesson.number}
              </div>
              
              {/* Completion indicator */}
              {isCompleted && (
                <motion.div 
                  className="absolute -top-2 -right-2 text-green-400 text-xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ delay: 0.2, repeat: Infinity, duration: 2 }}
                >
                  ⭐
                </motion.div>
              )}
              
              {/* Magic particles for current lesson */}
              {isCurrent && (
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [-10, -20, -10],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: Math.random() * 0.5
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Enhanced lesson tooltip with story connection */}
            <motion.div 
              className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-white to-yellow-50 rounded-xl px-4 py-3 text-sm font-medium shadow-xl border-2 border-yellow-300 whitespace-nowrap max-w-56 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <div className="font-bold text-purple-800">{lesson.title}</div>
              <div className="text-xs text-gray-600 mt-1">{lesson.character}</div>
              <div className="text-xs text-blue-700 mt-1 italic">{lesson.questDescription}</div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Enhanced Animated Pirate Ship */}
      <motion.div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
        animate={{ 
          left: `${shipPosition.x}%`, 
          top: `${shipPosition.y}%` 
        }}
        transition={{ 
          duration: 3, 
          type: "spring", 
          damping: 0.7,
          stiffness: 50 
        }}
      >
        <motion.div
          className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg border-4 border-yellow-400 shadow-2xl flex items-center justify-center text-3xl"
          animate={{ 
            y: [-3, 3, -3],
            rotate: [-1, 1, -1] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          🚢
        </motion.div>
        
        {/* Ship wake with particles */}
        <motion.div className="absolute top-1/2 left-full">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white opacity-60 rounded-full absolute"
              style={{ left: i * 8, top: i * 2 }}
              animate={{ 
                scaleX: [1, 0.3, 1],
                opacity: [0.6, 0.1, 0.6],
                x: [0, 15, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeInOut" 
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced Story Modal with seamless lesson connection */}
      <AnimatePresence>
        {showStoryModal && (
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-30 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowStoryModal(false)}
          >
            <motion.div
              className="bg-gradient-to-br from-white via-yellow-50 to-amber-100 rounded-3xl p-8 max-w-lg mx-4 border-4 border-yellow-400 shadow-2xl"
              initial={{ scale: 0.5, y: 50, rotateX: 45 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.5, y: 50, rotateX: 45 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                {/* Character introduction */}
                <motion.div
                  className="mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-2xl mb-2 border-4 border-white shadow-lg">
                    {lessons[currentStoryIndex]?.mood === 'curious' ? '🔭' :
                     lessons[currentStoryIndex]?.mood === 'wonder' ? '✨' :
                     lessons[currentStoryIndex]?.mood === 'friendly' ? '🤝' :
                     lessons[currentStoryIndex]?.mood === 'wise' ? '🧙‍♂️' : '👑'}
                  </div>
                  <div className="text-sm font-medium text-purple-600">
                    {lessons[currentStoryIndex]?.character}
                  </div>
                </motion.div>

                <motion.h3 
                  className="text-2xl font-bold text-purple-800 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {lessons[currentStoryIndex]?.title}
                </motion.h3>
                
                {/* Enhanced scene preview */}
                <motion.div
                  className="mb-6 rounded-2xl overflow-hidden border-4 border-yellow-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {lessons[currentStoryIndex]?.isVideo ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-40 object-cover"
                      src={lessons[currentStoryIndex]?.sceneImage}
                    />
                  ) : (
                    <img
                      src={lessons[currentStoryIndex]?.sceneImage}
                      alt="Story scene"
                      className="w-full h-40 object-cover"
                    />
                  )}
                </motion.div>
                
                <motion.p 
                  className="text-amber-800 mb-4 leading-relaxed text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {lessons[currentStoryIndex]?.story}
                </motion.p>

                {/* Quest description connecting to actual lesson */}
                <motion.div
                  className="bg-blue-100 rounded-lg p-3 mb-4 border-2 border-blue-200"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.65 }}
                >
                  <div className="text-blue-800 font-semibold text-sm">
                    🎯 Your Quest: {lessons[currentStoryIndex]?.questDescription}
                  </div>
                </motion.div>
                
                {/* XP reward display */}
                <motion.div
                  className="bg-purple-100 rounded-lg p-3 mb-4 border-2 border-purple-200"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center justify-center gap-2 text-purple-700 font-bold">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span>Adventure Reward: +{lessons[currentStoryIndex]?.xpReward} XP</span>
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                </motion.div>
                
                <motion.button
                  onClick={() => setShowStoryModal(false)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Begin This Quest! ⚔️
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Progress Dashboard */}
      <div className="absolute bottom-6 left-6 bg-gradient-to-br from-white/95 to-yellow-50/95 rounded-2xl px-6 py-4 border-4 border-yellow-300 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Compass className="w-6 h-6 text-purple-600" />
          <div>
            <div className="text-lg font-bold text-purple-800">
              Captain's Log
            </div>
            <div className="text-sm text-purple-600">
              Quests: {completedLessons.length}/{lessons.length} • XP: {totalXP}
            </div>
          </div>
        </div>
      </div>

      {/* Achievement celebration */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-6xl"
              animate={{ 
                scale: [1, 1.5, 1],
                rotate: [0, 360, 0]
              }}
              transition={{ duration: 1 }}
            >
              🎉
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
