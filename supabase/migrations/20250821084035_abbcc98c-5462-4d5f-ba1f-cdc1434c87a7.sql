-- Fix security issue: Remove overly permissive RLS policies on trial_bookings table
-- This prevents unauthorized access to customer phone numbers and personal data

-- Drop the overly permissive policies that allow public viewing
DROP POLICY IF EXISTS "Allow authenticated users to manage" ON public.trial_bookings;
DROP POLICY IF EXISTS "Allow authenticated users to view" ON public.trial_bookings;

-- Keep the anonymous insert policy for trial bookings (this is needed for public sign-ups)
-- Keep the staff-only view policy (this is correct)

-- Add a more restrictive management policy for staff only
CREATE POLICY "Only staff can manage trial bookings" 
ON public.trial_bookings 
FOR UPDATE, DELETE
TO authenticated
USING (
  auth.uid() IN (
    SELECT profiles.id
    FROM profiles
    WHERE profiles.role = ANY (ARRAY['admin'::user_role, 'teacher'::user_role])
  )
);

-- Ensure the existing policies are properly configured
-- The "Allow anonymous insertions" and "Allow public inserts" policies should remain for trial sign-ups
-- The "Only staff can view bookings" policy should remain for viewing customer data