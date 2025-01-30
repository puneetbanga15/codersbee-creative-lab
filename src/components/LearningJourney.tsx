import { motion } from "framer-motion";
import { GraduationCap, Code, Brain, Award, Milestone } from "lucide-react";

export const LearningJourney = () => {
  const milestones = [
    {
      title: "Scratch Fundamentals",
      description: "Basic programming concepts with Scratch",
      date: "2-3 months",
      icon: <GraduationCap className="w-6 h-6 text-amber-500" />,
      color: "bg-amber-100 border-amber-200"
    },
    {
      title: "JavaScript Basics",
      description: "Core JavaScript programming concepts",
      date: "3-4 months",
      icon: <Code className="w-6 h-6 text-yellow-500" />,
      color: "bg-yellow-100 border-yellow-200"
    },
    {
      title: "Advanced JavaScript",
      description: "Advanced concepts and real-world applications",
      date: "3-4 months",
      icon: <Award className="w-6 h-6 text-yellow-600" />,
      color: "bg-yellow-100 border-yellow-200"
    },
    {
      title: "AI Fundamentals",
      description: "Introduction to AI and Machine Learning",
      date: "2-3 months",
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      color: "bg-purple-100 border-purple-200"
    },
    {
      title: "AI Projects",
      description: "Building AI-powered applications",
      date: "3-4 months",
      icon: <Award className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-100 border-purple-200"
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-codersbee-dark">
          Your Learning Journey
          <span className="block text-sm text-gray-600 mt-2">
            A structured path to mastery
          </span>
        </h2>
        
        <div className="relative">
          {/* Main Connection Line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-amber-300 via-yellow-400 to-purple-400 -translate-x-1/2" />
          
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
                
                <div className={`relative flex items-center justify-center w-16 h-16 rounded-full border-2 ${milestone.color} z-10`}>
                  {milestone.icon}
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