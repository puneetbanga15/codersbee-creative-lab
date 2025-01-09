import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeacherDashboardHeader } from "@/components/TeacherDashboardHeader";
import { TeachersTab } from "@/components/dashboard/TeachersTab";
import { ParentsTab } from "@/components/dashboard/ParentsTab";
import { ScheduleTable } from "@/components/dashboard/teacher/ScheduleTable";
import { PaymentsTable } from "@/components/dashboard/teacher/PaymentsTable";
import { ScheduleCalendar } from "@/components/dashboard/teacher/ScheduleCalendar";
import { QuizAccessTab } from "@/components/dashboard/teacher/QuizAccessTab";
import { CertificatesTab } from "@/components/dashboard/CertificatesTab";
import { startOfMonth, endOfMonth } from "date-fns";

const TeacherDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const { data: userProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

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

  const isAdmin = userProfile?.role === 'admin';

  return (
    <div className="container mx-auto p-6">
      <TeacherDashboardHeader />

      <Tabs defaultValue={isAdmin ? "teachers" : "schedule"} className="space-y-4">
        <TabsList>
          {isAdmin && (
            <>
              <TabsTrigger value="teachers">Teachers</TabsTrigger>
              <TabsTrigger value="parents">Parents</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="quiz-access">Quiz Access</TabsTrigger>
            </>
          )}
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        {isAdmin && (
          <>
            <TabsContent value="teachers">
              <Card>
                <CardHeader>
                  <CardTitle>Teachers</CardTitle>
                </CardHeader>
                <CardContent>
                  <TeachersTab />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="parents">
              <Card>
                <CardHeader>
                  <CardTitle>Parents</CardTitle>
                </CardHeader>
                <CardContent>
                  <ParentsTab />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certificates">
              <Card>
                <CardHeader>
                  <CardTitle>Certificates</CardTitle>
                </CardHeader>
                <CardContent>
                  <CertificatesTab />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quiz-access">
              <Card>
                <CardHeader>
                  <CardTitle>Quiz Access Codes</CardTitle>
                </CardHeader>
                <CardContent>
                  <QuizAccessTab />
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Class Schedule</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <ScheduleCalendar 
                  selectedMonth={selectedMonth}
                  setSelectedMonth={setSelectedMonth}
                />
                <div className="space-y-4">
                  {schedulesLoading ? (
                    <p>Loading schedule...</p>
                  ) : (
                    <ScheduleTable schedules={schedules || []} />
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
                <PaymentsTable payments={payments || []} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherDashboard;
