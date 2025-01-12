import React from "react";
import { Routes, Route } from "react-router-dom";
import { TeacherDashboardHeader } from "@/components/TeacherDashboardHeader";
import { TeachersTab } from "@/components/dashboard/TeachersTab";
import { ParentsTab } from "@/components/dashboard/ParentsTab";
import { AdminsTab } from "@/components/dashboard/AdminsTab";
import { CertificatesTab } from "@/components/dashboard/CertificatesTab";
import { DocumentsTab } from "@/components/dashboard/DocumentsTab";
import { FeeManagementTab } from "@/components/dashboard/FeeManagementTab";
import { AdminSidebar } from "@/components/dashboard/admin/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useUserRole } from "@/hooks/useUserRole";

const TeacherDashboard = () => {
  const { data: userRole } = useUserRole();
  const isAdmin = userRole === 'admin';

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        {isAdmin && <AdminSidebar />}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
              <SidebarTrigger className="mr-4" />
              <TeacherDashboardHeader />
            </div>
            
            <Routes>
              <Route index element={<TeachersTab />} />
              <Route path="teachers" element={<TeachersTab />} />
              <Route path="parents" element={<ParentsTab />} />
              {isAdmin && <Route path="admins" element={<AdminsTab />} />}
              <Route path="certificates" element={<CertificatesTab />} />
              <Route path="documents" element={<DocumentsTab />} />
              {isAdmin && <Route path="fees" element={<FeeManagementTab />} />}
            </Routes>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default TeacherDashboard;