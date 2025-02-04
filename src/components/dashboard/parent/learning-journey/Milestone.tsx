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
        className={`relative flex items-center justify-center w-20 h-20 rounded-full 
          ${milestone.completed 
            ? 'bg-white border-2 border-green-500' 
            : 'bg-white border-2 border-gray-200'
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
            <Check className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </div>
      <div className="mt-6 text-center max-w-[200px]">
        <p className="font-semibold text-lg mb-2">{milestone.title}</p>
        <p className="text-sm text-gray-600">{milestone.description}</p>
      </div>
      {!isLast && (
        <div className="absolute left-[80px] top-10 w-[400px] h-[2px]">
          <div className="w-full h-full bg-gradient-to-r from-gray-300 to-transparent" />
        </div>
      )}
    </motion.div>
  );
};