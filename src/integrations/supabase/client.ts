import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Add detailed validation and logging
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Missing required environment variables: VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY');
}

// Validate URL format
if (!supabaseUrl.startsWith('https://')) {
  console.error('Invalid Supabase URL format');
  throw new Error('Supabase URL must start with https://');
}

// Validate that the key is not malformed
if (!supabaseAnonKey.includes('.')) {
  console.error('Invalid Supabase anon key format');
  throw new Error('Invalid Supabase anonymous key format');
}

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
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
  }
);

// Add error handling and response type helpers
export async function handleDatabaseResponse<T>(
  promise: Promise<{ data: T | null; error: any }>
): Promise<T | null> {
  try {
    const { data, error } = await promise;
    if (error) {
      console.error('Database error:', error);
      if (error.message?.includes('Invalid API key')) {
        console.error('Invalid API key detected. Please check your environment variables.');
      }
      return null;
    }
    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}