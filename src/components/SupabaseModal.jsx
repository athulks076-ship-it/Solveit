import React, { useState } from "react";
import { 
  X, 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  RefreshCw, 
  ExternalLink,
  UploadCloud,
  Check,
  ShieldCheck,
  Radio
} from "lucide-react";
import { 
  getSupabaseConfig, 
  saveSupabaseConfig, 
  testSupabaseConnection 
} from "../services/supabaseClient";
import { seedInitialReportsToSupabase } from "../services/storageService";

export default function SupabaseModal({ 
  isOpen, 
  onClose, 
  onConnectionChanged,
  onDataSeeded
}) {
  if (!isOpen) return null;

  return (
    <SupabaseModalDialog
      onClose={onClose}
      onConnectionChanged={onConnectionChanged}
      onDataSeeded={onDataSeeded}
    />
  );
}

function SupabaseModalDialog({
  onClose,
  onConnectionChanged,
  onDataSeeded
}) {
  const [config, setConfig] = useState(() => getSupabaseConfig());
  const [inputUrl, setInputUrl] = useState(() => getSupabaseConfig().url || "");
  const [inputKey, setInputKey] = useState(() => getSupabaseConfig().anonKey || "");
  const [testStatus, setTestStatus] = useState(null); // { loading, success, message, count, tableMissing }
  const [seedStatus, setSeedStatus] = useState(null); // { loading, success, message }
  const [copiedSql, setCopiedSql] = useState(false);
  const [activeTab, setActiveTab] = useState("connect"); // connect | schema

  const handleTestConnection = async () => {
    const url = inputUrl.trim();
    const key = inputKey.trim();

    if (!url || !key) {
      setTestStatus({
        loading: false,
        success: false,
        message: "Please enter both your Supabase Project URL and Public Anon Key."
      });
      return;
    }

    setTestStatus({ loading: true, message: "Pinging Supabase database..." });
    const res = await testSupabaseConnection(url, key);
    setTestStatus({
      loading: false,
      success: res.success,
      message: res.message,
      count: res.count,
      tableMissing: res.tableMissing
    });
  };

  const handleSaveAndConnect = async () => {
    const url = inputUrl.trim();
    const key = inputKey.trim();

    if (!url || !key) {
      setTestStatus({
        loading: false,
        success: false,
        message: "Please provide both Project URL and Public Anon Key."
      });
      return;
    }

    setTestStatus({ loading: true, message: "Validating & saving connection..." });
    const res = await testSupabaseConnection(url, key);

    if (res.success || res.tableMissing) {
      saveSupabaseConfig(url, key);
      const updated = getSupabaseConfig();
      setConfig(updated);
      setTestStatus({
        loading: false,
        success: res.success,
        tableMissing: res.tableMissing,
        message: res.success ? "Connected and saved!" : res.message
      });
      if (onConnectionChanged) onConnectionChanged(updated);
    } else {
      setTestStatus({
        loading: false,
        success: false,
        message: res.message
      });
    }
  };

  const handleDisconnect = () => {
    saveSupabaseConfig("", "");
    const updated = getSupabaseConfig();
    setConfig(updated);
    setInputUrl("");
    setInputKey("");
    setTestStatus({
      loading: false,
      success: true,
      message: "Disconnected from Supabase. Reverted to local browser demo mode."
    });
    if (onConnectionChanged) onConnectionChanged(updated);
  };

  const handleSeedData = async () => {
    setSeedStatus({ loading: true, message: "Pushing 40 Bangalore Central reports to Supabase..." });
    try {
      await seedInitialReportsToSupabase();
      setSeedStatus({
        loading: false,
        success: true,
        message: "Successfully seeded 40 synthetic reports into your Supabase database!"
      });
      if (onDataSeeded) onDataSeeded();
    } catch (err) {
      setSeedStatus({
        loading: false,
        success: false,
        message: `Seeding error: ${err.message || "Failed to seed table"}`
      });
    }
  };

  const handleCopySql = () => {
    const sqlScript = `-- SolveIt AI: Supabase Table & Realtime Setup
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

-- Row Level Security
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for reports"
ON public.reports FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public insert access for reports"
ON public.reports FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Public update access for reports"
ON public.reports FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.reports;
`;
    navigator.clipboard.writeText(sqlScript);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container supabase-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="flex items-center gap-3">
            <div className="supabase-header-icon">
              <Database className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="modal-title">Supabase Database & Realtime Sync</h3>
                {config.isConfigured ? (
                  <span className="badge-live-emerald flex items-center gap-1 font-mono text-xs">
                    <span className="pulse-dot-emerald"></span>
                    ONLINE
                  </span>
                ) : (
                  <span className="badge-offline font-mono text-xs">
                    OFFLINE DEMO MODE
                  </span>
                )}
              </div>
              <p className="modal-subtitle">
                Connect your Postgres database for multi-user civic dispatch and live citizen websocket updates.
              </p>
            </div>
          </div>
          <button className="btn-close-modal" onClick={onClose} aria-label="Close modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="supabase-tabs-bar">
          <button 
            className={`supabase-tab-btn ${activeTab === "connect" ? "active" : ""}`}
            onClick={() => setActiveTab("connect")}
          >
            <Radio className="w-4 h-4" />
            <span>Connection Settings</span>
          </button>
          <button 
            className={`supabase-tab-btn ${activeTab === "schema" ? "active" : ""}`}
            onClick={() => setActiveTab("schema")}
          >
            <Database className="w-4 h-4" />
            <span>SQL Schema & DDL</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {activeTab === "connect" ? (
            <div className="supabase-config-form">
              
              {/* Status Banner */}
              <div className={`supabase-status-card ${config.isConfigured ? "card-connected" : "card-demo"}`}>
                <div className="flex items-start gap-3">
                  {config.isConfigured ? (
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <strong className="text-sm text-white block">
                      {config.isConfigured 
                        ? `Connected to Supabase (${config.source === "env" ? ".env file" : "browser settings"})`
                        : "Operating in Local Browser Storage Mode"}
                    </strong>
                    <p className="text-xs text-slate-300 mt-1">
                      {config.isConfigured
                        ? `Live sync enabled with ${config.url}. All updates and citizen complaints synchronize with your PostgreSQL database.`
                        : "Currently using client-side localStorage. Enter your Supabase credentials below to activate cloud persistence and real-time multiplayer updates."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Input Fields */}
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="supabase-url">
                  <span>Supabase Project URL</span>
                  <span className="label-tip">e.g. https://xyzcompany.supabase.co</span>
                </label>
                <input 
                  id="supabase-url"
                  type="url"
                  className="form-input font-mono text-xs"
                  placeholder="https://your-project-id.supabase.co"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                />
              </div>

              <div className="form-group mb-4">
                <label className="form-label" htmlFor="supabase-key">
                  <span>Supabase Public Anon API Key</span>
                  <span className="label-tip">Found in Project Settings → API</span>
                </label>
                <input 
                  id="supabase-key"
                  type="password"
                  className="form-input font-mono text-xs"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                />
              </div>

              {/* Test / Action Results */}
              {testStatus && (
                <div className={`supabase-alert ${testStatus.success ? "alert-success" : testStatus.tableMissing ? "alert-warning" : "alert-error"}`}>
                  <div className="flex items-center gap-2">
                    {testStatus.loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                    ) : testStatus.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                    <span className="text-xs font-medium">{testStatus.message}</span>
                  </div>
                  {testStatus.tableMissing && (
                    <button 
                      className="btn-switch-tab-schema"
                      onClick={() => setActiveTab("schema")}
                    >
                      View & Copy SQL Script →
                    </button>
                  )}
                </div>
              )}

              {/* Seed Status Banner */}
              {seedStatus && (
                <div className={`supabase-alert ${seedStatus.success ? "alert-success" : "alert-error"} mt-2`}>
                  <div className="flex items-center gap-2">
                    {seedStatus.loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                    ) : seedStatus.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    <span className="text-xs font-medium">{seedStatus.message}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons Row */}
              <div className="supabase-actions-grid">
                <button 
                  id="btn-test-supabase"
                  type="button"
                  className="btn-supabase-test"
                  onClick={handleTestConnection}
                  disabled={testStatus?.loading}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${testStatus?.loading ? "animate-spin" : ""}`} />
                  <span>Test Connection</span>
                </button>

                <button 
                  id="btn-save-supabase"
                  type="button"
                  className="btn-supabase-save"
                  onClick={handleSaveAndConnect}
                  disabled={testStatus?.loading}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save & Connect</span>
                </button>

                {config.isConfigured && (
                  <button 
                    id="btn-seed-supabase"
                    type="button"
                    className="btn-supabase-seed"
                    onClick={handleSeedData}
                    disabled={seedStatus?.loading}
                    title="Uploads the 40 Bangalore Central reports to your Supabase reports table"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Seed 40 Demo Reports</span>
                  </button>
                )}

                {config.isConfigured && (
                  <button 
                    id="btn-disconnect-supabase"
                    type="button"
                    className="btn-supabase-disconnect"
                    onClick={handleDisconnect}
                  >
                    <span>Disconnect (Demo Mode)</span>
                  </button>
                )}
              </div>

            </div>
          ) : (
            <div className="supabase-schema-view">
              <div className="schema-intro-box">
                <strong className="text-xs text-white">How to initialize your Supabase database:</strong>
                <ol className="schema-steps-list">
                  <li>Open your <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-cyan-400 underline inline-flex items-center gap-1">Supabase Project Dashboard <ExternalLink className="w-3 h-3 inline" /></a></li>
                  <li>Click on <strong>SQL Editor</strong> in the left sidebar</li>
                  <li>Click <strong>New query</strong>, paste the SQL below, and click <strong>Run</strong></li>
                </ol>
              </div>

              <div className="sql-code-block-wrapper">
                <div className="sql-code-header">
                  <span className="font-mono text-xs text-slate-400">supabase_schema.sql</span>
                  <button 
                    className="btn-copy-sql" 
                    onClick={handleCopySql}
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? "Copied!" : "Copy SQL"}</span>
                  </button>
                </div>
                <pre className="sql-code-snippet">
{`-- 1. Create reports table
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

-- 2. Enable Row Level Security & Allow Anonymous Read/Write
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for reports"
ON public.reports FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public insert access for reports"
ON public.reports FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Public update access for reports"
ON public.reports FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

-- 3. Enable Realtime Replication
ALTER PUBLICATION supabase_realtime ADD TABLE public.reports;`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>PostgreSQL 15+ • Row-Level Security Enabled</span>
          </div>
          <button className="btn-modal-close" onClick={onClose}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
