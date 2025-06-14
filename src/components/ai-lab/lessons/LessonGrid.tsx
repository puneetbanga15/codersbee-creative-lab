
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, ArrowRight, CheckCircle, Telescope, Map, Construction, Sparkles, PlayCircle } from 'lucide-react';
import { curriculumData, LessonType } from './curriculumData';
import { motion } from 'framer-motion';
import { CollapsibleSection } from '../ui/CollapsibleSection';

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
    <div className="space-y-6">
      {tiers.map((tier) => (
        <CollapsibleSection
          key={tier.stage}
          title={tier.title}
          icon={tier.icon}
          defaultOpen={tier.defaultOpen}
          className="border-purple-200"
        >
          {/* Welcome section with video placeholder and script */}
          <div className="bg-purple-50/50 rounded-lg mb-6 border border-purple-200">
            <div className="p-4 md:p-6">
              <h4 className="font-bold text-lg text-purple-800 mb-4">{welcomeScripts[tier.stage].title}</h4>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-2/5 lg:w-1/3 flex-shrink-0">
                  <div className="aspect-video bg-slate-300 rounded-lg flex items-center justify-center hover:bg-slate-400 transition-colors cursor-pointer">
                    <PlayCircle className="h-16 w-16 text-white/80" />
                  </div>
                </div>
                <div className="w-full md:w-3/5 lg:w-2/3 space-y-2 text-sm text-purple-700">
                  <p className="font-semibold text-purple-800">Instructor Script:</p>
                  {welcomeScripts[tier.stage].script.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Grid of lesson cards for the current tier */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {lessonsByStage[tier.stage]?.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className={`h-2 ${getBorderColorByStage(lesson.stage)}`}></div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="outline">Lesson {lesson.number}</Badge>
                      {lesson.locked ? (
                        <Badge className="bg-gray-200 text-gray-600 border border-gray-300"><Lock className="h-3 w-3 mr-1" />Locked</Badge>
                      ) : lesson.completed ? (
                        <Badge className="bg-green-100 text-green-700 border border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>
                      ) : (
                        <Badge className="bg-blue-100 text-blue-700 border border-blue-200"><Unlock className="h-3 w-3 mr-1" />Available</Badge>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{lesson.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{lesson.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {lesson.concepts.slice(0, 3).map((concept, idx) => (
                        <Badge key={idx} variant="secondary">{concept}</Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
                      <div className="text-sm text-gray-500">{lesson.duration} min</div>
                      <Button 
                        size="sm" 
                        onClick={() => onSelectLesson(lesson.id)}
                        disabled={lesson.locked}
                        className={lesson.locked ? '' : 'bg-purple-600 hover:bg-purple-700 text-white'}
                      >
                        {lesson.locked ? 'Locked' : 'Start Lesson'}
                        {!lesson.locked && <ArrowRight className="h-4 w-4 ml-1" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )) || <p className="text-gray-500">Lessons for this tier are coming soon!</p>}
          </div>
        </CollapsibleSection>
      ))}
    </div>
  );
};
