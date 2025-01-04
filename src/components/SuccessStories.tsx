import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChampionCard } from './success-stories/ChampionCard';
import { ChampionDialog } from './success-stories/ChampionDialog';

const champions = [
  {
    name: "Shuvam",
    journey: [
      "Started coding at age 8",
      "Mastered Scratch in 6 months",
      "Learned HTML, CSS & JavaScript",
      "Created initial projects",
      "Learned Python & AI",
      "Created AI storybook",
      "Building AI travel planner"
    ],
    details: {
      video: "https://www.youtube.com/watch?v=vmgCTuT7slg",
      github: "https://github.com/shuvamcoder?tab=repositories",
      book: "https://shuvamdutta218.gumroad.com/l/TLWthebook"
    }
  },
  {
    name: "Vamshika",
    journey: [
      "Started at age 10",
      "Initially hesitant",
      "Found passion through mentorship",
      "Mastered fundamentals",
      "Won $100 in competition",
      "Completed Python",
      "Starting AI journey"
    ],
    images: [
      "/lovable-uploads/5ce605a0-716b-4b72-b17f-92c23fd4fc0c.png",
      "/lovable-uploads/6dfbf3db-7380-483f-99e7-8c503638f344.png"
    ]
  }
];

export const SuccessStories = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedChampion, setSelectedChampion] = useState<typeof champions[0] | null>(null);

  const handleOpenDialog = (champion: typeof champions[0]) => {
    setSelectedChampion(champion);
    setOpenDialog(true);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Discover How Our Students Are
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-codersbee-vivid">
            Leading the AI and Coding Revolution
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Through the unique journeys of two CodersBee stars, see how we transform curiosity into expertise
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {champions.map((champion, index) => (
            <ChampionCard
              key={index}
              champion={champion}
              index={index}
              onOpenDialog={handleOpenDialog}
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-12"
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-codersbee-purple/30 to-codersbee-vivid/20 p-8 rounded-xl shadow-lg">
            <p className="text-2xl font-semibold text-codersbee-dark leading-relaxed">
              Every journey is unique, but success with CodersBee is a guarantee.
              <span className="block mt-2 text-codersbee-vivid">
                Join us to unlock your child's potential to become a future AI innovator and leader!
              </span>
            </p>
          </div>
        </motion.div>

        <ChampionDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          selectedChampion={selectedChampion}
        />
      </div>
    </section>
  );
};