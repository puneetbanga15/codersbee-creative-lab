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
    image: "/placeholder.svg",
    milestones: [
      "Started coding at age 8",
      "Mastered Scratch in 6 months",
      "Completed Python fundamentals",
      "Created AI story generator",
      "Building AI travel planner"
    ]
  },
  {
    name: "Vamshika",
    image: "/placeholder.svg",
    milestones: [
      "Initially hesitant about coding",
      "Found passion through mentorship",
      "Mastered core programming concepts",
      "Won coding competition",
      "Inspiring other young coders"
    ]
  },
  {
    name: "Ayan",
    image: "/placeholder.svg",
    milestones: [
      "Natural problem-solver",
      "Quick learner in Python",
      "Advanced AI concepts",
      "Created recipe generator",
      "Working on AI innovations"
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-codersbee-dark">
          Meet Our <span className="text-codersbee-vivid">AI and Coding Champions</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {champions.map((champion, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4 text-center">{champion.name}'s Journey</h3>
              <div className="space-y-3">
                {champion.milestones.map((milestone, mIndex) => (
                  <motion.div
                    key={mIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: mIndex * 0.1 + index * 0.2 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-codersbee-vivid"></div>
                    <p className="text-gray-600">{milestone}</p>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-4">
                <Button
                  onClick={() => handleOpenDialog(champion)}
                  className="bg-codersbee-vivid hover:bg-codersbee-vivid/90 text-white"
                >
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedChampion?.name}'s Journey</DialogTitle>
              <DialogDescription>
                <div className="space-y-2 mt-4">
                  {selectedChampion?.milestones.map((milestone, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="text-gray-600"
                    >
                      {milestone}
                    </motion.p>
                  ))}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};