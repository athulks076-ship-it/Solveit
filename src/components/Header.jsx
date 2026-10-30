import React from "react";
import { 
  ShieldAlert, 
  MapPin, 
  Layers, 
  Search, 
  Info, 
  RotateCcw, 
  PlayCircle,
  Flame,
  Copy,
  Moon,
  Sun,
  Video,
  CloudRain,
  Database
} from "lucide-react";

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  reports, 
  onResetData, 
  onOpenDemoTour,
  onOpenHonesty,
  isTacticalNightMode,
  onToggleTacticalNightMode,
  onOpenPredictive,
  onOpenVideoStreams,
  isSupabaseConnected,
  onOpenSupabaseModal
}) {
  const criticalCount = reports.filter(r => r.priorityTier === "CRITICAL" && r.status !== "Resolved").length;
  const duplicateCount = reports.filter(r => r.duplicateOf).length;

  return (
    <header className="header-container">
      {/* Top Banner */}
      <div className="header-top">
        <div className="logo-brand">
          <div className="logo-icon-wrapper">
            <ShieldAlert className="logo-icon" />
          </div>
          <div>
            <div className="logo-title-row">
              <h1 className="logo-title">Solve<span className="accent-text">It</span></h1>
              <span className="badge-live">
                <span className="pulse-dot"></span>
                GRID ACTIVE • BANGALORE
              </span>
            </div>
            <p className="logo-subtitle">AI-Powered Civic Intelligence & Autonomous Dispatch Operating System</p>
          </div>
        </div>

        {/* Quick System Metrics */}
        <div className="header-metrics">
          <div className="metric-chip">
            <span className="metric-label">Active Incidents</span>
            <span className="metric-val">{reports.filter(r => r.status !== "Resolved").length}</span>
          </div>
          <div className="metric-chip chip-critical">
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span className="metric-label">Critical Hazards</span>
            <span className="metric-val font-mono">{criticalCount}</span>
          </div>
          <div className="metric-chip chip-dup">
            <Copy className="w-3.5 h-3.5 text-amber-400" />
            <span className="metric-label">Duplicates Linked</span>
            <span className="metric-val font-mono">{duplicateCount}</span>
          </div>
          
          {/* High-Contrast Tactical Night Mode Toggle */}
          <button 
            id="btn-toggle-night-mode"
            className={`btn-tactical-night-mode ${isTacticalNightMode ? "active" : ""}`}
            onClick={onToggleTacticalNightMode}
            title="Toggle High-Contrast Tactical Dark Theme for Night-Shift Command Operators"
          >
            {isTacticalNightMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{isTacticalNightMode ? "Tactical High-Contrast: ON" : "Tactical Night Mode"}</span>
          </button>

          {/* Supabase Cloud Connection & Realtime Status */}
          <button 
            id="btn-supabase-status"
            className={`btn-supabase-status ${isSupabaseConnected ? "connected" : "demo"}`}
            onClick={onOpenSupabaseModal}
            title={isSupabaseConnected ? "Supabase PostgreSQL Database Connected (Realtime Active)" : "Configure Supabase Cloud Database"}
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isSupabaseConnected ? "Supabase: Live" : "Supabase: Setup"}</span>
            <span className={isSupabaseConnected ? "pulse-dot-emerald" : "pulse-dot-amber"}></span>
          </button>

          <button 
            id="btn-demo-tour"
            className="btn-demo-tour"
            onClick={onOpenDemoTour}
            title="Open 5-Minute Evaluation Guide"
          >
            <PlayCircle className="w-4 h-4" />
            <span>5-Min Demo Tour</span>
          </button>

          <button 
            id="btn-reset-data"
            className="btn-icon-secondary"
            onClick={onResetData}
            title="Reset to Initial 40 Synthetic Reports"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Data</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav className="header-nav">
        <div className="nav-tabs">
          <button 
            id="nav-tab-capture"
            className={`nav-tab ${currentTab === "capture" ? "active" : ""}`}
            onClick={() => setCurrentTab("capture")}
          >
            <MapPin className="w-4 h-4" />
            <span>1. Capture Problem <span className="tab-pill">&lt;60s</span></span>
          </button>

          <button 
            id="nav-tab-command"
            className={`nav-tab ${currentTab === "command" ? "active" : ""}`}
            onClick={() => setCurrentTab("command")}
          >
            <Layers className="w-4 h-4" />
            <span>2 & 3. Command Center & Map</span>
            {criticalCount > 0 && <span className="tab-alert-pill">{criticalCount}</span>}
          </button>

          <button 
            id="nav-tab-hotspots"
            className={`nav-tab ${currentTab === "hotspots" ? "active" : ""}`}
            onClick={() => setCurrentTab("hotspots")}
          >
            <Flame className="w-4 h-4" />
            <span>3. Hotspots & Action Briefs</span>
          </button>

          <button 
            id="nav-tab-track"
            className={`nav-tab ${currentTab === "track" ? "active" : ""}`}
            onClick={() => setCurrentTab("track")}
          >
            <Search className="w-4 h-4" />
            <span>4. Track Action (Citizen View)</span>
          </button>
        </div>

        <div className="nav-extra-actions">
          <button 
            id="btn-nav-pred-ml"
            className="btn-nav-special"
            onClick={onOpenPredictive}
            title="Open Predictive ML Flood Basin Spatial Forecasting"
          >
            <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
            <span>Predictive ML Basins</span>
            <span className="badge-pulse-cyan">94% RISK</span>
          </button>

          <button 
            id="btn-nav-video-streams"
            className="btn-nav-special"
            onClick={onOpenVideoStreams}
            title="Open Live Municipal CCTV & Drone Feeds"
          >
            <Video className="w-3.5 h-3.5 text-red-400" />
            <span>Live Video Feeds</span>
            <span className="badge-pulse-red">LIVE</span>
          </button>

          <button 
            id="btn-honesty-note"
            className="btn-honesty"
            onClick={onOpenHonesty}
          >
            <Info className="w-4 h-4" />
            <span>Limitations & Honesty Note</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

