import React from 'react';
import { Button } from "@/components/ui/button";
import { LessonType } from '../curriculumData';

// Specific Lesson Introductions, Tutorials, Activities, Code Components
import { MeetAIFriendIntro } from '../introductions/MeetAIFriendIntro';
import { FinalFixedTutorial } from '../tutorials/FinalFixedTutorial';
import { MeetAIFriendActivityWrapper } from '../activities/MeetAIFriendActivityWrapper';
import { MeetAIFriendCode } from '../code-samples/MeetAIFriendCode';

import { LLMBasicsIntro } from '../introductions/LLMBasicsIntro';
import { LLMBasicsTutorial } from '../tutorials/LLMBasicsTutorial';
import { LLMBasicsActivityWrapper } from '../activities/LLMBasicsActivityWrapper';
import { LLMBasicsCode } from '../code-samples/LLMBasicsCode';

import { WhatIsAIIntro } from '../introductions/WhatIsAIIntro';
import { WhatIsAITutorial } from '../tutorials/WhatIsAITutorial';
import { AiOrNotActivityWrapper } from '../activities/AiOrNotActivityWrapper';

import PatternDetectorActivityWrapper from '../activities/PatternDetectorActivityWrapper';

// Default/Fallback components
import { DefaultLessonIntroductionContent } from './DefaultLessonIntroductionContent';
import { ComingSoonLessonContent } from './ComingSoonLessonContent';
import { LessonSlides } from '../slides/LessonSlides';

interface LessonContentRendererProps {
  lessonId: string;
  activeTab: string;
  lesson: LessonType;
  onContentComplete: () => void;
}

export const LessonContentRenderer: React.FC<LessonContentRendererProps> = ({
  lessonId,
  activeTab,
  lesson,
  onContentComplete,
}) => {
  console.log(`Rendering lesson content for: ${lessonId}, tab: ${activeTab}`);

  if (lessonId === 'what-is-ai') {
    switch (activeTab) {
      case 'introduction':
        return <WhatIsAIIntro onComplete={onContentComplete} />;
      case 'slides':
        return <LessonSlides lessonId={lessonId} />;
      case 'tutorial':
        return <WhatIsAITutorial onComplete={onContentComplete} />;
      case 'activity':
        return <AiOrNotActivityWrapper onComplete={onContentComplete} />;
      case 'code':
        return (
          <div className="text-center py-12 space-y-6">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-purple-800">Lesson Complete!</h3>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Great job learning about AI! You're ready for the next adventure.
            </p>
            <Button onClick={onContentComplete} className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              Continue to Next Lesson
            </Button>
          </div>
        );
      default:
        return <ComingSoonLessonContent onComplete={onContentComplete} />;
    }
  } else if (lessonId === 'how-ai-learns') {
    switch (activeTab) {
      case 'introduction':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-purple-800">How AI Learns</h2>
            <p className="text-lg text-gray-700">
              In this lesson, you'll discover how artificial intelligence learns from examples, just like you do!
            </p>
            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="font-semibold mb-3 text-blue-800">What You'll Learn:</h3>
              <ul className="list-disc pl-5 space-y-2 text-blue-700">
                <li>How AI learns from examples (training data)</li>
                <li>The concept of patterns in machine learning</li>
                <li>How to train an AI to recognize patterns</li>
              </ul>
            </div>
            <Button onClick={onContentComplete} className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
              Continue to Tutorial
            </Button>
          </div>
        );
      case 'slides':
        return <LessonSlides lessonId={lessonId} />;
      case 'tutorial':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-purple-800">Pattern Recognition</h2>
            <p className="text-lg text-gray-700">
              AI learns by finding patterns in data. In this activity, you'll train an AI to recognize different patterns.
            </p>
            <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
              <h3 className="font-semibold mb-3 text-yellow-800">How it works:</h3>
              <ol className="list-decimal pl-5 space-y-2 text-yellow-700">
                <li>You'll see different patterns of colored squares</li>
                <li>Label each pattern to help the AI learn</li>
                <li>After training, the AI will try to recognize patterns on its own</li>
                <li>See how accurate the AI becomes with your training!</li>
              </ol>
            </div>
            <Button onClick={onContentComplete} className="mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
              Start Activity
            </Button>
          </div>
        );
      case 'activity':
        return <PatternDetectorActivityWrapper onComplete={onContentComplete} />;
      case 'code':
        return (
          <div className="text-center py-12 space-y-6">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-purple-800">Lesson Complete!</h3>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Excellent work learning about how AI learns! You're becoming a true AI expert.
            </p>
            <Button onClick={onContentComplete} className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              Continue to Next Lesson
            </Button>
          </div>
        );
      default:
        return <ComingSoonLessonContent onComplete={onContentComplete} />;
    }
  } else if (lessonId === 'meet-ai-friend') {
    switch (activeTab) {
      case 'introduction':
        return <MeetAIFriendIntro onComplete={onContentComplete} />;
      case 'slides':
        return <LessonSlides lessonId={lessonId} />;
      case 'tutorial':
        return <FinalFixedTutorial onComplete={onContentComplete} />;
      case 'activity':
        return <MeetAIFriendActivityWrapper onComplete={onContentComplete} />;
      case 'code':
        return <MeetAIFriendCode onComplete={onContentComplete} />;
      default:
        return <ComingSoonLessonContent onComplete={onContentComplete} />;
    }
  } else if (lessonId === 'llm-basics') {
    switch (activeTab) {
      case 'introduction':
        return <LLMBasicsIntro onComplete={onContentComplete} />;
      case 'slides':
        return <LessonSlides lessonId={lessonId} />;
      case 'tutorial':
        return <LLMBasicsTutorial onComplete={onContentComplete} />;
      case 'activity':
        return <LLMBasicsActivityWrapper onComplete={onContentComplete} />;
      case 'code':
        return <LLMBasicsCode onComplete={onContentComplete} />;
      default:
        return <ComingSoonLessonContent onComplete={onContentComplete} />;
    }
  } else {
    // Default rendering for other lessons
    switch (activeTab) {
      case 'introduction':
        return <DefaultLessonIntroductionContent lesson={lesson} onComplete={onContentComplete} />;
      case 'slides':
        return <LessonSlides lessonId={lessonId} />;
      default:
        return <ComingSoonLessonContent onComplete={onContentComplete} />;
    }
  }
};