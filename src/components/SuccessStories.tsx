import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Trophy, Star, Award } from "lucide-react";
import { motion } from "framer-motion";
import { LearningJourney } from "./LearningJourney";

const ChampionJourney = ({ icon: Icon, title, milestones, color }) => (
  <Card className={`p-6 ${color} backdrop-blur`}>
    <div className="flex items-start gap-4">
      <div className={`${color.replace('from-', 'bg-').split(' ')[0]} p-3 rounded-lg`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="relative">
          <div className="absolute left-2 top-0 h-full w-0.5 bg-gray-200" />
          <div className="space-y-4 relative">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 pl-6"
              >
                <div className="absolute left-0 w-4 h-4 bg-white border-2 border-gray-300 rounded-full" />
                <span className="text-gray-700">{milestone}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Card>
);

export const SuccessStories = () => {
  const champions = [
    {
      icon: Trophy,
      title: "Shuvam's Journey",
      color: "bg-gradient-to-br from-codersbee-yellow/30 to-white",
      milestones: [
        "Started coding at age 8",
        "Mastered Scratch in 6 months",
        "Completed Python fundamentals",
        "Created AI story generator",
        "Building AI travel planner"
      ]
    },
    {
      icon: Star,
      title: "Vamshika's Journey",
      color: "bg-gradient-to-br from-codersbee-green/30 to-white",
      milestones: [
        "Initially hesitant about coding",
        "Found passion through mentorship",
        "Mastered core programming concepts",
        "Won coding competition",
        "Inspiring other young coders"
      ]
    },
    {
      icon: Award,
      title: "Ayan's Journey",
      color: "bg-gradient-to-br from-codersbee-orange/30 to-white",
      milestones: [
        "Natural problem-solver",
        "Quick learner in Python",
        "Advanced AI concepts",
        "Created recipe generator",
        "Working on AI innovations"
      ]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-codersbee-dark">
          Meet Our <span className="text-codersbee-vivid">AI and Coding Champions</span>
        </h2>
        
        <div className="space-y-6">
          {champions.map((champion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <ChampionJourney {...champion} />
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <LearningJourney />
        </div>
      </div>
    </section>
  );
};