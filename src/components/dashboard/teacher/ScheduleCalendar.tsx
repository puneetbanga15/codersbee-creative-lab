import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { subMonths } from "date-fns";

interface ScheduleCalendarProps {
  selectedMonth: Date;
  setSelectedMonth: (date: Date) => void;
}

export const ScheduleCalendar = ({ selectedMonth, setSelectedMonth }: ScheduleCalendarProps) => {
  return (
    <div className="space-y-4">
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
      <Calendar
        mode="single"
        selected={selectedMonth}
        onSelect={(date) => date && setSelectedMonth(date)}
        className="rounded-md border"
      />
    </div>
  );
};