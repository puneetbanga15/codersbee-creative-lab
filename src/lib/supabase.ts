import { createClient } from '@supabase/supabase-js';

// Create a single instance of the Supabase client
const supabaseUrl = 'https://xyzcompanyidgoeshere.supabase.co';
const supabaseAnonKey = 'your-anon-key-goes-here';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Prevent multiple instances warning by exporting the same instance
export default supabase;