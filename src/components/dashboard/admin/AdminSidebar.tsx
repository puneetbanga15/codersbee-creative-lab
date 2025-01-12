import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
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
  ScrollText,
  FolderOpen
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
      icon: FolderOpen,
      path: "/teachers/dashboard/documents"
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/teachers/dashboard/settings"
    }
  ];

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium text-gray-500">Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.path)}
                    isActive={location.pathname === item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      location.pathname === item.path 
                        ? 'bg-codersbee-vivid text-white' 
                        : 'hover:bg-gray-100'
                    }`}
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