import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { TeacherDashboardHeader } from "@/components/TeacherDashboardHeader";

const TeacherDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Fetch teachers data
  const { data: teachers, isLoading: teachersLoading } = useQuery({
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

  // Fetch schedules for the selected month
  const { data: schedules, isLoading: schedulesLoading } = useQuery({
    queryKey: ['schedules', selectedMonth],
    queryFn: async () => {
      const startDate = startOfMonth(selectedMonth);
      const endDate = endOfMonth(selectedMonth);
      
      const { data, error } = await supabase
        .from('class_schedules')
        .select(`
          *,
          teacher:profiles(full_name),
          student:students(full_name)
        `)
        .gte('scheduled_at', startDate.toISOString())
        .lte('scheduled_at', endDate.toISOString())
        .order('scheduled_at', { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  // Fetch fee payments
  const { data: payments, isLoading: paymentsLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fee_payments')
        .select(`
          *,
          student:students(full_name)
        `)
        .order('payment_date', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="container mx-auto p-6">
      <TeacherDashboardHeader />

      <Tabs defaultValue="teachers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="teachers">
          <Card>
            <CardHeader>
              <CardTitle>Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              {teachersLoading ? (
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Class Schedule</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedMonth(subMonths(selectedMonth, 1))}
                  >
                    Previous Month
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedMonth(new Date())}
                  >
                    Current Month
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <Calendar
                  mode="single"
                  selected={selectedMonth}
                  onSelect={(date) => date && setSelectedMonth(date)}
                  className="rounded-md border"
                />
                <div className="space-y-4">
                  {schedulesLoading ? (
                    <p>Loading schedule...</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Teacher</TableHead>
                          <TableHead>Student</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {schedules?.map((schedule) => (
                          <TableRow key={schedule.id}>
                            <TableCell>
                              {format(new Date(schedule.scheduled_at), 'PPp')}
                            </TableCell>
                            <TableCell>{schedule.teacher?.full_name}</TableCell>
                            <TableCell>{schedule.student?.full_name}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              {paymentsLoading ? (
                <p>Loading payments...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments?.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          {format(new Date(payment.payment_date), 'PP')}
                        </TableCell>
                        <TableCell>{payment.student?.full_name}</TableCell>
                        <TableCell>${payment.amount}</TableCell>
                        <TableCell>{payment.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherDashboard;
