import React, { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AILabHeader } from "@/components/ai-lab/ui/LabHeader";
import { LessonGrid } from "@/components/ai-lab/lessons/LessonGrid";
import { LessonView } from "@/components/ai-lab/lessons/LessonView";
import { ProjectsGrid } from "@/components/ai-lab/projects/ProjectsGrid";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

const AILab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("lessons");
  
  // Extract lesson ID from URL if present
  const lessonIdFromUrl = location.pathname.startsWith('/ai-lab/lessons/') 
    ? location.pathname.replace('/ai-lab/lessons/', '')
    : null;
  
  const handleSelectLesson = (lessonId: string) => {
    setSelectedLesson(lessonId);
    navigate(`/ai-lab/lessons/${lessonId}`);
  };
  
  const handleBackToLab = () => {
    setSelectedLesson(null);
    navigate('/ai-lab');
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const renderContent = () => {
    if (activeTab === "lessons") {
      return <LessonGrid onSelectLesson={handleSelectLesson} />;
    } 
    else if (activeTab === "playground") {
      return (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
            <InfoIcon className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon!</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The AI Playground is under development and will be available soon.
          </p>
        </div>
      );
    }
    else if (activeTab === "projects") {
      return <ProjectsGrid />;
    }
    else if (activeTab === "resources") {
      return (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
            <InfoIcon className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon!</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Additional resources are being prepared and will be available soon.
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <>
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <Routes>
          <Route path="/" element={
            <>
              <AILabHeader 
                activeTab={activeTab}
                onTabChange={handleTabChange} 
              />
              <main className="mt-8">
                {renderContent()}
              </main>
            </>
          } />
          <Route path="/lessons/:lessonId" element={
            <LessonView 
              lessonId={lessonIdFromUrl || ''} 
              onBack={handleBackToLab} 
            />
          } />
        </Routes>
      </main>
      
      <Footer />
    </>
  );
};

export default AILab;
