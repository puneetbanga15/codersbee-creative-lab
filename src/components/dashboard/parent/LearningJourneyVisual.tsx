import { motion } from "framer-motion";
import { Check, Trophy, Award, Milestone, GraduationCap, Brain, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Milestone {
  title: string;
  description: string;
  completed: boolean;
  icon: JSX.Element;
  type: string;
}

export const LearningJourneyVisual = () => {
  const { data: milestones = [] } = useQuery({
    queryKey: ['student-milestones'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      // First get the student ID
      const { data: students } = await supabase
        .from('students')
        .select('id')
        .eq('parent_id', user.id)
        .single();

      if (!students) return [];

      // Then get their milestones
      const { data } = await supabase
        .from('student_journey_milestones')
        .select('*')
        .eq('student_id', students.id)
        .order('created_at', { ascending: true });

      return data || [];
    }
  });

  const journeyMilestones: Milestone[] = [
    {
      title: "Scratch Fundamentals",
      description: "Basic programming concepts with Scratch",
      completed: milestones.some(m => m.milestone_type === 'scratch_fundamentals' && m.completion_status === 'completed'),
      icon: <GraduationCap className="w-8 h-8" />,
      type: 'scratch_fundamentals'
    },
    {
      title: "Scratch Advanced",
      description: "Advanced Scratch programming",
      completed: milestones.some(m => m.milestone_type === 'scratch_advanced' && m.completion_status === 'completed'),
      icon: <Award className="w-8 h-8" />,
      type: 'scratch_advanced'
    },
    {
      title: "Web Development Fundamentals",
      description: "HTML, CSS basics",
      completed: milestones.some(m => m.milestone_type === 'web_fundamentals' && m.completion_status === 'completed'),
      icon: <Milestone className="w-8 h-8" />,
      type: 'web_fundamentals'
    },
    {
      title: "Web Development Advanced",
      description: "JavaScript and interactive websites",
      completed: milestones.some(m => m.milestone_type === 'web_advanced' && m.completion_status === 'completed'),
      icon: <Award className="w-8 h-8" />,
      type: 'web_advanced'
    },
    {
      title: "Python Basics",
      description: "Introduction to Python programming",
      completed: milestones.some(m => m.milestone_type === 'python_basics' && m.completion_status === 'completed'),
      icon: <Milestone className="w-8 h-8" />,
      type: 'python_basics'
    },
    {
      title: "Python Advanced",
      description: "Advanced Python concepts",
      completed: milestones.some(m => m.milestone_type === 'python_advanced' && m.completion_status === 'completed'),
      icon: <Award className="w-8 h-8" />,
      type: 'python_advanced'
    },
    {
      title: "AI Fundamentals",
      description: "Basic AI and ML concepts",
      completed: milestones.some(m => m.milestone_type === 'ai_fundamentals' && m.completion_status === 'completed'),
      icon: <Brain className="w-8 h-8" />,
      type: 'ai_fundamentals'
    },
    {
      title: "Generative AI for Creativity",
      description: "Creative applications of AI",
      completed: milestones.some(m => m.milestone_type === 'generative_ai_creativity' && m.completion_status === 'completed'),
      icon: <Rocket className="w-8 h-8" />,
      type: 'generative_ai_creativity'
    },
    {
      title: "Advanced Generative AI",
      description: "Advanced AI applications",
      completed: milestones.some(m => m.milestone_type === 'advanced_generative_ai' && m.completion_status === 'completed'),
      icon: <Brain className="w-8 h-8" />,
      type: 'advanced_generative_ai'
    },
    {
      title: "AI Master",
      description: "Complete AI mastery achieved",
      completed: milestones.some(m => m.milestone_type === 'ai_master' && m.completion_status === 'completed'),
      icon: <Trophy className="w-12 h-12 text-yellow-500" />,
      type: 'ai_master'
    }
  ];

  return (
    <Card className="p-6 bg-gradient-to-r from-codersbee-purple/20 to-white overflow-x-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Learning Journey
      </h2>
      <div className="relative min-w-[1200px] h-[600px] mx-auto">
        {/* Curved Path */}
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1200 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 300 Q 300 300, 400 150 Q 500 0, 600 150 Q 700 300, 800 450 Q 900 600, 1000 450 Q 1100 300, 1150 300"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="text-codersbee-vivid/30"
          />
        </svg>

        {/* Milestones */}
        <div className="relative w-full h-full">
          {journeyMilestones.map((milestone, index) => {
            // Calculate positions along the curve
            const progress = index / (journeyMilestones.length - 1);
            const x = 50 + progress * 1100; // Spread across width
            const y = 300 + Math.sin(progress * Math.PI * 2) * 150; // Oscillate vertically

            return (
              <motion.div
                key={milestone.type}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: x, top: y }}
              >
                <div className="flex flex-col items-center">
                  <div 
                    className={`relative flex items-center justify-center w-16 h-16 rounded-full 
                      ${milestone.completed 
                        ? 'bg-green-100 border-2 border-green-500' 
                        : 'bg-gray-100 border-2 border-gray-300'}`}
                  >
                    {milestone.icon}
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
                  <div className="mt-2 text-center w-32">
                    <p className="font-semibold text-sm">{milestone.title}</p>
                    <p className="text-xs text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};