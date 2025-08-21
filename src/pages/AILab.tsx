
import React from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SimpleLessonGrid } from "@/components/ai-lab/lessons/SimpleLessonGrid";
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BookOpen, Play, FileText } from 'lucide-react';

const AILab = () => {
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
          
          {/* Lesson grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SimpleLessonGrid onSelectLesson={(lessonId) => { 
              console.log(`Navigating to lesson: ${lessonId}`);
              window.location.href = `/ai-lab/lessons/${lessonId}`; 
            }} />
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default AILab;
