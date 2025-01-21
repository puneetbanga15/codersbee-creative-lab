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
      className="relative mb-16"
    >
      <div className="flex items-center gap-2 mb-8 pl-8">
        <div className={`p-2 rounded-full bg-gradient-to-r ${track.color} shadow-lg`}>
          {track.icon}
        </div>
        <h3 className="text-lg font-semibold">{track.name}</h3>
      </div>

      <div className="relative">
        <div className="relative flex justify-start gap-32 items-start px-8">
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
        <div className="absolute -bottom-16 left-[300px]">
          <ArrowDownRight className="w-8 h-8 text-codersbee-vivid animate-pulse" />
        </div>
      )}
    </motion.div>
  );
};