import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  Calculator, 
  BookOpen,
  ArrowLeft, 
  ArrowRight,
  Award,
  Download,
  BrainCircuit,
  CheckCircle
} from 'lucide-react';

// Import activity components
import { PatternRecognition } from './PatternRecognition';
import { NumberSequenceChallenge } from './NumberSequenceChallenge';
import { CelestialCalculator } from './CelestialCalculator';

// The different stages of the lesson
type LessonStage = 'pattern' | 'sequence' | 'calculator' | 'summary';

export const PatternPalaceActivity: React.FC = () => {
  const [stage, setStage] = useState<LessonStage>('pattern');
  const [completedStages, setCompletedStages] = useState<Set<LessonStage>>(new Set());
  
  // Mark the current stage as completed
  const completeCurrentStage = () => {
    setCompletedStages(prev => new Set([...prev, stage]));
  };
  
  // Navigate to the next stage
  const handleNext = () => {
    completeCurrentStage();
    
    switch(stage) {
      case 'pattern':
        setStage('sequence');
        break;
      case 'sequence':
        setStage('calculator');
        break;
      case 'calculator':
        setStage('summary');
        break;
    }
  };
  
  // Navigate to the previous stage
  const handlePrevious = () => {
    switch(stage) {
      case 'sequence':
        setStage('pattern');
        break;
      case 'calculator':
        setStage('sequence');
        break;
      case 'summary':
        setStage('calculator');
        break;
    }
  };
  
  // Helper for stage-specific UI
  const getStageIcon = (stageKey: LessonStage) => {
    switch(stageKey) {
      case 'pattern': return <Star className="h-5 w-5" />;
      case 'sequence': return <BrainCircuit className="h-5 w-5" />;
      case 'calculator': return <Calculator className="h-5 w-5" />;
      case 'summary': return <Award className="h-5 w-5" />;
    }
  };
  
  const getStageTitle = (stageKey: LessonStage) => {
    switch(stageKey) {
      case 'pattern': return 'Pattern Recognition';
      case 'sequence': return 'Number Sequences';
      case 'calculator': return 'Celestial Calculator';
      case 'summary': return 'Lesson Summary';
    }
  };
  
  const isStageCompleted = (stageKey: LessonStage) => {
    return completedStages.has(stageKey);
  };
  
  // Render the certificate at the end
  const renderCertificate = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-xl border border-amber-200 text-center"
    >
      <div className="max-w-xl mx-auto">
        <div className="text-amber-600 mb-4">
          <Award className="w-16 h-16 mx-auto" />
        </div>
        
        <h2 className="text-2xl font-bold text-amber-800 mb-3">Pattern Master Certificate</h2>
        
        <div className="p-6 bg-white rounded-lg border border-amber-200 mb-6">
          <p className="mb-4 italic text-amber-800 font-script text-lg">This certifies that</p>
          
          <p className="text-2xl font-bold mb-4 text-amber-900">Coding Explorer</p>
          
          <p className="mb-4 text-amber-800">has successfully completed the</p>
          
          <p className="text-xl font-bold mb-4 text-amber-900">"Pattern Palace: Aryabhatta's Celestial Calculator"</p>
          
          <p className="mb-6 text-amber-800">
            demonstrating excellent skills in pattern recognition, 
            number sequences, and mathematical thinking.
          </p>
          
          <div className="flex justify-between items-center border-t border-amber-200 pt-4">
            <div className="text-amber-800 text-left">
              <p className="font-bold">Skills Learned:</p>
              <ul className="list-disc ml-5 text-sm mt-1">
                <li>Pattern Recognition</li>
                <li>Number Sequences</li>
                <li>Mathematical Prediction</li>
                <li>Zero Concept Understanding</li>
              </ul>
            </div>
            
            <div className="text-right">
              <Star className="inline-block h-8 w-8 text-amber-500" />
              <p className="text-amber-800 text-sm">CodersBee Academy</p>
            </div>
          </div>
        </div>
        
        <Button className="bg-amber-600 hover:bg-amber-700">
          <Download className="w-4 h-4 mr-2" />
          Save Certificate
        </Button>
      </div>
    </motion.div>
  );
  
  // Render summary content
  const renderSummary = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
        <h2 className="text-xl font-bold text-indigo-800 mb-4">What You've Learned</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-indigo-100 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-indigo-100 rounded-full">
                <Star className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-bold text-indigo-800">Pattern Recognition</h3>
            </div>
            <p className="text-sm text-gray-600 flex-1">
              You mastered recognizing patterns in celestial objects, 
              just like Aryabhatta did when studying the stars.
            </p>
            <div className="mt-3 pt-3 border-t border-indigo-100">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-indigo-100 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-indigo-100 rounded-full">
                <BrainCircuit className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-bold text-indigo-800">Number Sequences</h3>
            </div>
            <p className="text-sm text-gray-600 flex-1">
              You learned to identify and predict number sequences,
              a key skill in mathematics and astronomy.
            </p>
            <div className="mt-3 pt-3 border-t border-indigo-100">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-indigo-100 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-indigo-100 rounded-full">
                <Calculator className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-bold text-indigo-800">Celestial Calculations</h3>
            </div>
            <p className="text-sm text-gray-600 flex-1">
              You used mathematical operations to calculate celestial positions,
              similar to Aryabhatta's astronomical calculations.
            </p>
            <div className="mt-3 pt-3 border-t border-indigo-100">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-full mt-1">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-blue-800 mb-2">Aryabhatta's Legacy</h2>
            <p className="text-gray-700 mb-4">
              Aryabhatta's work on patterns, numbers, and astronomy laid the foundation for 
              mathematics as we know it today. His most remarkable contributions include:
            </p>
            
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Zero:</strong> Aryabhatta's work helped develop the concept of zero as both a placeholder and a number, which revolutionized mathematics.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Pi (π):</strong> He calculated the value of π to be 3.1416, extremely close to its actual value, and centuries ahead of his time.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Earth's Rotation:</strong> He correctly proposed that the Earth rotates on its axis, causing day and night, rather than the sun moving around the Earth.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Algebra:</strong> His work laid foundations for algebra, with equations for solving astronomical problems.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {renderCertificate()}
    </motion.div>
  );
  
  return (
    <div className="space-y-6">
      {/* Navigation tabs */}
      <Tabs 
        value={stage} 
        onValueChange={(value) => setStage(value as LessonStage)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 w-full">
          {(['pattern', 'sequence', 'calculator', 'summary'] as const).map(stageKey => (
            <TabsTrigger 
              key={stageKey} 
              value={stageKey}
              className="relative"
              disabled={stageKey === 'summary' && completedStages.size < 3}
            >
              <span className="flex items-center gap-2">
                {getStageIcon(stageKey)}
                <span className="hidden sm:inline">{getStageTitle(stageKey)}</span>
              </span>
              
              {isStageCompleted(stageKey) && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      {/* Stage content */}
      <div className="min-h-[500px]">
        {stage === 'pattern' && <PatternRecognition />}
        {stage === 'sequence' && <NumberSequenceChallenge />}
        {stage === 'calculator' && <CelestialCalculator />}
        {stage === 'summary' && renderSummary()}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={stage === 'pattern'}
          className="border-blue-300 text-blue-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        {stage !== 'summary' ? (
          <Button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {stage === 'calculator' ? 'Complete Lesson' : 'Next Activity'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700"
          >
            Try Again
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};