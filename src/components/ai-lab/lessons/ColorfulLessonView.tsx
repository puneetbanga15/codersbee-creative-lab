import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, FileText, Play, Code, Clock, Users, Target } from 'lucide-react';

import { curriculumData, LessonType } from './curriculumData';
import { LessonSlides } from './slides/LessonSlides';
import { LessonContentRenderer } from './content/LessonContentRenderer';

type ColorfulLessonViewProps = {
  lessonId: string;
  onBack?: () => void;
};

const SLIDES_FIRST_TAB_ORDER = ['slides', 'introduction', 'tutorial', 'activity', 'code'];

const getStageColors = (stage: string) => {
  switch (stage) {
    case 'discoverers':
      return {
        gradient: 'from-blue-500 to-cyan-500',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        accent: 'text-blue-600'
      };
    case 'explorers':
      return {
        gradient: 'from-green-500 to-emerald-500',
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-700',
        accent: 'text-green-600'
      };
    case 'builders':
      return {
        gradient: 'from-orange-500 to-amber-500',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-700',
        accent: 'text-orange-600'
      };
    case 'creators':
      return {
        gradient: 'from-purple-500 to-pink-500',
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-700',
        accent: 'text-purple-600'
      };
    default:
      return {
        gradient: 'from-gray-500 to-slate-500',
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        text: 'text-gray-700',
        accent: 'text-gray-600'
      };
  }
};

const hasSlides = (lessonId: string) => {
  return ['what-is-ai', 'llm-basics', 'magic-of-prompts'].includes(lessonId);
};

export const ColorfulLessonView: React.FC<ColorfulLessonViewProps> = ({ lessonId, onBack }) => {
  const [activeTab, setActiveTab] = useState(hasSlides(lessonId) ? 'slides' : 'introduction');
  const [isAtSectionEnd, setIsAtSectionEnd] = useState(false);
  
  const navigate = useNavigate();
  const lesson = curriculumData.find(l => l.id === lessonId);

  const handleBackToLab = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/ai-lab');
    }
  };

  const handleContentComplete = () => {
    setIsAtSectionEnd(true);
  };

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Lesson Not Found</h2>
            <p className="text-muted-foreground mb-6">The lesson you're looking for doesn't exist.</p>
            <Button onClick={handleBackToLab}>Back to AI Lab</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (lesson.locked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Lesson Locked</h2>
            <p className="text-muted-foreground mb-6">This lesson will be available soon!</p>
            <Button onClick={handleBackToLab}>Back to AI Lab</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const colors = getStageColors(lesson.stage);
  const currentLessonIndex = curriculumData.findIndex(l => l.id === lessonId);
  const nextLesson = currentLessonIndex !== -1 && currentLessonIndex < curriculumData.length - 1 
    ? curriculumData[currentLessonIndex + 1] 
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      {/* Header */}
      <div className={`bg-gradient-to-r ${colors.gradient} text-white`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackToLab}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to AI Lab
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary" className="bg-white/20 text-white">
                Lesson {lesson.number}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white capitalize">
                {lesson.stage}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{lesson.title}</h1>
            <p className="text-xl text-white/90 max-w-3xl mb-6">{lesson.description}</p>
            
            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{lesson.duration} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                <span>{lesson.concepts.length} key concepts</span>
              </div>
              {lesson.activities && (
                <div className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  <span>{lesson.activities.length} activities</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="mb-8">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                {/* Custom tabs navigation with colors */}
                <div className="flex flex-wrap gap-2 mb-6 p-1 bg-muted rounded-lg">
                  {hasSlides(lessonId) && (
                    <button
                      onClick={() => setActiveTab('slides')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                        activeTab === 'slides' 
                          ? `bg-gradient-to-r ${colors.gradient} text-white shadow-md` 
                          : `hover:bg-background ${colors.text}`
                      }`}
                    >
                      <FileText className="h-4 w-4" />
                      <span className="font-medium">Slides</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => setActiveTab('introduction')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                      activeTab === 'introduction' 
                        ? `bg-gradient-to-r ${colors.gradient} text-white shadow-md` 
                        : `hover:bg-background ${colors.text}`
                    }`}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span className="font-medium">Introduction</span>
                  </button>
                  
                  {lesson.activities && lesson.activities.length > 0 && (
                    <button
                      onClick={() => setActiveTab('activity')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                        activeTab === 'activity' 
                          ? `bg-gradient-to-r ${colors.gradient} text-white shadow-md` 
                          : `hover:bg-background ${colors.text}`
                      }`}
                    >
                      <Play className="h-4 w-4" />
                      <span className="font-medium">Activity</span>
                    </button>
                  )}
                </div>

                {/* Tab content */}
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-[600px]"
                >
                  {activeTab === 'slides' && hasSlides(lessonId) && (
                    <LessonSlides lessonId={lessonId} />
                  )}
                  
                  {activeTab !== 'slides' && (
                    <LessonContentRenderer
                      lessonId={lessonId}
                      activeTab={activeTab}
                      lesson={lesson}
                      onContentComplete={handleContentComplete}
                    />
                  )}
                </motion.div>
              </Tabs>
            </CardContent>
          </Card>

          {/* Key concepts sidebar */}
          <Card className={`${colors.bg} ${colors.border}`}>
            <CardHeader>
              <h3 className={`text-lg font-semibold ${colors.text}`}>Key Concepts You'll Learn</h3>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {lesson.concepts.map((concept, index) => (
                  <motion.div
                    key={concept}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-3 bg-white rounded-lg border ${colors.border} shadow-sm`}
                  >
                    <div className={`text-sm font-medium ${colors.text}`}>{concept}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};