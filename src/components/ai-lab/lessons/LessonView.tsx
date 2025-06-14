
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs"; // TabsContent is implicitly used by Tabs
import { motion } from 'framer-motion';

import { curriculumData, LessonType } from './curriculumData';
import { DebugDuplicateImages } from './DebugDuplicateImages'; // For the top-level instance

// Refactored UI Components
import { LessonNotFound } from './ui/LessonNotFound';
import { LessonLocked } from './ui/LessonLocked';
import { LessonPageHeader } from './ui/LessonPageHeader';
import { LessonMasthead } from './ui/LessonMasthead';
import { LessonTabsNavigation } from './ui/LessonTabsNavigation';
import { LessonSectionNavigation } from './ui/LessonSectionNavigation';
import { LessonCompletionActions } from './ui/LessonCompletionActions';

// Content Renderer
import { LessonContentRenderer } from './content/LessonContentRenderer';
import { TAB_ORDER } from './utils/lessonViewHelper';


type LessonViewProps = {
  lessonId: string;
  onBack?: () => void; // onBack is used by AILab page, but internally we use navigate
};

export const LessonView = ({ lessonId, onBack }: LessonViewProps) => {
  const [activeTab, setActiveTab] = useState(TAB_ORDER[0]);
  const [isAtSectionEnd, setIsAtSectionEnd] = useState(false);
  // const [tabContentCompleted, setTabContentCompleted] = useState(false); // This state seems unused after refactor
  const [isAtLessonEnd, setIsAtLessonEnd] = useState(false);
  
  const navigate = useNavigate();
  const lesson = curriculumData.find(l => l.id === lessonId);

  useEffect(() => {
    const handleSectionEndEvent = (event: CustomEvent) => {
      setIsAtSectionEnd(event.detail.isAtEnd);
    };
    window.addEventListener('sectionEndReached' as any, handleSectionEndEvent);
    return () => {
      window.removeEventListener('sectionEndReached' as any, handleSectionEndEvent);
    };
  }, []);

  useEffect(() => {
    // Reset section end state when tab changes
    setIsAtSectionEnd(false);
    // Consider the lesson complete when we're at the end of the last tab's content (isAtSectionEnd is true)
    setIsAtLessonEnd(isAtSectionEnd && activeTab === TAB_ORDER[TAB_ORDER.length - 1]);
  }, [activeTab, isAtSectionEnd]);
  
  const handleBackToLab = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/ai-lab');
    }
  };

  const handleContentComplete = () => {
    // This function was used to set tabContentCompleted which seems unused.
    // Now it directly signals that the current content part is done.
    setIsAtSectionEnd(true); 
  };
  
  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  const handleResetSectionEnd = () => {
    setIsAtSectionEnd(false);
  };

  if (!lesson) {
    return <LessonNotFound onBackToLab={handleBackToLab} />;
  }

  if (lesson.locked) {
    return <LessonLocked onBackToLab={handleBackToLab} />;
  }

  const currentLessonIndex = curriculumData.findIndex(l => l.id === lessonId);
  const nextLesson = currentLessonIndex !== -1 && currentLessonIndex < curriculumData.length - 1 
    ? curriculumData[currentLessonIndex + 1] 
    : null;

  return (
    <div className="space-y-6">
      <DebugDuplicateImages /> {/* Top-level instance, ensured no onComplete prop */}
      <LessonPageHeader />
      <LessonMasthead lesson={lesson} />
      
      <Card>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={handleSetActiveTab} className="w-full">
            <LessonTabsNavigation />
            
            <div className="mt-6">
              <motion.div
                key={activeTab} // Animate when tab changes
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <LessonContentRenderer
                  lessonId={lessonId}
                  activeTab={activeTab}
                  lesson={lesson}
                  onContentComplete={handleContentComplete}
                />
                
                <LessonSectionNavigation
                  activeTab={activeTab}
                  isAtSectionEnd={isAtSectionEnd}
                  onSetActiveTab={handleSetActiveTab}
                  onResetSectionEnd={handleResetSectionEnd}
                />
              </motion.div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <LessonCompletionActions
          isAtLessonEnd={isAtLessonEnd}
          nextLesson={nextLesson}
          activeTab={activeTab} // Kept for now, but its usage in original was specific
          onSetActiveTab={handleSetActiveTab} // Kept for now
          onResetSectionEnd={handleResetSectionEnd} // Kept for now
        />
      </div>
    </div>
  );
};
