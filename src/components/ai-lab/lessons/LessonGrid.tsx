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
      "It’s going to be a blast! Are you ready to begin your adventure? Let’s go!",
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

const tierBgMap: Record<string, string> = {
  discoverers: "/Discoverers (BeachShore).png",
  explorers: "/Explorers (Jungle).png",
  builders: "/Builders (Mountain Caves).png",
  creators: "/Creators (Magical Peak).png",
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
    <div className="space-y-12">
      {tiers.map((tier) => (
        <div key={tier.stage} className="relative">
          <TierHeader stage={tier.stage} title={tier.title} />

          {/* Adventure cinematic welcome area with clickable video poster */}
          <div className="flex items-center gap-6 bg-gradient-to-r from-amber-50/90 via-purple-50/80 to-sky-100/80 border border-purple-100 rounded-xl mb-8 shadow-lg p-6">
            <div className="flex-shrink-0 w-48 md:w-80">
              <button
                type="button"
                className="group relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border-4 border-yellow-300 hover:scale-105 transition-transform bg-slate-200"
                aria-label="Play tier introduction video"
              >
                <img
                  src={tierBgMap[tier.stage]}
                  alt={`${tier.title} instructor video poster`}
                  className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white opacity-90 group-hover:scale-110 transition-transform drop-shadow-lg" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="#eab308" opacity="0.8"/>
                    <polygon points="10,8 16,12 10,16" fill="#fff" />
                  </svg>
                </div>
              </button>
            </div>
            <div className="py-2 pr-3 text-base text-sky-900">
              {welcomeScripts[tier.stage].script.map((paragraph, index) => (
                <p key={index} className="mb-2">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Grid of lesson cards */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
            {lessonsByStage[tier.stage]?.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div
                  className={`relative overflow-hidden flex flex-col shadow-xl border-2 border-yellow-300 bg-gradient-to-br from-white via-yellow-50 to-amber-100 rounded-2xl
                    group hover:shadow-2xl transition-shadow hover:-translate-y-1 hover:scale-105`}
                  style={{
                    boxShadow: '0 6px 32px 0 rgba(245,212,87,0.12), 0 1.5px 12px 0 rgba(137,96,59,0.08)'
                  }}
                >
                  {/* Treasure chest illustration */}
                  <div className="flex justify-center -mt-7">
                    <img
                      src="/Treasure Chest Icon.png"
                      alt="Treasure chest"
                      className="w-20 h-16 drop-shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform"
                      draggable={false}
                    />
                  </div>
                  <div className="p-5 pt-2 flex-1 flex flex-col min-h-[240px]">
                    <div className="flex gap-4 items-center mb-1">
                      <span className="block bg-yellow-200 text-yellow-800 rounded-full px-3 py-0.5 text-xs font-bold border border-yellow-500 drop-shadow">
                        Lesson {lesson.number}
                      </span>
                      {lesson.locked ? (
                        <span className="inline-block bg-gray-200 text-gray-500 rounded px-2 py-0.5 text-xs ml-1">Locked</span>
                      ) : lesson.completed ? (
                        <span className="inline-block bg-green-200 text-green-700 rounded px-2 py-0.5 text-xs ml-1">Completed</span>
                      ) : (
                        <span className="inline-block bg-blue-100 text-blue-700 rounded px-2 py-0.5 text-xs ml-1">Available</span>
                      )}
                    </div>
                    <h3 className="font-extrabold text-amber-800 text-lg mb-1">{lesson.title}</h3>
                    <p className="text-sm text-amber-700 mb-3 flex-grow">{lesson.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {lesson.concepts.slice(0, 3).map((concept, idx) => (
                        <span key={idx} className="bg-sky-100 text-sky-800 rounded px-2 py-0.5 text-xs">{concept}</span>
                      ))}
                    </div>
                    <div className="flex justify-between items-end mt-auto pt-2 border-t border-yellow-100">
                      <span className="text-xs text-amber-500">{lesson.duration} min</span>
                      <button
                        onClick={() => !lesson.locked && onSelectLesson(lesson.id)}
                        disabled={lesson.locked}
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg shadow 
                          ${lesson.locked
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-pink-400 hover:bg-pink-500 text-white font-bold animate-pulse"} transition`}
                      >
                        {lesson.locked ? 'Locked' : 'Embark'}
                        {!lesson.locked &&
                          <span className="ml-1">&#10148;</span>
                        }
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
