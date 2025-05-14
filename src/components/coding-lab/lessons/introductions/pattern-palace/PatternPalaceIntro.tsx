
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Calculator, Moon, Sun } from 'lucide-react';
import { BuzzyLearningCard } from '@/components/ai-lab/ui/BuzzyLearningCard';
import { CollapsibleSection } from '@/components/ai-lab/ui/CollapsibleSection';

export const PatternPalaceIntro: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200"
      >
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-lg">
            <Star className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-2">Welcome to Pattern Palace!</h2>
            <p className="text-gray-700 mb-4">
              Join Aryabhatta, the brilliant mathematician from ancient India, on an adventure 
              through the stars where you'll discover the magic of patterns and the power of zero!
            </p>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
              <h3 className="font-semibold text-blue-700 mb-2">In this lesson, you will:</h3>
              <ul className="space-y-2 pl-5 list-disc text-gray-700">
                <li>Discover how to find patterns in numbers and objects</li>
                <li>Learn to predict what comes next in a sequence</li>
                <li>Understand how zero works as a placeholder</li>
                <li>Use patterns to solve celestial puzzles</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Who was Aryabhatta */}
      <CollapsibleSection
        title="Who was Aryabhatta?"
        defaultOpen={true}
        icon={<Star className="w-5 h-5" />}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <p className="text-gray-700 mb-3">
              Aryabhatta was one of history's greatest mathematicians and astronomers, 
              born in India around 476 CE. He made incredible discoveries about our universe 
              at a time when most people thought Earth was the center of everything!
            </p>
            <p className="text-gray-700 mb-3">
              His most famous work is called the "Aryabhatiya," a book that explained complex 
              mathematical ideas in beautiful poetry. Imagine explaining algebra in rhymes!
            </p>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-3">
              <h4 className="font-semibold text-amber-800 mb-2">Aryabhatta's Amazing Discoveries:</h4>
              <ul className="space-y-2 pl-5 list-disc text-gray-700">
                <li><span className="font-medium">The concept of zero</span> - He was among the first to treat zero as both a placeholder and a number</li>
                <li><span className="font-medium">The value of π (pi)</span> - He calculated it as 3.1416, amazingly accurate for his time</li>
                <li><span className="font-medium">Earth's rotation</span> - He figured out that Earth rotates on its axis, causing day and night</li>
                <li><span className="font-medium">Solar and lunar eclipses</span> - He correctly explained how they happen</li>
              </ul>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-1 rounded-full">
              <div className="bg-white rounded-full p-3">
                <div className="space-y-4 flex flex-col items-center">
                  <div className="bg-indigo-100 w-32 h-32 rounded-full flex items-center justify-center">
                    <div className="relative">
                      <Moon className="w-12 h-12 text-indigo-800 absolute" style={{transform: "rotate(-30deg) translate(-15px, -5px)"}} />
                      <Sun className="w-16 h-16 text-amber-500" />
                      <Calculator className="w-10 h-10 text-green-600 absolute" style={{transform: "rotate(30deg) translate(20px, 15px)"}} />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-white">Aryabhatta</div>
                    <div className="text-xs text-indigo-100">476-550 CE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
      
      {/* Learning cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <BuzzyLearningCard
          title="What are Patterns?"
          description="Patterns are designs or sequences that repeat in a predictable way. They're everywhere - in nature, music, art, and especially in mathematics!"
          concept="Recognizing patterns helps us understand how things work and predict what might happen next. It's one of the key skills in computational thinking."
          example="Look at this sequence: 2, 4, 6, 8, ... Can you guess what comes next? If you said 10, you spotted the pattern! Each number is 2 more than the previous one."
          buzzyState="teaching"
        />
        
        <BuzzyLearningCard
          title="The Magic of Zero"
          description="Before Aryabhatta's time, people struggled with calculations because they didn't have a symbol for 'nothing'. Imagine trying to write 507 without the zero!"
          concept="Zero as a placeholder gives numbers their correct value. In 507, the zero holds the 'tens' place, showing there are 5 hundreds, 0 tens, and 7 ones."
          example="Without zero, 507 might look like 57, which is a completely different number! Zero helps us keep track of place values."
          buzzyState="excited"
        />
      </div>
      
      {/* Fun fact */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200"
      >
        <h3 className="flex items-center gap-2 font-semibold text-purple-800 mb-3">
          <Star className="h-5 w-5 text-purple-600" /> Fun Fact
        </h3>
        <p className="text-gray-700">
          The word "zero" comes from the Sanskrit word "śūnya" which Aryabhatta used. 
          It traveled through Arabic ("sifr") to Italian ("zefiro") and finally to English as "zero"!
        </p>
      </motion.div>
      
      {/* Ready to start */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 mt-8"
      >
        <h3 className="text-xl font-semibold text-blue-800 mb-2">Ready to Explore?</h3>
        <p className="text-gray-700">
          Click the "Tutorial" tab above to learn more about patterns and sequences, 
          or jump right into the "Activity" tab to start your journey through Aryabhatta's Pattern Palace!
        </p>
      </motion.div>
    </div>
  );
};

export default PatternPalaceIntro;
