import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Project = {
  id: string;
  title: string;
  description: string;
  difficulty_level: string;
  project_url: string | null;
  project_type: string;
  session_number: number;
  created_at: string;
};

type ProjectType = 'Scratch' | 'Python' | 'Web' | 'AI' | null;

const difficultyColors = {
  Beginner: "bg-green-500",
  Intermediate: "bg-yellow-500",
  Advanced: "bg-red-500",
};

const Projects = () => {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<ProjectType>(null);

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects', selectedType],
    queryFn: async () => {
      let query = supabase
        .from('student_projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (selectedType) {
        // Exact match with case-insensitive comparison
        query = query.ilike('project_type', selectedType);
      }
      
      const { data, error } = await query;
      if (error) {
        toast({
          title: "Error",
          description: "Failed to load projects. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
      
      return data as Project[];
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-codersbee-dark">
            Student <span className="text-codersbee-vivid">Projects</span>
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            These are real projects completed by CodersBee students during their learning journey. 
            We believe in hands-on learning and practical application of concepts.
          </p>
          <p className="text-lg text-gray-700">
            Each project represents actual work done in our classes, 
            demonstrating our commitment to practical, output-driven learning.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => setSelectedType(null)}
            className={!selectedType ? "bg-codersbee-vivid text-white" : ""}
          >
            All Projects
          </Button>
          {['Scratch', 'Python', 'Web', 'AI'].map((type) => (
            <Button
              key={type}
              variant="outline"
              onClick={() => setSelectedType(type as ProjectType)}
              className={selectedType === type ? "bg-codersbee-vivid text-white" : ""}
            >
              {type}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center">Loading projects...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start gap-2 flex-wrap">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <Badge className={difficultyColors[project.difficulty_level as keyof typeof difficultyColors]}>
                      {project.difficulty_level}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* View Project button removed as requested */}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;