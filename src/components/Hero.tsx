import React from "react";

const Hero = () => {
  return (
    <section className="relative py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-sm px-4 md:px-6 py-2 rounded-full border border-[#9b87f5]/20 shadow-sm">
          <div className="flex flex-col items-center space-y-1">
            <p className="text-[#1A1F2C] font-medium text-xs md:text-base trust-badge">
              🎓 US Certified Educators
            </p>
            <p className="text-[#1A1F2C] font-medium text-xs md:text-base trust-badge">
              💡 AI Curriculum by Industry Experts with 20+ Years Experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
