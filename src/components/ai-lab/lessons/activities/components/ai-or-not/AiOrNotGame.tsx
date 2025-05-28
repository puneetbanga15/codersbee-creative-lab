import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

type GameItem = {
  id: string;
  name: string;
  image: string;
  isAI: boolean;
  explanation: string;
};

const gameItems: GameItem[] = [
  {
    id: '1',
    name: 'Smart Speaker',
    image: '🔊',
    isAI: true,
    explanation: 'Uses AI to understand and respond to voice commands!',
  },
  {
    id: '2',
    name: 'Toaster',
    image: '🍞',
    isAI: false,
    explanation: 'Just heats bread - no intelligence here!',
  },
  {
    id: '3',
    name: 'Recommendation System',
    image: '🎬',
    isAI: true,
    explanation: 'Suggests movies or shows based on what you like!',
  },
  {
    id: '4',
    name: 'Calculator',
    image: '🧮',
    isAI: false,
    explanation: 'Just follows fixed math rules - not AI!',
  },
  {
    id: '5',
    name: 'Self-Driving Car',
    image: '🚗',
    isAI: true,
    explanation: 'Uses AI to see and navigate the road!',
  },
  {
    id: '6',
    name: 'Digital Clock',
    image: '🕒',
    isAI: false,
    explanation: 'Just keeps time - no learning here!',
  },
  {
    id: '7',
    name: 'Facial Recognition',
    image: '👤',
    isAI: true,
    explanation: 'Uses AI to identify people in photos!',
  },
  {
    id: '8',
    name: 'Light Switch',
    image: '💡',
    isAI: false,
    explanation: 'Simple on/off - no intelligence needed!',
  },
];

export const AiOrNotGame: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentItem, setCurrentItem] = useState<GameItem | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [items, setItems] = useState<GameItem[]>([]);
  const [feedback, setFeedback] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    // Shuffle and pick 5 random items
    const shuffled = [...gameItems].sort(() => 0.5 - Math.random());
    setItems(shuffled.slice(0, 5));
    setCurrentItem(shuffled[0]);
    setScore(0);
    setGameOver(false);
    setShowFeedback(false);
    setCurrentIndex(0);
  };

  const handleGuess = (guess: boolean) => {
    if (!currentItem) return;

    const isCorrect = guess === currentItem.isAI;
    setShowFeedback(true);
    
    if (isCorrect) {
      setScore(score + 1);
      setFeedback(`✅ Correct! ${currentItem.explanation}`);
    } else {
      setFeedback(`🤔 Good try! ${currentItem.explanation}`);
    }

    // Move to next item or end game
    setTimeout(() => {
      const nextIndex = currentIndex + 1;
      if (nextIndex < items.length) {
        setCurrentItem(items[nextIndex]);
        setCurrentIndex(nextIndex);
        setShowFeedback(false);
      } else {
        setGameOver(true);
      }
    }, 2000);
  };

  if (gameOver) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Game Over! 🎉</h2>
        <p className="text-xl mb-6">
          Your score: <span className="font-bold">{score} out of {items.length}</span>
        </p>
        <div className="flex justify-center gap-4">
          <Button 
            onClick={startNewGame} 
            className="bg-blue-600 hover:bg-blue-700"
          >
            Play Again
          </Button>
          <Button 
            onClick={onComplete} 
            className="bg-green-600 hover:bg-green-700"
          >
            Continue Learning
          </Button>
        </div>
      </div>
    );
  }

  if (!currentItem) return null;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Is this AI? 🤔
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-6">
          <div className="text-8xl my-6 animate-bounce">
            {currentItem.image}
          </div>
          <h3 className="text-xl font-semibold text-center">{currentItem.name}</h3>
          
          {showFeedback ? (
            <div className={`p-4 rounded-lg text-center w-full ${
              feedback.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {feedback}
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Button 
                onClick={() => handleGuess(true)} 
                className="bg-green-600 hover:bg-green-700 h-12 px-8 text-lg"
                size="lg"
              >
                <Check className="mr-2" /> AI!
              </Button>
              <Button 
                onClick={() => handleGuess(false)} 
                variant="destructive"
                className="h-12 px-8 text-lg"
                size="lg"
              >
                <X className="mr-2" /> Not AI
              </Button>
            </div>
          )}
          
          <div className="w-full mt-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{currentIndex + 1}/{items.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${((currentIndex) / items.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiOrNotGame;
