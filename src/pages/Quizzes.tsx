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
      // First, let's check if the quiz exists
      const { data: quiz, error: quizError } = await supabase
        .from('quizzes')
        .select('id, title')
        .eq('id', quizId)
        .single();

      if (quizError) {
        console.error('=== Quiz Lookup Error ===');
        console.error('Error:', quizError);
        setVerificationError("Could not verify quiz information");
        return false;
      }

      console.log('Quiz found:', quiz);

      // Now let's check for access codes
      const { data: accessCodes, error: accessCodesError } = await supabase
        .from('quiz_access_codes')
        .select('*')
        .eq('quiz_id', quizId)
        .eq('is_active', true);

      if (accessCodesError) {
        console.error('=== Database Error ===');
        console.error('Error details:', accessCodesError);
        console.error('Error message:', accessCodesError.message);
        console.error('Error code:', accessCodesError.code);
        setVerificationError("An error occurred while verifying the access code");
        return false;
      }

      console.log('=== Database Query Results ===');
      console.log('All active access codes for quiz:', accessCodes);
      
      if (!accessCodes || accessCodes.length === 0) {
        console.log('=== No Active Access Codes Found ===');
        console.log('No active access codes exist for this quiz');
        setVerificationError("No active access codes found for this quiz");
        return false;
      }

      // Check if the entered code matches any of the active codes
      const matchingCode = accessCodes.find(ac => ac.access_code === code.trim());
      
      if (!matchingCode) {
        console.log('=== Invalid Access Code ===');
        console.log('Entered code does not match any active codes');
        setVerificationError("Invalid access code. Please try again.");
        return false;
      }

      console.log('=== Verification Successful ===');
      console.log('Matching access code found:', matchingCode);
      return true;
    } catch (error) {
      console.error('=== Unexpected Error ===');
      console.error('Error:', error);
      setVerificationError("An unexpected error occurred. Please try again.");
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