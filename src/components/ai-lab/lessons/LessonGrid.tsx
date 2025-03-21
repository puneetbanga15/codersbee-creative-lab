
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, Shapes, Image, MessageSquare, Mic, Dog, BookOpen, Music, Star, Languages, Smile, Database, Network, Gamepad2, Palette, ShieldAlert, Layers, RotateCw, Bot } from 'lucide-react';
import { curriculumData } from './curriculumData';

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
  
  return (
    <div>
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
        {filteredLessons.map((lesson) => (
          <Card 
            key={lesson.id}
            className={`overflow-hidden hover:shadow-md transition-all cursor-pointer ${
              lesson.locked ? 'opacity-60' : 'hover:-translate-y-1'
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
                      <Badge variant="outline" className="text-xs">
                        Locked
                      </Badge>
                    )}
                    {lesson.completed && (
                      <Badge variant="default" className="bg-green-500 text-xs">
                        Completed
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">{lesson.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{lesson.description}</p>
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
