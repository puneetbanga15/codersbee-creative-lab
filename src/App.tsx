import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Parents from "./pages/Parents";
import Courses from "./pages/Courses";
import Resources from "./pages/Resources";
import AICorner from "./pages/AICorner";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherDashboard from "./pages/TeacherDashboard";
import ParentsLogin from "./pages/ParentsLogin";
import ParentsRegister from "./pages/ParentsRegister";
import ParentDashboard from "./pages/ParentDashboard";
import Quizzes from "./pages/Quizzes";
import Projects from "./pages/Projects";
import Tutorials from "./pages/Tutorials";
import ScratchIntro from "./pages/tutorials/scratch/ScratchIntro";
import PythonIntro from "./pages/tutorials/python/PythonIntro";
import WebIntro from "./pages/tutorials/web/WebIntro";
import AIIntro from "./pages/tutorials/ai/AIIntro";
import VerifyCertificate from "./pages/VerifyCertificate";
import { ScratchFundamentals } from "./components/articles/ScratchFundamentals";
import Projects from "./pages/Projects";
import Quizzes from "./pages/Quizzes";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

function App() {
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
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/tutorials/scratch/intro" element={<ScratchIntro />} />
              <Route path="/tutorials/python/intro" element={<PythonIntro />} />
              <Route path="/tutorials/web/intro" element={<WebIntro />} />
              <Route path="/tutorials/ai/intro" element={<AIIntro />} />
              <Route path="/certificate" element={<VerifyCertificate />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;