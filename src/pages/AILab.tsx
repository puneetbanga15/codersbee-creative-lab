
import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SimpleLessonGrid } from "@/components/ai-lab/lessons/SimpleLessonGrid";
import { ColorfulLessonView } from "@/components/ai-lab/lessons/ColorfulLessonView";
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BookOpen, Play, FileText } from 'lucide-react';

const AILab = () => {
  return (
    <Routes>
      <Route path="/" element={<AILabHome />} />
      <Route path="/lessons/:lessonId" element={<AILabLessonPage />} />
    </Routes>
  );
};

const AILabHome = () => {
  return (
    <>
      <Helmet>
        <title>AI Learning Lab | CodersBee - Interactive AI Education</title>
        <meta name="description" content="Learn artificial intelligence through interactive lessons, slides, and hands-on activities. Perfect for young learners aged 6-14." />
        <meta name="keywords" content="AI for kids, artificial intelligence education, AI lessons, interactive learning, kids programming" />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4 py-12">
          {/* Simple, clean header */}
          <motion.div
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              AI Learning Lab
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover the world of artificial intelligence through interactive lessons, comprehensive slides, and hands-on activities.
            </p>
            
            {/* Learning format indicators */}
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>Interactive Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span>PDF Slides</span>
              </div>
              <div className="flex items-center gap-2">
                <Play className="h-4 w-4 text-primary" />
                <span>Hands-on Activities</span>
              </div>
            </div>
          </motion.div>
          
          {/* Enhanced lesson grid with more colors */}
          <motion.div
            className="mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Tier 1: Discoverers</h3>
                <p className="text-sm text-blue-100">Foundation concepts & basics</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Tier 2: Explorers</h3>
                <p className="text-sm text-green-100">Applied skills & practice</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Tier 3: Builders</h3>
                <p className="text-sm text-orange-100">Deeper understanding</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Tier 4: Creators</h3>
                <p className="text-sm text-purple-100">Advanced creation</p>
              </div>
            </div>
          </motion.div>
          
          {/* Lesson grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SimpleLessonGrid onSelectLesson={(lessonId) => { 
              console.log(`Navigating to lesson: ${lessonId}`);
              // Use React Router navigation instead of window.location
              window.location.href = `/ai-lab/lessons/${lessonId}`; 
            }} />
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

const AILabLessonPage = () => {
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

  return <ColorfulLessonView lessonId={lessonId} />;
};

export default AILab;
