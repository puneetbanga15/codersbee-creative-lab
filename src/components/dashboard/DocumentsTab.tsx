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
import { Download, Upload, Loader2, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

const formSchema = z.object({
  studentId: z.string().min(1, "Please select a student"),
  file: z.instanceof(File, { message: "Please upload a file" }),
  description: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

export const DocumentsTab = () => {
  const [showAddDocument, setShowAddDocument] = useState(false);
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

  const { data: documents, isLoading: documentsLoading, refetch } = useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documents')
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

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          student_id: values.studentId,
          filename: file.name,
          file_path: filePath,
          content_type: file.type,
          description: values.description,
          uploaded_by: (await supabase.auth.getUser()).data.user?.id,
        });

      if (dbError) throw dbError;

      toast.success("Document uploaded successfully!");
      setShowAddDocument(false);
      form.reset();
      refetch();
    } catch (error) {
      console.error('Error uploading document:', error);
      toast.error("Failed to upload document");
    } finally {
      setUploadProgress(0);
    }
  };

  const downloadDocument = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .download(filePath);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading document:', error);
      toast.error("Failed to download document");
    }
  };

  const deleteDocument = async (id: string, filePath: string) => {
    try {
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([filePath]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      toast.success("Document deleted successfully!");
      refetch();
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error("Failed to delete document");
    }
  };

  if (studentsLoading || documentsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-codersbee-vivid" />
      </div>
    );
  }

  return (
    <Card className="p-6 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Documents</h2>
        <Dialog open={showAddDocument} onOpenChange={setShowAddDocument}>
          <DialogTrigger asChild>
            <Button className="bg-codersbee-vivid hover:bg-codersbee-vivid/90">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
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
                              {student.full_name}
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
                      <FormLabel>Document File</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) onChange(file);
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter document description" {...field} />
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

      <div className="bg-white rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Student Name</TableHead>
              <TableHead>File Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Uploaded At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents?.map((doc) => (
              <TableRow key={doc.id} className="hover:bg-gray-50">
                <TableCell>{doc.student?.full_name}</TableCell>
                <TableCell>{doc.filename}</TableCell>
                <TableCell>{doc.description || '-'}</TableCell>
                <TableCell>{new Date(doc.uploaded_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadDocument(doc.file_path, doc.filename)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteDocument(doc.id, doc.file_path)}
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
    </Card>
  );
};
