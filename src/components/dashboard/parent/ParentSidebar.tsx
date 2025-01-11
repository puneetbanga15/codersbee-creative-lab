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
  GraduationCap, 
  Calendar, 
  CreditCard, 
  Certificate,
  MessageSquare,
  Settings
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function ParentSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      title: "Overview",
      icon: Home,
      path: "/parents/dashboard"
    },
    {
      title: "Classes",
      icon: GraduationCap,
      path: "/parents/dashboard/classes"
    },
    {
      title: "Schedule",
      icon: Calendar,
      path: "/parents/dashboard/schedule"
    },
    {
      title: "Payments",
      icon: CreditCard,
      path: "/parents/dashboard/payments"
    },
    {
      title: "Certificates",
      icon: Certificate,
      path: "/parents/dashboard/certificates"
    },
    {
      title: "Messages",
      icon: MessageSquare,
      path: "/parents/dashboard/messages"
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/parents/dashboard/settings"
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