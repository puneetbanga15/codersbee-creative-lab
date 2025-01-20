import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const StudentJourneyEditor = () => {
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [selectedMilestone, setSelectedMilestone] = useState<string>("");

  const { data: students } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const { data } = await supabase
        .from('students')
        .select('id, full_name');
      return data || [];
    }
  });

  const milestoneTypes = [
    { value: 'scratch_fundamentals', label: 'Scratch Fundamentals' },
    { value: 'scratch_advanced', label: 'Scratch Advanced' },
    { value: 'web_fundamentals', label: 'Web Development Fundamentals' },
    { value: 'web_advanced', label: 'Web Development Advanced' },
    { value: 'python_basics', label: 'Python Basics' },
    { value: 'python_advanced', label: 'Python Advanced' },
    { value: 'ai_fundamentals', label: 'AI Fundamentals' },
    { value: 'generative_ai_creativity', label: 'Generative AI for Creativity' },
    { value: 'advanced_generative_ai', label: 'Advanced Generative AI' },
    { value: 'ai_master', label: 'AI Master' }
  ];

  const handleCompleteMilestone = async () => {
    if (!selectedStudent || !selectedMilestone) {
      toast.error("Please select both a student and a milestone");
      return;
    }

    try {
      const { error } = await supabase
        .from('student_journey_milestones')
        .insert({
          student_id: selectedStudent,
          milestone_type: selectedMilestone,
          completion_status: 'completed',
          completed_at: new Date().toISOString()
        });

      if (error) throw error;

      toast.success("Milestone completed successfully!");
      setSelectedMilestone("");
    } catch (error) {
      console.error('Error completing milestone:', error);
      toast.error("Failed to complete milestone");
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Student Journey Editor</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Select Student</label>
          <Select
            value={selectedStudent}
            onValueChange={setSelectedStudent}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a student" />
            </SelectTrigger>
            <SelectContent>
              {students?.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.full_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Select Milestone</label>
          <Select
            value={selectedMilestone}
            onValueChange={setSelectedMilestone}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a milestone" />
            </SelectTrigger>
            <SelectContent>
              {milestoneTypes.map((milestone) => (
                <SelectItem key={milestone.value} value={milestone.value}>
                  {milestone.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleCompleteMilestone}
          className="w-full"
          disabled={!selectedStudent || !selectedMilestone}
        >
          Complete Milestone
        </Button>
      </div>
    </Card>
  );
};