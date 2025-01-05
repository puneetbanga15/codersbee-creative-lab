import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddParentForm } from "./AddParentForm";

export const TeacherDashboardHeader = () => {
  const navigate = useNavigate();
  const [showAddParent, setShowAddParent] = React.useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/teachers/login");
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
      <div className="flex gap-4">
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
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};