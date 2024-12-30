import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Trophy, Star, Award, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { LearningJourney } from "./LearningJourney";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ChampionDetails = ({ name, feedback, projectLinks }) => (
  <div className="space-y-6">
    <div>
      <h4 className="text-lg font-semibold mb-2">Parent's Feedback</h4>
      <blockquote className="border-l-4 border-codersbee-vivid pl-4 italic">
        {feedback}
      </blockquote>
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-2">Projects</h4>
      <div className="space-y-2">
        {projectLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-codersbee-vivid hover:underline"
          >
            {link.title} <ExternalLink className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  </div>
);

const ChampionJourney = ({ icon: Icon, title, milestones, color, details }) => (
  <Card className={`p-6 ${color} backdrop-blur h-full`}>
    <div className="flex flex-col h-full">
      <div className="flex items-start gap-4 mb-4">
        <div className={`${color.replace('from-', 'bg-').split(' ')[0]} p-3 rounded-lg`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="relative flex-1">
        <div className="absolute left-2 top-0 h-full w-0.5 bg-gray-200" />
        <div className="space-y-3 relative">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 pl-6"
            >
              <div className="absolute left-0 w-4 h-4 bg-white border-2 border-gray-300 rounded-full" />
              <span className="text-sm text-gray-700">{milestone}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="mt-4 text-codersbee-vivid hover:underline flex items-center gap-1">
            View Details <ExternalLink className="w-4 h-4" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <ChampionDetails {...details} />
        </DialogContent>
      </Dialog>
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
      ],
      details: {
        name: "Shuvam",
        feedback: "Shuvam has shown remarkable progress. The hands-on approach and project-based learning have kept him engaged and excited about coding.",
        projectLinks: [
          { title: "AI Story Generator", url: "#" },
          { title: "Travel Planner (In Progress)", url: "#" }
        ]
      }
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
      ],
      details: {
        name: "Vamshika",
        feedback: "Vamshika's transformation has been incredible. The supportive environment and practical projects have boosted her confidence.",
        projectLinks: [
          { title: "Coding Competition Project", url: "#" },
          { title: "Mentorship Program Feedback", url: "#" }
        ]
      }
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
      ],
      details: {
        name: "Ayan",
        feedback: "Ayan has excelled in his coding journey. The hands-on projects have allowed him to apply his knowledge effectively.",
        projectLinks: [
          { title: "Recipe Generator", url: "#" },
          { title: "AI Innovations Showcase", url: "#" }
        ]
      }
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-codersbee-dark">
          Meet Our <span className="text-codersbee-vivid">AI and Coding Champions</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Every child's journey is unique, shaped by their interests, pace, and learning style. 
            While these stories showcase different paths to success, we customize our approach to match 
            your child's individual needs and aspirations.
          </p>
        </motion.div>

        <div className="mt-16">
          <LearningJourney />
        </div>
      </div>
    </section>
  );
};
