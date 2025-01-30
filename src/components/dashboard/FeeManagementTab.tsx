import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const FeeManagementTab = () => {
  const { data: fees, isLoading, refetch } = useQuery({
    queryKey: ['fees'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fee_management')
        .select(`
          *,
          student:students(
            full_name,
            parent:profiles(full_name)
          )
        `)
        .order('due_date', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const handleMarkAsPaid = async (feeId: string) => {
    try {
      const { error } = await supabase
        .from('fee_management')
        .update({ 
          status: 'paid',
          payment_date: new Date().toISOString()
        })
        .eq('id', feeId);

      if (error) throw error;

      toast.success("Payment status updated successfully");
      refetch();
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast.error("Failed to update payment status");
    }
  };

  const handleMarkAsOverdue = async (feeId: string) => {
    try {
      const { error } = await supabase
        .from('fee_management')
        .update({ status: 'overdue' })
        .eq('id', feeId);

      if (error) throw error;

      toast.success("Fee marked as overdue");
      refetch();
    } catch (error) {
      console.error('Error marking fee as overdue:', error);
      toast.error("Failed to mark fee as overdue");
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Fee Management</h2>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-codersbee-vivid" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Student Name</TableHead>
                <TableHead>Parent Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fees?.map((fee) => (
                <TableRow key={fee.id} className="hover:bg-gray-50">
                  <TableCell>{fee.student?.full_name}</TableCell>
                  <TableCell>{fee.student?.parent?.full_name}</TableCell>
                  <TableCell>${fee.amount}</TableCell>
                  <TableCell>{format(new Date(fee.due_date), 'PPP')}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      fee.status === 'paid' ? 'bg-green-100 text-green-800' :
                      fee.status === 'overdue' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {fee.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {fee.payment_date ? format(new Date(fee.payment_date), 'PPP') : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {fee.status !== 'paid' && (
                        <Button
                          size="sm"
                          onClick={() => handleMarkAsPaid(fee.id)}
                        >
                          Mark as Paid
                        </Button>
                      )}
                      {fee.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleMarkAsOverdue(fee.id)}
                        >
                          Mark Overdue
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
};