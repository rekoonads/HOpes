-- Create the inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  message TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public insert
CREATE POLICY "Allow public insert" ON inquiries FOR INSERT WITH CHECK (true);
