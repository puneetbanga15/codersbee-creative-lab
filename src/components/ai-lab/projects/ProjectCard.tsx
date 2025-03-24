import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Project } from './types';
import { getProjectIcon, getDifficultyColor } from './projectUtils';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const IconComponent = getProjectIcon(project.icon);
  
  return (
    <Card 
      key={project.id}
      className="overflow-hidden hover:shadow-md transition-all cursor-pointer hover:-translate-y-1 border-t-4 border-t-[#9b87f5]"
    >
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-[#f0e7ff]">
            <IconComponent className="h-10 w-10 text-[#9b87f5]" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <Badge className={`${getDifficultyColor(project.difficulty)}`}>
                {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {project.category}
              </Badge>
            </div>
            
            <h3 className="font-semibold text-lg text-gray-800 mb-2">{project.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{project.description}</p>
            
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-500 mb-1">Related Lessons:</p>
              <div className="flex flex-wrap gap-1">
                {project.relatedLessons.map((lessonNumber) => (
                  <Avatar key={lessonNumber} className="h-6 w-6">
                    <AvatarFallback className="bg-[#9b87f5]/20 text-xs text-[#9b87f5]">
                      {lessonNumber}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
