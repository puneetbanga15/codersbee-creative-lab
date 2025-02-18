
import { BuzzyChat } from "@/components/buzzy-ai/BuzzyChat";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const BuzzyAI = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <BuzzyChat />
      </div>
      <Footer />
    </div>
  );
};

export default BuzzyAI;
