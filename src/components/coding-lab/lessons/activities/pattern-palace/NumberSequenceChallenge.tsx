import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowRight, 
  Check, 
  X, 
  HelpCircle, 
  Sparkles, 
  AlertTriangle,
  MoveRight,
  Calculator,
  Stars
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Sequence {
  numbers: number[];
  hint: string;
  rule: string;
  connection: string;
}

const sequences: Sequence[] = [
  {
    numbers: [1, 4, 7, 10, 13, 16],
    hint: "Each number increases by the same amount. Try to find the pattern.",
    rule: "Add 3 to the previous number",
    connection: "Aryabhatta used arithmetic sequences like this one to track the positions of celestial bodies over time."
  },
  {
    numbers: [1, 2, 4, 8, 16, 32],
    hint: "Instead of adding, try multiplying.",
    rule: "Multiply the previous number by 2",
    connection: "Powers of 2 were important in early calculations. Aryabhatta worked with different number bases, including binary-like systems."
  },
  {
    numbers: [1, 1, 2, 3, 5, 8],
    hint: "Look at how the two previous numbers relate to the next one.",
    rule: "Add the two previous numbers to get the next one",
    connection: "This is the famous Fibonacci sequence, which appears in nature and astronomy - areas that Aryabhatta studied extensively."
  },
  {
    numbers: [3, 6, 9, 12, 15, 18],
    hint: "These are all multiples of a certain number.",
    rule: "Multiply the position by 3",
    connection: "Multiples and factors were key to Aryabhatta's work on measurements and his calculations of π (pi)."
  },
  {
    numbers: [1, 4, 9, 16, 25, 36],
    hint: "Think about operations you can do to the position number itself.",
    rule: "Square the position number (1², 2², 3², etc.)",
    connection: "Aryabhatta worked extensively with squared numbers when calculating areas and developing algebraic formulas."
  }
];

export const NumberSequenceChallenge: React.FC = () => {
  const [currentSequence, setCurrentSequence] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showRule, setShowRule] = useState(false);
  const [streak, setStreak] = useState(0);
  const [attempted, setAttempted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showStars, setShowStars] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const sequence = sequences[currentSequence];
  const correctAnswer = sequence.numbers[sequence.numbers.length];
  
  useEffect(() => {
    // Reset state when sequence changes
    setUserAnswer('');
    setIsCorrect(null);
    setShowHint(false);
    setShowRule(false);
    setAttempted(false);
    
    // Focus the input field
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [currentSequence]);
  
  // Handle confetti when correct
  useEffect(() => {
    if (isCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Show stars effect
      setShowStars(true);
      setTimeout(() => setShowStars(false), 2000);
    }
  }, [isCorrect]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userAnswer.trim()) return;
    
    const numericAnswer = parseInt(userAnswer, 10);
    const result = numericAnswer === correctAnswer;
    
    setIsCorrect(result);
    setAttempted(true);
    
    if (result) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };
  
  const handleNext = () => {
    if (currentSequence < sequences.length - 1) {
      setCurrentSequence(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };
  
  const handleRetry = () => {
    setUserAnswer('');
    setIsCorrect(null);
    setAttempted(false);
    inputRef.current?.focus();
  };
  
  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-8 text-white text-center"
      >
        <Calculator className="w-16 h-16 mx-auto mb-4 text-white" />
        <h2 className="text-2xl font-bold mb-4">Sequence Master!</h2>
        <p className="mb-6 text-lg">
          Congratulations! You've completed all the number sequence challenges.
          Your pattern recognition skills are truly impressive!
        </p>
        <p className="mb-4 text-white/80">
          Just like Aryabhatta, you've shown that you can recognize patterns and predict what comes next.
          These skills were essential for his mathematical and astronomical discoveries.
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
    <div className="space-y-6 relative">
      {/* Animated stars overlay for correct answers */}
      <AnimatePresence>
        {showStars && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight 
                }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 1.5, 0],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: Math.random(), 
                  ease: "easeInOut" 
                }}
                className="absolute"
              >
                <Stars className="text-yellow-300 w-6 h-6" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Level info */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-indigo-50 p-4 rounded-lg">
        <div>
          <h3 className="font-bold text-indigo-800">Number Sequence Challenge</h3>
          <p className="text-indigo-600">Level {currentSequence + 1} of {sequences.length}</p>
        </div>
        
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <span className="text-sm text-indigo-700">Streak: {streak}</span>
          <div className="w-16 h-2 bg-indigo-200 rounded-full">
            <div 
              className="h-2 bg-indigo-600 rounded-full"
              style={{ width: `${(currentSequence / (sequences.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Sequence display */}
      <div className="bg-white p-6 rounded-xl border border-indigo-200 shadow-sm">
        <h3 className="text-center text-lg font-semibold text-indigo-800 mb-6">
          What comes next in this sequence?
        </h3>
        
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          {sequence.numbers.map((num, idx) => (
            <motion.div 
              key={idx}
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-lg font-bold text-indigo-800"
            >
              {num}
            </motion.div>
          ))}
          
          <motion.div 
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: sequence.numbers.length * 0.1 }}
            className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center"
          >
            <HelpCircle className="w-6 h-6 text-indigo-300" />
          </motion.div>
        </div>
        
        {/* Input form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Input
            ref={inputRef}
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="w-full sm:w-32 text-center"
            disabled={attempted && isCorrect}
          />
          
          <Button 
            type="submit" 
            disabled={!userAnswer.trim() || (attempted && isCorrect)}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Check Answer
          </Button>
        </form>
      </div>
      
      {/* Feedback area */}
      <AnimatePresence>
        {attempted && (
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
                  <p className="text-green-700">Well done! You found the next number in the sequence.</p>
                ) : (
                  <p className="text-red-700">
                    The correct answer was <span className="font-bold">{correctAnswer}</span>.
                  </p>
                )}
                
                {!showRule ? (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowRule(true)}
                    className={`mt-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}
                  >
                    Show the rule
                  </Button>
                ) : (
                  <div className="mt-2 bg-white/50 p-2 rounded">
                    <p className="text-gray-700 font-medium">The rule: {sequence.rule}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Action buttons */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowHint(!showHint)} 
          className="text-amber-600 border-amber-300"
        >
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </Button>
        
        {attempted && (
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
                onClick={handleNext}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Next Sequence
                <ArrowRight className="ml-1 h-4 w-4" />
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
              <p className="text-amber-800">{sequence.hint}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Aryabhatta connection */}
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <h3 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
          <MoveRight className="h-5 w-5" />
          Aryabhatta's Connection
        </h3>
        <p className="text-gray-700">
          {sequence.connection}
        </p>
      </div>
      
      {/* Tips */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-800">Tips for Finding Patterns</h4>
            <ul className="list-disc ml-4 text-sm text-blue-700 mt-1 space-y-1">
              <li>Try adding, subtracting, multiplying, or dividing each number</li>
              <li>Look at the relationship between consecutive numbers</li>
              <li>Consider the position of each number in the sequence</li>
              <li>Sometimes patterns combine operations (like multiply then add)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};