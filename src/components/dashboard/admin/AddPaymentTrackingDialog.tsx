
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AddPaymentTrackingDialogProps {
  studentId: string;
  studentName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const AddPaymentTrackingDialog = ({
  studentId,
  studentName,
  open,
  onOpenChange,
  onSuccess,
}: AddPaymentTrackingDialogProps) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const { error } = await supabase.from("payment_tracking").insert({
        student_id: studentId,
        paid_until_date: data.paidUntilDate,
        payment_mode: data.paymentMode,
        payment_reference: data.reference,
      });

      if (error) throw error;

      toast.success("Payment tracking updated successfully");
      reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      toast.error("Failed to update payment tracking");
      console.error("Error updating payment tracking:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Payment for {studentName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Paid Until Date</label>
            <Input
              type="date"
              {...register("paidUntilDate")}
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Payment Mode</label>
            <Select onValueChange={(value) => register("paymentMode").onChange({ target: { value } })}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Reference</label>
            <Input
              placeholder="Payment reference..."
              {...register("reference")}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
