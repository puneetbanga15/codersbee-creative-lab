
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: trackIndex * 0.2 }}
      className="relative mb-24 last:mb-0"
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
