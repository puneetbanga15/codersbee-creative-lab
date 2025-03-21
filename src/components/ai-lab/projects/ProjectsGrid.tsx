
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, Sparkles, MessageSquare, Image, Globe, 
  Utensils, MessageCircle, BookOpen, Bot, Trophy, 
  Lightbulb, Palette, MusicNote, Gamepad2, Users, 
  CalendarDays, FileText, FlaskConical, Rocket
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Project = {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'advanced';
  relatedLessons: number[];
  category: string;
};

export const ProjectsGrid = () => {
  const getProjectIcon = (iconName: string) => {
    const iconProps = { className: "h-10 w-10 text-[#9b87f5]" };
    const icons: Record<string, React.ReactNode> = {
      brain: <Brain {...iconProps} />,
      sparkles: <Sparkles {...iconProps} />,
      messageSquare: <MessageSquare {...iconProps} />,
      image: <Image {...iconProps} />,
      globe: <Globe {...iconProps} />,
      utensils: <Utensils {...iconProps} />,
      messageCircle: <MessageCircle {...iconProps} />,
      bookOpen: <BookOpen {...iconProps} />,
      bot: <Bot {...iconProps} />,
      lightbulb: <Lightbulb {...iconProps} />,
      palette: <Palette {...iconProps} />,
      music: <MusicNote {...iconProps} />,
      gamepad: <Gamepad2 {...iconProps} />,
      users: <Users {...iconProps} />,
      calendar: <CalendarDays {...iconProps} />,
      fileText: <FileText {...iconProps} />,
      flask: <FlaskConical {...iconProps} />
    };
    
    return icons[iconName] || <Rocket {...iconProps} />;
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'advanced':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const projects: Project[] = [
    {
      id: 'travel-planner',
      title: 'AI Travel Planner',
      description: 'Create a travel itinerary generator that suggests activities based on location and interests.',
      icon: 'globe',
      difficulty: 'easy',
      relatedLessons: [1, 5, 8],
      category: 'Text Generation'
    },
    {
      id: 'recipe-creator',
      title: 'Recipe Wizard',
      description: 'Build an AI that creates child-friendly recipes based on ingredients you have at home.',
      icon: 'utensils',
      difficulty: 'easy',
      relatedLessons: [1, 5, 8],
      category: 'Text Generation'
    },
    {
      id: 'debate-coach',
      title: 'Friendly Debate Coach',
      description: 'Create an AI debate partner that helps kids practice presenting arguments on both sides of a topic.',
      icon: 'messageCircle',
      difficulty: 'medium',
      relatedLessons: [1, 3, 5, 8],
      category: 'Conversation'
    },
    {
      id: 'comic-creator',
      title: 'Comic Creator',
      description: 'Design a comic strip generator that turns your stories into fun illustrated adventures.',
      icon: 'palette',
      difficulty: 'medium',
      relatedLessons: [1, 4, 8, 16],
      category: 'Image Generation'
    },
    {
      id: 'animal-quiz',
      title: 'Animal Quiz Master',
      description: 'Build an AI that creates fun animal trivia questions and provides educational feedback.',
      icon: 'brain',
      difficulty: 'easy',
      relatedLessons: [1, 2, 5],
      category: 'Education'
    },
    {
      id: 'story-illustrator',
      title: 'Story Illustrator',
      description: 'Create an AI that generates images to match your stories and fairy tales.',
      icon: 'image',
      difficulty: 'medium',
      relatedLessons: [4, 8, 16],
      category: 'Image Generation'
    },
    {
      id: 'weather-reporter',
      title: 'Fun Weather Reporter',
      description: 'Build a child-friendly weather forecaster with fun facts about different weather conditions.',
      icon: 'bot',
      difficulty: 'easy',
      relatedLessons: [1, 5, 8],
      category: 'Information'
    },
    {
      id: 'music-creator',
      title: 'Tune Composer',
      description: 'Create simple melodies and sound effects based on emotions or story themes.',
      icon: 'music',
      difficulty: 'advanced',
      relatedLessons: [9, 18],
      category: 'Audio Generation'
    },
    {
      id: 'game-idea',
      title: 'Game Idea Generator',
      description: 'Design an AI that helps kids brainstorm original game concepts with rules and characters.',
      icon: 'gamepad',
      difficulty: 'medium',
      relatedLessons: [3, 8, 15],
      category: 'Creativity'
    },
    {
      id: 'science-buddy',
      title: 'Science Experiment Buddy',
      description: 'Create an AI that suggests safe, fun science experiments using household items.',
      icon: 'flask',
      difficulty: 'medium',
      relatedLessons: [1, 5, 8, 10],
      category: 'Education'
    }
  ];
  
  return (
    <div className="mt-12 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-[#f0e7ff]">
          <Rocket className="h-6 w-6 text-[#9b87f5]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">AI Projects Gallery</h2>
        <Badge variant="outline" className="bg-purple-100 text-purple-800">
          Build & Learn
        </Badge>
      </div>
      
      <p className="text-gray-600 mb-6">
        Put your AI knowledge to work by creating these fun projects! Each project uses concepts from specific lessons. 
        Complete the related lessons first to build the skills you need.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <Card 
            key={project.id}
            className="overflow-hidden hover:shadow-md transition-all cursor-pointer hover:-translate-y-1 border-t-4 border-t-[#9b87f5]"
          >
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-[#f0e7ff]">
                  {getProjectIcon(project.icon)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-500 mb-1">Related Lessons:</p>
                    <div className="flex flex-wrap gap-1">
                      {project.relatedLessons.map((lessonNumber) => (
                        <Avatar key={lessonNumber} className="h-6 w-6">
                          <AvatarFallback className="bg-[#9b87f5]/20 text-xs text-[#9b87f5]">
                            {lessonNumber}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
