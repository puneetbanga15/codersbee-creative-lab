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
import VerifyCertificate from "./pages/VerifyCertificate";
import { ScratchFundamentals } from "./components/articles/ScratchFundamentals";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/parents" element={<Parents />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/scratch-fundamentals" element={<ScratchFundamentals />} />
        <Route path="/ai-corner" element={<AICorner />} />
        <Route path="/teachers/login" element={<TeacherLogin />} />
        <Route path="/teachers/dashboard/*" element={<TeacherDashboard />} />
        <Route path="/parents/login" element={<ParentsLogin />} />
        <Route path="/parents/register" element={<ParentsRegister />} />
        <Route path="/parents/dashboard/*" element={<ParentDashboard />} />
        <Route path="/verify-certificate" element={<VerifyCertificate />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;