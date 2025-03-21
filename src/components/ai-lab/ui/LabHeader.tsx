
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Robot, Zap, Trophy, BookOpen } from 'lucide-react';
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
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span>12 Badges</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
            <Zap className="h-4 w-4 text-blue-500" />
            <span>Level 2</span>
          </Badge>
        </div>
      </div>
      
      <Tabs defaultValue="lessons" className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-3 mb-2">
          <TabsTrigger value="lessons" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Lessons</span>
          </TabsTrigger>
          <TabsTrigger value="playground" className="flex items-center gap-2">
            <Robot className="h-4 w-4" />
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
