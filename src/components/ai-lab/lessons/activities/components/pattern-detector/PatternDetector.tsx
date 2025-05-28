import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, Check, X, HelpCircle, ArrowRight } from 'lucide-react';

interface PatternDetectorProps {
  onComplete: () => void;
}

type Pattern = {
  id: number;
  cells: boolean[];
  label: string;
};

const initialPatterns: Pattern[] = [
  { id: 1, cells: [true, false, true, false], label: 'ABAB' },
  { id: 2, cells: [false, true, false, true], label: 'BABA' },
  { id: 3, cells: [true, true, false, false], label: 'AABB' },
  { id: 4, cells: [false, false, true, true], label: 'BBAA' },
];

type TrainingExample = {
  patternId: number;
  label: string;
};

export const PatternDetector: React.FC<PatternDetectorProps> = ({ onComplete }) => {
  const [patterns] = useState<Pattern[]>(initialPatterns);
  const [currentPattern, setCurrentPattern] = useState<Pattern | null>(null);
  const [trainingExamples, setTrainingExamples] = useState<TrainingExample[]>([]);
  const [phase, setPhase] = useState<'training' | 'testing'>('training');
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameComplete, setGameComplete] = useState(false);

  // Select a random pattern
  const selectRandomPattern = () => {
    const randomIndex = Math.floor(Math.random() * patterns.length);
    setCurrentPattern(patterns[randomIndex]);
    setIsCorrect(null);
    setFeedback('');
  };

  // Initialize the first pattern
  useEffect(() => {
    selectRandomPattern();
  }, []);

  // Handle training the AI
  const trainAI = (label: string) => {
    if (!currentPattern) return;
    
    const newExample = {
      patternId: currentPattern.id,
      label
    };
    
    setTrainingExamples([...trainingExamples, newExample]);
    setFeedback(`Thanks! I've learned that this is a "${label}" pattern.`);
    
    // After a short delay, show the next pattern
    setTimeout(() => {
      selectRandomPattern();
      
      // After 4 examples, move to testing
      if (trainingExamples.length >= 3) {
        setPhase('testing');
      }
    }, 1000);
  };

  // Test the AI's learning
  const testAI = (userLabel: string) => {
    if (!currentPattern) return;
    
    // Simple learning algorithm: count which label appears most for similar patterns
    const similarExamples = trainingExamples.filter(
      ex => ex.patternId === currentPattern.id
    );
    
    const labelCounts = similarExamples.reduce((acc, ex) => {
      acc[ex.label] = (acc[ex.label] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Get the most common label
    let aiLabel = '';
    let maxCount = 0;
    
    Object.entries(labelCounts).forEach(([label, count]) => {
      if (count > maxCount) {
        maxCount = count;
        aiLabel = label;
      }
    });
    
    // If no matching patterns, make a random guess
    if (!aiLabel) {
      const labels = [...new Set(trainingExamples.map(ex => ex.label))];
      aiLabel = labels[Math.floor(Math.random() * labels.length)] || 'Unknown';
    }
    
    const correct = aiLabel === userLabel;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => ({
        correct: prev.correct + 1,
        total: prev.total + 1
      }));
      setFeedback('Correct! The AI learned from your examples!');
    } else {
      setScore(prev => ({
        ...prev,
        total: prev.total + 1
      }));
      setFeedback(`Good try! The AI thought this was a "${aiLabel}" pattern.`);
    }
    
    // After a short delay, show the next pattern
    setTimeout(() => {
      if (score.total >= 4) {
        setGameComplete(true);
      } else {
        selectRandomPattern();
      }
    }, 1500);
  };

  // Reset the game
  const resetGame = () => {
    setTrainingExamples([]);
    setPhase('training');
    setScore({ correct: 0, total: 0 });
    setGameComplete(false);
    selectRandomPattern();
  };

  // Render a pattern as a grid of cells
  const renderPattern = (pattern: Pattern) => (
    <div className="grid grid-cols-2 gap-2 w-32 h-32 mx-auto my-4">
      {pattern.cells.map((cell, index) => (
        <div
          key={index}
          className={`rounded-md border-2 ${cell ? 'bg-blue-500 border-blue-600' : 'bg-gray-100 border-gray-200'}`}
        />
      ))}
    </div>
  );

  if (gameComplete) {
    const accuracy = Math.round((score.correct / score.total) * 100);
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold mb-4">Game Complete! 🎉</h2>
        <p className="text-lg mb-6">
          Your AI got {score.correct} out of {score.total} correct! ({accuracy}%)
        </p>
        <div className="space-x-4">
          <Button onClick={resetGame} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" /> Play Again
          </Button>
          <Button onClick={onComplete} className="gap-2">
            Continue Learning <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-center">
          {phase === 'training' ? 'Train the AI' : 'Test the AI'}
        </CardTitle>
        <div className="text-sm text-center text-muted-foreground">
          {phase === 'training'
            ? 'Help the AI learn by labeling patterns'
            : 'Can the AI recognize patterns based on what you taught it?'}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {currentPattern && (
            <div className="text-center">
              {renderPattern(currentPattern)}
              <p className="text-sm text-muted-foreground mb-4">
                What type of pattern is this?
              </p>
              
              {feedback && (
                <div className={`p-3 mb-4 rounded-md ${
                  isCorrect === true ? 'bg-green-100 text-green-800' :
                  isCorrect === false ? 'bg-red-100 text-red-800' :
                  'bg-blue-50 text-blue-800'
                }`}>
                  {feedback}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                <Button
                  variant={phase === 'testing' ? 'outline' : 'default'}
                  onClick={() => phase === 'training' ? trainAI('ABAB') : testAI('ABAB')}
                  disabled={isCorrect !== null}
                >
                  ABAB
                </Button>
                <Button
                  variant={phase === 'testing' ? 'outline' : 'default'}
                  onClick={() => phase === 'training' ? trainAI('BABA') : testAI('BABA')}
                  disabled={isCorrect !== null}
                >
                  BABA
                </Button>
                <Button
                  variant={phase === 'testing' ? 'outline' : 'default'}
                  onClick={() => phase === 'training' ? trainAI('AABB') : testAI('AABB')}
                  disabled={isCorrect !== null}
                >
                  AABB
                </Button>
                <Button
                  variant={phase === 'testing' ? 'outline' : 'default'}
                  onClick={() => phase === 'training' ? trainAI('BBAA') : testAI('BBAA')}
                  disabled={isCorrect !== null}
                >
                  BBAA
                </Button>
              </div>
            </div>
          )}
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">How it works</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {phase === 'training'
                ? 'Label each pattern to help the AI learn. After a few examples, it will try to recognize patterns on its own!'
                : 'The AI will try to recognize patterns based on what you taught it. See how well it learned!'}
            </p>
          </div>
          
          <div className="text-center text-sm">
            <div className="inline-block bg-blue-50 text-blue-800 px-3 py-1 rounded-full">
              {phase === 'training' 
                ? `Examples trained: ${trainingExamples.length}/4` 
                : `Score: ${score.correct}/${score.total}`}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatternDetector;
