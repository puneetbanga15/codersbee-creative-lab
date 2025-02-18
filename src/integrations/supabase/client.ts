
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = 'https://jjshsfsmgbrhypotcwvx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqc2hzZnNtZ2JyaHlwb3Rjd3Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2MzA0MDksImV4cCI6MjA0OTIwNjQwOX0.f4hLGrX8ZeYe6L4GpfpOnCnnA7NzxdJne3eLrbLQGHw';

// Add validation for URL and key
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration');
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-application-name': 'codersbee',
    },
  },
});

// Helper function for handling database responses
export async function handleDatabaseResponse<T>(
  promise: Promise<{ data: T | null; error: any }>
): Promise<T | null> {
  try {
    const { data, error } = await promise;
    if (error) {
      console.error('Database error:', error);
      return null;
    }
    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}
