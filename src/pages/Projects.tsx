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
  const projectTypes = ["Scratch", "Python", "Web", "AI"];

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
            Each project represents actual work done in our class sessions, 
            demonstrating our commitment to practical, output-driven learning.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
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
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start gap-2 flex-wrap">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={difficultyColors[project.difficulty_level as keyof typeof difficultyColors]}>
                        {project.difficulty_level}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-base">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Session {project.session_number}</Badge>
                  </div>
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