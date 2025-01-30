import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ClassSchedule {
  id: string;
  scheduled_at: string;
  status: string;
  teacher: {
    full_name: string;
  };
}

export const UpcomingClasses = ({ schedules }: { schedules: ClassSchedule[] }) => {
  return (
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
            <div key={schedule.id} className="flex flex-col space-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">With {schedule.teacher.full_name}</p>
                  <p className="text-sm text-gray-500">{schedule.scheduled_at}</p>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-codersbee-purple text-codersbee-vivid">
                  {schedule.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};