import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { AddParentForm } from "../AddParentForm";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export const ParentsTab = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState<any>(null);

  const { data: parents, isLoading, refetch } = useQuery({
    queryKey: ['parents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          phone_number,
          students(
            id,
            full_name,
            course_enrollments(
              id,
              course_name,
              teacher:profiles(full_name)
            )
          )
        `)
        .eq('role', 'parent');
      
      if (error) throw error;
      return data;
    },
  });

  const updateFeeStatus = async (studentId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('fee_payments')
        .insert({
          student_id: studentId,
          amount: 0,
          status: status,
          description: 'Manual status update'
        });

      if (error) throw error;
      toast.success('Fee status updated successfully');
      refetch();
    } catch (error) {
      console.error('Error updating fee status:', error);
      toast.error('Failed to update fee status');
    }
  };

  const handleEdit = (parent: any) => {
    setSelectedParent(parent);
    setEditDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Parents</h2>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-codersbee-vivid" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Parent Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Children</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Fee Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parents?.map((parent) => (
                <TableRow key={parent.id} className="hover:bg-gray-50">
                  <TableCell>{parent.full_name}</TableCell>
                  <TableCell>{parent.phone_number}</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      {parent.students?.map((student: any) => (
                        <div key={student.id} className="border-b pb-2 last:border-0">
                          <p className="font-medium">{student.full_name}</p>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      {parent.students?.map((student: any) => (
                        <div key={student.id} className="border-b pb-2 last:border-0">
                          {student.course_enrollments?.map((enrollment: any) => (
                            <p key={enrollment.id} className="text-sm text-gray-500">
                              {enrollment.course_name} - Teacher: {enrollment.teacher?.full_name}
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {parent.students?.map((student: any) => (
                      <div key={student.id} className="mb-2">
                        <Select
                          onValueChange={(value) => updateFeeStatus(student.id, value)}
                          defaultValue="pending"
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="overdue">Overdue</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <div className="space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(parent)}
                        className="hover:bg-gray-100"
                      >
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Parent Information</DialogTitle>
          </DialogHeader>
          {selectedParent && (
            <AddParentForm
              onSuccess={() => {
                setEditDialogOpen(false);
                refetch();
                toast.success("Parent information updated successfully!");
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};