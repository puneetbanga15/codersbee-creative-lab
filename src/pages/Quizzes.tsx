import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { Quiz } from "@/components/Quiz";
import { QuizCard } from "@/components/quiz/QuizCard";
import { AccessCodeDialog } from "@/components/quiz/AccessCodeDialog";
import { QuizTypeFilter } from "@/components/quiz/QuizTypeFilter";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const [isManageAccessCodeOpen, setIsManageAccessCodeOpen] = useState(false);
  const [newAccessCode, setNewAccessCode] = useState("");
  const { toast } = useToast();

  // First, get the authenticated user and their role
  const { data: userRole } = useQuery({
    queryKey: ['user-role'],
    queryFn: async () => {
      try {
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
      } catch (error) {
        console.error('Error fetching user role:', error);
        return null;
      }
    },
  });

  // Fetch access codes if user is admin
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

  // Fetch all quizzes, including premium ones
  const { data: quizzes, isLoading: isLoadingQuizzes, isError: isQuizzesError } = useQuery({
    queryKey: ['quizzes', selectedType],
    queryFn: async () => {
      try {
        let query = supabase
          .from('quizzes')
          .select('*');
        
        if (selectedType) {
          query = query.eq('quiz_type', selectedType);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        return (data as Quiz[]).sort((a, b) => {
          if (a.is_premium === b.is_premium) return 0;
          return a.is_premium ? 1 : -1;
        });
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        throw error;
      }
    },
  });

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

  const handleUpdateAccessCode = () => {
    if (!selectedQuizId || !newAccessCode.trim()) return;
    updateAccessCode.mutate({
      quizId: selectedQuizId,
      code: newAccessCode.trim()
    });
  };

  const canAccessPremiumQuiz = userRole === 'teacher' || userRole === 'parent' || userRole === 'admin';

  if (isQuizzesError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center">
          <p className="text-red-600">Error loading quizzes. Please try again later.</p>
        </div>
      </div>
    );
  }

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-codersbee-dark">
            Learning <span className="text-codersbee-vivid">Quizzes</span>
          </h1>
          {userRole === 'admin' && (
            <Button 
              onClick={() => {
                const currentAccessCode = accessCodes?.find(ac => ac.quiz_id === selectedQuizId)?.access_code || '';
                setNewAccessCode(currentAccessCode);
                setIsManageAccessCodeOpen(true);
              }}
              className="bg-codersbee-vivid hover:bg-codersbee-vivid/90"
            >
              Manage Access Codes
            </Button>
          )}
        </div>

        <QuizTypeFilter 
          selectedType={selectedType}
          onTypeSelect={setSelectedType}
        />

        {isLoadingQuizzes ? (
          <div className="text-center">Loading quizzes...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes?.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                canAccessPremiumQuiz={canAccessPremiumQuiz}
                onStartQuiz={setActiveQuiz}
                onRequestAccess={(quizId) => {
                  setSelectedQuizId(quizId);
                  if (userRole === 'admin') {
                    const currentAccessCode = accessCodes?.find(ac => ac.quiz_id === quizId)?.access_code || '';
                    setNewAccessCode(currentAccessCode);
                    setIsManageAccessCodeOpen(true);
                  }
                }}
              />
            ))}
          </div>
        )}

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

        <Dialog open={isManageAccessCodeOpen} onOpenChange={setIsManageAccessCodeOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage Access Code</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="accessCode" className="text-sm font-medium">
                  Access Code
                </label>
                <Input
                  id="accessCode"
                  value={newAccessCode}
                  onChange={(e) => setNewAccessCode(e.target.value)}
                  placeholder="Enter new access code"
                />
              </div>
              <Button 
                onClick={handleUpdateAccessCode}
                className="w-full"
                disabled={!newAccessCode.trim() || updateAccessCode.isPending}
              >
                {updateAccessCode.isPending ? "Updating..." : "Update Access Code"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Quizzes;