import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Loader2, CreditCard, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const PaymentTrackingSection = () => {
  const { data: payments, isLoading } = useQuery({
    queryKey: ['parent-payment-tracking'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: students } = await supabase
        .from('students')
        .select('id')
        .eq('parent_id', user.id);

      if (!students?.length) return [];

      const studentIds = students.map(s => s.id);

      // Get both payment tracking and fee management data
      const [paymentTrackingData, feeManagementData] = await Promise.all([
        supabase
          .from('payment_tracking')
          .select(`
            *,
            student:students(
              full_name
            )
          `)
          .in('student_id', studentIds)
          .order('paid_until_date', { ascending: false }),
        
        supabase
          .from('fee_management')
          .select('*')
          .in('student_id', studentIds)
          .eq('status', 'pending')
      ]);

      return {
        payments: paymentTrackingData.data || [],
        pendingFees: feeManagementData.data || []
      };
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-codersbee-vivid" />
          <CardTitle>Payment Status</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : !payments?.payments.length ? (
          <p className="text-center text-muted-foreground">No payment records available.</p>
        ) : (
          <div className="space-y-4">
            {payments.pendingFees.length > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You have {payments.pendingFees.length} pending payment(s). Please contact administration.
                </AlertDescription>
              </Alert>
            )}
            
            {payments.payments.map((payment) => (
              <div key={payment.id} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{payment.student?.full_name}</p>
                    <p className="text-sm text-muted-foreground">
                      Paid until: {format(new Date(payment.paid_until_date), 'PPP')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Mode: {payment.payment_mode === 'paypal' ? 'PayPal' : 'Bank Transfer'}
                    </p>
                    {payment.payment_reference && (
                      <p className="text-sm text-muted-foreground">
                        Ref: {payment.payment_reference}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};