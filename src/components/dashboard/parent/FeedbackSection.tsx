import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

export const FeedbackSection = () => {
  const { data: feedback, isLoading } = useQuery({
    queryKey: ['parent-feedback'],
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
        .from('student_feedback')
        .select(`
          *,
          student:students(
            full_name
          )
        `)
        .in('student_id', studentIds)
        .order('feedback_date', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : feedback?.length === 0 ? (
          <p className="text-center text-muted-foreground">No feedback available yet.</p>
        ) : (
          <div className="space-y-4">
            {feedback?.map((item) => (
              <div key={item.id} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{item.student?.full_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(item.feedback_date), 'PPP')}
                    </p>
                  </div>
                </div>
                <p className="text-sm">{item.feedback_text}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};