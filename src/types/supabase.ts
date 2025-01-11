import { Database as DatabaseGenerated } from '@/integrations/supabase/types';
import { supabase } from '@/integrations/supabase/client';

export type Database = DatabaseGenerated;
export type Tables = Database['public']['Tables'];
export type Enums = Database['public']['Enums'];

// Helper types for common tables
export type Profile = Tables['profiles']['Row'];
export type Student = Tables['students']['Row'];
export type ClassSchedule = Tables['class_schedules']['Row'];
export type FeePayment = Tables['fee_payments']['Row'];
export type Certificate = Tables['certificates']['Row'];
export type Quiz = Tables['quizzes']['Row'];
export type QuizQuestion = Tables['quiz_questions']['Row'];
export type QuizAccessCode = Tables['quiz_access_codes']['Row'];
export type Project = Tables['student_projects']['Row'];

// Type guards for error checking
export function isError<T>(data: T | { error: true }): data is { error: true } {
  return (data as any)?.error === true;
}

// Helper for handling Supabase query responses
export function handleQueryResponse<T>(response: { data: T | null; error: any }) {
  if (response.error) {
    console.error('Supabase query error:', response.error);
    return null;
  }
  return response.data;
}

// Type-safe database query helpers
export const dbHelpers = {
  async getProfileById(id: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    return handleQueryResponse({ data, error });
  },

  async getStudentsByParentId(parentId: string): Promise<Student[] | null> {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('parent_id', parentId);
    
    return handleQueryResponse({ data, error });
  },

  async getClassSchedules(studentId: string): Promise<ClassSchedule[] | null> {
    const { data, error } = await supabase
      .from('class_schedules')
      .select('*')
      .eq('student_id', studentId);
    
    return handleQueryResponse({ data, error });
  }
};