import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Rocket, 
  Info, 
  Code, 
  Play, 
  CheckCircle, 
  ArrowRight, 
  Book, 
  Lock,
  Star,
  Trophy,
  GraduationCap,
  Flag,
  InfoIcon
} from 'lucide-react';
import { curriculumData } from './curriculumData';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

// Import lesson-specific components
import { PatternPalaceIntro } from './introductions/pattern-palace/PatternPalaceIntro';
import { PatternPalaceActivity } from './activities/pattern-palace/PatternPalaceActivity';

type LessonViewProps = {
  lessonId: string;
  onBack?: () => void;
};

export const LessonView = ({ lessonId, onBack }: LessonViewProps) => {
  const [activeTab, setActiveTab] = useState('introduction');
  const lesson = curriculumData.find(l => l.id === lessonId);
  const navigate = useNavigate();
  
  const handleBackToLab = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/coding-lab');
    }
  };
  
  if (!lesson) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Lesson Not Found</h2>
        <p className="text-gray-600 mb-6">We couldn't find the lesson you're looking for.</p>
        <Button onClick={handleBackToLab}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Lessons
        </Button>
      </div>
    );
  }

  if (lesson.locked) {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Lock className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Lesson Locked</h2>
          <p className="text-gray-600 mb-6">Complete the previous lessons to unlock this one!</p>
          <Button onClick={handleBackToLab}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Lessons
          </Button>
        </motion.div>
      </div>
    );
  }
  
  const renderLessonContent = (tab: string) => {
    // Pattern Palace lesson (first lesson)
    if (lessonId === 'pattern-palace') {
      switch (tab) {
        case 'introduction':
          return <PatternPalaceIntro />;
        case 'activity':
          return <PatternPalaceActivity />;
        case 'tutorial':
          return (
            <div className="text-center py-12">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Book className="w-10 h-10 text-yellow-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon!</h2>
                <p className="text-gray-600 mb-6">The detailed tutorial for this lesson is under development.</p>
              </motion.div>
            </div>
          );
        case 'code':
          return (
            <div className="text-center py-12">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Code className="w-10 h-10 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon!</h2>
                <p className="text-gray-600 mb-6">Code examples for this lesson are being prepared.</p>
              </motion.div>
            </div>
          );
        default:
          return null;
      }
    }
    
    // For other lessons, use the default rendering
    switch (tab) {
      case 'introduction':
        return (
          <div className="space-y-6">
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <div className="flex gap-3 mb-2">
                <Star className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-800">Mathematical Pioneer</h3>
                  <p className="text-amber-800 font-medium">{lesson.mathPioneer.name} • {lesson.mathPioneer.origin}</p>
                  <p className="text-amber-700 text-sm mt-1">{lesson.mathPioneer.contribution}</p>
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">Welcome to {lesson.title}!</h2>
            <p className="mb-4">
              In this lesson, you'll learn about {lesson.concepts.join(', ')}. 
              This activity will take approximately {lesson.duration} minutes to complete.
            </p>
            
            <h3 className="text-lg font-medium mt-6 mb-3">What You'll Learn</h3>
            <ul className="list-disc pl-5 space-y-2">
              {lesson.concepts.map((concept, index) => (
                <li key={index} className="text-gray-700">{concept}</li>
              ))}
            </ul>
            
            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium mb-2">Game Overview</h3>
              <p className="text-gray-700">
                This interactive lesson will guide you through a series of coding challenges themed around {lesson.title.split(':')[0]}.
                You'll apply computational thinking concepts inspired by {lesson.mathPioneer.name}'s work.
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
                <Rocket className="w-10 h-10 text-yellow-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon!</h2>
              <p className="text-gray-600 mb-6">This lesson content is under development.</p>
              <p className="text-gray-500 max-w-md mx-auto">
                The {activeTab === 'tutorial' ? 'tutorial' : activeTab === 'activity' ? 'interactive coding activity' : 'code examples'} 
                for {lesson.title} will be available soon!
              </p>
            </motion.div>
          </div>
        );
    }
  };
  
  // Find the next lesson
  const nextLessonIndex = curriculumData.findIndex(l => l.id === lessonId) + 1;
  const nextLesson = nextLessonIndex < curriculumData.length ? curriculumData[nextLessonIndex] : null;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link to="/coding-lab" className="inline-block">
            <Button variant="ghost" className="flex items-center gap-2 text-green-700 hover:text-green-900 hover:bg-green-50">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Coding Lab</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-[#23c55e]">Coding Lab</h1>
          <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            Beta
          </Badge>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={getStageClass(lesson.stage)}>
            {getStageBadgeIcon(lesson.stage)}
            <span>{getStageName(lesson.stage)}</span>
          </Badge>
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
        </div>
        <Badge className={getStageBgClass(lesson.stage)}>
          {getStageDifficulty(lesson.stage)}
        </Badge>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="introduction" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span>Introduction</span>
              </TabsTrigger>
              <TabsTrigger value="tutorial" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                <span>Tutorial</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                <span>Activity</span>
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span>Code</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderLessonContent(activeTab)}
              </motion.div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        {nextLesson ? (
          <Link to={`/coding-lab/lessons/${nextLesson.id}`} className="inline-block">
            <Button 
              className={getButtonClass(lesson.stage)}
              disabled={nextLesson.locked}
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Next Lesson: {nextLesson.title.split(':')[0]}
            </Button>
          </Link>
        ) : (
          <Button className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="mr-2 h-4 w-4" />
            Complete Curriculum
          </Button>
        )}
      </div>
    </div>
  );
};

// Helper functions
function getStageName(stage: string): string {
  switch (stage) {
    case 'foundation':
      return 'Foundation';
    case 'intermediate':
      return 'Intermediate';
    case 'advanced':
      return 'Advanced';
    case 'expert':
      return 'Expert';
    default:
      return 'Unknown';
  }
}

function getStageBadgeIcon(stage: string) {
  switch (stage) {
    case 'foundation':
      return <Flag className="h-3 w-3 mr-1" />;
    case 'intermediate':
      return <GraduationCap className="h-3 w-3 mr-1" />;
    case 'advanced':
      return <Star className="h-3 w-3 mr-1" />;
    case 'expert':
      return <Trophy className="h-3 w-3 mr-1" />;
    default:
      return null;
  }
}

function getStageClass(stage: string): string {
  switch (stage) {
    case 'foundation':
      return 'text-blue-800';
    case 'intermediate':
      return 'text-green-800';
    case 'advanced':
      return 'text-purple-800';
    case 'expert':
      return 'text-orange-800';
    default:
      return 'text-gray-800';
  }
}

function getStageBgClass(stage: string): string {
  switch (stage) {
    case 'foundation':
      return 'bg-blue-500 text-white';
    case 'intermediate':
      return 'bg-green-500 text-white';
    case 'advanced':
      return 'bg-purple-500 text-white';
    case 'expert':
      return 'bg-orange-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}

function getStageDifficulty(stage: string): string {
  switch (stage) {
    case 'foundation':
      return 'Beginner';
    case 'intermediate':
      return 'Intermediate';
    case 'advanced':
      return 'Advanced';
    case 'expert':
      return 'Expert';
    default:
      return 'Unknown';
  }
}

function getButtonClass(stage: string): string {
  switch (stage) {
    case 'foundation':
      return 'bg-blue-500 hover:bg-blue-600';
    case 'intermediate':
      return 'bg-green-500 hover:bg-green-600';
    case 'advanced':
      return 'bg-purple-500 hover:bg-purple-600';
    case 'expert':
      return 'bg-orange-500 hover:bg-orange-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
}
