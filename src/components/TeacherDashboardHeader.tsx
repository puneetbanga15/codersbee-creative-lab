import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddParentForm } from "./AddParentForm";
import { AddTeacherForm } from "./AddTeacherForm";
import { useQuery } from "@tanstack/react-query";

export const TeacherDashboardHeader = () => {
  const navigate = useNavigate();
  const [showAddParent, setShowAddParent] = React.useState(false);
  const [showAddTeacher, setShowAddTeacher] = React.useState(false);

  const { data: userProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/teachers/login");
  };

  const isAdmin = userProfile?.role === 'admin';

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">
        {isAdmin ? 'Admin Dashboard' : 'Teacher Dashboard'}
      </h1>
      <div className="flex gap-4">
        {isAdmin && (
          <>
            <Dialog open={showAddParent} onOpenChange={setShowAddParent}>
              <DialogTrigger asChild>
                <Button>Add Parent</Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Parent</DialogTitle>
                </DialogHeader>
                <AddParentForm onSuccess={() => setShowAddParent(false)} />
              </DialogContent>
            </Dialog>

            <Dialog open={showAddTeacher} onOpenChange={setShowAddTeacher}>
              <DialogTrigger asChild>
                <Button>Add Teacher</Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Teacher</DialogTitle>
                </DialogHeader>
                <AddTeacherForm onSuccess={() => setShowAddTeacher(false)} />
              </DialogContent>
            </Dialog>
          </>
        )}
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};