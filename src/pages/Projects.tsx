import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type Project = {
  id: string;
  title: string;
  description: string;
  difficulty_level: string;
  session_number: number;
  project_url: string | null;
};

const difficultyColors = {
  Beginner: "bg-green-500",
  Intermediate: "bg-yellow-500",
  Advanced: "bg-red-500",
};

const Projects = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects', selectedDifficulty],
    queryFn: async () => {
      let query = supabase
        .from('student_projects')
        .select('*')
        .order('session_number');
      
      if (selectedDifficulty) {
        query = query.eq('difficulty_level', selectedDifficulty);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Project[];
    },
  });

  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-codersbee-dark">
          Student <span className="text-codersbee-vivid">Projects</span>
        </h1>

        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => setSelectedDifficulty(null)}
            className={!selectedDifficulty ? "bg-codersbee-vivid text-white" : ""}
          >
            All
          </Button>
          {difficulties.map((difficulty) => (
            <Button
              key={difficulty}
              variant="outline"
              onClick={() => setSelectedDifficulty(difficulty)}
              className={selectedDifficulty === difficulty ? "bg-codersbee-vivid text-white" : ""}
            >
              {difficulty}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center">Loading projects...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{project.title}</CardTitle>
                    <Badge className={difficultyColors[project.difficulty_level as keyof typeof difficultyColors]}>
                      {project.difficulty_level}
                    </Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">Session {project.session_number}</Badge>
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