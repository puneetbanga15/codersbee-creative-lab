import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ChampionCardProps {
  champion: {
    name: string;
    journey: string[];
  };
  index: number;
  onOpenDialog: (champion: any) => void;
}

export const ChampionCard = ({ champion, index, onOpenDialog }: ChampionCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <h3 className="text-2xl font-semibold mb-6 text-center text-codersbee-vivid">
        {champion.name}'s Journey
      </h3>
      <div className="space-y-6">
        {champion.journey.map((step, stepIndex) => (
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ 
              opacity: 1, 
              x: 0,
              transition: {
                duration: 0.5,
                delay: stepIndex * 0.1,
                type: "spring",
                stiffness: 100
              }
            }}
            className="flex items-center"
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-4 h-4 rounded-full bg-codersbee-vivid"></div>
              {stepIndex !== champion.journey.length - 1 && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: "3rem" }}
                  transition={{ duration: 0.3, delay: stepIndex * 0.1 }}
                  className="absolute top-4 left-2 w-0.5 bg-codersbee-vivid"
                />
              )}
            </motion.div>
            <p className="ml-4 text-gray-700">{step}</p>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button
          onClick={() => onOpenDialog(champion)}
          className="bg-codersbee-vivid hover:bg-codersbee-vivid/90 text-white"
        >
          See More Details
        </Button>
      </div>
    </motion.div>
  );
};