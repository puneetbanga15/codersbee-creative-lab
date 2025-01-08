import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const { data: quizzes, isLoading: isLoadingQuizzes } = useQuery({
    queryKey: ['quizzes'],
    queryFn: async () => {
      console.log('Fetching quizzes and access codes...');
      const { data, error } = await supabase
        .from('quizzes')
        .select(`
          *,
          quiz_access_codes (
            access_code,
            is_active,
            created_at
          )
        `);

      if (error) throw error;
      console.log('Fetched quizzes:', data);
      return data;
    },
  });

  const verifyAccessCode = async (quizId: string, code: string) => {
    console.log('=== Starting Access Code Verification ===');
    console.log('Quiz ID:', quizId);
    console.log('Access Code Entered:', code);
    
    if (!code.trim()) {
      setVerificationError("Please enter an access code");
      return false;
    }

    try {
      // Step 1: First check if the quiz exists and is premium
      console.log('Step 1: Verifying quiz');
      const { data: quiz, error: quizError } = await supabase
        .from('quizzes')
        .select('*')
        .eq('id', quizId)
        .single();

      if (quizError) {
        console.error('Error fetching quiz:', quizError);
        throw quizError;
      }

      if (!quiz.is_premium) {
        console.log('Quiz is not premium, no access code needed');
        return true;
      }

      // Step 2: Get ALL access codes for debugging
      console.log('Step 2: Checking all access codes in the system');
      const { data: allAccessCodes, error: allCodesError } = await supabase
        .from('quiz_access_codes')
        .select('*');

      if (allCodesError) {
        console.error('Error checking all codes:', allCodesError);
        throw allCodesError;
      }
      console.log('Total access codes in system:', allAccessCodes?.length);

      // Step 3: Get access codes for this specific quiz
      console.log('Step 3: Getting access codes for quiz:', quizId);
      const { data: quizCodes, error: quizCodesError } = await supabase
        .from('quiz_access_codes')
        .select('*')
        .eq('quiz_id', quizId);

      if (quizCodesError) {
        console.error('Error fetching quiz codes:', quizCodesError);
        throw quizCodesError;
      }
      console.log('Access codes for this quiz:', quizCodes);

      // Step 4: Check for active matching code
      const matchingCode = quizCodes?.find(
        ac => ac.is_active && ac.access_code === code.trim()
      );

      console.log('Matching code found:', matchingCode);

      if (!matchingCode) {
        setVerificationError("Invalid access code. Please try again.");
        return false;
      }

      return true;

    } catch (error) {
      console.error('Verification Error:', error);
      setVerificationError("An error occurred while verifying the access code");
      return false;
    }
  };

  const handleQuizAccess = (quizId: string) => {
    setSelectedQuizId(quizId);
    setVerificationError(null);
    setAccessCode("");
  };

  const handleAccessCodeSubmit = async () => {
    if (!selectedQuizId) return;

    setIsVerifying(true);
    try {
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
    } finally {
      setIsVerifying(false);
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
        isLoading={isVerifying}
      />
    </>
  );
};

export default Quizzes;