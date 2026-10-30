-- ==============================================================================
-- SolveIt AI - Supabase PostgreSQL Schema & Realtime Setup
-- ==============================================================================
-- Run this script in the Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- It creates the `reports` table, enables Row Level Security (RLS), adds indexes,
-- and configures Realtime notifications for collaborative civic dispatch.
-- ==============================================================================

-- 1. Create the `reports` table
CREATE TABLE IF NOT EXISTS public.reports (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    location JSONB NOT NULL DEFAULT '{}'::jsonb,
    status TEXT NOT NULL DEFAULT 'Submitted',
    assigned_department TEXT,
    priority_score INTEGER NOT NULL DEFAULT 50,
    priority_tier TEXT NOT NULL DEFAULT 'MEDIUM',
    priority_breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
    ai_summary TEXT,
    duplicate_of TEXT,
    duplicate_count INTEGER DEFAULT 0,
    reported_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    reporter JSONB DEFAULT '{}'::jsonb,
    cluster_id TEXT,
    upvotes INTEGER DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Indexes for fast geospatial and priority queries
CREATE INDEX IF NOT EXISTS idx_reports_status ON public.reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_category ON public.reports(category);
CREATE INDEX IF NOT EXISTS idx_reports_priority_score ON public.reports(priority_score DESC);
CREATE INDEX IF NOT EXISTS idx_reports_duplicate_of ON public.reports(duplicate_of);
CREATE INDEX IF NOT EXISTS idx_reports_cluster_id ON public.reports(cluster_id);
CREATE INDEX IF NOT EXISTS idx_reports_reported_at ON public.reports(reported_at DESC);

-- 3. Auto-update `updated_at` trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_reports_updated_at ON public.reports;
CREATE TRIGGER trigger_reports_updated_at
BEFORE UPDATE ON public.reports
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- 5. Policies: Allow public read, insert, and update for anonymous and authenticated users
DROP POLICY IF EXISTS "Public read access for reports" ON public.reports;
CREATE POLICY "Public read access for reports"
ON public.reports FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Public insert access for reports" ON public.reports;
CREATE POLICY "Public insert access for reports"
ON public.reports FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Public update access for reports" ON public.reports;
CREATE POLICY "Public update access for reports"
ON public.reports FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 6. Enable Realtime Replication for the `reports` table
-- This allows instant broadcast across all open dashboards when a citizen reports or a status updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.reports;
