
import React from 'react';
import { Button } from '@/components/ui/button';
import { LessonType } from '../curriculumData';
import { DebugDuplicateImages } from '../DebugDuplicateImages'; // Assuming this path is correct

interface DefaultLessonIntroductionContentProps {
  lesson: LessonType;
  onComplete: () => void;
}

export const DefaultLessonIntroductionContent: React.FC<DefaultLessonIntroductionContentProps> = ({ lesson, onComplete }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Welcome to {lesson.title}!</h2>
      <p className="mb-4">
        In this lesson, you'll learn about {lesson.concepts.join(', ')}.
        This activity will take approximately {lesson.duration} minutes to complete.
      </p>
      
      {/* Ensure DebugDuplicateImages is called without onComplete */}
      <DebugDuplicateImages />

      <h3 className="text-lg font-medium mt-6 mb-3">What You'll Learn</h3>
      <ul className="list-disc pl-5 space-y-2">
        {lesson.concepts.map((concept, index) => (
          <li key={index} className="text-gray-700">{concept}</li>
        ))}
      </ul>
      
      <div className="flex justify-end mt-8">
        <Button onClick={onComplete} className="bg-blue-500 hover:bg-blue-600">
          I've Read This
        </Button>
      </div>
    </div>
  );
};
