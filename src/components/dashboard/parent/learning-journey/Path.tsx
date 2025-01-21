import { motion } from "framer-motion";

interface PathProps {
  track: any;
  trackIndex: number;
}

export const Path = ({ track, trackIndex }: PathProps) => {
  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { duration: 2, ease: "easeInOut" }
    }
  };

  const generatePath = (track: any) => {
    const startX = 50;
    const startY = 16;
    const width = 900;
    const spacing = width / (track.milestones.length + 1);
    
    let path = `M ${startX},${startY} `;
    
    // Generate straight lines between milestones
    track.milestones.forEach((_: any, i: number) => {
      const x = startX + (i + 1) * spacing;
      path += `L ${x},${startY} `;
    });
    
    // Add connecting line to next track if not the last track
    if (trackIndex < 3) {
      const lastX = startX + track.milestones.length * spacing;
      const nextY = startY + 120; // Distance to next track
      path += `L ${lastX + 50},${nextY}`; // Diagonal line to next track
    }
    
    return path;
  };

  return (
    <svg className="absolute top-16 left-0 w-full h-32 overflow-visible">
      <defs>
        <linearGradient id={`gradient-${trackIndex}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" className={`text-${track.color.split('-')[1]}`} />
          <stop offset="100%" className={`text-${track.color.split('-')[2]}`} />
        </linearGradient>
      </defs>
      <motion.path
        initial="hidden"
        animate="visible"
        variants={pathVariants}
        d={generatePath(track)}
        fill="none"
        strokeWidth="2"
        stroke={`url(#gradient-${trackIndex})`}
        strokeDasharray={track.milestones.some(m => !m.completed) ? "5,5" : "none"}
      />
    </svg>
  );
};