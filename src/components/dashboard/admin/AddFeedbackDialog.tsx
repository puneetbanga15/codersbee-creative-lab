import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AddFeedbackDialogProps {
  studentId: string;
  studentName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const AddFeedbackDialog = ({
  studentId,
  studentName,
  open,
  onOpenChange,
  onSuccess,
}: AddFeedbackDialogProps) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const { error } = await supabase.from("student_feedback").insert({
        student_id: studentId,
        feedback_date: data.date,
        feedback_text: data.feedback,
      });

      if (error) throw error;

      toast.success("Feedback added successfully");
      reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      toast.error("Failed to add feedback");
      console.error("Error adding feedback:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Feedback for {studentName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="date"
              {...register("date")}
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <Textarea
              placeholder="Enter feedback..."
              {...register("feedback")}
              className="min-h-[100px]"
            />
          </div>
          <Button type="submit">Submit Feedback</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};