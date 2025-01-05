import { format } from "date-fns";
import { CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeePayment {
  id: string;
  amount: number;
  payment_date: string;
  status: string;
  description: string;
}

export const RecentPayments = ({ payments }: { payments: FeePayment[] }) => {
  return (
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
  );
};