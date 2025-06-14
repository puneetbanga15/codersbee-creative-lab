
import React from 'react';
import { Button } from "@/components/ui/button";
import { LessonType } from '../curriculumData';

// Specific Lesson Introductions, Tutorials, Activities, Code Components
import { MeetAIFriendIntro } from '../introductions/MeetAIFriendIntro';
import { FinalFixedTutorial } from '../tutorials/FinalFixedTutorial'; // This was specific to meet-ai-friend tutorial
import { MeetAIFriendActivityWrapper } from '../activities/MeetAIFriendActivityWrapper';
import { MeetAIFriendCode } from '../code-samples/MeetAIFriendCode';

import { LLMBasicsIntro } from '../introductions/LLMBasicsIntro';
import { LLMBasicsTutorial } from '../tutorials/LLMBasicsTutorial';
import { LLMBasicsActivityWrapper } from '../activities/LLMBasicsActivityWrapper';
import { LLMBasicsCode } from '../code-samples/LLMBasicsCode';

import { WhatIsAIIntro } from '../introductions/WhatIsAIIntro';
import { WhatIsAITutorial } from '../tutorials/WhatIsAITutorial';
import { AiOrNotActivityWrapper } from '../activities/AiOrNotActivityWrapper'; // This was specific to what-is-ai activity

import PatternDetectorActivityWrapper from '../activities/PatternDetectorActivityWrapper'; // This was specific to how-ai-learns activity

// Default/Fallback components
import { DefaultLessonIntroductionContent } from './DefaultLessonIntroductionContent';
import { ComingSoonLessonContent } from './ComingSoonLessonContent';

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
  if (lessonId === 'what-is-ai') {
    switch (activeTab) {
      case 'introduction':
        return <WhatIsAIIntro onComplete={onContentComplete} />;
      case 'tutorial':
        return <WhatIsAITutorial onComplete={onContentComplete} />;
      case 'activity':
        // AiOrNotActivityWrapper did not originally take onComplete, ensure it does or adapt
        // For now, assuming it can take onComplete. If not, will need to adjust AiOrNotActivityWrapper.
        return <AiOrNotActivityWrapper />;
      case 'code':
        return <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-4">No code for this lesson yet</h3>
          <Button onClick={onContentComplete} className="mt-4">Continue</Button>
        </div>;
      default:
        return <ComingSoonLessonContent onComplete={onContentComplete} />;
    }
  } else if (lessonId === 'how-ai-learns') {
    switch (activeTab) {
      case 'introduction':
        // This was inline JSX, should be extracted or kept simple
        return <div className="space-y-6">
          <h2 className="text-2xl font-bold">How AI Learns</h2>
          <p>In this lesson, you'll discover how artificial intelligence learns from examples, just like you do!</p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">What You'll Learn:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>How AI learns from examples (training data)</li>
              <li>The concept of patterns in machine learning</li>
              <li>How to train an AI to recognize patterns</li>
            </ul>
          </div>
          <Button onClick={onContentComplete} className="mt-4">Continue to Activity</Button>
        </div>;
      case 'tutorial':
         return <div className="space-y-6">
            <h2 className="text-2xl font-bold">Pattern Recognition</h2>
            <p>AI learns by finding patterns in data. In this activity, you'll train an AI to recognize different patterns.</p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">How it works:</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>You'll see different patterns of colored squares</li>
                <li>Label each pattern to help the AI learn</li>
                <li>After training, the AI will try to recognize patterns on its own</li>
                <li>See how accurate the AI becomes with your training!</li>
              </ol>
            </div>
            <Button onClick={onContentComplete} className="mt-4">Start Activity</Button>
          </div>;
      case 'activity':
        return <PatternDetectorActivityWrapper onComplete={onContentComplete} />;
      case 'code':
        return <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-4">No code for this lesson yet</h3>
            <Button onClick={onContentComplete} className="mt-4">Continue</Button>
          </div>;
      default:
        return <ComingSoonLessonContent onComplete={onContentComplete} />;
    }
  } else if (lessonId === 'meet-ai-friend') {
    switch (activeTab) {
      case 'introduction':
        return <MeetAIFriendIntro onComplete={onContentComplete} />;
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
      case 'tutorial':
        return <LLMBasicsTutorial onComplete={onContentComplete} />;
      case 'activity':
        return <LLMBasicsActivityWrapper onComplete={onContentComplete} />;
      case 'code':
        return <LLMBasicsCode onComplete={onContentComplete} />;
      default:
        return <ComingSoonLessonContent onComplete={onContentComplete} />;
    }
  } else { // Default rendering for other lessons
    switch (activeTab) {
      case 'introduction':
        return <DefaultLessonIntroductionContent lesson={lesson} onComplete={onContentComplete} />;
      // For tutorial, activity, code in default lessons, show "Coming Soon"
      default:
        return <ComingSoonLessonContent onComplete={onContentComplete} />;
    }
  }
};
