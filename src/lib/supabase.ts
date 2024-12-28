import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  "https://xyzcompanyidgoeshere.supabase.co",
  "your-anon-key-goes-here"
);