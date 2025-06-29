-- Create the posts table
CREATE TABLE IF NOT EXISTS posts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  published_at TIMESTAMPTZ,
  is_published BOOLEAN DEFAULT false NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  excerpt TEXT,
  author_name TEXT
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policies for the 'posts' table

-- 1. Allow public read access to published posts
CREATE POLICY "Allow public read access on published posts"
ON public.posts
FOR SELECT
TO public
USING (is_published = true);

-- 2. Allow admin users full access (select, insert, update, delete)
CREATE POLICY "Allow admin full access"
ON public.posts
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
