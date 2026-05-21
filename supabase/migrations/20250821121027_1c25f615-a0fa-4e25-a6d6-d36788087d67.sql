-- Remove the overly permissive policy that allows anyone to read access codes
DROP POLICY IF EXISTS "anyone_can_verify_access_codes" ON quiz_access_codes;

-- Create a secure function to verify access codes without exposing them
CREATE OR REPLACE FUNCTION public.verify_quiz_access_code(quiz_uuid uuid, code_input text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM quiz_access_codes 
    WHERE quiz_id = quiz_uuid 
      AND access_code = code_input 
      AND is_active = true
  );
$$;

-- Grant execute permission to authenticated and anonymous users for the verification function
GRANT EXECUTE ON FUNCTION public.verify_quiz_access_code(uuid, text) TO authenticated, anon;

-- Add a more restrictive policy for reading access codes - only admins and teachers can see them
CREATE POLICY "only_staff_can_view_access_codes" 
ON quiz_access_codes 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM profiles 
    WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'teacher')
  )
);