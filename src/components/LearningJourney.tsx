
import { motion } from "framer-motion";
import { GraduationCap, Code, Brain, ArrowRight, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export const LearningJourney = () => {
  const isMobile = useIsMobile();
  
  const { data: certificates } = useQuery({
    queryKey: ['certificates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('certificates')
        .select('*');
      
      if (error) {
        toast.error("Failed to fetch certificates");
        throw error;
      }
      return data || [];
    },
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

      if (error) {
        toast.error("Failed to download certificate");
        throw error;
      }

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = certificate.filename || 'certificate.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Certificate downloaded successfully");
    } catch (error) {
      console.error('Download error:', error);
      toast.error("Failed to download certificate");
    }
  };

  const journeySteps = [
    {
      title: "Scratch Fundamentals",
      description: "Visual programming basics and computational thinking",
      icon: GraduationCap,
      color: "bg-amber-400",
      duration: "2-3 months",
      milestoneType: "scratch_fundamentals"
    },
    {
      title: "JavaScript Foundations",
      description: "Core programming concepts with JavaScript",
      icon: Code,
      color: "bg-blue-500",
      duration: "3-4 months",
      milestoneType: "javascript_foundations"
    },
    {
      title: "Advanced Programming",
      description: "Complex projects and problem-solving",
      icon: Code,
      color: "bg-indigo-500",
      duration: "4-5 months",
      milestoneType: "advanced_programming"
    },
    {
      title: "AI & Machine Learning",
      description: "Introduction to AI concepts and applications",
      icon: Brain,
      color: "bg-purple-500",
      duration: "4-5 months",
      milestoneType: "ai_ml_basics"
    }
  ];

  return (
    <div className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-900">
          Your Learning Journey
          <span className="block text-sm text-gray-600 mt-2">
            A structured path to mastery
          </span>
        </h2>

        <div className="relative max-w-4xl mx-auto">
          {journeySteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative mb-8 md:mb-16 last:mb-0"
            >
              <div className={`flex ${isMobile ? 'flex-col' : 'items-start'} gap-4 md:gap-6`}>
                <div className="relative">
                  <motion.div
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-full ${step.color} shadow-lg flex items-center justify-center shrink-0`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <step.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </motion.div>
                  {!isMobile && index < journeySteps.length - 1 && (
                    <div className="absolute top-16 left-1/2 h-16 w-0.5 bg-gradient-to-b from-gray-300 to-transparent -translate-x-1/2" />
                  )}
                </div>

                <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      {certificates?.some(c => c.milestone_type === step.milestoneType) && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDownloadCertificate(step.milestoneType)}
                          className="text-codersbee-vivid hover:text-codersbee-vivid/80 transition-colors"
                          title="Download Certificate"
                        >
                          <Download className="w-5 h-5" />
                        </motion.button>
                      )}
                      <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {step.duration}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600">{step.description}</p>

                  {!isMobile && index < journeySteps.length - 1 && (
                    <motion.div
                      className="absolute right-4 bottom-4 hidden md:block"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
