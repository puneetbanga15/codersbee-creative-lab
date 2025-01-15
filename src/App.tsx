import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import AboutUs from "@/pages/AboutUs";
import Resources from "@/pages/Resources";
import { ScratchFundamentals } from "@/components/articles/ScratchFundamentals";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/scratch-fundamentals" element={<ScratchFundamentals />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
