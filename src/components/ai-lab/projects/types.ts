
export type Project = {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'advanced';
  relatedLessons: number[];
  category: string;
};
