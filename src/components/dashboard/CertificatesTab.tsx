import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { AddCertificateDialog } from "./certificates/AddCertificateDialog";
import { CreateCertificateDialog } from "./certificates/CreateCertificateDialog";
import { CertificatesTable } from "./certificates/CertificatesTable";

export const CertificatesTab = () => {
  const [showAddCertificate, setShowAddCertificate] = useState(false);
  const [showCreateCertificate, setShowCreateCertificate] = useState(false);

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
      <div className="flex justify-end gap-4">
        <Dialog open={showAddCertificate} onOpenChange={setShowAddCertificate}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Upload Certificate
            </Button>
          </DialogTrigger>
          <AddCertificateDialog
            open={showAddCertificate}
            onOpenChange={setShowAddCertificate}
            students={students || []}
            onSuccess={refetch}
          />
        </Dialog>

        <Dialog open={showCreateCertificate} onOpenChange={setShowCreateCertificate}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Certificate
            </Button>
          </DialogTrigger>
          <CreateCertificateDialog
            open={showCreateCertificate}
            onOpenChange={setShowCreateCertificate}
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