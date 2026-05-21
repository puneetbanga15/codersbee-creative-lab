import React from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ColorfulLessonView } from "@/components/ai-lab/lessons/ColorfulLessonView";
import { Helmet } from 'react-helmet';

const AILabLesson = () => {
  const { lessonId } = useParams<{ lessonId: string }>();

  if (!lessonId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No lesson specified</h2>
          <a href="/ai-lab" className="text-primary hover:underline">Back to AI Lab</a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>AI Lesson | CodersBee - Interactive Learning</title>
        <meta name="description" content="Interactive AI lesson with slides, activities, and hands-on learning." />
      </Helmet>
      
      <Navbar />
      <ColorfulLessonView lessonId={lessonId} />
      <Footer />
    </>
  );
};

export default AILabLesson;