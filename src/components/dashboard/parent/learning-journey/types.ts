
import type { Database } from "@/integrations/supabase/types";

type MilestoneType = Database['public']['Enums']['milestone_type'];

export interface Milestone {
  title: string;
  description: string;
  completed: boolean;
  icon: JSX.Element;
  type: MilestoneType;
}

export interface Track {
  name: string;
  color: string;
  icon: JSX.Element;
  milestones: Milestone[];
}
