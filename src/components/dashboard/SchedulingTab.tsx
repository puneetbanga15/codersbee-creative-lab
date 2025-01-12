import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export const SchedulingTab = () => {
  const { data: schedules, isLoading } = useQuery({
    queryKey: ['schedules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('class_schedules')
        .select(`
          *,
          student:students(full_name),
          teacher:profiles(full_name)
        `)
        .order('scheduled_at', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-codersbee-vivid" />
          <h2 className="text-2xl font-semibold">Class Scheduling</h2>
        </div>
        {/* Schedule management UI will be implemented here */}
        <p className="text-gray-500">Schedule management coming soon...</p>
      </Card>
    </div>
  );
};