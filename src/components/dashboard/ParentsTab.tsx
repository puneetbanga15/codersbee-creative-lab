import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export const ParentsTab = () => {
  const { data: parents, isLoading } = useQuery({
    queryKey: ['parents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*, students(*)')
        .eq('role', 'parent');
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      {isLoading ? (
        <p>Loading parents...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Children</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parents?.map((parent) => (
              <TableRow key={parent.id}>
                <TableCell>{parent.full_name}</TableCell>
                <TableCell>{parent.phone_number}</TableCell>
                <TableCell>
                  {parent.students?.map((student: any) => student.full_name).join(', ')}
                </TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};