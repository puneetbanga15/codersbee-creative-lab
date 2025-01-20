import { motion } from "framer-motion";
import { Check, Trophy, Award, Milestone, GraduationCap, Brain, Globe, Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Track {
  name: string;
  color: string;
  icon: JSX.Element;
  milestones: Milestone[];
}

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

  const tracks: Track[] = [
    {
      name: "Scratch",
      color: "from-yellow-400/50 to-yellow-500/50",
      icon: <GraduationCap className="w-6 h-6" />,
      milestones: [
        {
          title: "Scratch Fundamentals",
          description: "Basic programming concepts with Scratch",
          completed: milestones.some(m => m.milestone_type === 'scratch_fundamentals' && m.completion_status === 'completed'),
          icon: <GraduationCap className="w-6 h-6" />,
          type: 'scratch_fundamentals'
        },
        {
          title: "Scratch Advanced",
          description: "Advanced Scratch programming",
          completed: milestones.some(m => m.milestone_type === 'scratch_advanced' && m.completion_status === 'completed'),
          icon: <Award className="w-6 h-6" />,
          type: 'scratch_advanced'
        }
      ]
    },
    {
      name: "Web Development",
      color: "from-blue-400/50 to-blue-500/50",
      icon: <Globe className="w-6 h-6" />,
      milestones: [
        {
          title: "Web Development Fundamentals",
          description: "HTML, CSS basics",
          completed: milestones.some(m => m.milestone_type === 'web_fundamentals' && m.completion_status === 'completed'),
          icon: <Globe className="w-6 h-6" />,
          type: 'web_fundamentals'
        },
        {
          title: "Web Development Advanced",
          description: "JavaScript and interactive websites",
          completed: milestones.some(m => m.milestone_type === 'web_advanced' && m.completion_status === 'completed'),
          icon: <Award className="w-6 h-6" />,
          type: 'web_advanced'
        }
      ]
    },
    {
      name: "Python",
      color: "from-green-400/50 to-green-500/50",
      icon: <Terminal className="w-6 h-6" />,
      milestones: [
        {
          title: "Python Basics",
          description: "Introduction to Python programming",
          completed: milestones.some(m => m.milestone_type === 'python_basics' && m.completion_status === 'completed'),
          icon: <Terminal className="w-6 h-6" />,
          type: 'python_basics'
        },
        {
          title: "Python Advanced",
          description: "Advanced Python concepts",
          completed: milestones.some(m => m.milestone_type === 'python_advanced' && m.completion_status === 'completed'),
          icon: <Award className="w-6 h-6" />,
          type: 'python_advanced'
        }
      ]
    },
    {
      name: "AI",
      color: "from-purple-400/50 to-purple-500/50",
      icon: <Brain className="w-6 h-6" />,
      milestones: [
        {
          title: "AI Fundamentals",
          description: "Basic AI and ML concepts",
          completed: milestones.some(m => m.milestone_type === 'ai_fundamentals' && m.completion_status === 'completed'),
          icon: <Brain className="w-6 h-6" />,
          type: 'ai_fundamentals'
        },
        {
          title: "Generative AI for Creativity",
          description: "Creative applications of AI",
          completed: milestones.some(m => m.milestone_type === 'generative_ai_creativity' && m.completion_status === 'completed'),
          icon: <Brain className="w-6 h-6" />,
          type: 'generative_ai_creativity'
        },
        {
          title: "Advanced Generative AI",
          description: "Advanced AI applications",
          completed: milestones.some(m => m.milestone_type === 'advanced_generative_ai' && m.completion_status === 'completed'),
          icon: <Brain className="w-6 h-6" />,
          type: 'advanced_generative_ai'
        },
        {
          title: "AI Master",
          description: "Complete AI mastery achieved",
          completed: milestones.some(m => m.milestone_type === 'ai_master' && m.completion_status === 'completed'),
          icon: <Trophy className="w-8 h-8 text-yellow-500" />,
          type: 'ai_master'
        }
      ]
    }
  ];

  return (
    <Card className="p-6 bg-gradient-to-r from-codersbee-purple/20 to-white overflow-x-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">Learning Journey</h2>
      <div className="min-w-[1000px] space-y-12 pb-4">
        {tracks.map((track, trackIndex) => (
          <motion.div
            key={track.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: trackIndex * 0.2 }}
            className="relative"
          >
            {/* Track Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className={`p-2 rounded-full bg-gradient-to-r ${track.color}`}>
                {track.icon}
              </div>
              <h3 className="text-lg font-semibold">{track.name}</h3>
            </div>

            {/* Track Line */}
            <div className="absolute left-0 top-16 w-full h-0.5 bg-gradient-to-r opacity-30 rounded-full shadow-sm"
                 style={{
                   background: `linear-gradient(to right, ${track.color.split(' ')[1].replace('/50', '')}, ${track.color.split(' ')[3].replace('/50', '')})`
                 }} />

            {/* Milestones */}
            <div className="relative flex justify-between items-start px-4">
              {track.milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (trackIndex * 0.2) + (index * 0.1) }}
                  className="relative flex flex-col items-center"
                  style={{ flex: 1 }}
                >
                  <div className={`relative flex items-center justify-center w-12 h-12 rounded-full 
                    ${milestone.completed 
                      ? 'bg-green-100 border-2 border-green-500' 
                      : 'bg-white border-2 border-gray-300'
                    } shadow-lg backdrop-blur-sm`}
                  >
                    <div className={milestone.completed ? 'text-green-500' : 'text-gray-400'}>
                      {milestone.icon}
                    </div>
                    {milestone.completed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </div>
                  <div className="mt-4 text-center max-w-[200px]">
                    <p className="font-semibold text-sm">{milestone.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};