import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { Quiz } from "@/components/Quiz";
import { QuizCard } from "@/components/quiz/QuizCard";
import { AccessCodeDialog } from "@/components/quiz/AccessCodeDialog";
import { QuizTypeFilter } from "@/components/quiz/QuizTypeFilter";
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
  const [accessCode, setAccessCode] = useState("");
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const { toast } = useToast();

  // First, get the authenticated user and their role
  const { data: userRole, isLoading: isLoadingRole } = useQuery({
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

  // Then fetch quizzes, including premium ones if user has access
  const { data: quizzes, isLoading: isLoadingQuizzes } = useQuery({
    queryKey: ['quizzes', selectedType, userRole],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      let query = supabase
        .from('quizzes')
        .select('*');
      
      if (selectedType) {
        query = query.eq('quiz_type', selectedType);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching quizzes:', error);
        throw error;
      }
      
      console.log('Fetched quizzes:', data);
      return data as Quiz[];
    },
    enabled: !isLoadingRole, // Only fetch quizzes after we know the user's role
  });

  const verifyAccessCode = useMutation({
    mutationFn: async ({ quizId, code }: { quizId: string; code: string }) => {
      const { data, error } = await supabase
        .from('quiz_access_codes')
        .select('*')
        .eq('quiz_id', quizId)
        .eq('access_code', code)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Access Granted",
        description: "You can now start the quiz!",
      });
      setActiveQuiz(selectedQuizId);
      setSelectedQuizId(null);
      setAccessCode("");
      setVerificationError(null);
    },
    onError: () => {
      setVerificationError("Invalid access code. Please try again.");
    },
  });

  const handleAccessCodeSubmit = () => {
    if (!selectedQuizId) return;
    verifyAccessCode.mutate({ 
      quizId: selectedQuizId, 
      code: accessCode 
    });
  };

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

  const isLoading = isLoadingRole || isLoadingQuizzes;

  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-codersbee-dark">
          Learning <span className="text-codersbee-vivid">Quizzes</span>
        </h1>

        <QuizTypeFilter 
          selectedType={selectedType}
          onTypeSelect={setSelectedType}
        />

        {isLoading ? (
          <div className="text-center">Loading quizzes...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes?.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                canAccessPremiumQuiz={canAccessPremiumQuiz}
                onStartQuiz={setActiveQuiz}
                onRequestAccess={setSelectedQuizId}
              />
            ))}
          </div>
        )}

        <AccessCodeDialog
          isOpen={!!selectedQuizId}
          onClose={() => {
            setSelectedQuizId(null);
            setAccessCode("");
            setVerificationError(null);
          }}
          accessCode={accessCode}
          onAccessCodeChange={setAccessCode}
          onSubmit={handleAccessCodeSubmit}
          error={verificationError}
          isLoading={verifyAccessCode.isPending}
        />
      </div>
    </div>
  );
};

export default Quizzes;