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

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/917087884023', '_blank');
  };

  const handleTrialClick = () => {
    window.open('https://calendly.com/codersbee/class-slot', '_blank');
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

        <div className="mt-16 bg-gradient-to-r from-codersbee-purple/30 to-codersbee-vivid/20 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-codersbee-dark mb-6">
            Ready to Start Your Child's Coding Journey?
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              className="bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
              onClick={handleWhatsAppClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              Message us on WhatsApp
            </Button>
            <Button
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
              onClick={handleTrialClick}
            >
              Book Your FREE Trial Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
