
import React, { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CodingLabHeader } from "@/components/coding-lab/ui/LabHeader";
import { LessonGrid } from "@/components/coding-lab/lessons/LessonGrid";
import { LessonView } from "@/components/coding-lab/lessons/LessonView";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { BuzzyCornerHelper } from '@/components/ai-lab/ui/BuzzyCornerHelper';

// Update this in the curriculumData file if needed
import { curriculumData } from '@/components/coding-lab/lessons/curriculumData';

const CodingLab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("lessons");
  
  // Extract lesson ID from URL if present
  const lessonIdFromUrl = location.pathname.startsWith('/coding-lab/lessons/') 
    ? location.pathname.replace('/coding-lab/lessons/', '')
    : null;
  
  const handleSelectLesson = (lessonId: string) => {
    setSelectedLesson(lessonId);
    navigate(`/coding-lab/lessons/${lessonId}`);
  };
  
  const handleBackToLab = () => {
    setSelectedLesson(null);
    navigate('/coding-lab');
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
            The Coding Playground is under development and will be available soon.
          </p>
        </div>
      );
    }
    else if (activeTab === "challenges") {
      return (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
            <InfoIcon className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon!</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Coding Challenges are being created and will be available soon.
          </p>
        </div>
      );
    }
    else if (activeTab === "achievements") {
      return (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
            <InfoIcon className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon!</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Achievements and badges are being prepared and will be available soon.
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
              <CodingLabHeader 
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
      
      <BuzzyCornerHelper />
      <Footer />
    </>
  );
};

export default CodingLab;
