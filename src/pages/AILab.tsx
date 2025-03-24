
import React, { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AILabHeader } from "@/components/ai-lab/ui/LabHeader";
import { LessonGrid } from "@/components/ai-lab/lessons/LessonGrid";
import { LessonView } from "@/components/ai-lab/lessons/LessonView";
import { ProjectsGrid } from "@/components/ai-lab/projects/ProjectsGrid";

const AILab = () => {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0e7ff] to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <AILabHeader />
        
        {selectedLesson ? (
          <LessonView 
            lessonId={selectedLesson} 
            onBack={() => setSelectedLesson(null)}
          />
        ) : (
          <>
            <LessonGrid onSelectLesson={setSelectedLesson} />
            <ProjectsGrid />
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default AILab;
