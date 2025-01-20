import { motion } from "framer-motion";
import { Check, Trophy, Cup, Milestone, GraduationCap, Brain, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Milestone {
  title: string;
  description: string;
  completed: boolean;
  icon: JSX.Element;
  date?: string;
}

export const LearningJourneyVisual = () => {
  // Sample milestones for Ayaan - this could be made dynamic based on actual progress
  const milestones: Milestone[] = [
    {
      title: "Scratch Fundamentals",
      description: "Completed basic programming concepts",
      completed: true,
      icon: <GraduationCap className="w-8 h-8" />,
      date: "September 2024"
    },
    {
      title: "Web Development",
      description: "HTML, CSS and JavaScript basics",
      completed: true,
      icon: <Cup className="w-8 h-8" />,
      date: "October 2024"
    },
    {
      title: "Python Programming",
      description: "Python fundamentals and algorithms",
      completed: true,
      icon: <Cup className="w-8 h-8" />,
      date: "November 2024"
    },
    {
      title: "AI Fundamentals",
      description: "Introduction to AI concepts",
      completed: true,
      icon: <Brain className="w-8 h-8" />,
      date: "December 2024"
    },
    {
      title: "Advanced AI",
      description: "Currently learning advanced AI concepts",
      completed: false,
      icon: <Rocket className="w-8 h-8" />,
      date: "In Progress"
    },
    {
      title: "AI Master",
      description: "Final achievement - Complete AI mastery",
      completed: false,
      icon: <Trophy className="w-12 h-12 text-yellow-500" />,
    },
  ];

  return (
    <Card className="p-6 bg-gradient-to-r from-codersbee-purple/20 to-white">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Ayaan's Learning Journey
      </h2>
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-codersbee-vivid/20 -translate-x-1/2" />
        
        {/* Milestones */}
        <div className="space-y-16">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
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
                {milestone.date && (
                  <p className="text-sm text-codersbee-vivid mt-1">{milestone.date}</p>
                )}
              </div>
              
              <div className="relative flex items-center justify-center">
                <motion.div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center z-10
                    ${milestone.completed 
                      ? 'bg-green-100 border-2 border-green-500' 
                      : 'bg-gray-100 border-2 border-gray-300'}`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {milestone.completed ? (
                    <Check className="w-6 h-6 text-green-500" />
                  ) : (
                    milestone.icon
                  )}
                </motion.div>
                {milestone.completed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-2 -right-2"
                  >
                    <div className="bg-green-500 rounded-full p-1">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
};