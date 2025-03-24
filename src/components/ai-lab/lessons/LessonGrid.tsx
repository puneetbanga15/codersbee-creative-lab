
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, ArrowRight } from 'lucide-react';
import { curriculumData } from './curriculumData';

type LessonGridProps = {
  onSelectLesson: (lessonId: string) => void;
};

export const LessonGrid: React.FC<LessonGridProps> = ({ onSelectLesson }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {curriculumData.map((lesson) => (
        <Card 
          key={lesson.id}
          className="overflow-hidden"
        >
          <div 
            className={`h-3 ${getColorByStage(lesson.stage)}`}
          ></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-3">
              <Badge variant="outline" className="mb-2">
                Lesson {lesson.number}
              </Badge>
              
              {/* Make all lessons available and unlocked */}
              <Badge className="bg-green-500">
                <Unlock className="h-3 w-3 mr-1" />
                <span>Available</span>
              </Badge>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{lesson.description}</p>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {lesson.concepts.slice(0, 2).map((concept, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {concept}
                </Badge>
              ))}
              {lesson.concepts.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{lesson.concepts.length - 2} more
                </Badge>
              )}
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-gray-500">
                {lesson.duration} min
              </div>
              
              <Button 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => onSelectLesson(lesson.id)}
                data-lesson-id={lesson.id}
              >
                Start Lesson
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Helper function to get color based on stage
function getColorByStage(stage: string): string {
  switch (stage) {
    case 'foundation':
      return 'bg-blue-500';
    case 'application':
      return 'bg-green-500';
    case 'understanding':
      return 'bg-purple-500';
    case 'advanced':
      return 'bg-orange-500';
    default:
      return 'bg-gray-500';
  }
}
