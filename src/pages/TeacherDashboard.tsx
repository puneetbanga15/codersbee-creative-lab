import React from "react";
import { supabase } from "@/integrations/supabase/client";

const TeacherDashboard = () => {
  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <div>
        <h2>Welcome to the Teacher Dashboard</h2>
        <p>This is where you can manage your teaching activities.</p>
      </div>
    </div>
  );
};

export default TeacherDashboard;