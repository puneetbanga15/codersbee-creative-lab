import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import ParentsLogin from "./pages/ParentsLogin";
import ParentsRegister from "./pages/ParentsRegister";
import ParentDashboard from "./pages/ParentDashboard";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherDashboard from "./pages/TeacherDashboard";
import Quizzes from "./pages/Quizzes";
import Projects from "./pages/Projects";
import VerifyCertificate from "./pages/VerifyCertificate";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
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
              <Route path="/certificate" element={<VerifyCertificate />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;