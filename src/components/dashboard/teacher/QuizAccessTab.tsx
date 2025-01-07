import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BulkAccessCodeUpdate } from "./BulkAccessCodeUpdate";
import { QuizAccessTable } from "./QuizAccessTable";

export const QuizAccessTab = () => {
  const { data: quizzes, isLoading: isLoadingQuizzes } = useQuery({
    queryKey: ['admin-quizzes'],
    queryFn: async () => {
      console.log('Fetching quizzes and access codes...');
      const { data, error } = await supabase
        .from('quizzes')
        .select(`
          id,
          title,
          is_premium,
          quiz_access_codes (
            access_code,
            is_active,
            created_at
          )
        `)
        .eq('is_premium', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching quizzes:', error);
        throw error;
      }
      console.log('Fetched quizzes:', data);
      return data;
    },
  });

  if (isLoadingQuizzes) {
    return <div>Loading quiz access codes...</div>;
  }

  return (
    <div className="space-y-6">
      <BulkAccessCodeUpdate quizzes={quizzes || []} />
      <QuizAccessTable quizzes={quizzes || []} />
    </div>
  );
};