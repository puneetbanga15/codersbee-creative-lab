import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, GraduationCap, Award, Brain, Trophy, Globe as globe, Terminal as terminal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Track } from "./learning-journey/Track";
import type { Track as TrackType } from "./learning-journey/types";

export const LearningJourneyVisual = () => {
  const { data: milestones = [], isLoading, error } = useQuery({
    queryKey: ['student-milestones'],
    queryFn: async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data: students } = await supabase
          .from('students')
          .select('id')
          .eq('parent_id', user.id)
          .maybeSingle();

        if (!students) return [];

        const { data } = await supabase
          .from('student_journey_milestones')
          .select('*')
          .eq('student_id', students.id)
          .order('created_at', { ascending: true });

        return data || [];
      } catch (err) {
        console.error('Error fetching milestones:', err);
        return [];
      }
    },
    retry: false
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
      color: "from-yellow-400 to-yellow-500",
      icon: <GraduationCap className="w-6 h-6" />,
      milestones: [
        {
          title: "Scratch Fundamentals",
          description: "Basic programming concepts with Scratch",
          completed: milestones.some(m => m?.milestone_type === 'scratch_fundamentals' && m?.completion_status === 'completed'),
          icon: <GraduationCap className="w-6 h-6" />,
          type: 'scratch_fundamentals'
        },
        {
          title: "Scratch Advanced",
          description: "Advanced Scratch programming",
          completed: milestones.some(m => m?.milestone_type === 'scratch_advanced' && m?.completion_status === 'completed'),
          icon: <Award className="w-6 h-6" />,
          type: 'scratch_advanced'
        }
      ]
    },
    {
      name: "Web Development",
      color: "from-blue-400 to-blue-500",
      icon: <globe className="w-6 h-6" />,
      milestones: [
        {
          title: "Web Development Fundamentals",
          description: "HTML, CSS basics",
          completed: milestones.some(m => m?.milestone_type === 'web_fundamentals' && m?.completion_status === 'completed'),
          icon: <globe className="w-6 h-6" />,
          type: 'web_fundamentals'
        },
        {
          title: "Web Development Advanced",
          description: "JavaScript and interactive websites",
          completed: milestones.some(m => m?.milestone_type === 'web_advanced' && m?.completion_status === 'completed'),
          icon: <Award className="w-6 h-6" />,
          type: 'web_advanced'
        }
      ]
    },
    {
      name: "Python",
      color: "from-green-400 to-green-500",
      icon: <terminal className="w-6 h-6" />,
      milestones: [
        {
          title: "Python Basics",
          description: "Introduction to Python programming",
          completed: milestones.some(m => m?.milestone_type === 'python_basics' && m?.completion_status === 'completed'),
          icon: <terminal className="w-6 h-6" />,
          type: 'python_basics'
        },
        {
          title: "Python Advanced",
          description: "Advanced Python concepts",
          completed: milestones.some(m => m?.milestone_type === 'python_advanced' && m?.completion_status === 'completed'),
          icon: <Award className="w-6 h-6" />,
          type: 'python_advanced'
        }
      ]
    },
    {
      name: "AI",
      color: "from-purple-400 to-purple-500",
      icon: <Brain className="w-6 h-6" />,
      milestones: [
        {
          title: "AI Fundamentals",
          description: "Basic AI and ML concepts",
          completed: milestones.some(m => m?.milestone_type === 'ai_fundamentals' && m?.completion_status === 'completed'),
          icon: <Brain className="w-6 h-6" />,
          type: 'ai_fundamentals'
        },
        {
          title: "Generative AI for Creativity",
          description: "Creative applications of AI",
          completed: milestones.some(m => m?.milestone_type === 'generative_ai_creativity' && m?.completion_status === 'completed'),
          icon: <Brain className="w-6 h-6" />,
          type: 'generative_ai_creativity'
        },
        {
          title: "Advanced Generative AI",
          description: "Advanced AI applications",
          completed: milestones.some(m => m?.milestone_type === 'advanced_generative_ai' && m?.completion_status === 'completed'),
          icon: <Brain className="w-6 h-6" />,
          type: 'advanced_generative_ai'
        },
        {
          title: "AI Master",
          description: "Complete AI mastery achieved",
          completed: milestones.some(m => m?.milestone_type === 'ai_master' && m?.completion_status === 'completed'),
          icon: <Trophy className="w-8 h-8 text-yellow-500" />,
          type: 'ai_master'
        }
      ]
    }
  ];

  return (
    <Card className="p-6 bg-gradient-to-r from-codersbee-purple/20 to-white overflow-x-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">Learning Journey</h2>
      <div className="min-w-[1000px] space-y-24 pb-4 relative">
        {tracks.map((track, trackIndex) => (
          <Track key={track.name} track={track} trackIndex={trackIndex} />
        ))}
      </div>
    </Card>
  );
};