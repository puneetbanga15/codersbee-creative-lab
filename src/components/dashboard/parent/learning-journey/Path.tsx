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
      transition: { duration: 1, ease: "easeInOut" }
    }
  };

  const generatePath = (track: any) => {
    const startX = 100;
    const startY = trackIndex * 200 + 50; // Increased vertical spacing between tracks
    const width = 800;
    const spacing = width / (track.milestones.length + 1);
    
    let paths = [];
    
    // Generate straight lines between milestones in the same track
    for (let i = 0; i < track.milestones.length - 1; i++) {
      const x1 = startX + i * spacing + 100;
      const x2 = startX + (i + 1) * spacing + 100;
      paths.push({
        d: `M ${x1},${startY} L ${x2},${startY}`,
        gradient: `gradient-${trackIndex}-horizontal`
      });
    }
    
    // Add diagonal connections to next track if not the last track
    if (trackIndex < 3) {
      const lastX = startX + (track.milestones.length - 1) * spacing + 100;
      const nextY = startY + 200; // Connect to next track
      paths.push({
        d: `M ${lastX},${startY} L ${lastX + 100},${nextY}`,
        gradient: `gradient-${trackIndex}-diagonal`
      });
    }
    
    return paths;
  };

  return (
    <svg className="absolute top-0 left-0 w-full h-full overflow-visible">
      <defs>
        {/* Horizontal gradient for each track */}
        <linearGradient id={`gradient-${trackIndex}-horizontal`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" className={`text-${track.color.split('-')[1]}`} stopOpacity="0.8" />
          <stop offset="100%" className={`text-${track.color.split('-')[2]}`} stopOpacity="0.8" />
        </linearGradient>
        {/* Diagonal gradient for connections between tracks */}
        <linearGradient id={`gradient-${trackIndex}-diagonal`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" className={`text-${track.color.split('-')[2]}`} stopOpacity="0.6" />
          <stop offset="100%" className={`text-${track.color.split('-')[1]}`} stopOpacity="0.6" />
        </linearGradient>
        {/* Arrow marker definition */}
        <marker
          id={`arrowhead-${trackIndex}`}
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            className={`fill-${track.color.split('-')[2]}`}
          />
        </marker>
      </defs>
      
      {generatePath(track).map((path, index) => (
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
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))"
          }}
        />
      ))}
    </svg>
  );
};