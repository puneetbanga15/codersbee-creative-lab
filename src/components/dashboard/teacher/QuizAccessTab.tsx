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
import { Alert, AlertDescription } from "@/components/ui/alert";

export const QuizAccessTab = () => {
  const [accessCodes, setAccessCodes] = useState<{ [key: string]: string }>({});
  const [bulkAccessCode, setBulkAccessCode] = useState("");
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

  const updateAllAccessCodes = useMutation({
    mutationFn: async (code: string) => {
      if (!quizzes) return;
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      // Deactivate all existing access codes
      const { error: deactivateError } = await supabase
        .from('quiz_access_codes')
        .update({ is_active: false })
        .in('quiz_id', quizzes.map(q => q.id));

      if (deactivateError) throw deactivateError;

      // Insert new access codes for all quizzes
      const { error: insertError } = await supabase
        .from('quiz_access_codes')
        .insert(
          quizzes.map(quiz => ({
            quiz_id: quiz.id,
            access_code: code,
            is_active: true,
            created_by: user?.id
          }))
        );

      if (insertError) throw insertError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-quizzes'] });
      toast.success("All access codes updated successfully");
      setBulkAccessCode("");
    },
    onError: (error) => {
      console.error('Error in bulk update:', error);
      toast.error("Failed to update access codes. Please try again.");
    },
  });

  if (isLoadingQuizzes) {
    return <div>Loading quiz access codes...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 p-4 rounded-lg border">
        <h3 className="font-medium mb-2">Bulk Update Access Codes</h3>
        <div className="flex items-center gap-2">
          <Input
            placeholder="New access code for all quizzes"
            value={bulkAccessCode}
            onChange={(e) => setBulkAccessCode(e.target.value)}
            className="max-w-[300px]"
          />
          <Button
            onClick={() => {
              if (!bulkAccessCode?.trim()) {
                toast.error("Please enter an access code");
                return;
              }
              updateAllAccessCodes.mutate(bulkAccessCode.trim());
            }}
            disabled={updateAllAccessCodes.isPending}
          >
            Update All Codes
          </Button>
        </div>
      </div>

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
    </div>
  );
};