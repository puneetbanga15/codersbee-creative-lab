import type { LucideIcon } from 'lucide-react';
import { 
  Brain, Sparkles, MessageSquare, Image, Globe, 
  Utensils, MessageCircle, BookOpen, Bot,
  Lightbulb, Palette, Music, Gamepad2, Users, 
  CalendarDays, FileText, FlaskConical, Rocket
} from 'lucide-react';

// Return the icon component constructor rather than JSX
export const getProjectIcon = (iconName: string): LucideIcon => {
  switch (iconName) {
    case 'brain':
      return Brain;
    case 'sparkles':
      return Sparkles;
    case 'messageSquare':
      return MessageSquare;
    case 'image':
      return Image;
    case 'globe':
      return Globe;
    case 'utensils':
      return Utensils;
    case 'messageCircle':
      return MessageCircle;
    case 'bookOpen':
      return BookOpen;
    case 'bot':
      return Bot;
    case 'lightbulb':
      return Lightbulb;
    case 'palette':
      return Palette;
    case 'music':
      return Music;
    case 'gamepad':
      return Gamepad2;
    case 'users':
      return Users;
    case 'calendar':
      return CalendarDays;
    case 'fileText':
      return FileText;
    case 'flask':
      return FlaskConical;
    case 'rocket':
      return Rocket;
    default:
      return Sparkles;
  }
};

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'beginner':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'intermediate':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'advanced':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'expert':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};
