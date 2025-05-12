import React from 'react';
import { motion } from 'framer-motion';
import { Star, Calculator, Lightbulb, Brain, MoveHorizontal } from 'lucide-react';

export const PatternPalaceIntro = () => {
  return (
    <div className="space-y-8">
      {/* Hero section with Aryabhatta intro */}
      <motion.div 
        className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image placeholder - will be added later */}
          <div className="flex-shrink-0 w-full md:w-48 h-48 bg-amber-100 rounded-lg flex items-center justify-center border-2 border-dashed border-amber-300">
            <Star className="w-12 h-12 text-amber-400" />
            <span className="text-amber-700 font-medium">Aryabhatta's image will go here</span>
          </div>
          
          {/* Introduction text */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-amber-800">Meet Aryabhatta - The Star Gazing Math Wizard!</h2>
            <p className="text-lg">
              Over 1,500 years ago in ancient India, a boy named Aryabhatta gazed at the stars and wondered 
              about their patterns and movements. He grew up to become one of the world's greatest 
              mathematicians and astronomers!
            </p>
            <p className="bg-white p-3 rounded-lg border border-amber-200 text-amber-700 italic">
              "Aryabhatta is like the ancient Indian version of a NASA scientist and a math superhero combined into one!"
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* Fun facts about Aryabhatta */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-white p-4 rounded-lg border border-blue-200 flex items-start gap-3">
          <div className="mt-1 bg-blue-100 p-2 rounded-full">
            <Star className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-800">Star Explorer</h3>
            <p className="text-gray-600">Aryabhatta studied the stars and planets carefully and figured out that the Earth rotates on its axis! He calculated the length of a day very accurately.</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-purple-200 flex items-start gap-3">
          <div className="mt-1 bg-purple-100 p-2 rounded-full">
            <Calculator className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-purple-800">Zero Hero</h3>
            <p className="text-gray-600">Imagine a world without zero! Aryabhatta worked with the concept of zero and helped develop the place value system we use for numbers today.</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-green-200 flex items-start gap-3">
          <div className="mt-1 bg-green-100 p-2 rounded-full">
            <Brain className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-green-800">Pattern Master</h3>
            <p className="text-gray-600">Aryabhatta could recognize patterns in numbers and stars, helping him make incredible discoveries about our universe and mathematics.</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-orange-200 flex items-start gap-3">
          <div className="mt-1 bg-orange-100 p-2 rounded-full">
            <MoveHorizontal className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="font-semibold text-orange-800">Math Magician</h3>
            <p className="text-gray-600">He calculated the value of π (pi) to be 3.1416, which is super close to the actual value! He did this without modern calculators or computers.</p>
          </div>
        </div>
      </motion.div>
      
      {/* What we'll learn */}
      <motion.div 
        className="bg-white p-6 rounded-xl border border-blue-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5" />
          What We'll Learn in this Lesson
        </h2>
        
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <div className="bg-blue-100 w-7 h-7 rounded-full flex items-center justify-center text-blue-600 font-semibold">1</div>
            <span>How to recognize and create <span className="font-semibold">number patterns</span> just like Aryabhatta did</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="bg-blue-100 w-7 h-7 rounded-full flex items-center justify-center text-blue-600 font-semibold">2</div>
            <span>The importance of <span className="font-semibold">zero</span> and how it works in our number system</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="bg-blue-100 w-7 h-7 rounded-full flex items-center justify-center text-blue-600 font-semibold">3</div>
            <span>How to predict what comes next in a <span className="font-semibold">sequence</span></span>
          </li>
          <li className="flex items-center gap-3">
            <div className="bg-blue-100 w-7 h-7 rounded-full flex items-center justify-center text-blue-600 font-semibold">4</div>
            <span>Creating our own <span className="font-semibold">celestial calculator</span> to work with patterns</span>
          </li>
        </ul>
      </motion.div>
      
      {/* Ready to start */}
      <motion.div 
        className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-xl text-white text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-2">Ready for a Stellar Adventure?</h2>
        <p className="text-lg mb-0">Let's travel back in time to ancient India and explore the world of patterns and numbers with Aryabhatta!</p>
      </motion.div>
    </div>
  );
};