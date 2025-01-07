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
  project_url: string | null;
  project_type: string;
  session_number: number;
};

type ProjectType = 'Scratch' | 'Python' | 'Web' | 'AI' | null;

const difficultyColors = {
  Beginner: "bg-green-500",
  Intermediate: "bg-yellow-500",
  Advanced: "bg-red-500",
};

const Projects = () => {
  const [selectedType, setSelectedType] = useState<ProjectType>(null);

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects', selectedType],
    queryFn: async () => {
      let query = supabase
        .from('student_projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (selectedType) {
        query = query.eq('project_type', selectedType.toLowerCase());
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      // Add new AI projects if they don't exist
      if (!data.some(p => p.title.includes('Chat with PDF'))) {
        const newProjects = [
          {
            title: "Chat with PDF using LangChain",
            description: "Build an AI-powered PDF chat application using LangChain and OpenAI. Learn about document processing, embeddings, and vector stores.",
            difficulty_level: "Intermediate",
            project_type: "ai",
            project_url: "https://github.com/example/pdf-chat",
            session_number: 1
          },
          {
            title: "AI Agents with Crew AI",
            description: "Create autonomous AI agents that can collaborate and solve complex tasks using Crew AI framework.",
            difficulty_level: "Advanced",
            project_type: "ai",
            project_url: "https://github.com/example/crew-ai-agents",
            session_number: 2
          },
          {
            title: "Fine-tuning Open Source LLMs",
            description: "Learn how to fine-tune open source language models like Llama 2 for specific tasks and domains.",
            difficulty_level: "Advanced",
            project_type: "ai",
            project_url: "https://github.com/example/llm-finetuning",
            session_number: 3
          },
          {
            title: "HuggingChat Models Integration",
            description: "Integrate various HuggingFace models into your applications for tasks like text generation, classification, and more.",
            difficulty_level: "Intermediate",
            project_type: "ai",
            project_url: "https://github.com/example/huggingchat-integration",
            session_number: 4
          }
        ];

        const { error: insertError } = await supabase
          .from('student_projects')
          .insert(newProjects);

        if (insertError) throw insertError;
        
        data.push(...newProjects);
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
                  {project.project_url && (
                    <Button variant="outline" className="w-full" onClick={() => window.open(project.project_url, '_blank')}>
                      View Project
                    </Button>
                  )}
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