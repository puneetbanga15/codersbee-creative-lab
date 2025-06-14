
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Book, Play, Code } from 'lucide-react';

interface LessonTabsNavigationProps {
  // activeTab and onTabChange are managed by the parent Tabs component
}

export const LessonTabsNavigation: React.FC<LessonTabsNavigationProps> = () => {
  return (
    <TabsList className="grid w-full grid-cols-4">
      <TabsTrigger value="introduction" className="flex items-center gap-2">
        <Info className="h-4 w-4" />
        <span>Introduction</span>
      </TabsTrigger>
      <TabsTrigger value="tutorial" className="flex items-center gap-2">
        <Book className="h-4 w-4" />
        <span>Tutorial</span>
      </TabsTrigger>
      <TabsTrigger value="activity" className="flex items-center gap-2">
        <Play className="h-4 w-4" />
        <span>Activity</span>
      </TabsTrigger>
      <TabsTrigger value="code" className="flex items-center gap-2">
        <Code className="h-4 w-4" />
        <span>Code</span>
      </TabsTrigger>
    </TabsList>
  );
};
