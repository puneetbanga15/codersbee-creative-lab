import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { AddParentForm } from "../AddParentForm";
import { Card } from "@/components/ui/card";
import { Loader2, Users, GraduationCap, CreditCard } from "lucide-react";
import { AddFeedbackDialog } from "./admin/AddFeedbackDialog";
import { AddPaymentTrackingDialog } from "./admin/AddPaymentTrackingDialog";

export const ParentsTab = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState<any>(null);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<{ id: string; name: string } | null>(null);

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

  const handleEdit = (parent: any) => {
    setSelectedParent(parent);
    setEditDialogOpen(true);
  };

  const handleAddFeedback = (studentId: string, studentName: string) => {
    setSelectedStudent({ id: studentId, name: studentName });
    setFeedbackDialogOpen(true);
  };

  const handleAddPayment = (studentId: string, studentName: string) => {
    setSelectedStudent({ id: studentId, name: studentName });
    setPaymentDialogOpen(true);
  };

  const totalStudents = parents?.reduce((acc, parent) => acc + (parent.students?.length || 0), 0) || 0;
  const totalCourses = parents?.reduce((acc, parent) => 
    acc + parent.students?.reduce((sum: number, student: any) => 
      sum + (student.course_enrollments?.length || 0), 0
    ) || 0, 0
  ) || 0;

  const stats = [
    {
      title: "Total Parents",
      value: parents?.length || 0,
      icon: Users,
      color: "bg-codersbee-purple",
      textColor: "text-codersbee-vivid"
    },
    {
      title: "Total Students",
      value: totalStudents,
      icon: GraduationCap,
      color: "bg-codersbee-green",
      textColor: "text-green-700"
    },
    {
      title: "Course Enrollments",
      value: totalCourses,
      icon: CreditCard,
      color: "bg-codersbee-yellow",
      textColor: "text-yellow-700"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Parents & Students Management</h2>
        <Button 
          onClick={() => setEditDialogOpen(true)}
          className="bg-codersbee-vivid hover:bg-codersbee-vivid/90"
        >
          Add Parent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className={`p-6 ${stat.color} bg-opacity-10 border-none`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
              <stat.icon className={`w-12 h-12 ${stat.textColor} opacity-80`} />
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-white shadow-sm">
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parents?.map((parent) => (
                <TableRow key={parent.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{parent.full_name}</TableCell>
                  <TableCell>{parent.phone_number}</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      {parent.students?.map((student: any) => (
                        <div key={student.id} className="border-b pb-2 last:border-0">
                          <p className="font-medium">{student.full_name}</p>
                          <div className="flex gap-2 mt-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAddFeedback(student.id, student.full_name)}
                            >
                              Add Feedback
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAddPayment(student.id, student.full_name)}
                            >
                              Update Payment
                            </Button>
                          </div>
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(parent)}
                      className="hover:bg-gray-100"
                    >
                      Edit
                    </Button>
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
            <DialogTitle>
              {selectedParent ? 'Edit Parent Information' : 'Add New Parent'}
            </DialogTitle>
          </DialogHeader>
          <AddParentForm
            initialData={selectedParent}
            onSuccess={() => {
              setEditDialogOpen(false);
              refetch();
              toast.success(selectedParent ? "Parent information updated successfully!" : "Parent added successfully!");
            }}
          />
        </DialogContent>
      </Dialog>

      {selectedStudent && (
        <>
          <AddFeedbackDialog
            studentId={selectedStudent.id}
            studentName={selectedStudent.name}
            open={feedbackDialogOpen}
            onOpenChange={setFeedbackDialogOpen}
            onSuccess={refetch}
          />
          <AddPaymentTrackingDialog
            studentId={selectedStudent.id}
            studentName={selectedStudent.name}
            open={paymentDialogOpen}
            onOpenChange={setPaymentDialogOpen}
            onSuccess={refetch}
          />
        </>
      )}
    </div>
  );
};
