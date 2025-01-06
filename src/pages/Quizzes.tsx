import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Lock, LockOpen } from "lucide-react";
import { Quiz } from "@/components/Quiz";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

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
  const [accessCode, setAccessCode] = useState("");
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: userRole } = useQuery({
    queryKey: ['user-role'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      return profile?.role;
    },
  });

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

  const handleAccessCodeSubmit = async () => {
    const { data, error } = await supabase
      .from('quiz_access_codes')
      .select('*')
      .eq('quiz_id', selectedQuizId)
      .eq('access_code', accessCode)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      toast({
        title: "Invalid Access Code",
        description: "Please check your access code and try again.",
        variant: "destructive",
      });
      return;
    }

    setActiveQuiz(selectedQuizId);
    setSelectedQuizId(null);
    setAccessCode("");
  };

  const quizTypes = [
    { value: 'scratch', label: 'Scratch' },
    { value: 'python', label: 'Python' },
    { value: 'ai', label: 'AI' },
  ];

  const canAccessPremiumQuiz = userRole === 'teacher' || userRole === 'parent' || userRole === 'admin';

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
              <Card key={quiz.id} className="relative">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2">
                      {quiz.title}
                      {quiz.is_premium && (
                        quiz.is_premium && !canAccessPremiumQuiz ? (
                          <Lock className="h-5 w-5 text-red-500" />
                        ) : (
                          <LockOpen className="h-5 w-5 text-green-500" />
                        )
                      )}
                    </CardTitle>
                    {quiz.is_premium && (
                      <Badge className="bg-yellow-500">Premium</Badge>
                    )}
                  </div>
                  <CardDescription>{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      if (quiz.is_premium && !canAccessPremiumQuiz) {
                        setSelectedQuizId(quiz.id);
                      } else {
                        setActiveQuiz(quiz.id);
                      }
                    }}
                  >
                    {quiz.is_premium && !canAccessPremiumQuiz ? "Enter Access Code" : "Start Quiz"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={!!selectedQuizId} onOpenChange={() => setSelectedQuizId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter Access Code</DialogTitle>
              <DialogDescription>
                This is a premium quiz. Please enter your access code to continue.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Access Code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
              />
              <Button className="w-full" onClick={handleAccessCodeSubmit}>
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Quizzes;