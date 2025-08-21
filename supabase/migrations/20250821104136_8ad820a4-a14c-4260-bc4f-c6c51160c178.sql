-- Fix security issue: Enable RLS on tables that have policies but RLS is disabled
-- This addresses the "Policy Exists RLS Disabled" security vulnerability

-- Enable Row Level Security on class_attendance table
-- This table has 2 policies but RLS was not enabled
ALTER TABLE public.class_attendance ENABLE ROW LEVEL SECURITY;

-- Enable Row Level Security on fee_configurations table  
-- This table has 1 policy but RLS was not enabled
ALTER TABLE public.fee_configurations ENABLE ROW LEVEL SECURITY;

-- Now both tables are properly secured:
-- class_attendance: Has policies for admins and teachers to manage attendance
-- fee_configurations: Has policy for admins to manage fee configurations