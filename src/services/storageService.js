/**
 * Storage & State Service
 * 
 * Supports hybrid persistence:
 * 1. Supabase PostgreSQL database with real-time replication
 * 2. Instant localStorage fallback for offline / standalone demos
 */
import { INITIAL_REPORTS } from "../data/initialReports";
import { getSupabaseClient, getSupabaseConfig } from "./supabaseClient";

const STORAGE_KEY = "solveit_reports_v1";

/**
 * Maps a frontend JavaScript report object to a Supabase PostgreSQL row
 */
export function mapReportToDbRow(report) {
  return {
    id: report.id,
    title: report.title,
    description: report.description,
    category: report.category,
    location: report.location || {},
    status: report.status || "Submitted",
    assigned_department: report.assignedDepartment || null,
    priority_score: Number(report.priorityScore) || 50,
    priority_tier: report.priorityTier || "MEDIUM",
    priority_breakdown: report.priorityBreakdown || {},
    ai_summary: report.aiSummary || null,
    duplicate_of: report.duplicateOf || null,
    duplicate_count: Number(report.duplicateCount) || 0,
    reported_at: report.reportedAt || new Date().toISOString(),
    resolved_at: report.resolvedAt || null,
    reporter: report.reporter || {},
    cluster_id: report.clusterId || null,
    upvotes: Number(report.upvotes) || 0,
    image_url: report.imageUrl || null
  };
}

/**
 * Maps a Supabase PostgreSQL row to a frontend JavaScript report object
 */
export function mapDbRowToReport(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    location: row.location || {},
    status: row.status,
    assignedDepartment: row.assigned_department || row.assignedDepartment,
    priorityScore: row.priority_score ?? row.priorityScore ?? 50,
    priorityTier: row.priority_tier || row.priorityTier || "MEDIUM",
    priorityBreakdown: row.priority_breakdown || row.priorityBreakdown || {},
    aiSummary: row.ai_summary || row.aiSummary,
    duplicateOf: row.duplicate_of || row.duplicateOf || null,
    duplicateCount: row.duplicate_count ?? row.duplicateCount ?? 0,
    reportedAt: row.reported_at || row.reportedAt,
    resolvedAt: row.resolved_at || row.resolvedAt || null,
    reporter: row.reporter || {},
    clusterId: row.cluster_id || row.clusterId || null,
    upvotes: row.upvotes ?? 0,
    imageUrl: row.image_url || row.imageUrl || null
  };
}

/**
 * Synchronous local load (for initial React state initialization)
 */
export function loadReports() {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      raw = localStorage.getItem("civicpulse_reports_v1");
    }
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REPORTS));
      return INITIAL_REPORTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to load reports from localStorage, falling back to initial", err);
    return INITIAL_REPORTS;
  }
}

/**
 * Save reports locally
 */
export function saveReports(reports) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (err) {
    console.error("Failed to save reports to localStorage", err);
  }
}

/**
 * Reset local dataset to default 40 synthetic reports
 */
export function resetReports() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REPORTS));
  return INITIAL_REPORTS;
}

/**
 * Generate unique human-readable Ticket ID
 */
export function generateReportId() {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `CIVIC-2026-${randomSuffix}`;
}

/**
 * Async fetch all reports from Supabase (falls back to local if error or unconfigured)
 */
export async function fetchReportsFromSupabase() {
  const client = getSupabaseClient();
  if (!client) {
    return { data: loadReports(), isFromSupabase: false };
  }

  try {
    const { data, error } = await client
      .from("reports")
      .select("*")
      .order("reported_at", { ascending: false });

    if (error) {
      console.warn("Supabase fetch failed, using local cache:", error.message);
      return { data: loadReports(), isFromSupabase: false, error: error.message };
    }

    if (!data || data.length === 0) {
      return { data: loadReports(), isFromSupabase: true, isEmpty: true };
    }

    const mapped = data.map(mapDbRowToReport);
    saveReports(mapped);
    return { data: mapped, isFromSupabase: true };
  } catch (err) {
    console.warn("Supabase query error:", err);
    return { data: loadReports(), isFromSupabase: false, error: err.message };
  }
}

/**
 * Create or upsert a new report in Supabase
 */
export async function saveReportToSupabase(report) {
  const client = getSupabaseClient();
  if (!client) return { success: false, reason: "Supabase not configured" };

  try {
    const row = mapReportToDbRow(report);
    const { error } = await client.from("reports").upsert(row);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Failed to save report to Supabase:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Update report status in Supabase
 */
export async function updateReportStatusInSupabase(reportId, newStatus, resolvedAt = null) {
  const client = getSupabaseClient();
  if (!client) return { success: false };

  try {
    const updatePayload = {
      status: newStatus,
      updated_at: new Date().toISOString()
    };
    if (newStatus === "Resolved") {
      updatePayload.resolved_at = resolvedAt || new Date().toISOString();
    }
    const { error } = await client
      .from("reports")
      .update(updatePayload)
      .eq("id", reportId);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Failed to update status in Supabase:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Assign department in Supabase
 */
export async function assignDepartmentInSupabase(reportId, department) {
  const client = getSupabaseClient();
  if (!client) return { success: false };

  try {
    const { error } = await client
      .from("reports")
      .update({ assigned_department: department, updated_at: new Date().toISOString() })
      .eq("id", reportId);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Failed to assign department in Supabase:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Increment upvotes in Supabase
 */
export async function upvoteReportInSupabase(reportId, currentUpvotes) {
  const client = getSupabaseClient();
  if (!client) return { success: false };

  try {
    const { error } = await client
      .from("reports")
      .update({
        upvotes: (currentUpvotes || 0) + 1,
        updated_at: new Date().toISOString()
      })
      .eq("id", reportId);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Failed to upvote in Supabase:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Seed the initial 40 synthetic dataset into Supabase
 */
export async function seedInitialReportsToSupabase() {
  const client = getSupabaseClient();
  if (!client) throw new Error("Supabase is not configured.");

  const rows = INITIAL_REPORTS.map(mapReportToDbRow);
  const { data, error } = await client.from("reports").upsert(rows);
  if (error) throw error;
  return data;
}

/**
 * Subscribe to realtime updates from Supabase
 */
export function subscribeToRealtimeReports(onPayload) {
  const client = getSupabaseClient();
  if (!client) return () => {};

  const channel = client
    .channel("reports-realtime")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "reports" },
      (payload) => {
        if (onPayload) onPayload(payload);
      }
    )
    .subscribe();

  return () => {
    client.removeChannel(channel);
  };
}

export { getSupabaseConfig };
