
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SupabaseProvider } from "@/providers/SupabaseProvider";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import ParentsLogin from "./pages/ParentsLogin";
import ParentsRegister from "./pages/ParentsRegister";
import ParentDashboard from "./pages/ParentDashboard";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherDashboard from "./pages/TeacherDashboard";
import Quizzes from "./pages/Quizzes";
import Projects from "./pages/Projects";
import Tutorials from "./pages/Tutorials";
import ScratchIntro from "./pages/tutorials/scratch/ScratchIntro";
import PythonIntro from "./pages/tutorials/python/PythonIntro";
import WebIntro from "./pages/tutorials/web/WebIntro";
import AIIntro from "./pages/tutorials/ai/AIIntro";
import VerifyCertificate from "./pages/VerifyCertificate";
import BuzzyAI from "./pages/BuzzyAI";
import AILab from "./pages/AILab";
import TestPage from "./pages/TestPage";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/parents/login" element={<ParentsLogin />} />
              <Route path="/parents/register" element={<ParentsRegister />} />
              <Route path="/parents/dashboard/*" element={<ParentDashboard />} />
              <Route path="/teachers/login" element={<TeacherLogin />} />
              <Route path="/teachers/dashboard/*" element={<TeacherDashboard />} />
              <Route path="/quizzes" element={<Quizzes />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/tutorials/scratch/intro" element={<ScratchIntro />} />
              <Route path="/tutorials/python/intro" element={<PythonIntro />} />
              <Route path="/tutorials/web/intro" element={<WebIntro />} />
              <Route path="/tutorials/ai/intro" element={<AIIntro />} />
              <Route path="/certificate" element={<VerifyCertificate />} />
              <Route path="/buzzy-ai" element={<BuzzyAI />} />
              <Route path="/ai-lab" element={<AILab />} />
              <Route path="/test" element={<TestPage />} />
            </Routes>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </TooltipProvider>
      </SupabaseProvider>
    </QueryClientProvider>
  );
}

export default App;
