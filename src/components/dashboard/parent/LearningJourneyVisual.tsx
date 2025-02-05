
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, GraduationCap, Code, Brain, Award, Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Track } from "./learning-journey/Track";
import type { Track as TrackType } from "./learning-journey/types";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const LearningJourneyVisual = () => {
  const { data: milestones = [], isLoading, error } = useQuery({
    queryKey: ['student-milestones'],
    queryFn: async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.log("No user found");
          return [];
        }

        const { data: students } = await supabase
          .from('students')
          .select('id')
          .eq('parent_id', user.id)
          .maybeSingle();

        if (!students) {
          console.log("No student found");
          return [];
        }

        const { data, error } = await supabase
          .from('student_journey_milestones')
          .select('*')
          .eq('student_id', students.id)
          .order('created_at', { ascending: true });

        if (error) throw error;

        return data || [];
      } catch (err) {
        console.error('Error fetching milestones:', err);
        toast.error("Failed to load learning journey");
        return [];
      }
    },
  });

  if (isLoading) {
    return (
      <Card className="p-6 flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-codersbee-vivid" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <p className="text-center text-red-500">Failed to load learning journey. Please try again later.</p>
      </Card>
    );
  }

  const tracks: TrackType[] = [
    {
      name: "Scratch",
      color: "from-amber-400 to-orange-500",
      icon: <GraduationCap className="w-10 h-10 text-white" />,
      milestones: [
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
        }
      ]
    },
    {
      name: "Programming",
      color: "from-blue-400 to-blue-600",
      icon: <Terminal className="w-10 h-10 text-white" />,
      milestones: [
        {
          title: "Web Fundamentals",
          description: "Core programming concepts with Web Development",
          completed: milestones.some(m => m.milestone_type === 'web_fundamentals' && m.completion_status === 'completed'),
          icon: <Code className="w-8 h-8" />,
          type: 'web_fundamentals'
        },
        {
          title: "Web Advanced",
          description: "Complex web projects and problem-solving",
          completed: milestones.some(m => m.milestone_type === 'web_advanced' && m.completion_status === 'completed'),
          icon: <Terminal className="w-8 h-8" />,
          type: 'web_advanced'
        }
      ]
    },
    {
      name: "AI Journey",
      color: "from-violet-400 to-purple-500",
      icon: <Brain className="w-10 h-10 text-white" />,
      milestones: [
        {
          title: "AI Fundamentals",
          description: "Basic AI and ML concepts",
          completed: milestones.some(m => m.milestone_type === 'ai_fundamentals' && m.completion_status === 'completed'),
          icon: <Brain className="w-8 h-8" />,
          type: 'ai_fundamentals'
        },
        {
          title: "AI Master",
          description: "Complete AI mastery achieved",
          completed: milestones.some(m => m.milestone_type === 'ai_master' && m.completion_status === 'completed'),
          icon: <Award className="w-8 h-8" />,
          type: 'ai_master'
        }
      ]
    }
  ];

  return (
    <Card className="p-12 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-gray-100/50 bg-[size:20px_20px]" />
      <div className="relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-16 text-center"
        >
          Learning Journey
        </motion.h2>
        <div className="space-y-24">
          {tracks.map((track, index) => (
            <Track 
              key={track.name} 
              track={track} 
              trackIndex={index}
              isLastTrack={index === tracks.length - 1}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};
