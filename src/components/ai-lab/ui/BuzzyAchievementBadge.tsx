
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, Award } from 'lucide-react';

type BadgeType = 'beginner' | 'intermediate' | 'advanced' | 'expert';
type BadgeVariant = 'success' | 'milestone' | 'achievement';

interface BuzzyAchievementBadgeProps {
  type: BadgeType;
  variant?: BadgeVariant;
  title: string;
  description?: string;
  animate?: boolean;
  onClick?: () => void;
  className?: string;
}

export const BuzzyAchievementBadge: React.FC<BuzzyAchievementBadgeProps> = ({
  type,
  variant = 'achievement',
  title,
  description,
  animate = true,
  onClick,
  className = ''
}) => {
  // Map types to colors
  const typeColors = {
    beginner: {
      bg: 'bg-blue-100',
      border: 'border-blue-200',
      text: 'text-blue-700',
      icon: <Star className="h-4 w-4" />
    },
    intermediate: {
      bg: 'bg-green-100',
      border: 'border-green-200',
      text: 'text-green-700',
      icon: <Star className="h-4 w-4" />
    },
    advanced: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-200',
      text: 'text-yellow-700',
      icon: <Star className="h-4 w-4" />
    },
    expert: {
      bg: 'bg-purple-100',
      border: 'border-purple-200',
      text: 'text-purple-700',
      icon: <Star className="h-4 w-4" />
    }
  };

  // Map variants to icons
  const variantIcons = {
    success: <CheckCircle className="h-5 w-5" />,
    milestone: <Award className="h-5 w-5" />,
    achievement: <Star className="h-5 w-5" />
  };

  const colors = typeColors[type];
  const icon = variantIcons[variant];

  const badgeAnimation = animate ? {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: 'spring', stiffness: 400, damping: 10 }
  } : {};

  return (
    <motion.div
      {...badgeAnimation}
      className={`${colors.bg} ${colors.border} ${colors.text} border rounded-lg p-3 ${onClick ? 'cursor-pointer hover:brightness-95' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-white/50">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-sm">{title}</h4>
          {description && <p className="text-xs opacity-80">{description}</p>}
        </div>
      </div>
    </motion.div>
  );
};
