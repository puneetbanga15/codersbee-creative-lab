import { supabase } from "@/integrations/supabase/client";

export async function createTeacherAccount(email: string, password: string, fullName: string, phone: string) {
  // First create the auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone_number: phone,
        role: 'teacher'
      }
    }
  });

  if (authError) throw authError;

  // The profile will be created automatically through the database trigger
  // that watches for new users in auth.users

  return authData;
}