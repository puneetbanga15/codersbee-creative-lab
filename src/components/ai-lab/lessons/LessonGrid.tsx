
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, ArrowRight, CheckCircle, Telescope, Map, Construction, Sparkles, PlayCircle } from 'lucide-react';
import { curriculumData, LessonType } from './curriculumData';
import { motion } from 'framer-motion';
import { CollapsibleSection } from '../ui/CollapsibleSection';
import { TierHeader } from '../ui/TierHeader';

type LessonGridProps = {
  onSelectLesson: (lessonId: string) => void;
};

// Define tiers and their properties for structure and presentation
const tiers = [
  { stage: 'discoverers', title: 'Tier 1: Discoverers', icon: <Telescope className="h-6 w-6 text-purple-700" />, defaultOpen: true },
  { stage: 'explorers', title: 'Tier 2: Explorers', icon: <Map className="h-6 w-6 text-purple-700" />, defaultOpen: false },
  { stage: 'builders', title: 'Tier 3: Builders', icon: <Construction className="h-6 w-6 text-purple-700" />, defaultOpen: false },
  { stage: 'creators', title: 'Tier 4: Creators', icon: <Sparkles className="h-6 w-6 text-purple-700" />, defaultOpen: false },
] as const;

type TierStage = typeof tiers[number]['stage'];

// Welcome video scripts for each tier
const welcomeScripts: Record<TierStage, { title: string, script: string[] }> = {
  discoverers: {
    title: "Welcome, Discoverers!",
    script: [
      "Hey there, future AI adventurers, and welcome to the Discoverers tier! I'm so excited you're here.",
      "Imagine you're an explorer with a brand new telescope, and you've just spotted a mysterious island shimmering in the distance. That's the Island of AI! It's filled with amazing wonders, and we're going to explore its shores together.",
      "In this first part of our journey, we'll learn what AI actually is, teach an AI to recognize patterns, create incredible images from just our words, and even team up with an AI to write our own stories.",
      "It's going to be a blast! Are you ready to begin your adventure? Let's go!",
    ]
  },
  explorers: {
    title: "Welcome, Explorers!",
    script: [ "You've landed on the Island of AI! Now it's time to explore deeper into the jungles and uncover hidden treasures. We'll learn about how AI sees, reads, and even understands emotions. Let's continue the adventure!" ]
  },
  builders: {
    title: "Welcome, Builders!",
    script: [ "You're no longer just exploring; you're ready to build! In this tier, you'll get the tools to construct your own AI models from the ground up. We'll learn about data, neural networks, and making AI fair. Let's start building the future!" ]
  },
  creators: {
    title: "Welcome, Creators!",
    script: [ "This is it, the final stage of your journey! You've mastered the concepts, and now it's time to create something entirely new. You'll combine everything you've learned to design and build your very own, unique AI inventions. Your imagination is the only limit!" ]
  },
};

// Map tier stages to their video files
const tierVideoMap: Record<TierStage, string> = {
  discoverers: "/Discoverers Instructor Video.mp4",
  explorers: "/Explorers Instructor Video.mp4", 
  builders: "/Builders Instructor Video.mp4",
  creators: "/Creators Instructor Video.mp4",
};

// Helper function to get a distinct border color for cards based on stage
function getBorderColorByStage(stage: LessonType['stage']): string {
  switch (stage) {
    case 'discoverers': return 'bg-sky-500';
    case 'explorers': return 'bg-lime-500';
    case 'builders': return 'bg-amber-500';
    case 'creators': return 'bg-violet-500';
    default: return 'bg-gray-500';
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

  return (
    <div className="space-y-16">
      {tiers.map((tier) => (
        <div key={tier.stage} className="relative">
          <TierHeader stage={tier.stage} title={tier.title} />

          {/* Adventure cinematic welcome area with actual video */}
          <div className="flex flex-col lg:flex-row items-center gap-8 bg-gradient-to-br from-amber-50/95 via-orange-50/90 to-yellow-100/90 border-4 border-yellow-300 rounded-2xl mb-12 shadow-2xl p-8 backdrop-blur-sm">
            <div className="flex-shrink-0 w-full lg:w-96">
              <div className="relative group">
                <video
                  className="w-full aspect-video rounded-2xl border-4 border-yellow-400 shadow-2xl group-hover:scale-105 transition-transform duration-300"
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
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-yellow-400/90 rounded-full p-4 shadow-2xl group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl font-bold text-sky-900 mb-4">{welcomeScripts[tier.stage].title}</h3>
              <div className="text-lg text-sky-800 space-y-3">
                {welcomeScripts[tier.stage].script.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Grid of lesson cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {lessonsByStage[tier.stage]?.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative overflow-hidden flex flex-col shadow-2xl border-4 border-yellow-400 bg-gradient-to-br from-white via-yellow-50 to-amber-100 rounded-3xl group hover:shadow-3xl transition-all hover:-translate-y-2 hover:scale-105 duration-300">
                  
                  {/* Treasure chest illustration */}
                  <div className="flex justify-center -mt-8 mb-4">
                    <img
                      src="/Treasure Chest Icon.png"
                      alt="Treasure chest"
                      className="w-24 h-20 drop-shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500"
                      draggable={false}
                    />
                  </div>
                  
                  <div className="p-6 pt-2 flex-1 flex flex-col min-h-[280px]">
                    <div className="flex gap-4 items-center mb-3">
                      <span className="block bg-yellow-300 text-yellow-900 rounded-full px-4 py-1 text-sm font-bold border-2 border-yellow-500 shadow-lg">
                        Lesson {lesson.number}
                      </span>
                      {lesson.locked ? (
                        <span className="inline-block bg-gray-200 text-gray-600 rounded-full px-3 py-1 text-sm border border-gray-300">🔒 Locked</span>
                      ) : lesson.completed ? (
                        <span className="inline-block bg-green-200 text-green-700 rounded-full px-3 py-1 text-sm border border-green-300">✅ Completed</span>
                      ) : (
                        <span className="inline-block bg-blue-200 text-blue-700 rounded-full px-3 py-1 text-sm border border-blue-300">⚡ Available</span>
                      )}
                    </div>
                    
                    <h3 className="font-extrabold text-amber-900 text-xl mb-3 leading-tight">{lesson.title}</h3>
                    <p className="text-base text-amber-800 mb-4 flex-grow leading-relaxed">{lesson.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {lesson.concepts.slice(0, 3).map((concept, idx) => (
                        <span key={idx} className="bg-sky-100 text-sky-800 rounded-full px-3 py-1 text-xs border border-sky-200">{concept}</span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-end mt-auto pt-4 border-t-2 border-yellow-200">
                      <span className="text-sm text-amber-600 font-medium bg-amber-100 px-3 py-1 rounded-full">⏱️ {lesson.duration} min</span>
                      <button
                        onClick={() => !lesson.locked && onSelectLesson(lesson.id)}
                        disabled={lesson.locked}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg shadow-lg transform transition-all duration-200
                          ${lesson.locked
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white hover:scale-110 hover:shadow-xl animate-pulse"}`}
                      >
                        {lesson.locked ? '🔒 Locked' : '🚀 Embark'}
                        {!lesson.locked && <ArrowRight className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
