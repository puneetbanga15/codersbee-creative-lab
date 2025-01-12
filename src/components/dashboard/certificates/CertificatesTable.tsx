import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CertificatesTableProps {
  certificates: any[];
  onDelete: () => void;
}

export const CertificatesTable = ({ certificates, onDelete }: CertificatesTableProps) => {
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
      const { error: storageError } = await supabase.storage
        .from('certificates')
        .remove([filePath]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('certificates')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      toast.success("Certificate deleted successfully!");
      onDelete();
    } catch (error) {
      console.error('Error deleting certificate:', error);
      toast.error("Failed to delete certificate");
    }
  };

  return (
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
  );
};