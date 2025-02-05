
import { motion } from "framer-motion";
import type { Track as TrackType } from "./types";
import { Milestone } from "./Milestone";
import { ArrowDownRight } from "lucide-react";

interface TrackProps {
  track: TrackType;
  trackIndex: number;
  isLastTrack: boolean;
}

export const Track = ({ track, trackIndex, isLastTrack }: TrackProps) => {
  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { duration: 1, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: trackIndex * 0.2 }}
      className="relative"
    >
      <div className="flex items-center gap-4 mb-12 group">
        <motion.div 
          className={`p-6 rounded-full bg-gradient-to-r ${track.color} shadow-lg relative overflow-hidden`}
          whileHover={{ scale: 1.05 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ 
            y: { duration: 2, repeat: Infinity },
            scale: { duration: 0.2 }
          }}
        >
          <div className="absolute inset-0 bg-white/10 animate-pulse" />
          <div className="relative z-10">
            {track.icon}
          </div>
        </motion.div>
        <div>
          <h3 className="text-2xl font-semibold">{track.name}</h3>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: trackIndex * 0.3 }}
            className="h-1 mt-2 rounded bg-gradient-to-r from-gray-200 to-transparent"
          />
        </div>
      </div>

      <div className="relative pl-8">
        <svg className="absolute left-0 top-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          {track.milestones.map((_, index) => {
            if (index === track.milestones.length - 1) return null;
            return (
              <motion.path
                key={index}
                d={`M ${100 + (index * 200)},30 C ${150 + (index * 200)},30 ${50 + ((index + 1) * 200)},30 ${100 + ((index + 1) * 200)},30`}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-300"
                initial="hidden"
                animate="visible"
                variants={lineVariants}
              />
            );
          })}
        </svg>

        <div className="flex justify-start gap-48">
          {track.milestones.map((milestone, index) => (
            <Milestone
              key={milestone.type}
              milestone={milestone}
              index={index}
              isLast={index === track.milestones.length - 1}
            />
          ))}
        </div>
      </div>

      {!isLastTrack && (
        <motion.div 
          className="absolute -bottom-16 left-12"
          animate={{ 
            y: [0, 5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="relative">
            <ArrowDownRight className="w-10 h-10 text-gray-400" />
            <div className="absolute inset-0 animate-ping opacity-50">
              <ArrowDownRight className="w-10 h-10 text-gray-400" />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
