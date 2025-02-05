
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, GraduationCap, Code, Brain, Award, Terminal, Download, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Track } from "./learning-journey/Track";
import type { Track as TrackType } from "./learning-journey/types";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const LearningJourneyVisual = () => {
  const { data: milestones = [], isLoading, error } = useQuery({
    queryKey: ['student-milestones'],
    queryFn: async () => {
      try {
        console.log("Fetching student milestones...");
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

        if (error) {
          console.error("Error fetching milestones:", error);
          throw error;
        }

        console.log("Fetched milestones:", data);
        return data || [];
      } catch (err) {
        console.error('Error fetching milestones:', err);
        toast.error("Failed to load learning journey");
        return [];
      }
    },
  });

  const { data: certificates } = useQuery({
    queryKey: ['certificates'],
    queryFn: async () => {
      try {
        console.log("Fetching certificates...");
        const { data, error } = await supabase
          .from('certificates')
          .select('*');
        
        if (error) throw error;
        console.log("Fetched certificates:", data);
        return data || [];
      } catch (err) {
        console.error('Error fetching certificates:', err);
        toast.error("Failed to load certificates");
        return [];
      }
    }
  });

  const handleDownloadCertificate = async (milestoneType: string) => {
    try {
      console.log("Attempting to download certificate for:", milestoneType);
      const certificate = certificates?.find(c => c.milestone_type === milestoneType);
      
      if (!certificate) {
        console.log("No certificate found for:", milestoneType);
        toast.error("Certificate not found");
        return;
      }

      const { data, error } = await supabase.storage
        .from('certificates')
        .download(certificate.file_path);

      if (error) {
        console.error("Download error:", error);
        toast.error("Failed to download certificate");
        throw error;
      }

      console.log("Certificate downloaded successfully");
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = certificate.filename || 'certificate.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Certificate downloaded successfully!");
    } catch (error) {
      console.error('Error downloading certificate:', error);
      toast.error("Failed to download certificate");
    }
  };

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

  const calculateTrackProgress = (trackMilestones: any[]) => {
    const completed = trackMilestones.filter(m => 
      milestones.some(ms => ms.milestone_type === m.type && ms.completion_status === 'completed')
    ).length;
    return (completed / trackMilestones.length) * 100;
  };

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
            <div key={track.name} className="relative">
              <AnimatePresence>
                {track.milestones.some(m => m.completed) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-8 right-0 flex items-center gap-2"
                  >
                    <Progress value={calculateTrackProgress(track.milestones)} className="w-32" />
                    <span className="text-sm font-medium">
                      {Math.round(calculateTrackProgress(track.milestones))}%
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <Track 
                key={track.name} 
                track={track} 
                trackIndex={index}
                isLastTrack={index === tracks.length - 1}
              />

              <div className="mt-4 flex justify-end space-x-4">
                {track.milestones.map((milestone) => (
                  milestone.completed && certificates?.some(c => c.milestone_type === milestone.type) && (
                    <motion.div
                      key={milestone.type}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadCertificate(milestone.type)}
                        className="gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Certificate for {milestone.title}</span>
                      </Button>
                    </motion.div>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
