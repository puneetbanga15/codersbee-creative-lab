import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, ArrowRight, CheckCircle, Flag, GraduationCap, Trophy, Star } from 'lucide-react';
import { curriculumData } from './curriculumData';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type LessonGridProps = {
  onSelectLesson: (lessonId: string) => void;
};

export const LessonGrid: React.FC<LessonGridProps> = ({ onSelectLesson }) => {
  return (
    <div className="space-y-8">
      {/* Group lessons by stage */}
      {['foundation', 'intermediate', 'advanced', 'expert'].map((stage) => (
        <div key={stage} className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Badge className={getStageHeaderClass(stage)}>
              {getStageBadgeIcon(stage)}
              <span>{getStageName(stage)}</span>
            </Badge>
            <h2 className="text-xl font-semibold">{getStageDescription(stage)}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculumData
              .filter(lesson => lesson.stage === stage)
              .map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card 
                    className={`overflow-hidden hover:shadow-md transition-shadow border-l-4 ${getStageBorderClass(lesson.stage)}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <Badge variant="outline" className="mb-2">
                          Lesson {lesson.number}
                        </Badge>
                        
                        {lesson.locked ? (
                          <Badge className="bg-gray-500">
                            <Lock className="h-3 w-3 mr-1" />
                            <span>Locked</span>
                          </Badge>
                        ) : lesson.completed ? (
                          <Badge className="bg-green-500">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            <span>Completed</span>
                          </Badge>
                        ) : (
                          <Badge className="bg-green-500">
                            <Unlock className="h-3 w-3 mr-1" />
                            <span>Available</span>
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{lesson.description}</p>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 cursor-help bg-amber-50 p-2 rounded-md">
                              <Star className="h-4 w-4 text-amber-500" />
                              <span className="font-semibold">Pioneer:</span> {lesson.mathPioneer.name}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <div className="space-y-2">
                              <p className="font-semibold">{lesson.mathPioneer.name}</p>
                              <p>{lesson.mathPioneer.origin}</p>
                              <p className="text-xs">{lesson.mathPioneer.contribution}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
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
                          className={`flex items-center gap-1 ${getButtonClass(lesson.stage)}`}
                          onClick={() => onSelectLesson(lesson.id)}
                          data-lesson-id={lesson.id}
                          disabled={lesson.locked}
                        >
                          {lesson.locked ? 'Locked' : 'Start Lesson'}
                          {!lesson.locked && <ArrowRight className="h-4 w-4" />}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper functions
function getStageName(stage: string): string {
  switch (stage) {
    case 'foundation':
      return 'Foundation';
    case 'intermediate':
      return 'Intermediate';
    case 'advanced':
      return 'Advanced';
    case 'expert':
      return 'Expert';
    default:
      return 'Unknown';
  }
}

function getStageBadgeIcon(stage: string) {
  switch (stage) {
    case 'foundation':
      return <Flag className="h-3 w-3 mr-1" />;
    case 'intermediate':
      return <GraduationCap className="h-3 w-3 mr-1" />;
    case 'advanced':
      return <Star className="h-3 w-3 mr-1" />;
    case 'expert':
      return <Trophy className="h-3 w-3 mr-1" />;
    default:
      return null;
  }
}

function getStageDescription(stage: string): string {
  switch (stage) {
    case 'foundation':
      return 'Building blocks of coding and computational thinking';
    case 'intermediate':
      return 'Applying concepts to solve more complex problems';
    case 'advanced':
      return 'Creating sophisticated programs with multiple techniques';
    case 'expert':
      return 'Mastering advanced concepts with real-world applications';
    default:
      return '';
  }
}

function getStageHeaderClass(stage: string): string {
  switch (stage) {
    case 'foundation':
      return 'bg-blue-100 text-blue-800';
    case 'intermediate':
      return 'bg-green-100 text-green-800';
    case 'advanced':
      return 'bg-purple-100 text-purple-800';
    case 'expert':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getStageBorderClass(stage: string): string {
  switch (stage) {
    case 'foundation':
      return 'border-blue-500';
    case 'intermediate':
      return 'border-green-500';
    case 'advanced':
      return 'border-purple-500';
    case 'expert':
      return 'border-orange-500';
    default:
      return 'border-gray-500';
  }
}

function getButtonClass(stage: string): string {
  switch (stage) {
    case 'foundation':
      return 'bg-blue-500 hover:bg-blue-600';
    case 'intermediate':
      return 'bg-green-500 hover:bg-green-600';
    case 'advanced':
      return 'bg-purple-500 hover:bg-purple-600';
    case 'expert':
      return 'bg-orange-500 hover:bg-orange-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
}