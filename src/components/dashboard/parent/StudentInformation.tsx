import { MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Student {
  id: string;
  full_name: string;
  readable_id: string;
}

export const StudentInformation = ({ students }: { students: Student[] }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-codersbee-vivid" />
        <h2 className="text-xl font-semibold">Student Information</h2>
      </div>
      <div className="space-y-3">
        {students.map((student) => (
          <div key={student.id} className="p-3 bg-gray-50 rounded-lg">
            <p className="font-medium">{student.full_name}</p>
            <p className="text-sm text-gray-500">ID: {student.readable_id}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};