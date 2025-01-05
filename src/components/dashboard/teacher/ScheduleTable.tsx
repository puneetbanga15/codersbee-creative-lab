import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { format } from "date-fns";

interface Schedule {
  id: string;
  scheduled_at: string;
  teacher: { full_name: string };
  student: { full_name: string };
}

export const ScheduleTable = ({ schedules }: { schedules: Schedule[] }) => {
  return (
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
  );
};