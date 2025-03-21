
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Bot, Zap, Trophy, BookOpen, Sparkles, Star, Diamond } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AILabHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-[#9b87f5]">AI Lab</h1>
            <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
              Beta
            </Badge>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Explore the exciting world of Artificial Intelligence through hands-on activities! 
            Complete lessons, earn badges, and learn how AI works by building your own projects.
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-2 mt-4 md:mt-0 bg-gradient-to-r from-purple-50 to-amber-50 p-3 rounded-lg border border-[#9b87f5]/20">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500" />
            <span className="font-medium text-gray-700">AI Explorer</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">Level 2</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            <span className="text-gray-700">Badges:</span>
            <div className="flex">
              <div className="relative">
                <Diamond className="h-5 w-5 text-purple-500" />
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">1</span>
              </div>
              <div className="relative">
                <Sparkles className="h-5 w-5 text-gray-400 ml-1" />
                <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#9b87f5] h-2 rounded-full" style={{ width: '20%' }}></div>
            <p className="text-xs text-gray-600 text-right mt-1">5/25 points to Level 3</p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="lessons" className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-3 mb-2">
          <TabsTrigger value="lessons" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Lessons</span>
          </TabsTrigger>
          <TabsTrigger value="playground" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span>Playground</span>
          </TabsTrigger>
          <TabsTrigger value="gallery" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span>Gallery</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
