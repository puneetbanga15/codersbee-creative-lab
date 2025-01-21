import { LucideIcon } from "lucide-react";

export interface Milestone {
  title: string;
  description: string;
  completed: boolean;
  icon: JSX.Element;
  type: string;
}

export interface Track {
  name: string;
  color: string;
  icon: JSX.Element;
  milestones: Milestone[];
}