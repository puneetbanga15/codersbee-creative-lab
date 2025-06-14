
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

interface LessonNotFoundProps {
  onBackToLab: () => void;
}

export const LessonNotFound: React.FC<LessonNotFoundProps> = ({ onBackToLab }) => {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Lesson Not Found</h2>
      <p className="text-gray-600 mb-6">We couldn't find the lesson you're looking for.</p>
      <Button onClick={onBackToLab}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Lessons
      </Button>
    </div>
  );
};
