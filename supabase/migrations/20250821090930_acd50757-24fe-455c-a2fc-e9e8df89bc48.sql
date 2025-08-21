-- Fix security issue: Enable RLS on trial_bookings table and fix policy configurations
-- This prevents unauthorized access to customer phone numbers and personal data

-- Enable Row Level Security on the trial_bookings table
ALTER TABLE public.trial_bookings ENABLE ROW LEVEL SECURITY;

-- Drop and recreate the staff viewing policy with correct role assignment
DROP POLICY IF EXISTS "Only staff can view bookings" ON public.trial_bookings;

CREATE POLICY "Only staff can view bookings" 
ON public.trial_bookings 
FOR SELECT 
TO authenticated
USING (
  auth.uid() IN (
    SELECT profiles.id
    FROM profiles
    WHERE profiles.role = ANY (ARRAY['admin'::user_role, 'teacher'::user_role])
  )
);

-- The table now has proper security:
-- 1. RLS is enabled
-- 2. Anonymous users can INSERT (for trial bookings - this is needed for public sign-ups)
-- 3. Only authenticated admin/teacher users can SELECT (view customer data)
-- 4. Only authenticated admin/teacher users can UPDATE/DELETE