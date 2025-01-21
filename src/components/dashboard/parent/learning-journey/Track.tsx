import { motion } from "framer-motion";
import type { Track as TrackType } from "./types";
import { Milestone } from "./Milestone";
import { Path } from "./Path";

interface TrackProps {
  track: TrackType;
  trackIndex: number;
}

export const Track = ({ track, trackIndex }: TrackProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: trackIndex * 0.2 }}
      className="relative mb-32" // Increased margin between tracks
    >
      <div className="flex items-center gap-2 mb-8">
        <div className={`p-2 rounded-full bg-gradient-to-r ${track.color} shadow-lg`}>
          {track.icon}
        </div>
        <h3 className="text-lg font-semibold">{track.name}</h3>
      </div>

      <div className="relative min-h-[100px]">
        <Path track={track} trackIndex={trackIndex} />
        <div className="relative flex justify-between items-start px-4 mt-8">
          {track.milestones.map((milestone, index) => (
            <Milestone
              key={milestone.type}
              milestone={milestone}
              index={index}
              trackIndex={trackIndex}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};