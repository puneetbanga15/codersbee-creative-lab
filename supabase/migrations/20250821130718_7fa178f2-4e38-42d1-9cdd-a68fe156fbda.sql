-- Remove overly permissive policies that allow public access to educational content
DROP POLICY IF EXISTS "Anyone can view all quizzes" ON quizzes;
DROP POLICY IF EXISTS "Anyone can view questions for accessible quizzes" ON quiz_questions;

-- Create secure policies that require authentication for quiz access
CREATE POLICY "Authenticated users can view quizzes" 
ON quizzes 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Create secure policy for quiz questions - only authenticated users can access
CREATE POLICY "Authenticated users can view quiz questions" 
ON quiz_questions 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND EXISTS (
    SELECT 1 
    FROM quizzes 
    WHERE quizzes.id = quiz_questions.quiz_id
  )
);

-- Ensure staff can still manage quizzes and questions for administrative purposes
CREATE POLICY "Staff can manage quizzes" 
ON quizzes 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 
    FROM profiles 
    WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'teacher')
  )
);

CREATE POLICY "Staff can manage quiz questions" 
ON quiz_questions 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 
    FROM profiles 
    WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'teacher')
  )
);