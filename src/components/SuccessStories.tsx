import React, { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const champions = [
  {
    name: "Alice",
    image: "/lovable-uploads/alice.png",
    description: "Alice has excelled in coding and AI projects.",
  },
  {
    name: "Bob",
    image: "/lovable-uploads/bob.png",
    description: "Bob loves creating games and interactive applications.",
  },
  {
    name: "Charlie",
    image: "/lovable-uploads/charlie.png",
    description: "Charlie is passionate about AI and robotics.",
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
            src="/lovable-uploads/7ee9aa6b-bb6d-485c-8a7c-bd494a05aa2a.png" 
            alt="Online coding class" 
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
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>{selectedChampion?.name}</Dialog.Title>
            <Dialog.Description>
              {selectedChampion?.description}
            </Dialog.Description>
            <Button onClick={() => setOpenDialog(false)}>Close</Button>
          </Dialog.Content>
        </Dialog>
      </div>
    </section>
  );
};