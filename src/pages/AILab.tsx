import React, { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AILabHeader } from "@/components/ai-lab/ui/LabHeader";
import { LessonGrid } from "@/components/ai-lab/lessons/LessonGrid";
import { LessonView } from "@/components/ai-lab/lessons/LessonView";
import { ProjectsGrid } from "@/components/ai-lab/projects/ProjectsGrid";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bot, Palette } from "lucide-react";

const AILab = () => {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("lessons");
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Reset selected lesson when switching tabs
    if (value !== "lessons") {
      setSelectedLesson(null);
    }
  };
  
  const renderContent = () => {
    if (activeTab === "lessons") {
      if (selectedLesson) {
        return (
          <LessonView 
            lessonId={selectedLesson} 
            onBack={() => setSelectedLesson(null)}
          />
        );
      }
      return <LessonGrid onSelectLesson={setSelectedLesson} />;
    } 
    else if (activeTab === "playground") {
      return (
        <div className="mt-8 text-center p-10 border-2 border-dashed border-[#9b87f5]/30 rounded-xl bg-purple-50">
          <div className="max-w-xl mx-auto">
            <Bot className="w-16 h-16 mx-auto text-[#9b87f5] mb-4" />
            <h2 className="text-2xl font-bold text-[#9b87f5] mb-2">AI Playground Coming Soon</h2>
            <p className="text-gray-600 mb-4">
              An open sandbox environment where you can experiment with various AI models and tools without following a structured lesson. Try out your ideas and explore the capabilities of AI freely!
            </p>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700 font-medium">Playground features will include:</p>
              <ul className="text-left mt-2 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-green-100 text-green-600 p-1 rounded">✓</span>
                  <span>Text generation with customizable parameters</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-green-100 text-green-600 p-1 rounded">✓</span>
                  <span>Image recognition and generation tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-green-100 text-green-600 p-1 rounded">✓</span>
                  <span>Voice-to-text and text-to-voice experiments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-green-100 text-green-600 p-1 rounded">✓</span>
                  <span>Save and share your AI creations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
    else if (activeTab === "gallery") {
      return (
        <div className="space-y-8">
          <Alert className="mb-6 bg-gradient-to-r from-amber-50 to-purple-50 border border-amber-200">
            <AlertDescription className="text-gray-700">
              <h3 className="text-lg font-semibold mb-1 text-amber-600">Student Gallery</h3>
              <p>Explore AI projects created by CodersBee students! Get inspired by seeing what other young coders have built using the skills learned in our AI Lab.</p>
            </AlertDescription>
          </Alert>
          <ProjectsGrid />
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0e7ff] to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <AILabHeader 
          activeTab={activeTab}
          onTabChange={handleTabChange} 
        />
        
        {renderContent()}
      </main>
      
      <Footer />
    </div>
  );
};

export default AILab;
