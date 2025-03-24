
import { Project } from "./types";

export const projects: Project[] = [
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
