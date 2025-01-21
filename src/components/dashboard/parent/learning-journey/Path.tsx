import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface PathProps {
  track: any;
  trackIndex: number;
}

export const Path = ({ track, trackIndex }: PathProps) => {
  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { duration: 1, ease: "easeInOut", delay: trackIndex * 0.2 }
    }
  };

  const generatePath = () => {
    const startX = 200; // Starting X position
    const trackSpacing = 200; // Vertical spacing between tracks
    const milestoneSpacing = 300; // Horizontal spacing between milestones
    const trackY = trackIndex * trackSpacing + 100;
    const paths = [];

    // Horizontal arrows within the same track
    for (let i = 0; i < track.milestones.length - 1; i++) {
      const x1 = startX + (i * milestoneSpacing);
      const x2 = startX + ((i + 1) * milestoneSpacing);
      paths.push({
        d: `M ${x1 + 60},${trackY} L ${x2 - 60},${trackY}`,
        gradient: `gradient-${trackIndex}-horizontal`
      });
    }

    // Diagonal arrows to next track (if not the last track)
    if (trackIndex < 3) {
      const lastMilestoneX = startX + ((track.milestones.length - 1) * milestoneSpacing);
      const nextTrackFirstX = startX;
      const nextTrackY = (trackIndex + 1) * trackSpacing + 100;

      paths.push({
        d: `M ${lastMilestoneX + 60},${trackY + 30} L ${nextTrackFirstX - 60},${nextTrackY - 30}`,
        gradient: `gradient-${trackIndex}-diagonal`
      });
    }

    return paths;
  };

  return (
    <svg className="absolute top-0 left-0 w-full h-full overflow-visible">
      <defs>
        {/* Gradient definitions for each track */}
        <linearGradient id={`gradient-${trackIndex}-horizontal`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" className={`text-${track.color.split('-')[1]}-400`} stopOpacity="1" />
          <stop offset="100%" className={`text-${track.color.split('-')[2]}-500`} stopOpacity="1" />
        </linearGradient>
        <linearGradient 
          id={`gradient-${trackIndex}-diagonal`} 
          x1="0%" 
          y1="0%" 
          x2="100%" 
          y2="100%"
        >
          <stop offset="0%" className={`text-${track.color.split('-')[2]}-500`} stopOpacity="1" />
          <stop offset="100%" className={`text-${track.color.split('-')[1]}-400`} stopOpacity="1" />
        </linearGradient>
        
        {/* Arrow marker definition */}
        <marker
          id={`arrowhead-${trackIndex}`}
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill={`url(#gradient-${trackIndex}-horizontal)`}
          />
        </marker>
      </defs>
      
      {generatePath().map((path, index) => (
        <motion.path
          key={`${trackIndex}-${index}`}
          initial="hidden"
          animate="visible"
          variants={pathVariants}
          d={path.d}
          fill="none"
          strokeWidth="3"
          stroke={`url(#${path.gradient})`}
          markerEnd={`url(#arrowhead-${trackIndex})`}
          className="transition-all duration-300"
          style={{
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
          }}
        />
      ))}
    </svg>
  );
};