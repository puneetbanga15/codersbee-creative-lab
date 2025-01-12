import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { 
  Users, 
  GraduationCap, 
  UserCog, 
  Calendar,
  Loader2
} from "lucide-react";
import { format, startOfWeek, endOfWeek, addWeeks } from "date-fns";

export const OverviewTab = () => {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [
        { count: teachersCount },
        { count: parentsCount },
        { count: adminsCount },
        { count: studentsCount }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'teacher'),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'parent'),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'admin'),
        supabase.from('students').select('*', { count: 'exact', head: true })
      ]);

      return {
        teachers: teachersCount || 0,
        parents: parentsCount || 0,
        admins: adminsCount || 0,
        students: studentsCount || 0
      };
    }
  });

  const { data: schedules, isLoading: schedulesLoading } = useQuery({
    queryKey: ['upcoming-schedules'],
    queryFn: async () => {
      const startDate = startOfWeek(new Date());
      const endDate = endOfWeek(addWeeks(new Date(), 1));

      const { data, error } = await supabase
        .from('class_schedules')
        .select(`
          id,
          scheduled_at,
          students (
            full_name
          ),
          teacher:profiles (
            full_name
          )
        `)
        .gte('scheduled_at', startDate.toISOString())
        .lte('scheduled_at', endDate.toISOString())
        .order('scheduled_at', { ascending: true });

      if (error) throw error;
      return data;
    }
  });

  const overviewCards = [
    {
      title: "Teachers",
      value: stats?.teachers || 0,
      icon: GraduationCap,
      color: "bg-codersbee-purple",
      textColor: "text-codersbee-vivid"
    },
    {
      title: "Parents",
      value: stats?.parents || 0,
      icon: Users,
      color: "bg-codersbee-green",
      textColor: "text-green-700"
    },
    {
      title: "Students",
      value: stats?.students || 0,
      icon: Users,
      color: "bg-codersbee-orange",
      textColor: "text-orange-700"
    },
    {
      title: "Admins",
      value: stats?.admins || 0,
      icon: UserCog,
      color: "bg-codersbee-yellow",
      textColor: "text-yellow-700"
    }
  ];

  if (statsLoading || schedulesLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-codersbee-vivid" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, index) => (
          <Card key={index} className={`p-6 ${card.color} bg-opacity-10 border-none`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className={`text-3xl font-bold ${card.textColor}`}>{card.value}</p>
              </div>
              <card.icon className={`w-12 h-12 ${card.textColor} opacity-80`} />
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-codersbee-vivid" />
          <h3 className="text-lg font-semibold">Upcoming Classes</h3>
        </div>
        <div className="space-y-4">
          {schedules?.map((schedule: any) => (
            <div key={schedule.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{schedule.students?.full_name}</p>
                <p className="text-sm text-gray-500">Teacher: {schedule.teacher?.full_name}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {format(new Date(schedule.scheduled_at), 'MMM dd, yyyy')}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(schedule.scheduled_at), 'hh:mm a')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};