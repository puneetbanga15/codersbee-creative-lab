
import React from 'react';
import { 
  Brain, Sparkles, MessageSquare, Image, Globe, 
  Utensils, MessageCircle, BookOpen, Bot,
  Lightbulb, Palette, Music, Gamepad2, Users, 
  CalendarDays, FileText, FlaskConical, Rocket
} from 'lucide-react';

export const getProjectIcon = (iconName: string) => {
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
    music: <Music {...iconProps} />,
    gamepad: <Gamepad2 {...iconProps} />,
    users: <Users {...iconProps} />,
    calendar: <CalendarDays {...iconProps} />,
    fileText: <FileText {...iconProps} />,
    flask: <FlaskConical {...iconProps} />
  };
  
  return icons[iconName] || <Rocket {...iconProps} />;
};

export const getDifficultyColor = (difficulty: string) => {
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
