import { motion } from "framer-motion";
import { GraduationCap, Code, Brain, ArrowRight } from "lucide-react";

export const LearningJourney = () => {
  const journeySteps = [
    {
      title: "Scratch Fundamentals",
      description: "Visual programming basics and computational thinking",
      icon: GraduationCap,
      color: "from-amber-400 to-orange-500",
      duration: "2-3 months"
    },
    {
      title: "JavaScript Foundations",
      description: "Core programming concepts with JavaScript",
      icon: Code,
      color: "from-blue-400 to-blue-600",
      duration: "3-4 months"
    },
    {
      title: "Advanced Programming",
      description: "Complex projects and problem-solving",
      icon: Code,
      color: "from-indigo-400 to-indigo-600",
      duration: "4-5 months"
    },
    {
      title: "AI & Machine Learning",
      description: "Introduction to AI concepts and applications",
      icon: Brain,
      color: "from-purple-400 to-purple-600",
      duration: "4-5 months"
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Your Learning Journey
          <span className="block text-sm text-gray-600 mt-2">
            A structured path to mastery
          </span>
        </h2>

        <div className="relative max-w-4xl mx-auto">
          {journeySteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative mb-16 last:mb-0"
            >
              <div className="flex items-start gap-6">
                <div className="relative">
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} shadow-lg flex items-center justify-center`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  {index < journeySteps.length - 1 && (
                    <div className="absolute top-16 left-1/2 h-16 w-0.5 bg-gradient-to-b from-gray-300 to-transparent -translate-x-1/2" />
                  )}
                </div>

                <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-gray-600">{step.description}</p>

                  {index < journeySteps.length - 1 && (
                    <motion.div
                      className="absolute right-4 bottom-4"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};