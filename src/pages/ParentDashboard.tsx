import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

interface StudentInfo {
  name: string;
  course: string;
  nextClass: Date;
  teacher: string;
  nextFeesDue: Date;
}

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/parents/login");
        return;
      }

      // For demo purposes, using dummy data
      setStudentInfo({
        name: "John Doe",
        course: "AI for Budding Entrepreneurs",
        nextClass: new Date("2024-04-20T10:00:00"),
        teacher: "Manisha",
        nextFeesDue: new Date("2024-05-01")
      });
    };

    fetchStudentInfo();
  }, [navigate]);

  if (!studentInfo) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold mb-8">Welcome to Parent Dashboard</h1>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Student Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {studentInfo.name}</p>
            <p><span className="font-medium">Course:</span> {studentInfo.course}</p>
            <p><span className="font-medium">Next Class:</span> {format(studentInfo.nextClass, "PPpp")}</p>
            <p><span className="font-medium">Teacher:</span> {studentInfo.teacher}</p>
            <p><span className="font-medium">Next Fees Due:</span> {format(studentInfo.nextFeesDue, "PP")}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ParentDashboard;