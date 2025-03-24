
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Rocket } from 'lucide-react';

export const ProjectsHeader = () => {
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-[#f0e7ff]">
          <Rocket className="h-6 w-6 text-[#9b87f5]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">AI Projects Gallery</h2>
        <Badge variant="outline" className="bg-purple-100 text-purple-800">
          Build & Learn
        </Badge>
      </div>
      
      <p className="text-gray-600 mb-6">
        Put your AI knowledge to work by creating these fun projects! Each project uses concepts from specific lessons. 
        Complete the related lessons first to build the skills you need.
      </p>
    </>
  );
};
