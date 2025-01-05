import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/Quiz";
import { supabase } from "@/integrations/supabase/client";

type Quiz = {
  id: string;
  title: string;
  description: string;
  quiz_type: 'scratch' | 'python' | 'ai';
  is_premium: boolean;
};

const Quizzes = () => {
  const [selectedType, setSelectedType] = useState<'scratch' | 'python' | 'ai' | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);

  const { data: quizzes, isLoading } = useQuery({
    queryKey: ['quizzes', selectedType],
    queryFn: async () => {
      let query = supabase.from('quizzes').select('*');
      if (selectedType) {
        query = query.eq('quiz_type', selectedType);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data as Quiz[];
    },
  });

  const quizTypes = [
    { value: 'scratch', label: 'Scratch' },
    { value: 'python', label: 'Python' },
    { value: 'ai', label: 'AI' },
  ];

  if (activeQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <Quiz quizId={activeQuiz} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-codersbee-dark">
          Learning <span className="text-codersbee-vivid">Quizzes</span>
        </h1>

        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => setSelectedType(null)}
            className={!selectedType ? "bg-codersbee-vivid text-white" : ""}
          >
            All
          </Button>
          {quizTypes.map((type) => (
            <Button
              key={type.value}
              variant="outline"
              onClick={() => setSelectedType(type.value as any)}
              className={selectedType === type.value ? "bg-codersbee-vivid text-white" : ""}
            >
              {type.label}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center">Loading quizzes...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes?.map((quiz) => (
              <Card key={quiz.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{quiz.title}</CardTitle>
                    {quiz.is_premium && (
                      <Badge className="bg-yellow-500">Premium</Badge>
                    )}
                  </div>
                  <CardDescription>{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full"
                    onClick={() => setActiveQuiz(quiz.id)}
                  >
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizzes;