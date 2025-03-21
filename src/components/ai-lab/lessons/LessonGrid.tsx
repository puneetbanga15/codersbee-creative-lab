
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, Shapes, Image, MessageSquare, Mic, Dog, BookOpen, Music, Star, Languages, Smile, Database, Network, Gamepad2, Palette, ShieldAlert, Layers, RotateCw, Bot, Trophy, Gem } from 'lucide-react';
import { curriculumData } from './curriculumData';
import { Alert, AlertDescription } from "@/components/ui/alert";

type LessonGridProps = {
  onSelectLesson: (lessonId: string) => void;
};

export const LessonGrid = ({ onSelectLesson }: LessonGridProps) => {
  const [selectedStage, setSelectedStage] = useState('all');
  
  const filteredLessons = selectedStage === 'all' 
    ? curriculumData 
    : curriculumData.filter(lesson => lesson.stage === selectedStage);
    
  const getLessonIcon = (iconName: string) => {
    const iconProps = { className: "h-10 w-10 text-[#9b87f5]" };
    const icons: Record<string, React.ReactNode> = {
      brain: <Brain {...iconProps} />,
      sparkles: <Sparkles {...iconProps} />,
      shapes: <Shapes {...iconProps} />,
      image: <Image {...iconProps} />,
      messageSquare: <MessageSquare {...iconProps} />,
      microphone: <Mic {...iconProps} />,
      dog: <Dog {...iconProps} />,
      bookOpen: <BookOpen {...iconProps} />,
      music: <Music {...iconProps} />,
      star: <Star {...iconProps} />,
      languages: <Languages {...iconProps} />,
      smile: <Smile {...iconProps} />,
      database: <Database {...iconProps} />,
      network: <Network {...iconProps} />,
      gamepad: <Gamepad2 {...iconProps} />,
      palette: <Palette {...iconProps} />,
      shield: <ShieldAlert {...iconProps} />,
      layers: <Layers {...iconProps} />,
      robot: <Bot {...iconProps} />,
      bot: <Bot {...iconProps} />
    };
    
    return icons[iconName] || <Sparkles {...iconProps} />;
  };
  
  // Modified lessons data - first lesson open (not completed), others locked
  const modifiedLessons = filteredLessons.map((lesson, index) => {
    if (lesson.id === 'meet-ai-friend') {
      return { ...lesson, locked: false, completed: false };
    } else {
      return { ...lesson, locked: true, completed: false };
    }
  });
  
  return (
    <div>
      <Alert className="mb-6 bg-gradient-to-r from-purple-50 to-amber-50 border border-[#9b87f5]/20">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col items-center justify-center bg-[#f0e7ff] p-3 rounded-lg">
            <Trophy className="h-8 w-8 text-amber-500 mb-1" />
            <Gem className="h-6 w-6 text-[#9b87f5]" />
          </div>
          <AlertDescription className="text-gray-700">
            <h3 className="text-lg font-semibold mb-1 text-[#9b87f5]">Earn Badges & Collectibles!</h3>
            <p>Complete AI Lab lessons to unlock special badges, digital collectibles, and track your progress. Each lesson completed earns you points toward your AI mastery level!</p>
            <p className="mt-1 text-sm font-medium text-amber-600">Note: Only the first lesson is open to everyone. Enroll as a student to unlock all lessons!</p>
          </AlertDescription>
        </div>
      </Alert>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge 
          variant={selectedStage === 'all' ? "default" : "outline"} 
          className="cursor-pointer text-sm py-1 px-3"
          onClick={() => setSelectedStage('all')}
        >
          All Lessons
        </Badge>
        <Badge 
          variant={selectedStage === 'foundation' ? "default" : "outline"} 
          className="cursor-pointer text-sm py-1 px-3 bg-blue-500 hover:bg-blue-600"
          onClick={() => setSelectedStage('foundation')}
        >
          Foundation (1-5)
        </Badge>
        <Badge 
          variant={selectedStage === 'application' ? "default" : "outline"} 
          className="cursor-pointer text-sm py-1 px-3 bg-green-500 hover:bg-green-600"
          onClick={() => setSelectedStage('application')}
        >
          Application (6-12)
        </Badge>
        <Badge 
          variant={selectedStage === 'understanding' ? "default" : "outline"} 
          className="cursor-pointer text-sm py-1 px-3 bg-purple-500 hover:bg-purple-600"
          onClick={() => setSelectedStage('understanding')}
        >
          Understanding (13-17)
        </Badge>
        <Badge 
          variant={selectedStage === 'advanced' ? "default" : "outline"} 
          className="cursor-pointer text-sm py-1 px-3 bg-orange-500 hover:bg-orange-600"
          onClick={() => setSelectedStage('advanced')}
        >
          Advanced (18-20)
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {modifiedLessons.map((lesson) => (
          <Card 
            key={lesson.id}
            className={`overflow-hidden hover:shadow-md transition-all cursor-pointer ${
              lesson.locked ? 'opacity-70' : 'hover:-translate-y-1'
            }`}
            onClick={() => !lesson.locked && onSelectLesson(lesson.id)}
          >
            <div className={`h-1 w-full ${getStageBgColor(lesson.stage)}`}></div>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-[#f0e7ff]">
                  {getLessonIcon(lesson.icon)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-500">Lesson {lesson.number}</span>
                    {lesson.locked && (
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        Students Only
                      </Badge>
                    )}
                    {!lesson.locked && !lesson.completed && (
                      <Badge variant="default" className="bg-green-500 text-xs flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                        Open Access
                      </Badge>
                    )}
                    {lesson.completed && (
                      <Badge variant="default" className="bg-blue-500 text-xs flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        Completed
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">{lesson.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{lesson.description}</p>
                  
                  {!lesson.locked && lesson.id === 'meet-ai-friend' && (
                    <div className="mt-2 flex">
                      <Badge className="bg-amber-500 text-white text-xs mt-1 flex items-center gap-1">
                        <Trophy className="h-3 w-3" />
                        Try it now - First AI Explorer Badge
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

function getStageBgColor(stage: string): string {
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
