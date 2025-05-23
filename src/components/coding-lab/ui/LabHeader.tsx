import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Bot, Zap, Trophy, BookOpen, Sparkles, Star, Diamond, Home, Code, Binary, Puzzle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

type CodingLabHeaderProps = {
  activeTab?: string;
  onTabChange?: (value: string) => void;
  onHomeClick?: () => void;
};

export const CodingLabHeader = ({ activeTab = "lessons", onTabChange, onHomeClick }: CodingLabHeaderProps) => {
  const handleValueChange = (value: string) => {
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {onHomeClick && (
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 text-green-700 hover:text-green-900 hover:bg-green-50 -ml-3"
                  onClick={onHomeClick}
                >
                  <Home className="h-4 w-4" />
                  <span>Back to Lab</span>
                </Button>
              </motion.div>
            )}
            <h1 className="text-3xl font-bold text-[#23c55e]">Coding Lab</h1>
            <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
              Beta
            </Badge>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Learn to code through interactive games and puzzles! Explore computational thinking with 
            our guided activities inspired by great mathematicians and computer scientists from around the world.
          </p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-end gap-2 mt-4 md:mt-0 bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border border-[#23c55e]/20"
        >
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-green-500" />
            <span className="font-medium text-gray-700">Code Explorer</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">Level 1</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            <span className="text-gray-700">Badges:</span>
            <div className="flex">
              <div className="relative">
                <Diamond className="h-5 w-5 text-gray-400" />
                <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
              </div>
              <div className="relative">
                <Sparkles className="h-5 w-5 text-gray-400 ml-1" />
                <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
              </div>
            </div>
          </div>
          <div className="w-full mt-1">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-[#23c55e] h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <p className="text-xs text-gray-600 text-right mt-1">0/25 points to Level 2</p>
          </div>
        </motion.div>
      </div>
      
      {onTabChange && (
        <Tabs value={activeTab} onValueChange={handleValueChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="lessons" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Lessons</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Puzzle className="h-4 w-4" />
              <span className="hidden sm:inline">Challenges</span>
            </TabsTrigger>
            <TabsTrigger value="playground" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">Playground</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Badges</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}
    </div>
  );
};