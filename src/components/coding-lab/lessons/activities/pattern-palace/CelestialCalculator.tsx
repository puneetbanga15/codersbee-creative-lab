import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Calculator, 
  Moon, 
  Sun, 
  Star, 
  PlusSquare, 
  MinusSquare, 
  X, 
  Divide, 
  RotateCcw,
  ZoomIn,
  BookOpen,
  Sparkles
} from 'lucide-react';

// Planet movement calculation modes
type CalculationMode = 'add' | 'subtract' | 'multiply' | 'divide';

interface CelestialBody {
  name: string;
  icon: React.ReactNode;
  initialPosition: number;
  actualPosition: number;
  calculatedPosition?: number;
}

export const CelestialCalculator: React.FC = () => {
  // Calculator state
  const [mode, setMode] = useState<CalculationMode>('add');
  const [value, setValue] = useState(3);
  const [showResults, setShowResults] = useState(false);
  const [explanationIndex, setExplanationIndex] = useState(0);
  
  // Celestial bodies for our calculator
  const [celestialBodies, setCelestialBodies] = useState<CelestialBody[]>([
    {
      name: 'Moon',
      icon: <Moon className="w-8 h-8 text-blue-300" />,
      initialPosition: 4,
      actualPosition: 7,
    },
    {
      name: 'Sun',
      icon: <Sun className="w-8 h-8 text-orange-500" />,
      initialPosition: 10,
      actualPosition: 13,
    },
    {
      name: 'Star',
      icon: <Star className="w-8 h-8 text-yellow-400" />,
      initialPosition: 16,
      actualPosition: 19,
    }
  ]);
  
  // Update calculated positions when mode or value changes
  useEffect(() => {
    const updatedBodies = celestialBodies.map(body => {
      let calculatedPosition;
      
      switch(mode) {
        case 'add':
          calculatedPosition = body.initialPosition + value;
          break;
        case 'subtract':
          calculatedPosition = body.initialPosition - value;
          break;
        case 'multiply':
          calculatedPosition = body.initialPosition * value;
          break;
        case 'divide':
          calculatedPosition = body.initialPosition / value;
          break;
      }
      
      return {
        ...body,
        calculatedPosition
      };
    });
    
    setCelestialBodies(updatedBodies);
  }, [mode, value]);
  
  // Check if our calculations match actual positions
  const allCorrect = celestialBodies.every(
    body => Math.round(body.calculatedPosition || 0) === body.actualPosition
  );
  
  // Reset the calculator
  const handleReset = () => {
    setValue(3);
    setMode('add');
    setShowResults(false);
  };
  
  // Get icon for selected mode
  const getModeIcon = () => {
    switch(mode) {
      case 'add': return <PlusSquare className="w-5 h-5" />;
      case 'subtract': return <MinusSquare className="w-5 h-5" />;
      case 'multiply': return <X className="w-5 h-5" />;
      case 'divide': return <Divide className="w-5 h-5" />;
    }
  };
  
  // Explanations for our celestial calculator
  const explanations = [
    {
      title: "The Power of Patterns",
      content: "Aryabhatta discovered that celestial bodies follow predictable patterns. By identifying these patterns, he could accurately predict where stars and planets would be in the future."
    },
    {
      title: "Mathematical Formulas",
      content: "Aryabhatta created mathematical formulas to describe the movement of planets and stars. These formulas allowed him to calculate planetary positions with remarkable accuracy for his time."
    },
    {
      title: "Arithmetic Operations",
      content: "Simple operations like addition, subtraction, multiplication, and division were the building blocks of Aryabhatta's astronomy. With these tools, he created complex calculations for planetary movements."
    },
    {
      title: "Zero and Place Value",
      content: "Aryabhatta's work with zero and place value systems revolutionized mathematics. Without zero, our number system and complex calculations would be impossible."
    }
  ];
  
  return (
    <div className="space-y-8">
      {/* Calculator section */}
      <motion.div 
        className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="w-6 h-6" />
          <h2 className="text-xl font-bold">Aryabhatta's Celestial Calculator</h2>
        </div>
        
        <p className="mb-6">
          Calculate the future positions of celestial bodies using mathematical operations,
          just like Aryabhatta did over 1,500 years ago!
        </p>
        
        {/* Initial and actual positions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-indigo-800/50 p-4 rounded-lg">
            <h3 className="font-medium mb-3 text-indigo-200">Starting Positions</h3>
            <div className="space-y-3">
              {celestialBodies.map((body, index) => (
                <div key={`initial-${index}`} className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-700/50 rounded-lg">
                    {body.icon}
                  </div>
                  <div>
                    <div className="text-sm text-indigo-200">{body.name}</div>
                    <div className="font-bold">{body.initialPosition} units</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-purple-800/50 p-4 rounded-lg">
            <h3 className="font-medium mb-3 text-purple-200">Future Positions (Actual)</h3>
            <div className="space-y-3">
              {celestialBodies.map((body, index) => (
                <div key={`actual-${index}`} className="flex items-center gap-3">
                  <div className="p-2 bg-purple-700/50 rounded-lg">
                    {body.icon}
                  </div>
                  <div>
                    <div className="text-sm text-purple-200">{body.name}</div>
                    <div className="font-bold">{body.actualPosition} units</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Calculator controls */}
        <div className="bg-indigo-800/30 p-4 rounded-lg mb-6">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <ZoomIn className="w-5 h-5" />
            <span>Find the Pattern:</span>
          </h3>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-indigo-200">Select Operation:</p>
              <RadioGroup 
                value={mode} 
                onValueChange={(v) => setMode(v as CalculationMode)}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="add" id="add" className="border-indigo-400 text-indigo-400" />
                  <Label htmlFor="add" className="flex items-center gap-1 cursor-pointer">
                    <PlusSquare className="w-4 h-4" /> Add
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="subtract" id="subtract" className="border-indigo-400 text-indigo-400" />
                  <Label htmlFor="subtract" className="flex items-center gap-1 cursor-pointer">
                    <MinusSquare className="w-4 h-4" /> Subtract
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="multiply" id="multiply" className="border-indigo-400 text-indigo-400" />
                  <Label htmlFor="multiply" className="flex items-center gap-1 cursor-pointer">
                    <X className="w-4 h-4" /> Multiply
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="divide" id="divide" className="border-indigo-400 text-indigo-400" />
                  <Label htmlFor="divide" className="flex items-center gap-1 cursor-pointer">
                    <Divide className="w-4 h-4" /> Divide
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-indigo-200">Value: {value}</span>
                <Input 
                  type="number"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="w-16 h-8 bg-indigo-700/50 border-indigo-600 text-white text-center"
                  min={1}
                  max={10}
                />
              </div>
              <Slider
                value={[value]}
                onValueChange={(values) => setValue(values[0])}
                min={1}
                max={10}
                step={1}
                className="mt-2"
              />
            </div>
          </div>
        </div>
        
        {/* Result section */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Button
            variant="outline"
            className="border-indigo-400 text-indigo-200 hover:bg-indigo-800/50"
            onClick={handleReset}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          
          <Button
            onClick={() => setShowResults(true)}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Future Positions
          </Button>
        </div>
        
        {/* Calculation Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <div className={`p-4 rounded-lg ${allCorrect ? 'bg-green-800/30' : 'bg-red-800/30'}`}>
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  {allCorrect ? (
                    <><Sparkles className="w-5 h-5 text-green-400" /> <span>You found the pattern!</span></>
                  ) : (
                    <><X className="w-5 h-5 text-red-400" /> <span>Not quite right</span></>
                  )}
                </h3>
                
                <div className="space-y-3 mb-4">
                  {celestialBodies.map((body, index) => (
                    <div key={`result-${index}`} className="flex items-center">
                      <div className="p-1 mr-3">
                        {body.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm opacity-80">{body.name}</div>
                        <div className="flex items-center gap-1">
                          <span>{body.initialPosition}</span>
                          <span>{getModeIcon()}</span>
                          <span>{value}</span>
                          <span>=</span>
                          <span className={`font-bold ${Math.round(body.calculatedPosition || 0) === body.actualPosition ? 'text-green-400' : 'text-red-400'}`}>
                            {body.calculatedPosition?.toFixed(1)}
                          </span>
                          <span className="text-sm opacity-70">
                            (Actual: {body.actualPosition})
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {allCorrect ? (
                  <div className="bg-green-900/30 p-3 rounded">
                    <p className="text-green-200">
                      Congratulations! You've discovered that to predict the future positions, you need 
                      to <span className="font-bold">{mode}</span> the initial positions 
                      by <span className="font-bold">{value}</span>.
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-900/30 p-3 rounded">
                    <p className="text-red-200">
                      Keep trying! Try a different operation or value to find the pattern that matches the actual future positions.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Aryabhatta's connection */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-amber-600" />
          <h3 className="text-xl font-bold text-amber-800">Aryabhatta's Mathematical Legacy</h3>
        </div>
        
        <div className="grid grid-cols-4 gap-3 mb-4">
          {explanations.map((_, index) => (
            <Button
              key={index}
              variant={index === explanationIndex ? "default" : "outline"}
              size="sm"
              onClick={() => setExplanationIndex(index)}
              className={index === explanationIndex ? "bg-amber-600" : "border-amber-300 text-amber-700"}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={explanationIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 rounded-lg shadow-sm"
          >
            <h4 className="font-bold text-amber-800 mb-2">{explanations[explanationIndex].title}</h4>
            <p className="text-gray-700">{explanations[explanationIndex].content}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Fun fact */}
      <motion.div 
        className="bg-blue-50 p-4 rounded-lg border border-blue-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex gap-3">
          <Sparkles className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-800">Fun Fact</h4>
            <p className="text-blue-700 mt-1">
              Aryabhatta wrote his famous work "Aryabhatiya" in Sanskrit verse, with 121 stanzas that 
              described mathematical and astronomical calculations. He used poetic verses to make his 
              complex formulas easier to memorize and pass down to future generations!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};