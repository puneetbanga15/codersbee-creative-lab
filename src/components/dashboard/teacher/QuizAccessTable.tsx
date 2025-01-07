import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

type QuizAccessTableProps = {
  quizzes: any[];
};

export const QuizAccessTable = ({ quizzes }: QuizAccessTableProps) => {
  const [accessCodes, setAccessCodes] = useState<{ [key: string]: string }>({});
  const queryClient = useQueryClient();

  const updateAccessCode = useMutation({
    mutationFn: async ({ quizId, code }: { quizId: string; code: string }) => {
      console.log('Updating access code for quiz:', quizId, 'with code:', code);
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      
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
          created_by: user?.id
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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quiz Title</TableHead>
            <TableHead>Current Access Code</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quizzes?.map((quiz) => {
            const activeCode = quiz.quiz_access_codes?.find(code => code.is_active);
            return (
              <TableRow key={quiz.id}>
                <TableCell>{quiz.title}</TableCell>
                <TableCell>{activeCode?.access_code || 'No code set'}</TableCell>
                <TableCell>
                  {activeCode?.created_at 
                    ? new Date(activeCode.created_at).toLocaleDateString()
                    : '-'
                  }
                </TableCell>
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
  );
};