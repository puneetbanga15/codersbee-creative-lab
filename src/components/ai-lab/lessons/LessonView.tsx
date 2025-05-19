
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Rocket, Info, Code, Play, CheckCircle, ArrowRight, Book, Lock } from 'lucide-react';
import { curriculumData } from './curriculumData';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

// Import lesson-specific components
import { MeetAIFriendIntro } from './introductions/MeetAIFriendIntro';
import { FinalFixedTutorial } from './tutorials/FinalFixedTutorial';
import { MeetAIFriendActivityWrapper } from './activities/MeetAIFriendActivityWrapper';
import { MeetAIFriendCode } from './code-samples/MeetAIFriendCode';

// Import LLM Basics lesson components
import { LLMBasicsIntro } from './introductions/LLMBasicsIntro';
import { LLMBasicsTutorial } from './tutorials/LLMBasicsTutorial';
import { LLMBasicsActivityWrapper } from './activities/LLMBasicsActivityWrapper';
import { LLMBasicsCode } from './code-samples/LLMBasicsCode';

// Import DebugDuplicateImages component
import { DebugDuplicateImages } from './DebugDuplicateImages';

type LessonViewProps = {
  lessonId: string;
  onBack?: () => void;
};

// Define the tab order for navigation
const tabOrder = ['introduction', 'tutorial', 'activity', 'code'];

export const LessonView = ({ lessonId, onBack }: LessonViewProps) => {
  const [activeTab, setActiveTab] = useState('introduction');
  const lesson = curriculumData.find(l => l.id === lessonId);
  const navigate = useNavigate();
  
  const handleBackToLab = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/ai-lab');
    }
  };
  
  // Handle next tab navigation
  const handleNextTab = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };
  
  // Check if this is the last tab
  const isLastTab = activeTab === tabOrder[tabOrder.length - 1];
  
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
    if (lessonId === 'meet-ai-friend') {
      switch (tab) {
        case 'introduction':
          return <MeetAIFriendIntro />;
        case 'tutorial':
          return <FinalFixedTutorial />;
        case 'activity':
          return <MeetAIFriendActivityWrapper />;
        case 'code':
          return <MeetAIFriendCode />;
        default:
          return <div>Content not available</div>;
      }
    } 
    else if (lessonId === 'llm-basics') {
      switch (tab) {
        case 'introduction':
          return <LLMBasicsIntro />;
        case 'tutorial':
          return <LLMBasicsTutorial />;
        case 'activity':
          return <LLMBasicsActivityWrapper />;
        case 'code':
          return <LLMBasicsCode />;
        default:
          return <div>Content not available</div>;
      }
    }
    else {
      switch (tab) {
        case 'introduction':
          return (
            <div>
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
              </motion.div>
            </div>
          );
      }
    }
  };
  
  // Find the next lesson
  const nextLessonIndex = curriculumData.findIndex(l => l.id === lessonId) + 1;
  const nextLesson = nextLessonIndex < curriculumData.length ? curriculumData[nextLessonIndex] : null;
  
  return (
    <div className="space-y-6">
      <DebugDuplicateImages />
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link to="/ai-lab" className="inline-block">
            <Button variant="ghost" className="flex items-center gap-2 text-purple-700 hover:text-purple-900 hover:bg-purple-50">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to AI Lab</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-[#9b87f5]">AI Lab</h1>
          <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            Beta
          </Badge>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-sm">
            {getStageLabel(lesson.stage)}
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
        {isLastTab && nextLesson ? (
          <Link to={`/ai-lab/lessons/${nextLesson.id}`} className="inline-block">
            <Button 
              className="bg-purple-500 hover:bg-purple-600" 
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Next Lesson: {nextLesson.title}
            </Button>
          </Link>
        ) : isLastTab ? (
          <Button className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="mr-2 h-4 w-4" />
            Complete Lesson
          </Button>
        ) : (
          <Button 
            onClick={handleNextTab}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <ArrowRight className="mr-2 h-4 w-4" />
            Next: {tabOrder.indexOf(activeTab) < tabOrder.length - 1 ? 
              tabOrder[tabOrder.indexOf(activeTab) + 1].charAt(0).toUpperCase() + 
              tabOrder[tabOrder.indexOf(activeTab) + 1].slice(1) : ''}
          </Button>
        )}
      </div>
    </div>
  );
};

// Helper function to get color based on stage
function getStageLabel(stage: string): string {
  switch (stage) {
    case 'foundation':
      return 'Foundation';
    case 'application':
      return 'Application';
    case 'understanding':
      return 'Understanding';
    case 'advanced':
      return 'Advanced';
    default:
      return 'Unknown';
  }
}

function getStageBgClass(stage: string): string {
  switch (stage) {
    case 'foundation':
      return 'bg-blue-500 text-white';
    case 'application':
      return 'bg-green-500 text-white';
    case 'understanding':
      return 'bg-purple-500 text-white';
    case 'advanced':
      return 'bg-orange-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}

function getStageDifficulty(stage: string): string {
  switch (stage) {
    case 'foundation':
      return 'Beginner';
    case 'application':
      return 'Intermediate';
    case 'understanding':
      return 'Advanced';
    case 'advanced':
      return 'Expert';
    default:
      return 'Unknown';
  }
}
