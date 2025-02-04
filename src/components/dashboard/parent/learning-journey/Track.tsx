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
      <div className="flex items-center gap-4 mb-12">
        <div className={`p-4 rounded-full bg-gradient-to-r ${track.color} shadow-lg`}>
          {track.icon}
        </div>
        <h3 className="text-2xl font-semibold">{track.name}</h3>
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
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDownRight className="w-10 h-10 text-gray-400" />
        </motion.div>
      )}
    </motion.div>
  );
};