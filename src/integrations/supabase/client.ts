import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
  global: {
    headers: {
      'x-application-name': 'codersbee',
    },
  },
});

// Add error handling and response type helpers
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