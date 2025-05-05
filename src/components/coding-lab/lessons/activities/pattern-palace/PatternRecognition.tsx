import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Moon, Sun, Check, X, HelpCircle, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

// Celestial objects for our pattern
type CelestialObject = 'star' | 'moon' | 'sun';

// For displaying the celestial objects
const CelestialIcon: React.FC<{ type: CelestialObject; size?: number; className?: string }> = ({ 
  type, 
  size = 8,
  className = '' 
}) => {
  switch (type) {
    case 'star':
      return <Star className={`w-${size} h-${size} text-amber-400 ${className}`} />;
    case 'moon':
      return <Moon className={`w-${size} h-${size} text-blue-300 ${className}`} />;
    case 'sun':
      return <Sun className={`w-${size} h-${size} text-orange-500 ${className}`} />;
  }
};

interface PatternLevel {
  pattern: CelestialObject[];
  options: CelestialObject[];
  hint: string;
  explanation: string;
}

const levels: PatternLevel[] = [
  {
    pattern: ['star', 'moon', 'star', 'moon', 'star', 'moon'],
    options: ['star', 'moon', 'sun'],
    hint: "Look at how the objects alternate. What comes after the moon?",
    explanation: "This pattern alternates between star and moon: star, moon, star, moon, ..."
  },
  {
    pattern: ['sun', 'sun', 'moon', 'sun', 'sun', 'moon'],
    options: ['sun', 'moon', 'star'],
    hint: "Count how many suns appear before each moon.",
    explanation: "This pattern has two suns followed by one moon, then repeats: sun, sun, moon, sun, sun, moon, ..."
  },
  {
    pattern: ['star', 'moon', 'sun', 'star', 'moon', 'sun'],
    options: ['star', 'moon', 'sun'],
    hint: "These three celestial objects follow a specific order.",
    explanation: "This pattern cycles through star, moon, and sun: star, moon, sun, star, moon, sun, ..."
  },
  {
    pattern: ['star', 'star', 'moon', 'moon', 'sun', 'sun'],
    options: ['star', 'moon', 'sun'],
    hint: "Each object appears twice before moving to the next one.",
    explanation: "In this pattern, each object appears twice: star, star, moon, moon, sun, sun, ..."
  },
  {
    pattern: ['sun', 'moon', 'moon', 'sun', 'moon', 'moon'],
    options: ['sun', 'moon', 'star'],
    hint: "Look at how many moons appear between each sun.",
    explanation: "This pattern has one sun followed by two moons, then repeats: sun, moon, moon, sun, moon, moon, ..."
  }
];

export const PatternRecognition: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<CelestialObject | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [streak, setStreak] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  const level = levels[currentLevel];
  const correctAnswer = level.pattern[level.pattern.length - 1];
  
  // Reset state when changing levels
  useEffect(() => {
    setShowHint(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);
  }, [currentLevel]);
  
  // Handle confetti explosion for correct answers
  useEffect(() => {
    if (isCorrect) {
      // Simple confetti burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isCorrect]);
  
  const handleSelectAnswer = (answer: CelestialObject) => {
    if (selectedAnswer !== null) return; // Prevent changing answer
    
    setSelectedAnswer(answer);
    const correct = answer === correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };
  
  const handleNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };
  
  const handleRetry = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);
  };
  
  const toggleHint = () => {
    setShowHint(prev => !prev);
  };
  
  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 p-8 text-white text-center"
      >
        <Sparkles className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
        <h2 className="text-2xl font-bold mb-4">Congratulations, Pattern Master!</h2>
        <p className="mb-6 text-lg">
          You've completed all the pattern recognition challenges! 
          Aryabhatta would be proud of your pattern recognition skills.
        </p>
        <p className="mb-4 text-white/80">
          These pattern recognition skills are the same ones that helped Aryabhatta make his 
          groundbreaking discoveries in mathematics and astronomy.
        </p>
        <Button 
          onClick={() => window.location.reload()} 
          className="bg-white text-purple-600 hover:bg-white/90"
        >
          Play Again
        </Button>
      </motion.div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Level info and progress */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-blue-50 p-4 rounded-lg">
        <div>
          <h3 className="font-bold text-blue-800">Pattern Recognition Challenge</h3>
          <p className="text-blue-600">Level {currentLevel + 1} of {levels.length}</p>
        </div>
        
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <span className="text-sm text-blue-700">Streak: {streak}</span>
          <div className="w-16 h-2 bg-blue-200 rounded-full">
            <div 
              className="h-2 bg-blue-600 rounded-full"
              style={{ width: `${(currentLevel / (levels.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Pattern display */}
      <div className="bg-gray-900 p-6 rounded-xl">
        <h3 className="text-white text-center mb-4">What comes next in this pattern?</h3>
        
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          {level.pattern.slice(0, -1).map((object, idx) => (
            <motion.div 
              key={idx}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.15 }}
              className="bg-gray-800 p-4 rounded-lg"
            >
              <CelestialIcon type={object} size={10} />
            </motion.div>
          ))}
          
          <motion.div 
            className="bg-gray-800 w-16 h-16 rounded-lg flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: (level.pattern.length - 1) * 0.15 }}
          >
            <HelpCircle className="w-8 h-8 text-gray-600" />
          </motion.div>
        </div>
        
        {/* Options */}
        <div className="flex justify-center gap-4 mt-8">
          {level.options.map((option, idx) => (
            <motion.button
              key={idx}
              disabled={selectedAnswer !== null}
              onClick={() => handleSelectAnswer(option)}
              className={`bg-gray-800 p-6 rounded-lg border-2 ${
                selectedAnswer === option 
                  ? isCorrect 
                    ? 'border-green-500 bg-green-900/30' 
                    : 'border-red-500 bg-red-900/30'
                  : 'border-gray-700 hover:border-blue-500'
              } transform transition-transform ${
                selectedAnswer === null ? 'hover:scale-105 active:scale-95' : ''
              }`}
              whileHover={selectedAnswer === null ? { y: -5 } : {}}
              whileTap={selectedAnswer === null ? { y: 0 } : {}}
            >
              <CelestialIcon type={option} size={12} />
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Feedback area */}
      <AnimatePresence>
        {selectedAnswer !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-4 rounded-lg ${
              isCorrect ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <Check className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              ) : (
                <X className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              )}
              
              <div>
                <h3 className={`font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? 'Correct!' : 'Not quite right'}
                </h3>
                
                {isCorrect ? (
                  <p className="text-green-700">Great job! You found the next object in the pattern.</p>
                ) : (
                  <p className="text-red-700">
                    The correct answer was <CelestialIcon type={correctAnswer} size={5} className="inline-block mx-1" />.
                  </p>
                )}
                
                {!showExplanation ? (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowExplanation(true)}
                    className={`mt-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}
                  >
                    Show explanation
                  </Button>
                ) : (
                  <div className="mt-2 bg-white/50 p-2 rounded">
                    <p className="text-gray-700">{level.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hint */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleHint} 
          className="text-amber-600 border-amber-300"
        >
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </Button>
        
        {selectedAnswer !== null && (
          <div className="space-x-2">
            {!isCorrect && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRetry}
              >
                Try Again
              </Button>
            )}
            
            {isCorrect && (
              <Button 
                size="sm" 
                onClick={handleNextLevel}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next Level
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
      
      {/* Hint content */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-amber-50 p-4 rounded-lg border border-amber-200"
          >
            <div className="flex gap-3">
              <Sparkles className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
              <p className="text-amber-800">{level.hint}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Aryabhatta connection */}
      <div className="mt-8 bg-purple-50 p-4 rounded-lg border border-purple-200">
        <h3 className="font-bold text-purple-800 mb-2">Aryabhatta's Connection</h3>
        <p className="text-gray-700">
          Aryabhatta was a master at recognizing patterns in numbers and celestial objects. 
          He used pattern recognition to predict the positions of stars and planets, and to 
          develop mathematical formulas that are still used today!
        </p>
      </div>
    </div>
  );
};