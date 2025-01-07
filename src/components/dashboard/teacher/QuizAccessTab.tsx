import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const QuizAccessTab = () => {
  const [accessCodes, setAccessCodes] = useState<{ [key: string]: string }>({});
  const queryClient = useQueryClient();

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
            is_active
          )
        `)
        .eq('is_premium', true);
      
      if (error) {
        console.error('Error fetching quizzes:', error);
        throw error;
      }
      console.log('Fetched quizzes:', data);
      return data;
    },
  });

  const updateAccessCode = useMutation({
    mutationFn: async ({ quizId, code }: { quizId: string; code: string }) => {
      console.log('Updating access code for quiz:', quizId, 'with code:', code);
      
      // First, deactivate any existing access codes for this quiz
      const { error: deactivateError } = await supabase
        .from('quiz_access_codes')
        .update({ is_active: false })
        .eq('quiz_id', quizId);

      if (deactivateError) {
        console.error('Error deactivating old access codes:', deactivateError);
        throw deactivateError;
      }

      // Then insert the new access code
      const { data, error: insertError } = await supabase
        .from('quiz_access_codes')
        .insert({
          quiz_id: quizId,
          access_code: code,
          is_active: true,
          created_by: (await supabase.auth.getUser()).data.user?.id
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error inserting new access code:', insertError);
        throw insertError;
      }

      console.log('Successfully updated access code:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-quizzes'] });
      toast.success("Access code updated successfully");
      setAccessCodes({});
    },
    onError: (error) => {
      console.error('Error in updateAccessCode mutation:', error);
      toast.error("Failed to update access code. Please try again.");
    },
  });

  if (isLoadingQuizzes) {
    return <div>Loading quiz access codes...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quiz Title</TableHead>
              <TableHead>Current Access Code</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quizzes?.map((quiz) => {
              const currentCode = quiz.quiz_access_codes?.find(code => code.is_active)?.access_code || 'No code set';
              return (
                <TableRow key={quiz.id}>
                  <TableCell>{quiz.title}</TableCell>
                  <TableCell>{currentCode}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="New access code"
                        value={accessCodes[quiz.id] || ''}
                        onChange={(e) => setAccessCodes(prev => ({
                          ...prev,
                          [quiz.id]: e.target.value
                        }))}
                        className="max-w-[200px]"
                      />
                      <Button
                        onClick={() => {
                          const newCode = accessCodes[quiz.id];
                          if (!newCode?.trim()) {
                            toast.error("Please enter an access code");
                            return;
                          }
                          updateAccessCode.mutate({
                            quizId: quiz.id,
                            code: newCode.trim()
                          });
                        }}
                        disabled={updateAccessCode.isPending}
                      >
                        Update Code
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};