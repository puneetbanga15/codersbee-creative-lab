import { motion } from "framer-motion";
import { Milestone } from "lucide-react";

export const LearningJourney = () => {
  const milestones = [
    {
      title: "Fundamentals",
      description: "Scratch, Javascript or Python based on age and prior knowledge",
      date: "2-3 months"
    },
    {
      title: "Building Foundations",
      description: "Detailed understanding of advanced concepts",
      date: "2-3 months"
    },
    {
      title: "Creating Coding Projects",
      description: "Building real-world applications",
      date: "3-4 months",
      branch: "coding"
    },
    {
      title: "Creating AI Projects",
      description: "Developing AI-powered solutions",
      date: "3-4 months",
      branch: "ai"
    },
    {
      title: "Advanced Concepts",
      description: "Complex problem-solving and integration",
      date: "4-5 months"
    },
    {
      title: "Senior Hackathons",
      description: "Ready for advanced competitions",
      date: "Final Stage"
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-codersbee-dark">
          Your Learning Journey
          <span className="block text-sm text-gray-600 mt-2">
            Typically 2 classes per week
          </span>
        </h2>
        <div className="relative">
          {/* Main Connection Line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-codersbee-vivid/20 -translate-x-1/2" />
          
          {/* Milestones */}
          <div className="space-y-16">
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