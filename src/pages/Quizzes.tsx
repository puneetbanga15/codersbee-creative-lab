import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { AccessCodeDialog } from "@/components/quiz/AccessCodeDialog";
import { ManageAccessCodeDialog } from "@/components/quiz/ManageAccessCodeDialog";
import { supabase } from "@/integrations/supabase/client";
import { QuizContainer } from "@/components/quiz/QuizContainer";
import { QuizLayout } from "@/components/quiz/QuizLayout";

type FilterType = 'scratch' | 'python' | 'ai' | 'web' | 'cloud' | 'free' | 'premium' | null;

const Quizzes = () => {
  const [selectedType, setSelectedType] = useState<FilterType>(null);
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [accessCode, setAccessCode] = useState("");
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isManageAccessCodeOpen, setIsManageAccessCodeOpen] = useState(false);
  const { toast } = useToast();

  const { data: userRole } = useQuery({
    queryKey: ['user-role'],
    queryFn: async () => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) return null;
      
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();
      
      if (profileError) throw profileError;
      return profile?.role;
    },
  });

  // Updated quiz query to handle new filter types
  const { data: quizzes, isLoading: isLoadingQuizzes } = useQuery({
    queryKey: ['quizzes', selectedType],
    queryFn: async () => {
      let query = supabase.from('quizzes').select('*');
      
      if (selectedType === 'free') {
        query = query.eq('is_premium', false);
      } else if (selectedType === 'premium') {
        query = query.eq('is_premium', true);
      } else if (selectedType) {
        query = query.eq('quiz_type', selectedType);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const verifyAccessCode = useMutation({
    mutationFn: async ({ quizId, code }: { quizId: string; code: string }) => {
      const { data, error } = await supabase
        .from('quiz_access_codes')
        .select('*')
        .eq('quiz_id', quizId)
        .eq('access_code', code)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error('Invalid access code');
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Access Granted",
        description: "You can now start the quiz!",
      });
      if (selectedQuizId) {
        setActiveQuiz(selectedQuizId);
      }
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

  const handleQuizAccess = (quizId: string) => {
    setSelectedQuizId(quizId);
  };

  const canAccessPremiumQuiz = userRole === 'teacher' || userRole === 'parent' || userRole === 'admin';

  if (activeQuiz) {
    return (
      <QuizContainer 
        quizId={activeQuiz} 
        onBack={() => setActiveQuiz(null)} 
      />
    );
  }

  return (
    <>
      <Navbar />
      <QuizLayout
        userRole={userRole}
        selectedType={selectedType}
        onTypeSelect={setSelectedType}
        quizzes={quizzes || []}
        canAccessPremiumQuiz={canAccessPremiumQuiz}
        onStartQuiz={setActiveQuiz}
        onRequestAccess={handleQuizAccess}
        isLoadingQuizzes={isLoadingQuizzes}
      />

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

      {userRole === 'admin' && (
        <ManageAccessCodeDialog
          isOpen={isManageAccessCodeOpen}
          onClose={() => setIsManageAccessCodeOpen(false)}
          newAccessCode=""
          onAccessCodeChange={() => {}}
          onUpdateAccessCode={() => {}}
          isUpdating={false}
        />
      )}
    </>
  );
};

export default Quizzes;
