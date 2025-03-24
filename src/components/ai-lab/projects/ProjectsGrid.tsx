
import React from 'react';
import { ProjectsHeader } from './ProjectsHeader';
import { ProjectCard } from './ProjectCard';
import { projects } from './projectsData';

export const ProjectsGrid = () => {
  return (
    <div className="mt-12 mb-8">
      <ProjectsHeader />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
