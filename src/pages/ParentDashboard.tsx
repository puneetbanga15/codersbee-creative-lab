import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { DashboardHeader } from "@/components/dashboard/parent/DashboardHeader";
import { UpcomingClasses } from "@/components/dashboard/parent/UpcomingClasses";
import { RecentPayments } from "@/components/dashboard/parent/RecentPayments";
import { StudentInformation } from "@/components/dashboard/parent/StudentInformation";
import { CertificatesSection } from "@/components/dashboard/parent/CertificatesSection";
import { FeedbackSection } from "@/components/dashboard/parent/FeedbackSection";
import { PaymentTrackingSection } from "@/components/dashboard/parent/PaymentTrackingSection";
import { ParentSidebar } from "@/components/dashboard/parent/ParentSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface Student {
  id: string;
  full_name: string;
}

interface ClassSchedule {
  id: string;
  scheduled_at: string;
  status: string;
}

interface FeePayment {
  id: string;
  amount: number;
  payment_date: string;
  status: string;
  description: string;
}

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
          .select('*')
          .eq('parent_id', session.user.id);

        if (studentsError) throw studentsError;
        setStudents(studentsData || []);

        if (studentsData && studentsData.length > 0) {
          const { data: schedulesData, error: schedulesError } = await supabase
            .from('class_schedules')
            .select('*')
            .eq('student_id', studentsData[0].id)
            .order('scheduled_at', { ascending: true })
            .limit(5);

          if (schedulesError) throw schedulesError;
          setSchedules(schedulesData || []);

          const { data: paymentsData, error: paymentsError } = await supabase
            .from('fee_payments')
            .select('*')
            .eq('student_id', studentsData[0].id)
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
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <UpcomingClasses schedules={schedules} />
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