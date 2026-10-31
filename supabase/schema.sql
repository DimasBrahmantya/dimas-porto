-- ==============================================================================
-- Supabase Schema for Projects Table
-- Paste this script into your Supabase SQL Editor if you want to store projects in Supabase
-- ==============================================================================

create table if not exists public.projects (
  id text primary key,
  slug text not null unique,
  title text not null,
  type text not null,
  category text not null check (category in ('webapp', 'uiux', 'academic', 'mobile')),
  year text not null,
  role text,
  desc text not null,
  full_description text not null,
  features text[] default '{}',
  tech text[] default '{}',
  image text not null,
  github_url text,
  live_url text,
  highlight boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.projects enable row level security;

-- Policy: Allow public read access
create policy "Allow public read access on projects"
  on public.projects
  for select
  to public
  using (true);

