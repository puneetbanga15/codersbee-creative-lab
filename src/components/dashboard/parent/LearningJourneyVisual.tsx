import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, GraduationCap, Code, Brain, Award, Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Track } from "./learning-journey/Track";
import type { Track as TrackType } from "./learning-journey/types";

export const LearningJourneyVisual = () => {
  const { data: milestones = [], isLoading, error } = useQuery({
    queryKey: ['student-milestones'],
    queryFn: async () => {
      try {
        console.log("Fetching user data...");
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.log("No user found");
          return [];
        }
        console.log("User found:", user.id);

        console.log("Fetching student data...");
        const { data: students } = await supabase
          .from('students')
          .select('id')
          .eq('parent_id', user.id)
          .maybeSingle();

        if (!students) {
          console.log("No student found");
          return [];
        }
        console.log("Student found:", students.id);

        console.log("Fetching milestones...");
        const { data, error } = await supabase
          .from('student_journey_milestones')
          .select('*')
          .eq('student_id', students.id)
          .order('created_at', { ascending: true });

        if (error) {
          console.error("Error fetching milestones:", error);
          return [];
        }

        console.log("Milestones fetched:", data);
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
      color: "from-amber-400 to-orange-500",
      icon: <GraduationCap className="w-8 h-8 text-amber-600" />,
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
      icon: <Terminal className="w-8 h-8 text-blue-600" />,
      milestones: [
        {
          title: "JavaScript Basics",
          description: "Core programming concepts with JavaScript",
          completed: milestones.some(m => m.milestone_type === 'javascript_basics' && m.completion_status === 'completed'),
          icon: <Code className="w-8 h-8" />,
          type: 'javascript_basics'
        },
        {
          title: "Advanced Programming",
          description: "Complex projects and problem-solving",
          completed: milestones.some(m => m.milestone_type === 'advanced_programming' && m.completion_status === 'completed'),
          icon: <Terminal className="w-8 h-8" />,
          type: 'advanced_programming'
        }
      ]
    },
    {
      name: "AI Journey",
      color: "from-violet-400 to-purple-500",
      icon: <Brain className="w-8 h-8 text-violet-600" />,
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
    <Card className="p-12 bg-gradient-to-br from-gray-50 to-white">
      <h2 className="text-3xl font-bold mb-16 text-center">Learning Journey</h2>
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
    </Card>
  );
};