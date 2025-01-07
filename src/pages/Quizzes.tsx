import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { AccessCodeDialog } from "@/components/quiz/AccessCodeDialog";
import { supabase } from "@/integrations/supabase/client";
import { QuizContainer } from "@/components/quiz/QuizContainer";
import { QuizLayout } from "@/components/quiz/QuizLayout";

type FilterType = 'scratch' | 'python' | 'ai' | 'web' | 'cloud' | 'free' | 'premium' | null;

const Quizzes = () => {
  const [selectedType, setSelectedType] = useState<FilterType>(null);
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [accessCode, setAccessCode] = useState("");
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const { toast } = useToast();

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

  const verifyAccessCode = async (quizId: string, code: string) => {
    if (!code.trim()) {
      setVerificationError("Please enter an access code");
      return false;
    }

    const { data, error } = await supabase
      .from('quiz_access_codes')
      .select('*')
      .eq('quiz_id', quizId)
      .eq('access_code', code.trim())
      .eq('is_active', true)
      .single();

    if (error || !data) {
      console.error('Access code verification error:', error);
      setVerificationError("Invalid or expired access code. Please try again.");
      return false;
    }

    return true;
  };

  const handleQuizAccess = (quizId: string) => {
    setSelectedQuizId(quizId);
    setVerificationError(null);
    setAccessCode("");
  };

  const handleAccessCodeSubmit = async () => {
    if (!selectedQuizId) return;

    const isValid = await verifyAccessCode(selectedQuizId, accessCode);
    if (isValid) {
      setActiveQuiz(selectedQuizId);
      setSelectedQuizId(null);
      setAccessCode("");
      setVerificationError(null);
      toast({
        title: "Access granted",
        description: "You can now start the quiz",
      });
    }
  };

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
        userRole={null}
        selectedType={selectedType}
        onTypeSelect={setSelectedType}
        quizzes={quizzes || []}
        canAccessPremiumQuiz={false}
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
        isLoading={false}
      />
    </>
  );
};

export default Quizzes;