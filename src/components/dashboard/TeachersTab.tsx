import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Users, CheckCircle } from "lucide-react";

export const TeachersTab = () => {
  const { data: teachers, isLoading } = useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'teacher');
      
      if (error) {
        console.error('Error fetching teachers:', error);
        throw error;
      }
      
      return data;
    },
  });

  const stats = [
    {
      title: "Total Teachers",
      value: teachers?.length || 0,
      icon: Users,
      color: "bg-codersbee-purple",
      textColor: "text-codersbee-vivid"
    },
    {
      title: "Active Teachers",
      value: teachers?.length || 0,
      icon: CheckCircle,
      color: "bg-codersbee-green",
      textColor: "text-green-700"
    }
  ];

  return (
    <div className="space-y-6">
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Teachers Directory</h2>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-codersbee-vivid" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers?.map((teacher) => (
                <TableRow key={teacher.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{teacher.full_name}</TableCell>
                  <TableCell>{teacher.phone_number || 'N/A'}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
};