import { Menu } from "lucide-react";
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

export type QuizType = 'scratch' | 'python' | 'ai' | 'web' | 'cloud' | 'free' | 'premium' | null;

type QuizSidebarProps = {
  selectedType: QuizType;
  onTypeSelect: (type: QuizType) => void;
};

export function QuizSidebar({ selectedType, onTypeSelect }: QuizSidebarProps) {
  const quizCategories: { value: QuizType; label: string }[] = [
    { value: null, label: 'All Quizzes' },
    { value: 'scratch', label: 'Scratch' },
    { value: 'python', label: 'Python' },
    { value: 'web', label: 'Web Development' },
    { value: 'cloud', label: 'Cloud Computing' },
    { value: 'ai', label: 'AI & ML' },
    { value: 'free', label: 'Free Quizzes' },
    { value: 'premium', label: 'Premium' },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Quiz Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quizCategories.map((category) => (
                <SidebarMenuItem key={category.label}>
                  <SidebarMenuButton
                    onClick={() => onTypeSelect(category.value)}
                    className={selectedType === category.value ? "bg-codersbee-vivid text-white" : ""}
                  >
                    <Menu className="w-4 h-4 mr-2" />
                    <span>{category.label}</span>
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