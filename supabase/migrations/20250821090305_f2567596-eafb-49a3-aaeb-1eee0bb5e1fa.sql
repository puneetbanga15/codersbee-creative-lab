-- Fix security issue: Remove overly permissive RLS policies on trial_bookings table
-- This prevents unauthorized access to customer phone numbers and personal data

-- Drop the overly permissive policies that allow public viewing
DROP POLICY IF EXISTS "Allow authenticated users to manage" ON public.trial_bookings;
DROP POLICY IF EXISTS "Allow authenticated users to view" ON public.trial_bookings;

-- Add restrictive management policies for staff only
CREATE POLICY "Only staff can update trial bookings" 
ON public.trial_bookings 
FOR UPDATE
TO authenticated
USING (
  auth.uid() IN (
    SELECT profiles.id
    FROM profiles
    WHERE profiles.role = ANY (ARRAY['admin'::user_role, 'teacher'::user_role])
  )
)
WITH CHECK (
  auth.uid() IN (
    SELECT profiles.id
    FROM profiles
    WHERE profiles.role = ANY (ARRAY['admin'::user_role, 'teacher'::user_role])
  )
);

CREATE POLICY "Only staff can delete trial bookings" 
ON public.trial_bookings 
FOR DELETE
TO authenticated
USING (
  auth.uid() IN (
    SELECT profiles.id
    FROM profiles
    WHERE profiles.role = ANY (ARRAY['admin'::user_role, 'teacher'::user_role])
  )
);

-- Note: The following policies remain unchanged:
-- - "Allow anonymous insertions" and "Allow public inserts" (needed for public trial sign-ups)
-- - "Only staff can view bookings" (correct - restricts viewing to admin/teacher roles)