
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, ArrowRight, CheckCircle, Telescope, Map, Construction, Sparkles, PlayCircle, Star, Trophy } from 'lucide-react';
import { curriculumData, LessonType } from './curriculumData';
import { motion } from 'framer-motion';
import { CollapsibleSection } from '../ui/CollapsibleSection';
import { TierHeader } from '../ui/TierHeader';
import { LessonJourneyMap } from '../ui/LessonJourneyMap';

type LessonGridProps = {
  onSelectLesson: (lessonId: string) => void;
};

// Enhanced tiers with story context
const tiers = [
  { 
    stage: 'discoverers', 
    title: 'Tier 1: The Discoverers', 
    icon: <Telescope className="h-6 w-6 text-purple-700" />, 
    defaultOpen: true,
    storyIntro: "Begin your legendary voyage to the mysterious Island of AI...",
    difficulty: "Beginner Friendly",
    estimatedTime: "2-3 hours"
  },
  { 
    stage: 'explorers', 
    title: 'Tier 2: The Explorers', 
    icon: <Map className="h-6 w-6 text-purple-700" />, 
    defaultOpen: false,
    storyIntro: "Venture deeper into the AI jungle and uncover hidden secrets...",
    difficulty: "Intermediate",
    estimatedTime: "3-4 hours"
  },
  { 
    stage: 'builders', 
    title: 'Tier 3: The Builders', 
    icon: <Construction className="h-6 w-6 text-purple-700" />, 
    defaultOpen: false,
    storyIntro: "Master the ancient caves and learn to construct AI magic...",
    difficulty: "Advanced",
    estimatedTime: "4-5 hours"
  },
  { 
    stage: 'creators', 
    title: 'Tier 4: The Creators', 
    icon: <Sparkles className="h-6 w-6 text-purple-700" />, 
    defaultOpen: false,
    storyIntro: "Reach the summit and become a master of AI creation...",
    difficulty: "Expert",
    estimatedTime: "5-6 hours"
  },
] as const;

type TierStage = typeof tiers[number]['stage'];

// Updated welcome scripts with simplified content
const welcomeScripts: Record<TierStage, { title: string, script: string[] }> = {
  discoverers: {
    title: "Welcome, Brave Discoverer!",
    script: [
      "Welcome aboard Captain Buzzy! In this chapter you'll sail across enchanted waters, meet incredible AI creatures, learn to speak their language, and even create magic from your very thoughts! ⚓"
    ]
  },
  explorers: {
    title: "Welcome, Fearless Explorer!",
    script: [
      "Congratulations on reaching the Explorer tier! Your reputation as an AI adventurer grows stronger! 🗺️",
      "The jungle ahead holds deeper mysteries - AI that can see, read emotions, and understand the world in ways you've never imagined."
    ]
  },
  builders: {
    title: "Welcome, Master Builder!",
    script: [
      "You've proven yourself worthy of the Builder's title! The mountain caves reveal their secrets to only the most dedicated! ⛰️",
      "Here you'll forge your own AI creations, learning the ancient arts of neural networks and algorithmic magic."
    ]
  },
  creators: {
    title: "Welcome, Legendary Creator!",
    script: [
      "Behold! You've reached the sacred summit where legends are born! Few have come this far! 👑",
      "At this mystical peak, you'll transcend all limits and create AI wonders beyond imagination."
    ]
  }
};

// Enhanced tier video mapping with fallback handling
const tierVideoMap: Record<TierStage, string> = {
  discoverers: "/Discoverers Instructor Video.mp4",
  explorers: "/Explorers Instructor Video.mp4", 
  builders: "/Builders Instructor Video.mp4",
  creators: "/Creators Instructor Video.mp4",
};

// Enhanced border colors with gradients
function getBorderColorByStage(stage: LessonType['stage']): string {
  switch (stage) {
    case 'discoverers': return 'from-sky-400 to-blue-500';
    case 'explorers': return 'from-lime-400 to-green-500';
    case 'builders': return 'from-amber-400 to-orange-500';
    case 'creators': return 'from-violet-400 to-purple-500';
    default: return 'from-gray-400 to-gray-500';
  }
}

export const LessonGrid: React.FC<LessonGridProps> = ({ onSelectLesson }) => {
  // Group lessons by stage for easy rendering
  const lessonsByStage = curriculumData.reduce((acc, lesson) => {
    const stage = lesson.stage;
    if (!acc[stage]) {
      acc[stage] = [];
    }
    acc[stage].push(lesson);
    return acc;
  }, {} as Record<string, LessonType[]>);

  // Enhanced progress tracking
  const completedLessons: string[] = ['what-is-ai']; // Demo: first lesson completed
  const currentLesson = 'how-ai-learns'; // Demo: currently on second lesson

  return (
    <div className="space-y-20">
      {tiers.map((tier) => (
        <motion.div 
          key={tier.stage} 
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: tiers.findIndex(t => t.stage === tier.stage) * 0.2 }}
        >
          <TierHeader stage={tier.stage} title={tier.title} />

          {/* Enhanced adventure cinematic welcome area - BIGGER */}
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-12 bg-gradient-to-br from-amber-50/98 via-orange-50/95 to-yellow-100/98 border-4 border-yellow-300 rounded-3xl mb-16 shadow-2xl p-12 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex-shrink-0 w-full lg:w-[600px]">
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <video
                  className="relative w-full aspect-video rounded-3xl border-4 border-yellow-400 shadow-2xl"
                  poster={`/${tier.stage === 'discoverers' ? 'Discoverers (BeachShore)' : 
                           tier.stage === 'explorers' ? 'Explorers (Jungle)' : 
                           tier.stage === 'builders' ? 'Builders (Mountain Caves)' : 
                           'Creators (Magical Peak)'}.png`}
                  controls
                  preload="metadata"
                >
                  <source src={tierVideoMap[tier.stage]} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-6 shadow-2xl">
                    <PlayCircle className="w-16 h-16 text-white" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            <div className="flex-1 text-center lg:text-left space-y-6">
              <motion.h3 
                className="text-4xl font-bold bg-gradient-to-r from-sky-800 to-purple-800 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {welcomeScripts[tier.stage].title}
              </motion.h3>
              
              {/* Tier metadata */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm font-semibold">
                  {tier.difficulty}
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-semibold">
                  ⏱️ {tier.estimatedTime}
                </Badge>
                <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-semibold">
                  🎯 {lessonsByStage[tier.stage]?.length || 0} Adventures
                </Badge>
              </div>
              
              <div className="text-lg text-sky-800 space-y-4">
                {welcomeScripts[tier.stage].script.map((paragraph, index) => (
                  <motion.p 
                    key={index} 
                    className="leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
              
              <motion.div 
                className="text-center lg:text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-amber-700 italic font-medium">
                  {tier.storyIntro}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Interactive Journey Map */}
          <div className="mb-16">
            <motion.h3 
              className="text-3xl font-bold text-center text-purple-800 mb-8 flex items-center justify-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Map className="w-10 h-10 text-yellow-500" />
              Your Epic Adventure Journey
              <Map className="w-10 h-10 text-yellow-500" />
            </motion.h3>
            <LessonJourneyMap 
              tier={tier.stage}
              completedLessons={completedLessons}
              currentLesson={currentLesson}
            />
          </div>

          {/* Enhanced Grid of lesson cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {lessonsByStage[tier.stage]?.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 30, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.03 }}
              >
                <div className={`relative overflow-hidden flex flex-col shadow-2xl border-4 border-yellow-400 bg-gradient-to-br ${getBorderColorByStage(lesson.stage)} p-1 rounded-3xl group hover:shadow-3xl transition-all duration-500`}>
                  
                  {/* Inner card with enhanced styling */}
                  <div className="bg-gradient-to-br from-white via-yellow-50 to-amber-100 rounded-2xl p-8 flex-1 flex flex-col min-h-[320px] relative overflow-hidden">
                    
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5 bg-repeat" style={{ backgroundImage: "url('/Adventure Map Background.png')", backgroundSize: '200px' }}></div>
                    
                    {/* Treasure chest illustration with enhanced animation */}
                    <div className="flex justify-center -mt-12 mb-6 relative z-10">
                      <motion.div
                        className="w-28 h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl border-4 border-yellow-600 shadow-2xl flex items-center justify-center text-4xl"
                        whileHover={{ 
                          scale: 1.15, 
                          rotate: [0, -5, 5, 0],
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        💎
                      </motion.div>
                      
                      {/* Floating sparkles */}
                      <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                            style={{
                              left: `${20 + i * 30}%`,
                              top: `${10 + i * 20}%`,
                            }}
                            animate={{
                              y: [-5, -15, -5],
                              opacity: [0.5, 1, 0.5],
                              scale: [0.5, 1, 0.5]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col relative z-10">
                      <div className="flex gap-4 items-center mb-4">
                        <Badge className="bg-gradient-to-r from-yellow-300 to-orange-300 text-yellow-900 rounded-full px-4 py-2 text-sm font-bold border-2 border-yellow-500 shadow-lg">
                          Quest {lesson.number}
                        </Badge>
                        {lesson.locked ? (
                          <Badge className="bg-gray-200 text-gray-600 rounded-full px-3 py-1 text-sm border border-gray-300">
                            🔒 Locked
                          </Badge>
                        ) : lesson.completed ? (
                          <Badge className="bg-green-200 text-green-700 rounded-full px-3 py-1 text-sm border border-green-300">
                            ⭐ Mastered
                          </Badge>
                        ) : (
                          <Badge className="bg-blue-200 text-blue-700 rounded-full px-3 py-1 text-sm border border-blue-300">
                            ⚡ Ready
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="font-extrabold text-amber-900 text-xl mb-4 leading-tight">{lesson.title}</h3>
                      <p className="text-base text-amber-800 mb-6 flex-grow leading-relaxed">{lesson.description}</p>
                      
                      {/* Enhanced concept tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {lesson.concepts.slice(0, 3).map((concept, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-sky-100 text-sky-800 rounded-full px-3 py-1 text-xs border border-sky-200 hover:bg-sky-200 transition-colors">
                            {concept}
                          </Badge>
                        ))}
                        {lesson.concepts.length > 3 && (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-xs border border-purple-200">
                            +{lesson.concepts.length - 3} more
                          </Badge>
                        )}
                      </div>
                      
                      {/* Enhanced footer with better spacing and rewards */}
                      <div className="flex justify-between items-end mt-auto pt-6 border-t-2 border-yellow-200">
                        <div className="flex flex-col gap-2">
                          <Badge className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-sm font-medium">
                            ⏱️ {lesson.duration} min
                          </Badge>
                          <Badge className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                            <Star className="w-3 h-3 mr-1" />
                            250 XP
                          </Badge>
                        </div>
                        
                        <motion.button
                          onClick={() => !lesson.locked && onSelectLesson(lesson.id)}
                          disabled={lesson.locked}
                          className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transform transition-all duration-200 ${
                            lesson.locked
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-white shadow-xl"
                          }`}
                          whileHover={!lesson.locked ? { 
                            scale: 1.05, 
                            boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.25)" 
                          } : {}}
                          whileTap={!lesson.locked ? { scale: 0.95 } : {}}
                        >
                          {lesson.locked ? (
                            <>
                              <Lock className="w-5 h-5" />
                              Locked
                            </>
                          ) : (
                            <>
                              <Trophy className="w-5 h-5" />
                              Begin Quest
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
