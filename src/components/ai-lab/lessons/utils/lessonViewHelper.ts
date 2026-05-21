
import { LessonType } from '../curriculumData';

export const TAB_ORDER = ['introduction', 'tutorial', 'activity', 'code'];

export const getStageLabel = (stage: LessonType['stage']) => {
  switch (stage) {
    case 'discoverers':
      return 'Discoverers';
    case 'explorers':
      return 'Explorers';
    case 'builders':
      return 'Builders';
    case 'creators':
      return 'Creators';
    default:
      return 'Lesson';
  }
};

export const getStageBgClass = (stage: LessonType['stage']) => {
  switch (stage) {
    case 'discoverers':
      return 'bg-sky-100 text-sky-800 border border-sky-200';
    case 'explorers':
      return 'bg-lime-100 text-lime-800 border border-lime-200';
    case 'builders':
      return 'bg-amber-100 text-amber-800 border border-amber-200';
    case 'creators':
      return 'bg-violet-100 text-violet-800 border border-violet-200';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStageDifficulty = (stage: LessonType['stage']) => {
  switch (stage) {
    case 'discoverers':
      return 'Tier 1: Foundational Concepts';
    case 'explorers':
      return 'Tier 2: Applied Skills';
    case 'builders':
      return 'Tier 3: Deeper Understanding';
    case 'creators':
      return 'Tier 4: Advanced Creation';
    default:
      return 'Beginner';
  }
};
