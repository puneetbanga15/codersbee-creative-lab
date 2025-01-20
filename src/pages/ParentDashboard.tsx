import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DashboardHeader } from "@/components/dashboard/parent/DashboardHeader";
import { LearningJourneyVisual } from "@/components/dashboard/parent/LearningJourneyVisual";
import { UpcomingClasses } from "@/components/dashboard/parent/UpcomingClasses";
import { RecentPayments } from "@/components/dashboard/parent/RecentPayments";
import { StudentInformation } from "@/components/dashboard/parent/StudentInformation";
import { CertificatesSection } from "@/components/dashboard/parent/CertificatesSection";
import { FeedbackSection } from "@/components/dashboard/parent/FeedbackSection";
import { PaymentTrackingSection } from "@/components/dashboard/parent/PaymentTrackingSection";
import { ParentSidebar } from "@/components/dashboard/parent/ParentSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { formatInTimeZone } from 'date-fns-tz';
import type { Student, ClassSchedule, FeePayment } from "@/types/database";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
  const [payments, setPayments] = useState<FeePayment[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/parents/login");
        return;
      }

      try {
        const { data: studentsData, error: studentsError } = await supabase
          .from('students')
          .select(`
            id,
            full_name,
            readable_id,
            class_schedules(
              id,
              scheduled_at,
              status,
              teacher:profiles(full_name)
            )
          `)
          .eq('parent_id', session.user.id);

        if (studentsError) throw studentsError;
        setStudents(studentsData || []);

        // Fetch upcoming classes for all students
        const studentIds = studentsData?.map(s => s.id) || [];
        if (studentIds.length > 0) {
          const { data: schedulesData, error: schedulesError } = await supabase
            .from('class_schedules')
            .select(`
              id,
              scheduled_at,
              status,
              teacher:profiles(full_name)
            `)
            .in('student_id', studentIds)
            .gte('scheduled_at', new Date().toISOString())
            .order('scheduled_at', { ascending: true })
            .limit(10);

          if (schedulesError) throw schedulesError;
          setSchedules(schedulesData as ClassSchedule[] || []);

          // Fetch recent payments
          const { data: paymentsData, error: paymentsError } = await supabase
            .from('fee_payments')
            .select('*')
            .in('student_id', studentIds)
            .order('payment_date', { ascending: false })
            .limit(5);

          if (paymentsError) throw paymentsError;
          setPayments(paymentsData || []);
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message
        });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, toast]);

  const formatClassTime = (dateStr: string) => {
    const istTime = formatInTimeZone(new Date(dateStr), 'Asia/Kolkata', 'h:mm a z');
    const centralTime = formatInTimeZone(new Date(dateStr), 'America/Chicago', 'h:mm a z');
    return `${istTime} / ${centralTime}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-codersbee-vivid" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <ParentSidebar />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
              <SidebarTrigger className="mr-4" />
              <DashboardHeader />
            </div>
            
            {students.length === 0 ? (
              <Card className="p-6">
                <p>No students found. Please contact support to add your children.</p>
              </Card>
            ) : (
              <>
                <div className="mb-6">
                  <LearningJourneyVisual />
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <UpcomingClasses 
                    schedules={schedules.map(schedule => ({
                      ...schedule,
                      scheduled_at: formatClassTime(schedule.scheduled_at)
                    }))} 
                  />
                  <RecentPayments payments={payments} />
                  <StudentInformation students={students} />
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <FeedbackSection />
                  <PaymentTrackingSection />
                </div>
                <div className="mt-6">
                  <CertificatesSection />
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ParentDashboard;