import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ChampionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedChampion: any;
}

export const ChampionDialog = ({ open, onOpenChange, selectedChampion }: ChampionDialogProps) => {
  if (!selectedChampion) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">{selectedChampion.name}'s Complete Journey</DialogTitle>
          <DialogDescription>
            {selectedChampion.name === "Shuvam" ? (
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
                {selectedChampion?.images?.map((image: string, index: number) => (
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
  );
};