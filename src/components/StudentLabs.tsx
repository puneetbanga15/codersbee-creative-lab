import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Code, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const StudentLabs = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-codersbee-dark mb-4">
            Interactive Student Labs
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Explore our specialized learning environments designed to make complex technologies accessible and fun for students of all ages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* AI Lab Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#9b87f5]/20"
          >
            <div className="h-3 bg-[#9b87f5]"></div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#9b87f5]/10 rounded-full">
                  <Brain className="w-6 h-6 text-[#9b87f5]" />
                </div>
                <h3 className="text-xl font-bold text-[#9b87f5]">AI Lab</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Journey from a Discoverer to a Creator! Learn AI fundamentals through interactive lessons, guided activities, and hands-on projects that bring concepts to life.
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#9b87f5] font-medium">•</span>
                  <span>Start as a Discoverer, finish as a Creator</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9b87f5] font-medium">•</span>
                  <span>Experiment with real generative AI</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9b87f5] font-medium">•</span>
                  <span>Build your own unique AI projects</span>
                </li>
              </ul>
              
              <Link to="/ai-lab">
                <Button className="w-full bg-[#9b87f5] hover:bg-[#8A76E5] text-white">
                  <span>Explore AI Lab</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Coding Lab Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#23c55e]/20"
          >
            <div className="h-3 bg-[#23c55e]"></div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#23c55e]/10 rounded-full">
                  <Code className="w-6 h-6 text-[#23c55e]" />
                </div>
                <h3 className="text-xl font-bold text-[#23c55e]">Coding Lab</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Go from Apprentice to Master! Master coding concepts through gamified lessons inspired by mathematical pioneers, with engaging puzzles and creative challenges.
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#23c55e] font-medium">•</span>
                  <span>Learn with stories of math pioneers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#23c55e] font-medium">•</span>
                  <span>Solve fun puzzles and build games</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#23c55e] font-medium">•</span>
                  <span>Become a creative Coding Master</span>
                </li>
              </ul>
              
              <Link to="/coding-lab">
                <Button className="w-full bg-[#23c55e] hover:bg-[#20AE54] text-white">
                  <span>Explore Coding Lab</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
