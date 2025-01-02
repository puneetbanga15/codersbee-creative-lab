import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogOverlay
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const champions = [
  {
    name: "Shuvam",
    image: "/placeholder.svg",
    description: "Shuvam has mastered Python and created amazing AI projects.",
  },
  {
    name: "Ayan",
    image: "/placeholder.svg",
    description: "Ayan excels in game development and web applications.",
  },
  {
    name: "Vamshika",
    image: "/placeholder.svg",
    description: "Vamshika is passionate about robotics and machine learning.",
  },
];

export const SuccessStories = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedChampion, setSelectedChampion] = useState(null);

  const handleOpenDialog = (champion) => {
    setSelectedChampion(champion);
    setOpenDialog(true);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-codersbee-dark">
          Meet Our <span className="text-codersbee-vivid">AI and Coding Champions</span>
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-12">
          <img 
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e" 
            alt="White robot" 
            className="w-full md:w-1/2 rounded-lg shadow-xl"
          />
          <img 
            src="/placeholder.svg" 
            alt="AI Robot" 
            className="w-full md:w-1/3 rounded-lg shadow-xl"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {champions.map((champion, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={champion.image}
                alt={champion.name}
                className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">{champion.name}</h3>
              <p className="text-gray-600 mb-4">{champion.description}</p>
              <Button
                onClick={() => handleOpenDialog(champion)}
                className="bg-codersbee-vivid hover:bg-codersbee-vivid/90 text-white"
              >
                View Journey
              </Button>
            </div>
          ))}
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogOverlay />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedChampion?.name}</DialogTitle>
              <DialogDescription>
                {selectedChampion?.description}
              </DialogDescription>
            </DialogHeader>
            <Button onClick={() => setOpenDialog(false)}>Close</Button>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};