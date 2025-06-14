
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { LessonType } from '../curriculumData';
import { getStageLabel, getStageBgClass, getStageDifficulty } from '../utils/lessonViewHelper';

interface LessonMastheadProps {
  lesson: LessonType;
}

export const LessonMasthead: React.FC<LessonMastheadProps> = ({ lesson }) => {
  return (
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
  );
};
