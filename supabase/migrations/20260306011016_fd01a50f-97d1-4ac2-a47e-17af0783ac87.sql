-- Single-row table to persist the entire project JSON state
CREATE TABLE public.project_data (
  id TEXT NOT NULL DEFAULT 'main' PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Allow anyone to read/write (no auth, shared project)
ALTER TABLE public.project_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read project data"
  ON public.project_data FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert project data"
  ON public.project_data FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update project data"
  ON public.project_data FOR UPDATE
  USING (true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_project_data_updated_at
  BEFORE UPDATE ON public.project_data
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();