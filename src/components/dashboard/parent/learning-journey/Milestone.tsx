
import { motion, AnimatePresence } from "framer-motion";
import type { Milestone as MilestoneType } from "./types";
import { CheckCircle2, Trophy } from "lucide-react";

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
          relative w-24 h-24 rounded-full border-2 
          ${milestone.completed 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-200 bg-white'
          }
          flex items-center justify-center
        `}
      >
        <div className={`${milestone.completed ? 'text-green-500' : 'text-gray-400'}`}>
          {milestone.icon}
        </div>

        <AnimatePresence>
          {milestone.completed && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2"
              >
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="absolute -top-4 left-1/2 transform -translate-x-1/2"
              >
                <Trophy className="w-6 h-6 text-yellow-500" />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="mt-4 text-center">
        <h4 className={`font-semibold ${milestone.completed ? 'text-green-500' : 'text-gray-600'}`}>
          {milestone.title}
        </h4>
        <p className="text-sm text-gray-500 mt-1">
          {milestone.description}
        </p>
      </div>
    </div>
  );
};
