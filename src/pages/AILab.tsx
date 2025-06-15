
import React from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdventureMasthead } from "@/components/ai-lab/ui/AdventureMasthead";
import { LessonGrid } from "@/components/ai-lab/lessons/LessonGrid";
import { BuzzyCornerHelper } from '@/components/ai-lab/ui/BuzzyCornerHelper';
import { Helmet } from 'react-helmet';

const AILab = () => {
  return (
    <>
      <Helmet>
        <title>Adventure AI Lab Island | CodersBee</title>
        <meta name="description" content="Sail through the magical Island of AI! Kid-friendly lessons, fun pirate adventure, and hands-on coding. Ages 6-14." />
      </Helmet>
      <Navbar />
      {/* Adventure island background */}
      <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('/Discoverers (BeachShore).png')" }}>
        <main className="container mx-auto px-4 pt-24 pb-16">
          <AdventureMasthead />
          <LessonGrid onSelectLesson={(lessonId) => { window.location.href = `/ai-lab/lessons/${lessonId}`; }} />
        </main>
        <BuzzyCornerHelper />
      </div>
      <Footer />
    </>
  );
};

export default AILab;

