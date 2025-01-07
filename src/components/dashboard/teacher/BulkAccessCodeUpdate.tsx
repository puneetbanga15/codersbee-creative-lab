import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type BulkAccessCodeUpdateProps = {
  quizzes: any[];
};

export const BulkAccessCodeUpdate = ({ quizzes }: BulkAccessCodeUpdateProps) => {
  const [bulkAccessCode, setBulkAccessCode] = useState("");
  const queryClient = useQueryClient();

  const updateAllAccessCodes = useMutation({
    mutationFn: async (code: string) => {
      console.log('Starting bulk update with code:', code);
      if (!quizzes) return;
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      // Deactivate all existing access codes
      const { error: deactivateError } = await supabase
        .from('quiz_access_codes')
        .update({ is_active: false })
        .in('quiz_id', quizzes.map(q => q.id));

      if (deactivateError) {
        console.error('Error deactivating codes:', deactivateError);
        throw deactivateError;
      }

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

      if (insertError) {
        console.error('Error inserting new codes:', insertError);
        throw insertError;
      }
      
      console.log('Bulk update completed successfully');
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

  return (
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
  );
};