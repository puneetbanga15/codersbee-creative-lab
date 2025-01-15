import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import AboutUs from "@/pages/AboutUs";
import ParentsLogin from "@/pages/ParentsLogin";
import TeacherLogin from "@/pages/TeacherLogin";
import TeacherDashboard from "@/pages/TeacherDashboard";
import ParentDashboard from "@/pages/ParentDashboard";
import Quizzes from "@/pages/Quizzes";
import Projects from "@/pages/Projects";
import Resources from "@/pages/Resources";
import { ScratchFundamentals } from "@/components/articles/ScratchFundamentals";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/parents/login" element={<ParentsLogin />} />
        <Route path="/teachers/login" element={<TeacherLogin />} />
        <Route path="/teacher/dashboard/*" element={<TeacherDashboard />} />
        <Route path="/parent/dashboard/*" element={<ParentDashboard />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/scratch-fundamentals" element={<ScratchFundamentals />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;