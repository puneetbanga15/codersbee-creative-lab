-- Fix security issue: Enable RLS on emp table and restrict access to employee data
-- This prevents competitors from stealing employee information

-- Enable Row Level Security on the emp table
ALTER TABLE public.emp ENABLE ROW LEVEL SECURITY;

-- Create policy to only allow admin users to view employee data
CREATE POLICY "Only admins can view employee data" 
ON public.emp 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'::user_role
  )
);

-- Create policy to only allow admin users to manage employee data
CREATE POLICY "Only admins can manage employee data" 
ON public.emp 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'::user_role
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'::user_role
  )
);