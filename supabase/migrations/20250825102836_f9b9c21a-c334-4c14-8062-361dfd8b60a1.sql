-- Fix student projects security vulnerability
-- Remove policies that allow public access to student projects
DROP POLICY IF EXISTS "Anyone can view student projects" ON student_projects;
DROP POLICY IF EXISTS "anyone_can_view_student_projects" ON student_projects;

-- Create secure policy that requires authentication
CREATE POLICY "Authenticated users can view student projects" 
ON student_projects 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Keep existing admin/teacher management policy
-- The "teachers_and_admins_can_manage_projects" policy already exists and is secure