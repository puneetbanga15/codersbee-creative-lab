import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const CertificatesSection = () => {
  const { data: certificates, isLoading } = useQuery({
    queryKey: ['parent-certificates'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: students } = await supabase
        .from('students')
        .select('id')
        .eq('parent_id', user.id);

      if (!students?.length) return [];

      const studentIds = students.map(s => s.id);

      const { data, error } = await supabase
        .from('certificates')
        .select(`
          *,
          student:students(
            full_name
          )
        `)
        .in('student_id', studentIds);

      if (error) throw error;
      return data;
    },
  });

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Certificates</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : certificates?.length === 0 ? (
          <p className="text-center text-muted-foreground">No certificates available yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>File Name</TableHead>
                <TableHead>Uploaded At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates?.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell>{cert.student?.full_name}</TableCell>
                  <TableCell>{cert.filename}</TableCell>
                  <TableCell>{new Date(cert.uploaded_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadCertificate(cert.file_path, cert.filename)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};