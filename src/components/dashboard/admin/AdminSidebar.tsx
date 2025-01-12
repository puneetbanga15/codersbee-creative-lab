import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  Home, 
  Users, 
  GraduationCap, 
  FileText,
  Settings,
  UserPlus,
  ScrollText
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      title: "Overview",
      icon: Home,
      path: "/teachers/dashboard"
    },
    {
      title: "Teachers",
      icon: GraduationCap,
      path: "/teachers/dashboard/teachers"
    },
    {
      title: "Parents",
      icon: Users,
      path: "/teachers/dashboard/parents"
    },
    {
      title: "Admins",
      icon: UserPlus,
      path: "/teachers/dashboard/admins"
    },
    {
      title: "Certificates",
      icon: ScrollText,
      path: "/teachers/dashboard/certificates"
    },
    {
      title: "Documents",
      icon: FileText,
      path: "/teachers/dashboard/documents"
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/teachers/dashboard/settings"
    }
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.path)}
                    isActive={location.pathname === item.path}
                    tooltip={item.title}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}