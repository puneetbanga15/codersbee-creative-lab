import React, { useState, useEffect } from 'react';
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
  const [isAtSectionEnd, setIsAtSectionEnd] = useState(false);
  const [justAutoAdvanced, setJustAutoAdvanced] = useState(false);
  const [tabContentCompleted, setTabContentCompleted] = useState(false);
  const lesson = curriculumData.find(l => l.id === lessonId);
  const navigate = useNavigate();
  
  // Listen for events from child components to know when we're at the end of a section
  useEffect(() => {
    const handleSectionEnd = (event: CustomEvent) => {
      setIsAtSectionEnd(event.detail.isAtEnd);
    };
    const eventListener = (e: Event) => handleSectionEnd(e as CustomEvent);
    window.addEventListener('sectionEndReached', eventListener);
    return () => {
      window.removeEventListener('sectionEndReached', eventListener);
    };
  }, []);
  
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
      setTabContentCompleted(false);
    }
  };
  
  // Handle content completion within a tab
  const handleContentComplete = () => {
    setTabContentCompleted(true);
    // Automatically move to the next tab when content is completed
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
      setTabContentCompleted(false);
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
          return <MeetAIFriendIntro onComplete={handleContentComplete} />;
        case 'tutorial':
          return <FinalFixedTutorial onComplete={handleContentComplete} />;
        case 'activity':
          return <MeetAIFriendActivityWrapper onComplete={handleContentComplete} />;
        case 'code':
          return <MeetAIFriendCode onComplete={handleContentComplete} />;
        default:
          return <div>Content not available</div>;
      }
    } 
    else if (lessonId === 'llm-basics') {
      switch (tab) {
        case 'introduction':
          return <LLMBasicsIntro onComplete={handleContentComplete} />;
        case 'tutorial':
          return <LLMBasicsTutorial onComplete={handleContentComplete} />;
        case 'activity':
          return <LLMBasicsActivityWrapper onComplete={handleContentComplete} />;
        case 'code':
          return <LLMBasicsCode onComplete={handleContentComplete} />;
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
              
              <div className="flex justify-end mt-8">
                <Button onClick={handleContentComplete} className="bg-blue-500 hover:bg-blue-600">
                  I've Read This
                </Button>
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
                
                <Button onClick={handleContentComplete} className="bg-blue-500 hover:bg-blue-600">
                  Continue
                </Button>
              </motion.div>
            </div>
          );
      }
    }
  };
  
  // Find the next lesson
  const nextLessonIndex = curriculumData.findIndex(l => l.id === lessonId) + 1;
  const nextLesson = nextLessonIndex < curriculumData.length ? curriculumData[nextLessonIndex] : null;
  
  // Track if we're at the end of the entire lesson (last section's end)
  const [isAtLessonEnd, setIsAtLessonEnd] = useState(false);
  
  // Update lesson end state when section and tab change
  useEffect(() => {
    // Consider the lesson complete when we're at the end of the code section
    setIsAtLessonEnd(isAtSectionEnd && activeTab === 'code');
  }, [isAtSectionEnd, activeTab]);
  
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
          <Tabs 
            value={activeTab} 
            onValueChange={(val) => {
              setActiveTab(val);
              setIsAtSectionEnd(false); // Reset section end state when changing tabs
            }} 
            className="w-full"
          >
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
                
                {/* Section Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      const sections = ['introduction', 'tutorial', 'activity', 'code'];
                      const currentIndex = sections.indexOf(activeTab);
                      if (currentIndex > 0) {
                        setActiveTab(sections[currentIndex - 1]);
                      }
                    }}
                    disabled={activeTab === 'introduction'}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous Section
                  </Button>
                  

                </div>
              </motion.div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        {isAtLessonEnd && nextLesson ? (
          <Link to={`/ai-lab/lessons/${nextLesson.id}`} className="inline-block">
            <Button 
              className="bg-purple-500 hover:bg-purple-600" 
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Next Lesson: {nextLesson.title}
            </Button>
          </Link>
        ) : isAtLessonEnd ? (
          <Button 
            className="bg-green-500 hover:bg-green-600"
            onClick={() => {
              if (activeTab === 'tutorial') {
                setActiveTab('activity');
                setIsAtSectionEnd(false);
              }
            }}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            {activeTab === 'tutorial' ? "Move to Activity" : "Complete Lesson"}
          </Button>
        ) : (
          <div>{/* Empty div to maintain flex layout */}</div>
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
