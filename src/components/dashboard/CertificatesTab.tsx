import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Download, Loader2, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  studentId: z.string().min(1, "Please select a student"),
  file: z.instanceof(File, { message: "Please upload a file" })
});

type FormValues = z.infer<typeof formSchema>;

export const CertificatesTab = () => {
  const [showAddCertificate, setShowAddCertificate] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { data: students, isLoading: studentsLoading } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('students')
        .select(`
          id,
          full_name,
          parent:profiles(full_name)
        `);
      
      if (error) throw error;
      return data;
    },
  });

  const { data: certificates, isLoading: certificatesLoading, refetch } = useQuery({
    queryKey: ['certificates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('certificates')
        .select(`
          *,
          student:students(
            full_name,
            parent:profiles(full_name)
          )
        `);
      
      if (error) throw error;
      return data;
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setUploadProgress(0);
      const file = values.file;
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      // Create a new XMLHttpRequest to track upload progress
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percent = (event.loaded / event.total) * 100;
          setUploadProgress(percent);
        }
      });

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('certificates')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create certificate record in database
      const { error: dbError } = await supabase
        .from('certificates')
        .insert({
          student_id: values.studentId,
          filename: file.name,
          file_path: filePath,
          content_type: file.type,
          uploaded_by: (await supabase.auth.getUser()).data.user?.id,
        });

      if (dbError) throw dbError;

      toast.success("Certificate uploaded successfully!");
      setShowAddCertificate(false);
      form.reset();
      refetch();
    } catch (error) {
      console.error('Error uploading certificate:', error);
      toast.error("Failed to upload certificate");
    } finally {
      setUploadProgress(0);
    }
  };

  const downloadCertificate = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('certificates')
        .download(filePath);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading certificate:', error);
      toast.error("Failed to download certificate");
    }
  };

  const deleteCertificate = async (id: string, filePath: string) => {
    try {
      // First delete the file from storage
      const { error: storageError } = await supabase.storage
        .from('certificates')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Then delete the database record
      const { error: dbError } = await supabase
        .from('certificates')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      toast.success("Certificate deleted successfully!");
      refetch();
    } catch (error) {
      console.error('Error deleting certificate:', error);
      toast.error("Failed to delete certificate");
    }
  };

  if (studentsLoading || certificatesLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={showAddCertificate} onOpenChange={setShowAddCertificate}>
          <DialogTrigger asChild>
            <Button>Upload Certificate</Button>
          </DialogTrigger>
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
                              {student.full_name} ({student.parent.full_name})
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
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Parent Name</TableHead>
            <TableHead>File Name</TableHead>
            <TableHead>Uploaded At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {certificates?.map((cert) => (
            <TableRow key={cert.id}>
              <TableCell>{cert.student.full_name}</TableCell>
              <TableCell>{cert.student.parent.full_name}</TableCell>
              <TableCell>{cert.filename}</TableCell>
              <TableCell>{new Date(cert.uploaded_at).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadCertificate(cert.file_path, cert.filename)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteCertificate(cert.id, cert.file_path)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
