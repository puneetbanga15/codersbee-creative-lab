import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

interface ClassSchedule {
  studentName: string;
  classDateTime: Date;
}

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<ClassSchedule[]>([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/teachers/login");
        return;
      }

      // For demo purposes, using dummy data
      setSchedule([
        {
          studentName: "John Doe",
          classDateTime: new Date("2024-04-20T10:00:00")
        },
        {
          studentName: "Jane Smith",
          classDateTime: new Date("2024-04-20T11:00:00")
        }
      ]);
    };

    fetchSchedule();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold mb-8">Teacher Dashboard</h1>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Today's Schedule (IST)</h2>
          <div className="space-y-4">
            {schedule.map((class_, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <p><span className="font-medium">Student:</span> {class_.studentName}</p>
                <p><span className="font-medium">Time:</span> {format(class_.classDateTime, "p")}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;