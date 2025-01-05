import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";

const TeacherDashboard = () => {
  const { data: schedules, isLoading: schedulesLoading } = useQuery({
    queryKey: ['class-schedules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('class_schedules')
        .select(`
          id,
          scheduled_at,
          students (
            full_name
          )
        `)
        .gte('scheduled_at', new Date().toISOString())
        .order('scheduled_at', { ascending: true })
        .limit(5);

      if (error) throw error;
      return data;
    },
  });

  const { data: progressData, isLoading: progressLoading } = useQuery({
    queryKey: ['progress-milestones'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('progress_milestones')
        .select(`
          id,
          title,
          achieved_at,
          students (
            full_name
          )
        `)
        .order('achieved_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Teacher Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
          </CardHeader>
          <CardContent>
            {schedulesLoading ? (
              <p>Loading schedules...</p>
            ) : schedules?.length === 0 ? (
              <p>No upcoming classes scheduled</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules?.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell>{schedule.students?.full_name}</TableCell>
                      <TableCell>{format(new Date(schedule.scheduled_at), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{format(new Date(schedule.scheduled_at), 'HH:mm')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Progress Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            {progressLoading ? (
              <p>Loading progress...</p>
            ) : progressData?.length === 0 ? (
              <p>No progress milestones recorded</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Milestone</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {progressData?.map((milestone) => (
                    <TableRow key={milestone.id}>
                      <TableCell>{milestone.students?.full_name}</TableCell>
                      <TableCell>{milestone.title}</TableCell>
                      <TableCell>{format(new Date(milestone.achieved_at), 'MMM dd, yyyy')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class Completion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={85} className="w-full" />
            <p className="text-sm text-muted-foreground">85% of scheduled classes completed this month</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDashboard;