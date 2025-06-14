
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TAB_ORDER } from '../utils/lessonViewHelper';

interface LessonSectionNavigationProps {
  activeTab: string;
  isAtSectionEnd: boolean;
  onSetActiveTab: (tab: string) => void;
  onResetSectionEnd: () => void;
}

export const LessonSectionNavigation: React.FC<LessonSectionNavigationProps> = ({
  activeTab,
  isAtSectionEnd,
  onSetActiveTab,
  onResetSectionEnd,
}) => {
  const currentIndex = TAB_ORDER.indexOf(activeTab);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onSetActiveTab(TAB_ORDER[currentIndex - 1]);
      // Optionally reset section end, though usually it's reset on going next
    }
  };

  const handleNext = () => {
    if (currentIndex < TAB_ORDER.length - 1) {
      onSetActiveTab(TAB_ORDER[currentIndex + 1]);
      onResetSectionEnd();
    }
  };
  
  let nextButtonText = "Next Section";
  if (activeTab === 'introduction') nextButtonText = "Let's Start the Tutorial";
  else if (activeTab === 'tutorial') nextButtonText = "Let's Move to Activity";
  else if (activeTab === 'activity') nextButtonText = "Let's Look at the Code";


  return (
    <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={activeTab === TAB_ORDER[0]}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Previous Section
      </Button>

      {isAtSectionEnd && activeTab !== TAB_ORDER[TAB_ORDER.length - 1] && (
        <Button
          variant="default"
          onClick={handleNext}
          className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600"
        >
          {nextButtonText}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  );
};
