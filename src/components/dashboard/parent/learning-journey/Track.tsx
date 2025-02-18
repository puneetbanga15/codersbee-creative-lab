
import { motion } from "framer-motion";
import type { Track as TrackType } from "./types";
import { Milestone } from "./Milestone";
import { ArrowRight } from "lucide-react";

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
      <div className="flex items-center gap-4 mb-8">
        <motion.div 
          className={`p-4 rounded-full ${track.color} relative`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative z-10 text-white">
            {track.icon}
          </div>
        </motion.div>
        <h3 className="text-xl font-medium text-gray-700">{track.name}</h3>
      </div>

      <div className="relative pl-8">
        <svg className="absolute left-0 top-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          {track.milestones.map((_, index) => {
            if (index === track.milestones.length - 1) return null;
            return (
              <motion.path
                key={index}
                d={`M ${80 + (index * 160)},24 L ${(index + 1) * 160},24`}
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                className="text-gray-200"
                initial="hidden"
                animate="visible"
                variants={lineVariants}
              />
            );
          })}
        </svg>

        <div className="flex justify-start gap-32">
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
          className="absolute -bottom-8 left-12"
          animate={{ x: [0, 5, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowRight className="w-5 h-5 text-gray-300" />
        </motion.div>
      )}
    </motion.div>
  );
};
