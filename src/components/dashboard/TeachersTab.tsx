import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export const TeachersTab = () => {
  const { data: teachers, isLoading } = useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'teacher');
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      {isLoading ? (
        <p>Loading teachers...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers?.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>{teacher.full_name}</TableCell>
                <TableCell>{teacher.phone_number}</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};