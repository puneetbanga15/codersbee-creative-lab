import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jjshsfsmgbrhypotcwvx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqc2hzZnNtZ2JyaHlwb3Rjd3Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2MzA0MDksImV4cCI6MjA0OTIwNjQwOX0.f4hLGrX8ZeYe6L4GpfpOnCnnA7NzxdJne3eLrbLQGHw";

// Initialize the Supabase client with proper configuration and error handling
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  },
  // Add proper error handling for network requests
  fetch: (url, options) => {
    // Remove any trailing colons from the URL
    const cleanUrl = url.replace(/:\/?$/, '');
    // Add proper error handling
    return fetch(cleanUrl, options).then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        console.error('Supabase request failed:', {
          url: cleanUrl,
          status: response.status,
          error
        });
      }
      return response;
    }).catch((error) => {
      console.error('Network error:', error);
      throw error;
    });
  }
});