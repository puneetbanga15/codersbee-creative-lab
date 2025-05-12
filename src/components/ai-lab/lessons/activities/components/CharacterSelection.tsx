
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Character } from '../types';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
  id: string;
  character: Character;
  isSelected: boolean;
  onClick: (character: Character) => void;
}

const SortableItem = ({ id, character, isSelected, onClick }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  // Prevent drag handlers from interfering with click
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Call onClick with character data
    onClick(character);
  };
  
  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`character-card p-4 rounded-lg border ${isSelected ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-200'} 
        bg-white hover:border-purple-300 transition-all`}
    >
      <div 
        className="flex items-center gap-3 cursor-pointer"
        onClick={handleClick}
      >
        <div 
          className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0"
          {...attributes}
          {...listeners}
        >
          <span className="text-3xl font-bold text-purple-500">{character.name.charAt(0)}</span>
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{character.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{character.description}</p>
          
          <div className="flex flex-wrap gap-1">
            {character.personality.slice(0, 3).map((trait, index) => (
              <span 
                key={index} 
                className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface CharacterSelectionProps {
  characters: Character[];
  onSelect: (character: Character) => void;
}

export const CharacterSelection: React.FC<CharacterSelectionProps> = ({ 
  characters,
  onSelect
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [items, setItems] = useState(characters);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleContinue = () => {
    if (selectedCharacter) {
      onSelect(selectedCharacter);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Choose Your AI Friend</h2>
        <p className="mb-6 text-gray-600">
          Select a character you'd like to train as your AI friend. Each character has a unique personality and knowledge base.
        </p>
        
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map(item => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3 mb-6">
              {items.map((character) => (
                <SortableItem 
                  key={character.id} 
                  id={character.id} 
                  character={character} 
                  isSelected={selectedCharacter?.id === character.id}
                  onClick={handleCharacterClick}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleContinue}
            disabled={!selectedCharacter}
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
