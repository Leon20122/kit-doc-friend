
-- Create storage bucket for project files (simulation files, PCB files, etc.)
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-files', 'project-files', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload files
CREATE POLICY "Anyone can upload project files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-files');

-- Allow anyone to read files
CREATE POLICY "Anyone can read project files"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-files');

-- Allow anyone to update files
CREATE POLICY "Anyone can update project files"
ON storage.objects FOR UPDATE
USING (bucket_id = 'project-files');

-- Allow anyone to delete files
CREATE POLICY "Anyone can delete project files"
ON storage.objects FOR DELETE
USING (bucket_id = 'project-files');
