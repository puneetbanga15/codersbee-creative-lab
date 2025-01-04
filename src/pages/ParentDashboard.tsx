import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Calendar, CreditCard, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
        // Fetch students
        const { data: studentsData, error: studentsError } = await supabase
          .from('students')
          .select('*')
          .eq('parent_id', session.user.id);

        if (studentsError) throw studentsError;
        setStudents(studentsData || []);

        if (studentsData && studentsData.length > 0) {
          // Fetch schedules
          const { data: schedulesData, error: schedulesError } = await supabase
            .from('class_schedules')
            .select('*')
            .eq('student_id', studentsData[0].id)
            .order('scheduled_at', { ascending: true })
            .limit(5);

          if (schedulesError) throw schedulesError;
          setSchedules(schedulesData || []);

          // Fetch payments
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold mb-8">Welcome to Parent Dashboard</h1>
        
        {students.length === 0 ? (
          <Card className="p-6">
            <p>No students found. Please contact support to add your children.</p>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Upcoming Classes */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-codersbee-vivid" />
                <h2 className="text-xl font-semibold">Upcoming Classes</h2>
              </div>
              {schedules.length === 0 ? (
                <p className="text-gray-500">No upcoming classes scheduled.</p>
              ) : (
                <div className="space-y-3">
                  {schedules.map((schedule) => (
                    <div key={schedule.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{format(new Date(schedule.scheduled_at), "PPP")}</p>
                        <p className="text-sm text-gray-500">{format(new Date(schedule.scheduled_at), "p")}</p>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-codersbee-purple text-codersbee-vivid">
                        {schedule.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Recent Payments */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-codersbee-vivid" />
                <h2 className="text-xl font-semibold">Recent Payments</h2>
              </div>
              {payments.length === 0 ? (
                <p className="text-gray-500">No payment history found.</p>
              ) : (
                <div className="space-y-3">
                  {payments.map((payment) => (
                    <div key={payment.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">${payment.amount}</p>
                        <p className="text-sm text-gray-500">{format(new Date(payment.payment_date), "PP")}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        payment.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Student Information */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-codersbee-vivid" />
                <h2 className="text-xl font-semibold">Student Information</h2>
              </div>
              <div className="space-y-3">
                {students.map((student) => (
                  <div key={student.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">{student.full_name}</p>
                    <p className="text-sm text-gray-500">Student ID: {student.id}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;