import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { format } from "date-fns";

interface Payment {
  id: string;
  payment_date: string;
  student: { full_name: string };
  amount: number;
  status: string;
}

export const PaymentsTable = ({ payments }: { payments: Payment[] }) => {
  return (
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
  );
};