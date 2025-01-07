import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jjshsfsmgbrhypotcwvx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqc2hzZnNtZ2JyaHlwb3Rjd3Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2MzA0MDksImV4cCI6MjA0OTIwNjQwOX0.f4hLGrX8ZeYe6L4GpfpOnCnnA7NzxdJne3eLrbLQGHw";

// Initialize the Supabase client with proper configuration
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  }
});