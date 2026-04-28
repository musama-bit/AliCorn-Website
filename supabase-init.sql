-- Supabase table and policies for Alicorn profile storage

CREATE TABLE IF NOT EXISTS public.profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  company_name text NOT NULL,
  brand_name text NOT NULL,
  brand_overview text NOT NULL,
  unique_value_proposition text NOT NULL,
  social_platforms text NOT NULL,
  product_category text NOT NULL CHECK (product_category IN ('Product', 'Service')),
  email text NOT NULL DEFAULT '',
  full_name text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS email text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS full_name text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profiles'
      AND policyname = 'Allow users to select their own profile'
  ) THEN
    CREATE POLICY "Allow users to select their own profile" ON public.profiles
      FOR SELECT USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profiles'
      AND policyname = 'Allow users to insert their own profile'
  ) THEN
    CREATE POLICY "Allow users to insert their own profile" ON public.profiles
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profiles'
      AND policyname = 'Allow users to update their own profile'
  ) THEN
    CREATE POLICY "Allow users to update their own profile" ON public.profiles
      FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END
$$;
