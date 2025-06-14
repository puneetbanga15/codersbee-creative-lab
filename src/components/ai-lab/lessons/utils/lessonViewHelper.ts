
export const getStageLabel = (stage: string): string => {
  switch (stage) {
    case 'foundation':
      return 'Foundation';
    case 'application':
      return 'Application';
    case 'understanding':
      return 'Understanding';
    case 'advanced':
      return 'Advanced';
    default:
      return 'Unknown';
  }
};

export const getStageBgClass = (stage:string): string => {
  switch (stage) {
    case 'foundation':
      return 'bg-blue-500 text-white';
    case 'application':
      return 'bg-green-500 text-white';
    case 'understanding':
      return 'bg-purple-500 text-white';
    case 'advanced':
      return 'bg-orange-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export const getStageDifficulty = (stage: string): string => {
  switch (stage) {
    case 'foundation':
      return 'Beginner';
    case 'application':
      return 'Intermediate';
    case 'understanding':
      return 'Advanced';
    case 'advanced':
      return 'Expert';
    default:
      return 'Unknown';
  }
};

export const TAB_ORDER = ['introduction', 'tutorial', 'activity', 'code'];

