
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  studentId: z.string().min(1, "Please select a student"),
  file: z.instanceof(File, { message: "Please upload a file" }),
  milestoneType: z.enum([
    'scratch_fundamentals',
    'scratch_advanced',
    'web_fundamentals',
    'web_advanced',
    'ai_fundamentals',
    'ai_master'
  ], { required_error: "Please select a milestone type" })
});

type FormValues = z.infer<typeof formSchema>;

interface AddCertificateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  students: any[];
  onSuccess: () => void;
}

export const AddCertificateDialog = ({ 
  open, 
  onOpenChange, 
  students,
  onSuccess 
}: AddCertificateDialogProps) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const milestoneTypes = [
    { value: 'scratch_fundamentals', label: 'Scratch Fundamentals' },
    { value: 'scratch_advanced', label: 'Scratch Advanced' },
    { value: 'web_fundamentals', label: 'Web Development Fundamentals' },
    { value: 'web_advanced', label: 'Web Development Advanced' },
    { value: 'ai_fundamentals', label: 'AI Fundamentals' },
    { value: 'ai_master', label: 'AI Master' }
  ];

  const onSubmit = async (values: FormValues) => {
    try {
      setUploadProgress(0);
      const file = values.file;
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('certificates')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('certificates')
        .insert({
          student_id: values.studentId,
          filename: file.name,
          file_path: filePath,
          content_type: file.type,
          uploaded_by: (await supabase.auth.getUser()).data.user?.id,
          milestone_type: values.milestoneType
        });

      if (dbError) throw dbError;

      toast.success("Certificate uploaded successfully!");
      onOpenChange(false);
      form.reset();
      onSuccess();
    } catch (error) {
      console.error('Error uploading certificate:', error);
      toast.error("Failed to upload certificate");
    } finally {
      setUploadProgress(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload New Certificate</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {students?.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.full_name} {student.parent && `(${student.parent.full_name})`}
                        </SelectItem>
                      ))}
                      {(!students || students.length === 0) && (
                        <SelectItem value="no_students">No students available</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="milestoneType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Milestone Type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select milestone type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {milestoneTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Certificate File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          onChange(file);
                        }
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {uploadProgress > 0 && (
              <Progress value={uploadProgress} className="w-full" />
            )}
            <Button type="submit" disabled={uploadProgress > 0}>
              {uploadProgress > 0 ? 'Uploading...' : 'Upload'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
