import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Discover How Our Students Are
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-codersbee-vivid">
          Leading the AI Revolution
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {champions.map((champion, index) => (
            <motion.div 
              key={index}
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
                  onClick={() => handleOpenDialog(champion)}
                  className="bg-codersbee-vivid hover:bg-codersbee-vivid/90 text-white"
                >
                  See More Details
                </Button>
              </div>
            </motion.div>
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

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl mb-4">{selectedChampion?.name}'s Complete Journey</DialogTitle>
              <DialogDescription>
                {selectedChampion?.name === "Shuvam" ? (
                  <div className="space-y-4">
                    <div className="aspect-video">
                      <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${selectedChampion.details.video.split('v=')[1]}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className="rounded-lg"
                      ></iframe>
                    </div>
                    <div className="flex gap-4 justify-center">
                      <Button onClick={() => window.open(selectedChampion.details.github, '_blank')}>
                        View GitHub Projects
                      </Button>
                      <Button onClick={() => window.open(selectedChampion.details.book, '_blank')}>
                        Check Out My Book
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedChampion?.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="Success Story"
                        className="rounded-lg shadow-lg"
                      />
                    ))}
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};