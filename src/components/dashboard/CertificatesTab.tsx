import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { AddCertificateDialog } from "./certificates/AddCertificateDialog";
import { CertificatesTable } from "./certificates/CertificatesTable";

export const CertificatesTab = () => {
  const [showAddCertificate, setShowAddCertificate] = useState(false);

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
          <AddCertificateDialog
            open={showAddCertificate}
            onOpenChange={setShowAddCertificate}
            students={students || []}
            onSuccess={refetch}
          />
        </Dialog>
      </div>

      <CertificatesTable 
        certificates={certificates || []} 
        onDelete={refetch}
      />
    </div>
  );
};