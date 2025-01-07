import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { Quiz } from "@/components/Quiz";
import { QuizGrid } from "@/components/quiz/QuizGrid";
import { AccessCodeDialog } from "@/components/quiz/AccessCodeDialog";
import { QuizTypeFilter } from "@/components/quiz/QuizTypeFilter";
import { QuizHeader } from "@/components/quiz/QuizHeader";
import { ManageAccessCodeDialog } from "@/components/quiz/ManageAccessCodeDialog";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const Quizzes = () => {
  const [selectedType, setSelectedType] = useState<'scratch' | 'python' | 'ai' | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [accessCode, setAccessCode] = useState("");
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isManageAccessCodeOpen, setIsManageAccessCodeOpen] = useState(false);
  const [newAccessCode, setNewAccessCode] = useState("");
  const { toast } = useToast();

  // Fetch user role
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

  // Fetch access codes for admin
  const { data: accessCodes, refetch: refetchAccessCodes } = useQuery({
    queryKey: ['access-codes'],
    queryFn: async () => {
      if (userRole !== 'admin') return null;
      const { data, error } = await supabase
        .from('quiz_access_codes')
        .select('*');
      if (error) throw error;
      return data;
    },
    enabled: userRole === 'admin',
  });

  // Fetch quizzes
  const { data: quizzes, isLoading: isLoadingQuizzes } = useQuery({
    queryKey: ['quizzes', selectedType],
    queryFn: async () => {
      let query = supabase.from('quizzes').select('*');
      if (selectedType) {
        query = query.eq('quiz_type', selectedType);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  // Verify access code
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

  // Update access code
  const updateAccessCode = useMutation({
    mutationFn: async ({ quizId, code }: { quizId: string; code: string }) => {
      const { error } = await supabase
        .from('quiz_access_codes')
        .update({ access_code: code })
        .eq('quiz_id', quizId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Access code updated",
        description: "The access code has been successfully updated.",
      });
      refetchAccessCodes();
      setIsManageAccessCodeOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update access code. Please try again.",
        variant: "destructive",
      });
      console.error('Error updating access code:', error);
    },
  });

  const handleAccessCodeSubmit = () => {
    if (!selectedQuizId) return;
    verifyAccessCode.mutate({ 
      quizId: selectedQuizId, 
      code: accessCode 
    });
  };

  const handleUpdateAccessCode = () => {
    if (!selectedQuizId || !newAccessCode.trim()) return;
    updateAccessCode.mutate({
      quizId: selectedQuizId,
      code: newAccessCode.trim()
    });
  };

  const handleQuizAccess = (quizId: string) => {
    setSelectedQuizId(quizId);
    if (userRole === 'admin') {
      const currentAccessCode = accessCodes?.find(ac => ac.quiz_id === quizId)?.access_code || '';
      setNewAccessCode(currentAccessCode);
      setIsManageAccessCodeOpen(true);
    }
  };

  const canAccessPremiumQuiz = userRole === 'teacher' || userRole === 'parent' || userRole === 'admin';

  if (activeQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <Button 
            onClick={() => setActiveQuiz(null)} 
            className="mb-4"
            variant="outline"
          >
            Back to Quizzes
          </Button>
          <Quiz quizId={activeQuiz} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <QuizHeader 
          userRole={userRole} 
          onManageAccessCodes={() => setIsManageAccessCodeOpen(true)} 
        />

        <QuizTypeFilter 
          selectedType={selectedType}
          onTypeSelect={setSelectedType}
        />

        <QuizGrid
          quizzes={quizzes}
          canAccessPremiumQuiz={canAccessPremiumQuiz}
          onStartQuiz={setActiveQuiz}
          onRequestAccess={handleQuizAccess}
          isLoading={isLoadingQuizzes}
        />

        <AccessCodeDialog
          isOpen={!!selectedQuizId && !isManageAccessCodeOpen}
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

        <ManageAccessCodeDialog
          isOpen={isManageAccessCodeOpen}
          onClose={() => setIsManageAccessCodeOpen(false)}
          newAccessCode={newAccessCode}
          onAccessCodeChange={setNewAccessCode}
          onUpdateAccessCode={handleUpdateAccessCode}
          isUpdating={updateAccessCode.isPending}
        />
      </div>
    </div>
  );
};

export default Quizzes;