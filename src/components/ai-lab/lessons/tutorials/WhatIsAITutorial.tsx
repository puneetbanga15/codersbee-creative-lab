import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BuzzyAnimation } from '@/components/ai-lab/ui/BuzzyAnimation';
import { BuzzySpeechBubble } from '@/components/ai-lab/ui/BuzzySpeechBubble';
import { AnimatePresence, motion } from 'framer-motion';

interface WhatIsAITutorialProps {
  onComplete?: () => void;
}

export const WhatIsAITutorial: React.FC<WhatIsAITutorialProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBuzzy, setShowBuzzy] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  
  // State for the pattern detector activity
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [pattern, setPattern] = useState<(string | null)[]>(Array(4).fill(null));
  const [trainedPatterns, setTrainedPatterns] = useState<{pattern: string, type: 'A' | 'B'}[]>([]);
  const [showAIThinking, setShowAIThinking] = useState(false);
  const [aiPrediction, setAiPrediction] = useState<{pattern: string, correct: boolean} | null>(null);
  
  const aiThoughts = [
    "Hmm, I see you've given me one example. I'm starting to learn...",
    "I'm seeing a pattern here. Let me think...",
    "With more examples, I'm getting better at recognizing the patterns!",
    "I think I'm starting to understand how these patterns work!"
  ];
  
  const resetPattern = () => {
    setPattern(Array(4).fill(null));
    setAiPrediction(null);
  };
  
  const trainAI = (type: 'A' | 'B') => {
    if (pattern.some(emoji => emoji === null)) {
      alert('Please complete the pattern first!');
      return;
    }
    
    const newTrainedPattern = {
      pattern: pattern.join(''),
      type
    };
    
    setTrainedPatterns([...trainedPatterns, newTrainedPattern]);
    setAiPrediction(null);
    setShowAIThinking(true);
    
    // Reset after training
    resetPattern();
  };
  
  const testAI = () => {
    if (pattern.some(emoji => emoji === null)) {
      alert('Please complete the pattern first!');
      return;
    }
    
    if (trainedPatterns.length < 2) {
      alert('Train me with at least two patterns first!');
      return;
    }
    
    setShowAIThinking(true);
    
    // Simple pattern recognition logic
    const currentPattern = pattern.join('');
    
    // Check which pattern it matches better
    const isAlternating = (p: string) => {
      return p[0] === p[2] && p[1] === p[3] && p[0] !== p[1];
    };
    
    const isGrouped = (p: string) => {
      return (p[0] === p[1] && p[2] === p[3] && p[0] !== p[2]);
    };
    
    // Check what type of pattern this is
    const isPatternA = isAlternating(currentPattern);
    const isPatternB = isGrouped(currentPattern);
    
    // Count how many of each pattern type we've trained
    const patternACount = trainedPatterns.filter(p => p.type === 'A').length;
    const patternBCount = trainedPatterns.filter(p => p.type === 'B').length;
    
    // Check if this exact pattern was trained
    const exactMatch = trainedPatterns.find(p => p.pattern === currentPattern);
    
    // Set prediction result
    let predictedType: 'A' | 'B';
    let isCorrect = false;
    
    if (exactMatch) {
      // If we've seen this exact pattern before, use its type
      predictedType = exactMatch.type;
      isCorrect = true;
    } else if (isPatternA) {
      predictedType = 'A';
      isCorrect = patternACount > 0;
    } else if (isPatternB) {
      predictedType = 'B';
      isCorrect = patternBCount > 0;
    } else {
      // If we can't determine, use the most common pattern type
      predictedType = patternACount >= patternBCount ? 'A' : 'B';
      isCorrect = false;
    }
    
    // Show the thinking animation for a moment before showing the result
    setTimeout(() => {
      setAiPrediction({
        pattern: predictedType,
        correct: isCorrect
      });
      setShowAIThinking(false);
    }, 1000);
  };
  
  const showHint = () => {
    setShowAIThinking(!showAIThinking);
  };

  // Emit event when on the last tab to indicate section end
  useEffect(() => {
    if (currentSlide === slides.length - 1) {
      const event = new CustomEvent('sectionEndReached', { 
        detail: { isAtEnd: true }
      });
      window.dispatchEvent(event);
    } else {
      const event = new CustomEvent('sectionEndReached', { 
        detail: { isAtEnd: false }
      });
      window.dispatchEvent(event);
    }
  }, [currentSlide]);
  
  // Buzzy messages and states for each tab
  const buzzyStates = {
    default: 'thinking',
    ai: 'explaining',
    examples: 'excited',
    quiz: 'teaching',
    try: 'happy'
  };
  
  const buzzyMessages = {
    default: "Let's learn about AI together! I'll be your guide.",
    ai: "AI is like teaching a robot to think and learn, but it's different from human thinking!",
    examples: "AI is all around us, helping in ways you might not even realize!",
    quiz: "Let's test what you've learned! Don't worry, I'll help you.",
    try: "Great job! You're already thinking like an AI explorer!"
  };

  const handleTabChange = (value: string) => {
    setCurrentSlide(parseInt(value));
    setShowBuzzy(true);
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setShowBuzzy(true);
    }
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setShowBuzzy(true);
    } else if (currentSlide === slides.length - 1 && onComplete) {
      onComplete();
    }
  };

  const slides = [
    {
      title: "What is Artificial Intelligence?",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <p className="text-center text-lg font-medium text-purple-800">
              AI is like giving computers the ability to learn and make decisions, similar to how humans do!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 text-center mb-3">Human Intelligence</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Learns from experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Understands emotions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Uses common sense</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-purple-100">
              <h3 className="font-medium text-purple-800 text-center mb-3">Artificial Intelligence</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>Learns from data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>Finds patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>Makes predictions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
      buzzyState: 'ai'
    },
    {
      title: "AI in Everyday Life",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
            <p className="text-center text-sm text-gray-700">
              AI is already all around us! Can you spot where AI might be helping in these examples?
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { 
                icon: '📱', 
                text: 'Smartphone face unlock',
                answer: 'Uses AI to recognize your face'
              },
              { 
                icon: '🎮', 
                text: 'Video game characters',
                answer: 'AI controls how they move and react'
              },
              { 
                icon: '📸', 
                text: 'Photo organization',
                answer: 'AI can find all pictures of your dog'
              },
              { 
                icon: '🎵', 
                text: 'Music recommendations',
                answer: 'AI suggests songs you might like'
              }
            ].map((item, index) => (
              <button
                key={index}
                className="bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-left"
                onClick={() => alert(`That's right! ${item.answer}.`)}
              >
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-sm font-medium">{item.text}</div>
              </button>
            ))}
          </div>
        </div>
      ),
      buzzyState: 'examples'
    },
    {
      title: "Is This AI?",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
            <p className="text-center text-sm text-gray-700">
              Which of these use AI? Tap to find out!
            </p>
          </div>
          
          <div className="space-y-3">
            {[
              { text: 'A calculator', isAI: false },
              { text: 'A self-driving car', isAI: true },
              { text: 'A light switch', isAI: false },
              { text: 'A robot vacuum that learns room layouts', isAI: true },
              { text: 'A digital clock', isAI: false }
            ].map((item, index) => (
              <button
                key={index}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  item.isAI 
                    ? 'bg-green-50 border border-green-200 hover:bg-green-100' 
                    : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => {
                  if (item.isAI) {
                    alert(`✅ That's right! "${item.text}" uses AI because it can learn and make decisions.`);
                  } else {
                    alert(`❌ Not quite! "${item.text}" follows fixed rules and doesn't learn or adapt.`);
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    item.isAI ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {item.isAI ? '🤖' : '🔌'}
                  </div>
                  <span>{item.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ),
      buzzyState: 'quiz'
    },
    {
      title: "Let's Train an AI!",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-center text-purple-800 mb-3">
              Train Your Own AI Pattern Detector
            </h3>
            
            {/* Step-by-step instructions */}
            <div className="mb-6 bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-800 text-center mb-2">How to Play:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li><span className="font-medium">Create a pattern</span> by clicking on a color below, then click on the empty boxes to place it</li>
                <li><span className="font-medium">Train the AI</span> by clicking "Train as A" or "Train as B" to teach it different patterns</li>
                <li><span className="font-medium">Test the AI</span> by making a new pattern and clicking "Test Pattern" to see if it can recognize it</li>
                <li><span className="font-medium">Hint</span> shows what the AI is thinking about the patterns</li>
              </ol>
              <div className="mt-3 p-2 bg-yellow-50 border border-yellow-100 rounded text-xs">
                💡 <span className="font-medium">Tip:</span> Try training the AI with several examples of each pattern type for better results!
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-purple-100">
                <h4 className="font-medium text-center mb-3">Pattern Sequence</h4>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {['🔴', '🔵', '🟢', '⭐'].map((emoji, i) => (
                    <div 
                      key={i}
                      className={`aspect-square flex items-center justify-center text-2xl rounded-lg ${
                        selectedEmoji === emoji ? 'ring-2 ring-purple-500' : 'bg-gray-50'
                      }`}
                      onClick={() => setSelectedEmoji(emoji)}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {pattern.map((emoji, i) => (
                    <div 
                      key={i}
                      className="aspect-square flex items-center justify-center text-2xl bg-white border border-gray-200 rounded-lg"
                      onClick={() => {
                        if (selectedEmoji) {
                          const newPattern = [...pattern];
                          newPattern[i] = selectedEmoji;
                          setPattern(newPattern);
                        }
                      }}
                    >
                      {emoji || '?'}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetPattern}
                    className="text-xs"
                  >
                    Reset
                  </Button>
                  <span className="text-xs text-gray-500">
                    Click on a color, then click on a ? to place it
                  </span>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-blue-100">
                <h4 className="font-medium text-center mb-3">Train the AI</h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-2">Pattern A (Alternating)</p>
                    <div className="grid grid-cols-4 gap-1">
                      {['🔴', '🔵', '🔴', '🔵'].map((e, i) => (
                        <div key={i} className="aspect-square flex items-center justify-center text-xl">
                          {e}
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2 text-xs"
                      onClick={() => trainAI('A')}
                    >
                      Train as A
                    </Button>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-600 mb-2">Pattern B (Grouped)</p>
                    <div className="grid grid-cols-4 gap-1">
                      {['🔴', '🔴', '🔵', '🔵'].map((e, i) => (
                        <div key={i} className="aspect-square flex items-center justify-center text-xl">
                          {e}
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2 text-xs"
                      onClick={() => trainAI('B')}
                    >
                      Train as B
                    </Button>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                  <h4 className="font-medium text-center text-sm mb-2">Test the AI</h4>
                  <p className="text-xs text-center text-gray-700 mb-3">
                    Create a pattern and see if the AI can recognize it!
                  </p>
                  
                  {trainedPatterns.length > 0 ? (
                    <div className="space-y-2">
                      <div className="flex justify-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={testAI}
                          className="text-xs"
                        >
                          Test Pattern
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={showHint}
                          className="text-xs"
                        >
                          {showAIThinking ? 'Hide' : 'Hint'}
                        </Button>
                      </div>
                      
                      {showAIThinking && (
                        <div className="mt-2 p-2 bg-white rounded border border-gray-100 text-xs">
                          <p className="font-medium">AI is thinking...</p>
                          <p className="text-gray-600">
                            {aiThoughts[Math.min(aiThoughts.length - 1, trainedPatterns.length - 1)]}
                          </p>
                        </div>
                      )}
                      
                      {aiPrediction && (
                        <div className="mt-2 p-2 bg-green-50 rounded border border-green-100">
                          <p className="text-sm font-medium text-green-800">
                            {aiPrediction.correct 
                              ? '✅ Correct! The AI recognized the pattern!' 
                              : '❌ Not quite! The AI thought it was a different pattern.'}
                          </p>
                          <p className="text-xs text-green-700 mt-1">
                            Pattern {aiPrediction.pattern} is {aiPrediction.correct ? 'correct' : 'incorrect'}.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-center text-gray-500">
                      Train the AI with some patterns first!
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
              <h4 className="font-medium text-center text-sm mb-1">How AI Learns</h4>
              <p className="text-xs text-center text-purple-700">
                Just like you're doing now, AI learns by seeing many examples and finding patterns in the data!
              </p>
            </div>
          </div>
        </div>
      ),
      buzzyState: 'try'
    }
  ];
  
  return (
    <div ref={mainRef} className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">{slides[currentSlide].title}</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {currentSlide + 1} of {slides.length}
          </span>
        </div>
      </div>
      
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 pb-4">
            {slides[currentSlide].content}
          </div>
          
          <div className="px-6 pb-6 pt-2 flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex-1 flex justify-center">
              <div className="flex space-x-1">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentSlide ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <Button 
              onClick={handleNext}
              className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700"
            >
              {currentSlide === slides.length - 1 ? "Complete Tutorial" : "Next"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <AnimatePresence>
        {showBuzzy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6"
          >
            <div className="flex items-start gap-4">
              <BuzzyAnimation 
                state={buzzyStates[slides[currentSlide].buzzyState] || 'thinking'}
                size="md"
                className="flex-shrink-0"
              />
              <BuzzySpeechBubble
                message={buzzyMessages[slides[currentSlide].buzzyState] || buzzyMessages.default}
                state={buzzyStates[slides[currentSlide].buzzyState] || 'thinking'}
                onClose={() => setShowBuzzy(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
