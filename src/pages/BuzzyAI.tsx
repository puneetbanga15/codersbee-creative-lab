
import { BuzzyChat } from "@/components/buzzy-ai/BuzzyChat";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const BuzzyAI = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1A1F2C] mb-4">
              Meet Buzzy Bee - Your AI Coding Tutor 🐝
            </h1>
            <p className="text-gray-600 md:text-lg">
              Ask me anything about coding, AI, and CodersBee's programs!
            </p>
          </div>
          <BuzzyChat />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BuzzyAI;
