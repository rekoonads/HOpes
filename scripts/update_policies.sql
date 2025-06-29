-- This script assumes the 'inquiries' table and its public insert policy already exist.

-- 1. Allow authenticated users to read all inquiries.
-- This is for the admin dashboard to display the data.
CREATE POLICY "Allow admin read access"
ON public.inquiries
FOR SELECT
TO authenticated
USING (true);

-- 2. Allow authenticated users to delete inquiries.
-- This is for the delete functionality in the admin dashboard.
CREATE POLICY "Allow admin delete access"
ON public.inquiries
FOR DELETE
TO authenticated
USING (true);

-- 3. (Optional but recommended) You might want to restrict the public insert policy
-- if you have other ways of inserting data, but for a simple contact form, it's fine.
-- The existing "Allow public insert" policy is sufficient.
