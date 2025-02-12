import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap, Code, Brain, Award, Terminal, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

  const { data: certificates } = useQuery({
    queryKey: ['certificates'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*');
        
        if (error) throw error;
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
      const certificate = certificates?.find(c => c.milestone_type === milestoneType);
      
      if (!certificate) {
        toast.error("Certificate not found");
        return;
      }

      const { data, error } = await supabase.storage
        .from('certificates')
        .download(certificate.file_path);

      if (error) throw error;

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

  const learningTracks = [
    {
      track: "Scratch",
      icon: <GraduationCap className="w-5 h-5 text-amber-500" />,
      color: "bg-amber-50 border-amber-200",
      textColor: "text-amber-700",
      milestones: [
        {
          name: "Scratch Fundamentals",
          type: "scratch_fundamentals",
          description: "Basic programming concepts with Scratch"
        },
        {
          name: "Scratch Advanced",
          type: "scratch_advanced",
          description: "Advanced Scratch programming"
        }
      ]
    },
    {
      track: "Programming",
      icon: <Code className="w-5 h-5 text-blue-500" />,
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700",
      milestones: [
        {
          name: "Web Fundamentals",
          type: "web_fundamentals",
          description: "Core programming concepts with Web Development"
        },
        {
          name: "Web Advanced",
          type: "web_advanced",
          description: "Complex web projects and problem-solving"
        },
        {
          name: "Python Fundamentals",
          type: "python_fundamentals",
          description: "Basic Python programming concepts"
        },
        {
          name: "Python Advanced",
          type: "python_advanced",
          description: "Advanced Python programming and applications"
        }
      ]
    },
    {
      track: "AI Journey",
      icon: <Brain className="w-5 h-5 text-purple-500" />,
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-700",
      milestones: [
        {
          name: "AI Fundamentals",
          type: "ai_fundamentals",
          description: "Basic AI and ML concepts"
        },
        {
          name: "Generative AI",
          type: "generative_ai",
          description: "Advanced generative AI applications"
        },
        {
          name: "AI Master",
          type: "ai_master",
          description: "Complete AI mastery achieved"
        }
      ]
    }
  ];

  return (
    <Card className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[200px]">Learning Track</TableHead>
              <TableHead>Milestone</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Certificate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {learningTracks.map((track) => (
              track.milestones.map((milestone, mIndex) => (
                <TableRow key={milestone.type} className="hover:bg-gray-50/50">
                  {mIndex === 0 && (
                    <TableCell 
                      className={`font-medium ${track.color} border-l-4 border-l-${track.textColor.split('-')[1]}-500`}
                      rowSpan={track.milestones.length}
                    >
                      <div className="flex items-center gap-2">
                        {track.icon}
                        <span className={track.textColor}>{track.track}</span>
                      </div>
                    </TableCell>
                  )}
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {milestone.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500">{milestone.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {milestones.some(m => 
                        m.milestone_type === milestone.type && 
                        m.completion_status === 'completed'
                      ) ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          In Progress
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {certificates?.some(c => c.milestone_type === milestone.type) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadCertificate(milestone.type)}
                        className="gap-2 hover:bg-gray-100"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </Card>
  );
};
