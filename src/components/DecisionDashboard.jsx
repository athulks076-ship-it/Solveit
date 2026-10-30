import React, { useState } from "react";
import { 
  Filter, 
  Flame, 
  Copy, 
  FileText, 
  ShieldAlert, 
  Sparkles,
  MessageSquare,
  Radio,
  UserCheck
} from "lucide-react";
import GeospatialMap from "./GeospatialMap";
import WhatsAppDispatchModal from "./WhatsAppDispatchModal";
import IoTTelemetryPanel from "./IoTTelemetryPanel";
import { MUNICIPAL_DEPARTMENTS, CATEGORIES } from "../data/initialReports";
import { calculateCitizenReputation } from "../services/aiEngine";

export default function DecisionDashboard({ 
  reports, 
  selectedReportId, 
  onSelectReport, 
  onUpdateStatus, 
  onAssignDepartment, 
  hotspots = [],
  onOpenActionBrief
}) {
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [filterPriority, setFilterPriority] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [showDuplicatesOnly, setShowDuplicatesOnly] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [iotPanelOpen, setIotPanelOpen] = useState(false);

  // Filter logic
  const filteredReports = reports.filter((r) => {
    if (filterCategory !== "ALL" && r.category !== filterCategory) return false;
    if (filterPriority === "CRITICAL" && r.priorityTier !== "CRITICAL") return false;
    if (filterPriority === "HIGH_PLUS" && !(r.priorityTier === "CRITICAL" || r.priorityTier === "HIGH")) return false;
    if (filterStatus !== "ALL" && r.status !== filterStatus) return false;
    if (showDuplicatesOnly && !r.duplicateOf) return false;
    return true;
  }).sort((a, b) => {
    // Sort critical and highest priority first
    return b.priorityScore - a.priorityScore;
  });

  const activeReport = reports.find((r) => r.id === selectedReportId) || filteredReports[0] || reports[0];

  const handleStatusChange = (newStatus) => {
    if (activeReport) {
      onUpdateStatus(activeReport.id, newStatus);
    }
  };

  const handleDeptChange = (dept) => {
    if (activeReport) {
      onAssignDepartment(activeReport.id, dept);
    }
  };

  return (
    <div className="dashboard-page">
      
      {/* Top Filter & Metrics Bar */}
      <div className="dashboard-controls-bar">
        <div className="filters-group">
          <div className="filter-item">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select 
              id="select-category"
              className="filter-select" 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="ALL">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="filter-item">
            <select 
              id="select-priority"
              className="filter-select" 
              value={filterPriority} 
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="ALL">All Priorities</option>
              <option value="CRITICAL">🚨 Critical Only (&gt;80)</option>
              <option value="HIGH_PLUS">⚠️ High & Critical</option>
            </select>
          </div>

          <div className="filter-item">
            <select 
              id="select-status"
              className="filter-select" 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="Under Review">Under Review</option>
              <option value="Triaged">Triaged</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <button 
            id="btn-filter-dup"
            className={`btn-toggle-filter ${showDuplicatesOnly ? "active" : ""}`}
            onClick={() => setShowDuplicatesOnly(!showDuplicatesOnly)}
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Flagged Duplicates ({reports.filter(r => r.duplicateOf).length})</span>
          </button>

          <button 
            id="btn-toggle-iot-panel"
            className={`btn-toggle-iot-feed ${iotPanelOpen ? "active" : ""}`}
            onClick={() => setIotPanelOpen(!iotPanelOpen)}
          >
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Live IoT Telemetry Feeds (6 Nodes)</span>
          </button>
        </div>


        <div className="queue-count-tag">
          Showing <strong>{filteredReports.length}</strong> of <strong>{reports.length}</strong> incidents
        </div>
      </div>

      {/* Live Municipal IoT Telemetry Feed Panel */}
      {iotPanelOpen && (
        <IoTTelemetryPanel 
          onSelectIncident={(id) => {
            onSelectReport(id);
            setIotPanelOpen(false);
          }} 
          onClose={() => setIotPanelOpen(false)} 
        />
      )}

      {/* Main Split Interface */}
      <div className="dashboard-grid">

        
        {/* Left Side: Geospatial Map + Hotspot Alert */}
        <div className="dashboard-map-column">
          
          {/* Active Hotspot Warning Banner */}
          {hotspots.length > 0 && (
            <div className="hotspot-live-banner">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="font-bold text-red-300 text-xs uppercase tracking-wider">Active Hotspot Detected:</span>
                <span className="text-white text-xs font-semibold">{hotspots[0].title}</span>
              </div>
              <button 
                id="btn-view-cluster"
                className="btn-view-hotspot-mini"
                onClick={() => onSelectReport(hotspots[0].reports[0].id)}
              >
                <span>Inspect Cluster ({hotspots[0].reportCount} Reports) →</span>
              </button>
            </div>
          )}

          {/* The Leaflet Map */}
          <div className="map-container-card">
            <GeospatialMap 
              reports={filteredReports} 
              selectedReportId={activeReport?.id} 
              onSelectReport={onSelectReport} 
              hotspots={hotspots}
            />
          </div>

          {/* Quick Queue List underneath */}
          <div className="queue-list-container">
            <div className="queue-list-header">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Prioritized Dispatch Queue</span>
              <span className="text-xs text-slate-500">Sorted by AI Hazard Score</span>
            </div>

            <div className="queue-cards-scroll">
              {filteredReports.map((r) => {
                const isSelected = activeReport?.id === r.id;
                return (
                  <div 
                    key={r.id} 
                    className={`queue-item-card ${isSelected ? "selected" : ""} ${r.priorityTier === "CRITICAL" ? "border-critical" : ""}`}
                    onClick={() => onSelectReport(r.id)}
                  >
                    <div className="queue-item-top">
                      <span className="font-mono text-xs text-cyan-400 font-bold">{r.id}</span>
                      <span className={`priority-tag-mini priority-${r.priorityTier.toLowerCase()}`}>
                        {r.priorityScore} • {r.priorityTier}
                      </span>
                    </div>
                    <h5 className="queue-item-title">{r.title}</h5>
                    <div className="queue-item-meta">
                      <span>📍 {r.location.ward || "Central"}</span>
                      <span>🏢 {r.assignedDepartment || "Unassigned"}</span>
                      {r.duplicateOf && <span className="text-amber-400 font-mono text-xs">Duplicate</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Incident Investigation & Dispatch Action Panel */}
        <div className="dashboard-detail-column">
          {activeReport ? (
            <div className="detail-panel-card">
              
              {/* Panel Top Header */}
              <div className="panel-header">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm font-bold text-cyan-300">{activeReport.id}</span>
                    <span className={`priority-tag priority-${activeReport.priorityTier.toLowerCase()}`}>
                      {activeReport.priorityScore} / 100 • {activeReport.priorityTier}
                    </span>
                    <span className="category-tag">{activeReport.category}</span>
                  </div>
                  <h3 className="panel-title">{activeReport.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    id="btn-whatsapp-dispatch"
                    className="btn-action-whatsapp"
                    onClick={() => setWhatsappModalOpen(true)}
                    title="Generate AI Automated WhatsApp/SMS Dispatch Payload for Zone Engineer"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Dispatch</span>
                  </button>

                  <button 
                    id="btn-gen-action-brief"
                    className="btn-action-brief"
                    onClick={() => onOpenActionBrief(activeReport)}
                    title="Generate Executive 1-Minute Action Directive"
                  >
                    <FileText className="w-4 h-4 text-amber-300" />
                    <span>1-Click Action Brief</span>
                  </button>
                </div>
              </div>

              {/* Citizen Reputation & Anti-Spam Verification */}
              {(() => {
                const rep = activeReport.reputation || calculateCitizenReputation(activeReport.reporter, activeReport.title, activeReport.description);
                return (
                  <div className="citizen-reputation-banner">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xs font-bold text-slate-200">Citizen Credibility:</span>
                      <span className="reputation-badge-pill font-mono">
                        {rep.trustScore}/100 • {rep.tier.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-slate-400 ml-auto">
                        Spam Risk: <strong className={rep.spamRisk === "LOW" ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>{rep.spamRisk}</strong>
                      </span>
                    </div>
                    <div className="reputation-badges-mini">
                      {rep.badges.map((b, i) => (
                        <span key={i} className="reputation-mini-chip">✓ {b}</span>
                      ))}
                      <span className="reputation-mini-chip font-mono">Accuracy: {rep.historicalAccuracy}</span>
                    </div>
                  </div>
                );
              })()}


              {/* Status & Assignment Quick Control */}
              <div className="workflow-action-bar">
                <div>
                  <label className="sub-label">Assign Department</label>
                  <select 
                    id="select-assign-dept"
                    className="dept-select"
                    value={activeReport.assignedDepartment || ""}
                    onChange={(e) => handleDeptChange(e.target.value)}
                  >
                    <option value="">-- Unassigned --</option>
                    {MUNICIPAL_DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                <div>
                  <label className="sub-label">Dispatch Status</label>
                  <div className="status-button-group">
                    {["Triaged", "Assigned", "In Progress", "Resolved"].map((st) => (
                      <button
                        key={st}
                        className={`btn-status-step ${activeReport.status === st ? "active" : ""}`}
                        onClick={() => handleStatusChange(st)}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Duplicate Banner / Linking */}
              {activeReport.duplicateOf ? (
                <div className="panel-duplicate-alert">
                  <div className="flex items-center gap-2">
                    <Copy className="w-4 h-4 text-amber-400" />
                    <strong className="text-amber-300 text-xs uppercase">Linked Duplicate Incident</strong>
                  </div>
                  <p className="text-xs text-amber-200 mt-1">
                    Merged into Master Ticket <strong className="font-mono text-white">#{activeReport.duplicateOf}</strong> ({Math.round((activeReport.duplicateConfidence || 0.94) * 100)}% Match).
                  </p>
                  <p className="text-xs text-slate-300 mt-1 italic">
                    Reason: {activeReport.duplicateReasoning || "Close geographic proximity (<50m) and matching incident description."}
                  </p>
                </div>
              ) : activeReport.duplicateCount > 0 ? (
                <div className="panel-master-dup-box">
                  <Copy className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-cyan-200 font-semibold">
                    Master Incident: {activeReport.duplicateCount} duplicate citizen reports consolidated under this ticket.
                  </span>
                </div>
              ) : null}

              {/* AI Executive Summary Callout */}
              <div className="panel-ai-summary">
                <div className="flex items-center gap-1.5 mb-1 text-cyan-400 text-xs font-bold uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Executive Summary</span>
                </div>
                <p className="text-sm text-slate-200 font-medium">"{activeReport.aiSummary}"</p>
              </div>

              {/* Incident Description & Photo */}
              <div className="panel-content-row">
                <div className="flex-1">
                  <label className="sub-label">Citizen Description</label>
                  <p className="panel-desc-text">{activeReport.description}</p>

                  <div className="panel-meta-list">
                    <div>
                      <span className="text-slate-400 text-xs">Address: </span>
                      <span className="text-slate-200 text-xs font-medium">{activeReport.location.address}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs">Landmark: </span>
                      <span className="text-slate-200 text-xs font-medium">{activeReport.location.landmark}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs">Reported By: </span>
                      <span className="text-slate-200 text-xs font-mono">{activeReport.reporter?.name} ({activeReport.reporter?.phone})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs">Registered At: </span>
                      <span className="text-slate-200 text-xs font-mono">{new Date(activeReport.reportedAt).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>

                {activeReport.imageUrl && (
                  <div className="panel-thumb-frame">
                    <img src={activeReport.imageUrl} alt={activeReport.title} className="panel-thumb-img" />
                    <span className="panel-thumb-tag">Field Photo</span>
                  </div>
                )}
              </div>

              {/* Explainable Factor Breakdown Component */}
              <div className="panel-explainable-box">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Explainable Priority Factors</span>
                  </div>
                  <span className="font-mono text-xs text-slate-400 font-semibold">Total: {activeReport.priorityScore}/100</span>
                </div>

                <div className="factor-progress-list">
                  <div className="factor-row">
                    <div className="factor-labels">
                      <span>Public Safety & Hazard Risk</span>
                      <strong className="text-red-400 font-mono">{activeReport.priorityBreakdown?.safetyRisk || 20}/40</strong>
                    </div>
                    <div className="factor-bar-bg"><div className="factor-bar-fill fill-red" style={{ width: `${((activeReport.priorityBreakdown?.safetyRisk || 20)/40)*100}%` }}></div></div>
                  </div>

                  <div className="factor-row">
                    <div className="factor-labels">
                      <span>Arterial Transit Disruption</span>
                      <strong className="text-amber-400 font-mono">{activeReport.priorityBreakdown?.infrastructureImpact || 15}/25</strong>
                    </div>
                    <div className="factor-bar-bg"><div className="factor-bar-fill fill-amber" style={{ width: `${((activeReport.priorityBreakdown?.infrastructureImpact || 15)/25)*100}%` }}></div></div>
                  </div>

                  <div className="factor-row">
                    <div className="factor-labels">
                      <span>School / Vulnerable Population</span>
                      <strong className="text-purple-400 font-mono">{activeReport.priorityBreakdown?.vulnerabilityFactor || 12}/20</strong>
                    </div>
                    <div className="factor-bar-bg"><div className="factor-bar-fill fill-purple" style={{ width: `${((activeReport.priorityBreakdown?.vulnerabilityFactor || 12)/20)*100}%` }}></div></div>
                  </div>

                  <div className="factor-row">
                    <div className="factor-labels">
                      <span>Escalation / Community Corroborations</span>
                      <strong className="text-cyan-400 font-mono">{activeReport.priorityBreakdown?.agingEscalation || 10}/15</strong>
                    </div>
                    <div className="factor-bar-bg"><div className="factor-bar-fill fill-cyan" style={{ width: `${((activeReport.priorityBreakdown?.agingEscalation || 10)/15)*100}%` }}></div></div>
                  </div>
                </div>

                <p className="factor-reasoning-text">
                  <strong className="text-slate-300">Justification: </strong>
                  {activeReport.priorityBreakdown?.reasoning || "Standard civic calculation."}
                </p>
              </div>

            </div>
          ) : (
            <div className="empty-panel-state">
              <p>Select an incident from the map or queue to inspect.</p>
            </div>
          )}
        </div>

      </div>

      {/* WhatsApp / SMS Automated Dispatch Modal */}
      <WhatsAppDispatchModal 
        report={activeReport}
        isOpen={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
      />
    </div>
  );
}

