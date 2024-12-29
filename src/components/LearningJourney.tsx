import { motion } from "framer-motion";
import { Milestone } from "lucide-react";

export const LearningJourney = () => {
  const milestones = [
    {
      title: "Getting Started",
      description: "Introduction to coding concepts and basic AI understanding",
      date: "Week 1-4"
    },
    {
      title: "Building Foundations",
      description: "Core programming skills and AI tools exploration",
      date: "Week 5-8"
    },
    {
      title: "Creating Projects",
      description: "Hands-on project development with AI integration",
      date: "Week 9-12"
    },
    {
      title: "Advanced Concepts",
      description: "Complex problem-solving and AI application mastery",
      date: "Week 13-16"
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-codersbee-dark">
          Your Learning Journey
        </h2>
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-codersbee-vivid/20 -translate-x-1/2" />
          
          {/* Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <h3 className="text-xl font-semibold text-codersbee-dark mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                  <p className="text-sm text-codersbee-vivid mt-1">{milestone.date}</p>
                </div>
                
                <div className="relative flex items-center justify-center w-12 h-12 bg-white rounded-full border-2 border-codersbee-vivid z-10">
                  <Milestone className="w-6 h-6 text-codersbee-vivid" />
                </div>
                
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};