import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Play, Clock, CheckCircle, Lock } from 'lucide-react';
import { curriculumData } from './curriculumData';

interface SimpleLessonGridProps {
  onSelectLesson: (lessonId: string) => void;
}

export const SimpleLessonGrid: React.FC<SimpleLessonGridProps> = ({ onSelectLesson }) => {
  // Show first 6 lessons for now
  const lessonsToShow = curriculumData.slice(0, 6);

  const getStageBadgeVariant = (stage: string) => {
    switch (stage) {
      case 'discoverers':
        return 'default';
      case 'explorers':
        return 'secondary';
      case 'builders':
        return 'outline';
      case 'creators':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const hasSlides = (lessonId: string) => {
    return ['what-is-ai', 'llm-basics', 'magic-of-prompts'].includes(lessonId);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {lessonsToShow.map((lesson, index) => (
        <motion.div
          key={lesson.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <Badge variant={getStageBadgeVariant(lesson.stage)} className="text-xs">
                  Lesson {lesson.number}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {lesson.duration}min
                </div>
              </div>
              
              <CardTitle className="text-lg leading-tight">{lesson.title}</CardTitle>
              <CardDescription className="text-sm">
                {lesson.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Learning formats available */}
              <div className="flex gap-2 mb-4">
                <div className="flex items-center gap-1 text-xs bg-secondary/50 px-2 py-1 rounded">
                  <BookOpen className="h-3 w-3" />
                  <span>Lesson</span>
                </div>
                {hasSlides(lesson.id) && (
                  <div className="flex items-center gap-1 text-xs bg-primary/10 px-2 py-1 rounded">
                    <FileText className="h-3 w-3" />
                    <span>Slides</span>
                  </div>
                )}
                {lesson.activities && lesson.activities.length > 0 && (
                  <div className="flex items-center gap-1 text-xs bg-accent/50 px-2 py-1 rounded">
                    <Play className="h-3 w-3" />
                    <span>Activity</span>
                  </div>
                )}
              </div>

              {/* Key concepts */}
              <div className="mb-4">
                <div className="text-xs font-medium text-muted-foreground mb-2">Key Concepts:</div>
                <div className="flex flex-wrap gap-1">
                  {lesson.concepts.slice(0, 3).map((concept) => (
                    <Badge key={concept} variant="outline" className="text-xs py-0 px-2">
                      {concept}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action button */}
              <Button 
                onClick={() => onSelectLesson(lesson.id)}
                className="w-full"
                disabled={lesson.locked}
              >
                {lesson.locked ? (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Coming Soon
                  </>
                ) : lesson.completed ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Review Lesson
                  </>
                ) : (
                  <>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Start Lesson
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};