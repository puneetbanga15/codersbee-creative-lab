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
  position: {
    x: number;
    y: number;
  };
}

export const LearningJourneyVisual = () => {
  const { data: milestones = [] } = useQuery({
    queryKey: ['student-milestones'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data: students } = await supabase
        .from('students')
        .select('id')
        .eq('parent_id', user.id)
        .single();

      if (!students) return [];

      const { data } = await supabase
        .from('student_journey_milestones')
        .select('*')
        .eq('student_id', students.id)
        .order('created_at', { ascending: true });

      return data || [];
    }
  });

  // Calculate positions along a sine wave
  const calculatePosition = (index: number, total: number) => {
    const progress = index / (total - 1);
    const x = 100 + progress * 1000; // Spread across width
    const amplitude = 120; // Height of the wave
    const frequency = 1.5; // Number of waves
    const y = 300 + Math.sin(progress * Math.PI * frequency) * amplitude;
    return { x, y };
  };

  const journeyMilestones: Milestone[] = [
    {
      title: "Scratch Fundamentals",
      description: "Basic programming concepts with Scratch",
      completed: milestones.some(m => m.milestone_type === 'scratch_fundamentals' && m.completion_status === 'completed'),
      icon: <GraduationCap className="w-8 h-8" />,
      type: 'scratch_fundamentals',
      position: calculatePosition(0, 10)
    },
    {
      title: "Scratch Advanced",
      description: "Advanced Scratch programming",
      completed: milestones.some(m => m.milestone_type === 'scratch_advanced' && m.completion_status === 'completed'),
      icon: <Award className="w-8 h-8" />,
      type: 'scratch_advanced',
      position: calculatePosition(1, 10)
    },
    {
      title: "Web Development Fundamentals",
      description: "HTML, CSS basics",
      completed: milestones.some(m => m.milestone_type === 'web_fundamentals' && m.completion_status === 'completed'),
      icon: <Milestone className="w-8 h-8" />,
      type: 'web_fundamentals',
      position: calculatePosition(2, 10)
    },
    {
      title: "Web Development Advanced",
      description: "JavaScript and interactive websites",
      completed: milestones.some(m => m.milestone_type === 'web_advanced' && m.completion_status === 'completed'),
      icon: <Award className="w-8 h-8" />,
      type: 'web_advanced',
      position: calculatePosition(3, 10)
    },
    {
      title: "Python Basics",
      description: "Introduction to Python programming",
      completed: milestones.some(m => m.milestone_type === 'python_basics' && m.completion_status === 'completed'),
      icon: <Milestone className="w-8 h-8" />,
      type: 'python_basics',
      position: calculatePosition(4, 10)
    },
    {
      title: "Python Advanced",
      description: "Advanced Python concepts",
      completed: milestones.some(m => m.milestone_type === 'python_advanced' && m.completion_status === 'completed'),
      icon: <Award className="w-8 h-8" />,
      type: 'python_advanced',
      position: calculatePosition(5, 10)
    },
    {
      title: "AI Fundamentals",
      description: "Basic AI and ML concepts",
      completed: milestones.some(m => m.milestone_type === 'ai_fundamentals' && m.completion_status === 'completed'),
      icon: <Brain className="w-8 h-8" />,
      type: 'ai_fundamentals',
      position: calculatePosition(6, 10)
    },
    {
      title: "Generative AI for Creativity",
      description: "Creative applications of AI",
      completed: milestones.some(m => m.milestone_type === 'generative_ai_creativity' && m.completion_status === 'completed'),
      icon: <Rocket className="w-8 h-8" />,
      type: 'generative_ai_creativity',
      position: calculatePosition(7, 10)
    },
    {
      title: "Advanced Generative AI",
      description: "Advanced AI applications",
      completed: milestones.some(m => m.milestone_type === 'advanced_generative_ai' && m.completion_status === 'completed'),
      icon: <Brain className="w-8 h-8" />,
      type: 'advanced_generative_ai',
      position: calculatePosition(8, 10)
    },
    {
      title: "AI Master",
      description: "Complete AI mastery achieved",
      completed: milestones.some(m => m.milestone_type === 'ai_master' && m.completion_status === 'completed'),
      icon: <Trophy className="w-12 h-12 text-yellow-500" />,
      type: 'ai_master',
      position: calculatePosition(9, 10)
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
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E5DEFF" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <path
            d={`M 100,300 
               Q 400,180 700,420 
               T 1100,300`}
            stroke="url(#pathGradient)"
            strokeWidth="3"
            strokeDasharray="6 6"
            className="opacity-60"
          />
        </svg>

        {/* Connection Lines */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 600"
        >
          {journeyMilestones.map((milestone, index) => (
            <line
              key={`line-${index}`}
              x1={milestone.position.x}
              y1={milestone.position.y}
              x2={milestone.position.x}
              y2={milestone.position.y + (index % 2 ? -50 : 50)}
              stroke="#8B5CF6"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="opacity-30"
            />
          ))}
        </svg>

        {/* Milestones */}
        {journeyMilestones.map((milestone, index) => (
          <motion.div
            key={milestone.type}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`absolute transform -translate-x-1/2 ${
              index % 2 ? '-translate-y-[calc(100%+50px)]' : 'translate-y-[50px]'
            }`}
            style={{
              left: milestone.position.x,
              top: milestone.position.y,
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <div 
                className={`relative flex items-center justify-center w-16 h-16 rounded-full 
                  ${milestone.completed 
                    ? 'bg-green-100 border-2 border-green-500' 
                    : 'bg-white border-2 border-codersbee-vivid/30'
                  } shadow-lg backdrop-blur-sm`}
              >
                <div className={`${milestone.completed ? 'text-green-500' : 'text-codersbee-vivid/50'}`}>
                  {milestone.icon}
                </div>
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
              <div className="text-center w-32">
                <p className="font-semibold text-sm text-gray-800">{milestone.title}</p>
                <p className="text-xs text-gray-600">{milestone.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};