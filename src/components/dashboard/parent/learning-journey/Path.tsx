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
    const height = 100;
    
    let path = `M ${startX},${startY} `;
    
    track.milestones.forEach((milestone: any, i: number) => {
      const x = (i + 1) * (width / track.milestones.length);
      const y = startY;
      
      const controlPoint1X = x - (width / track.milestones.length) * 0.7;
      const controlPoint2X = x - (width / track.milestones.length) * 0.3;
      const controlPointY = y + (i % 2 === 0 ? height : -height);
      
      path += `C ${controlPoint1X},${y} ${controlPoint2X},${controlPointY} ${x},${y} `;
    });
    
    return path;
  };

  return (
    <svg className="absolute top-16 left-0 w-full h-32 overflow-visible">
      <motion.path
        initial="hidden"
        animate="visible"
        variants={pathVariants}
        d={generatePath(track)}
        fill="none"
        strokeWidth="2"
        className={`stroke-current ${track.color}`}
        strokeDasharray={track.milestones.some(m => !m.completed) ? "5,5" : "none"}
      />
    </svg>
  );
};