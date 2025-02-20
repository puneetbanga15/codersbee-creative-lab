
import { BuzzyChat } from "@/components/buzzy-ai/BuzzyChat";
import { Navbar } from "@/components/Navbar";

const BuzzyAI = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <BuzzyChat />
      </main>
    </div>
  );
};

export default BuzzyAI;
