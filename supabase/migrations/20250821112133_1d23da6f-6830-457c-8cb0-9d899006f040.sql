-- Make the ai-learning-slides bucket public so PDFs can be accessed
UPDATE storage.buckets 
SET public = true 
WHERE name = 'ai-learning-slides';