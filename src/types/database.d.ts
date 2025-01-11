// Define common types used across the application
export interface Student {
  id: string;
  full_name: string;
  parent_id?: string;
  timezone?: string;
}

export interface ClassSchedule {
  id: string;
  scheduled_at: string;
  status: string;
  student_id?: string;
  teacher_id?: string;
}

export interface FeePayment {
  id: string;
  amount: number;
  payment_date: string;
  status: string;
  description: string;
  student_id?: string;
}

export interface Schedule {
  id: string;
  scheduled_at: string;
  teacher: {
    full_name: string;
  };
  student: {
    full_name: string;
  };
}

export interface Payment {
  id: string;
  payment_date: string;
  student: {
    full_name: string;
  };
  amount: number;
  status: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty_level: string;
  project_type: string;
  session_number: number;
  project_url?: string;
  created_at: string;
}