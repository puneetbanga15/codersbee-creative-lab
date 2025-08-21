import React from 'react';
import { PDFSlideViewer } from './PDFSlideViewer';

interface LessonSlidesProps {
  lessonId: string;
  className?: string;
}

const SLIDE_MAPPINGS = {
  'what-is-ai': {
    url: 'https://fxasuoydqmzoxkkefmis.supabase.co/storage/v1/object/public/ai-learning-slides/Lesson%201%20-%20What%20is%20AI%20and%20GenAI.pdf',
    title: 'Lesson 1 - What is AI and GenAI'
  },
  'llm-basics': {
    url: 'https://fxasuoydqmzoxkkefmis.supabase.co/storage/v1/object/public/ai-learning-slides/Lesson%202%20-%20LLMs%20and%20RAG.pdf',
    title: 'Lesson 2 - LLMs and RAG'
  },
  'magic-of-prompts': {
    url: 'https://fxasuoydqmzoxkkefmis.supabase.co/storage/v1/object/public/ai-learning-slides/Lesson%203%20-%20Prompt%20Engineering.pdf',
    title: 'Lesson 3 - Prompt Engineering'
  }
} as const;

export const LessonSlides: React.FC<LessonSlidesProps> = ({ 
  lessonId, 
  className = '' 
}) => {
  const slideInfo = SLIDE_MAPPINGS[lessonId as keyof typeof SLIDE_MAPPINGS];

  if (!slideInfo) {
    return (
      <div className={`${className} p-8 text-center`}>
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            📄
          </div>
          <h3 className="text-lg font-semibold mb-2">Slides Coming Soon</h3>
          <p className="text-muted-foreground">
            Slides for this lesson are being prepared and will be available soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <PDFSlideViewer 
        pdfUrl={slideInfo.url}
        title={slideInfo.title}
        className="h-full"
      />
    </div>
  );
};