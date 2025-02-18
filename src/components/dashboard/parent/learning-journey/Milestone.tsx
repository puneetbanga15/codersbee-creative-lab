
import { motion, AnimatePresence } from "framer-motion";
import type { Milestone as MilestoneType } from "./types";
import { CheckCircle2 } from "lucide-react";

interface MilestoneProps {
  milestone: MilestoneType;
  index: number;
  isLast: boolean;
}

export const Milestone = ({ milestone, index, isLast }: MilestoneProps) => {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.2 }}
        className={`
          relative w-12 h-12 rounded-full
          ${milestone.completed 
            ? 'bg-green-500 text-white' 
            : 'bg-gray-100 text-gray-400'
          }
          flex items-center justify-center
          transition-colors duration-300
        `}
      >
        <div className="w-6 h-6">
          {milestone.icon}
        </div>

        <AnimatePresence>
          {milestone.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1"
            >
              <CheckCircle2 className="w-4 h-4 text-green-500 bg-white rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="mt-3">
        <h4 className={`text-sm font-medium ${milestone.completed ? 'text-gray-900' : 'text-gray-500'}`}>
          {milestone.title}
        </h4>
        <p className="text-xs text-gray-500 mt-0.5 max-w-[120px]">
          {milestone.description}
        </p>
      </div>
    </div>
  );
};
