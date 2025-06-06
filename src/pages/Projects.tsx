import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { StudentAICreations } from "@/components/StudentAICreations";

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

const projectTypeColors = {
  scratch: "bg-orange-500",
  python: "bg-blue-500",
  web: "bg-purple-500",
  ai: "bg-emerald-500",
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
        const type = selectedType.toLowerCase();
        query = query.eq('project_type', type);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Query error:', error);
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
      <StudentAICreations />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-codersbee-dark">
            Student <span className="text-codersbee-vivid">Projects</span>
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Explore the diverse range of projects created by our talented students. 
            From beginner to advanced levels, each project showcases the skills and creativity developed through our programs.
          </p>
          <p className="text-lg text-gray-700">
            Filter by project type to see specific examples of what our students are building.
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
                  <div className="flex justify-between items-start gap-2 flex-wrap mb-2">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <Badge className={difficultyColors[project.difficulty_level as keyof typeof difficultyColors]}>
                      {project.difficulty_level}
                    </Badge>
                  </div>
                  <Badge 
                    className={`mb-2 ${projectTypeColors[project.project_type as keyof typeof projectTypeColors] || "bg-gray-500"}`}
                  >
                    {project.project_type ? project.project_type.toUpperCase() : 'Unknown'}
                  </Badge>
                  <CardDescription className="text-base">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    {new Date(project.created_at).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Projects;
