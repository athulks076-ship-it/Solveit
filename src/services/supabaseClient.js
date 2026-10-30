/**
 * Supabase Client & Connection Manager
 * 
 * Supports credential resolution from:
 * 1. UI settings in localStorage (runtime editable without restarting dev server)
 * 2. Vite environment variables (.env VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY)
 */
import { createClient } from "@supabase/supabase-js";

const STORAGE_URL_KEY = "solveit_supabase_url";
const STORAGE_KEY_KEY = "solveit_supabase_anon_key";

let supabaseInstance = null;
let currentUrl = null;
let currentKey = null;

/**
 * Returns current Supabase connection configuration and source
 */
export function getSupabaseConfig() {
  const localUrl = (typeof window !== "undefined" && localStorage.getItem(STORAGE_URL_KEY)) || "";
  const localKey = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY_KEY)) || "";

  const envUrl = (import.meta.env.VITE_SUPABASE_URL || "").trim();
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || "").trim();

  if (localUrl && localKey) {
    return {
      url: localUrl,
      anonKey: localKey,
      source: "localStorage",
      isConfigured: true
    };
  }

  if (envUrl && envKey && !envUrl.includes("your-project-id")) {
    return {
      url: envUrl,
      anonKey: envKey,
      source: "env",
      isConfigured: true
    };
  }

  return {
    url: localUrl || envUrl || "",
    anonKey: localKey || envKey || "",
    source: "none",
    isConfigured: false
  };
}

/**
 * Get or initialize the Supabase client
 */
export function getSupabaseClient() {
  const config = getSupabaseConfig();
  if (!config.isConfigured) return null;

  if (supabaseInstance && currentUrl === config.url && currentKey === config.anonKey) {
    return supabaseInstance;
  }

  try {
    currentUrl = config.url;
    currentKey = config.anonKey;
    supabaseInstance = createClient(config.url, config.anonKey, {
      auth: { persistSession: false },
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    });
    return supabaseInstance;
  } catch (err) {
    console.error("Failed to initialize Supabase client:", err);
    return null;
  }
}

/**
 * Save custom Supabase credentials from the UI
 */
export function saveSupabaseConfig(url, anonKey) {
  if (typeof window !== "undefined") {
    if (url && anonKey) {
      localStorage.setItem(STORAGE_URL_KEY, url.trim());
      localStorage.setItem(STORAGE_KEY_KEY, anonKey.trim());
    } else {
      localStorage.removeItem(STORAGE_URL_KEY);
      localStorage.removeItem(STORAGE_KEY_KEY);
    }
  }
  supabaseInstance = null;
  currentUrl = null;
  currentKey = null;
  return getSupabaseConfig();
}

/**
 * Test connectivity against the Supabase `reports` table
 */
export function testSupabaseConnection(customUrl, customKey) {
  let client;
  if (customUrl && customKey) {
    try {
      client = createClient(customUrl.trim(), customKey.trim(), {
        auth: { persistSession: false }
      });
    } catch (e) {
      return Promise.resolve({ success: false, message: `Invalid URL format: ${e.message}` });
    }
  } else {
    client = getSupabaseClient();
  }

  if (!client) {
    return Promise.resolve({
      success: false,
      message: "Supabase credentials are not configured."
    });
  }

  return client
    .from("reports")
    .select("id", { count: "exact", head: true })
    .then(({ count, error }) => {
      if (error) {
        if (
          error.code === "PGRST116" || 
          error.code === "PGRST205" || 
          error.message?.includes("does not exist") || 
          error.message?.includes("Could not find the table")
        ) {
          return {
            success: false,
            tableMissing: true,
            message: "Connected to Supabase! The 'reports' table has not been created yet. Execute the SQL schema in your SQL Editor."
          };
        }
        return { success: false, message: error.message };
      }
      return {
        success: true,
        count: count || 0,
        message: `Successfully connected to Supabase! Found ${count || 0} existing reports.`
      };
    })
    .catch((err) => {
      return { success: false, message: err.message || "Network error connecting to Supabase." };
    });
}
