import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, GraduationCap, Award, Brain } from "lucide-react";
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
      color: "from-amber-400 to-orange-500",
      icon: <GraduationCap className="w-6 h-6 text-amber-600" />,
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
      name: "AI Journey",
      color: "from-violet-400 to-purple-500",
      icon: <Brain className="w-6 h-6 text-violet-600" />,
      milestones: [
        {
          title: "AI Fundamentals",
          description: "Basic AI and ML concepts",
          completed: milestones.some(m => m?.milestone_type === 'ai_fundamentals' && m?.completion_status === 'completed'),
          icon: <Brain className="w-6 h-6" />,
          type: 'ai_fundamentals'
        },
        {
          title: "AI Master",
          description: "Complete AI mastery achieved",
          completed: milestones.some(m => m?.milestone_type === 'ai_master' && m?.completion_status === 'completed'),
          icon: <Award className="w-8 h-8" />,
          type: 'ai_master'
        }
      ]
    }
  ];

  return (
    <Card className="p-8 bg-gradient-to-br from-gray-50 to-white">
      <h2 className="text-2xl font-bold mb-12 text-center">Learning Journey</h2>
      <div className="space-y-8">
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