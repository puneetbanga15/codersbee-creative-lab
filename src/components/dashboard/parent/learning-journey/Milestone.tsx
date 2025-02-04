import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Milestone as MilestoneType } from "./types";

interface MilestoneProps {
  milestone: MilestoneType;
  index: number;
  isLast: boolean;
}

export const Milestone = ({ milestone, index, isLast }: MilestoneProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative flex flex-col items-center"
    >
      <div 
        className={`relative flex items-center justify-center w-16 h-16 rounded-full 
          ${milestone.completed 
            ? 'bg-white border-2 border-green-500' 
            : 'bg-white border-2 border-gray-300'
          } shadow-lg backdrop-blur-sm hover:scale-105 transition-transform duration-200`}
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
      {!isLast && (
        <div className="absolute left-[64px] top-8 w-[256px] h-[2px] bg-gradient-to-r from-gray-300 to-gray-200" />
      )}
    </motion.div>
  );
};