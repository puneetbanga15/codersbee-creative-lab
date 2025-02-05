
import { motion } from "framer-motion";
import { Check, Download, Award } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Milestone as MilestoneType } from "./types";
import type { Database } from "@/integrations/supabase/types";

interface MilestoneProps {
  milestone: MilestoneType;
  index: number;
  isLast: boolean;
}

export const Milestone = ({ milestone, index, isLast }: MilestoneProps) => {
  const handleDownloadCertificate = async () => {
    try {
      const { data: certificates } = await supabase
        .from('certificates')
        .select('*')
        .eq('milestone_type', milestone.type)
        .single();

      if (!certificates) {
        toast.error("Certificate not found");
        return;
      }

      const { data, error } = await supabase.storage
        .from('certificates')
        .download(certificates.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = certificates.filename || 'certificate.pdf';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative flex flex-col items-center group"
    >
      <motion.div 
        className={`relative flex items-center justify-center w-24 h-24 rounded-full 
          ${milestone.completed 
            ? 'bg-gradient-to-br from-green-400 to-green-500 border-2 border-green-500' 
            : 'bg-white border-2 border-gray-200'
          } shadow-lg backdrop-blur-sm hover:scale-105 transition-all duration-200`}
        whileHover={{ scale: 1.1 }}
        animate={milestone.completed ? {
          y: [0, -5, 0],
        } : {}}
        transition={{ 
          y: { duration: 2, repeat: Infinity },
          scale: { duration: 0.2 }
        }}
      >
        <div className={`text-3xl ${milestone.completed ? 'text-white' : 'text-gray-400'}`}>
          {milestone.icon}
        </div>
        {milestone.completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5"
          >
            <Check className="w-4 h-4 text-white" />
          </motion.div>
        )}
        
        {milestone.completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -top-2 -right-2"
          >
            <button
              onClick={handleDownloadCertificate}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors group"
            >
              <Download className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>
        )}
      </motion.div>

      <div className="mt-6 text-center max-w-[200px]">
        <p className="font-semibold text-lg mb-2">{milestone.title}</p>
        <p className="text-sm text-gray-600">{milestone.description}</p>
      </div>

      {!isLast && (
        <motion.div 
          className="absolute left-[96px] top-12 w-[400px] h-[2px]"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "400px", opacity: 1 }}
          transition={{ duration: 1, delay: index * 0.3 }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-transparent" />
            <div className="absolute inset-0 w-full h-full">
              <svg width="100%" height="100%" className="overflow-visible">
                <motion.line
                  x1="0"
                  y1="1"
                  x2="100%"
                  y2="1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  className="text-gray-300"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: index * 0.3 }}
                />
              </svg>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
