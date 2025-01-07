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
  const [newAccessCode, setNewAccessCode] = useState("");
  const queryClient = useQueryClient();

  const { data: quizzes, isLoading: isLoadingQuizzes } = useQuery({
    queryKey: ['admin-quizzes'],
    queryFn: async () => {
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
      
      if (error) throw error;
      return data;
    },
  });

  const updateAccessCode = useMutation({
    mutationFn: async ({ quizId, code }: { quizId: string; code: string }) => {
      // First, deactivate any existing access codes for this quiz
      await supabase
        .from('quiz_access_codes')
        .update({ is_active: false })
        .eq('quiz_id', quizId);

      // Then insert the new access code
      const { error } = await supabase
        .from('quiz_access_codes')
        .insert({
          quiz_id: quizId,
          access_code: code,
          is_active: true
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-quizzes'] });
      toast.success("Access code updated successfully");
      setNewAccessCode("");
    },
    onError: (error) => {
      toast.error("Failed to update access code");
      console.error('Error updating access code:', error);
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
              const currentCode = quiz.quiz_access_codes?.[0]?.access_code || 'No code set';
              return (
                <TableRow key={quiz.id}>
                  <TableCell>{quiz.title}</TableCell>
                  <TableCell>{currentCode}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="New access code"
                        value={newAccessCode}
                        onChange={(e) => setNewAccessCode(e.target.value)}
                        className="max-w-[200px]"
                      />
                      <Button
                        onClick={() => {
                          if (!newAccessCode.trim()) {
                            toast.error("Please enter an access code");
                            return;
                          }
                          updateAccessCode.mutate({
                            quizId: quiz.id,
                            code: newAccessCode.trim()
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