import React, { useState } from "react";
import { TeacherDashboardHeader } from "@/components/TeacherDashboardHeader";
import { TeachersTab } from "@/components/dashboard/TeachersTab";
import { ParentsTab } from "@/components/dashboard/ParentsTab";
import { AdminsTab } from "@/components/dashboard/AdminsTab";
import { CertificatesTab } from "@/components/dashboard/CertificatesTab";
import { AdminSidebar } from "@/components/dashboard/admin/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserRole } from "@/hooks/useUserRole";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("teachers");
  const { data: userRole } = useUserRole();
  const isAdmin = userRole === 'admin';

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        {isAdmin && <AdminSidebar />}
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
              <SidebarTrigger className="mr-4" />
              <TeacherDashboardHeader />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList>
                <TabsTrigger value="teachers">Teachers</TabsTrigger>
                <TabsTrigger value="parents">Parents</TabsTrigger>
                {isAdmin && <TabsTrigger value="admins">Admins</TabsTrigger>}
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
              </TabsList>

              <TabsContent value="teachers" className="space-y-6">
                <TeachersTab />
              </TabsContent>

              <TabsContent value="parents" className="space-y-6">
                <ParentsTab />
              </TabsContent>

              {isAdmin && (
                <TabsContent value="admins" className="space-y-6">
                  <AdminsTab />
                </TabsContent>
              )}

              <TabsContent value="certificates" className="space-y-6">
                <CertificatesTab />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default TeacherDashboard;