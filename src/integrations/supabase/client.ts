import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jjshsfsmgbrhypotcwvx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqc2hzZnNtZ2JyaHlwb3Rjd3Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4MjM2MTAsImV4cCI6MjAyMzM5OTYxMH0.GYq9VqcGPfFV5T9ZNzGwKbHsF9wQn_nQzrk_xKO_YLk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);