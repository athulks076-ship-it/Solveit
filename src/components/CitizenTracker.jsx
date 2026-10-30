import React, { useState } from "react";
import { 
  Search, 
  CheckCircle2, 
  Truck, 
  ShieldAlert, 
  ThumbsUp, 
  AlertCircle, 
  Copy, 
  Cpu, 
  Building2, 
  MapPin,
  Calendar,
  Sparkles
} from "lucide-react";

export default function CitizenTracker({ 
  reports, 
  selectedReportId, 
  onSelectReport, 
  onUpvoteReport 
}) {
  const [searchQuery, setSearchQuery] = useState(selectedReportId || "");
  const [hasUpvoted, setHasUpvoted] = useState(false);

  // Find the selected or searched report
  const activeReport = reports.find(
    (r) => r.id.toLowerCase() === searchQuery.trim().toLowerCase()
  ) || reports[0];

  const handleSearch = (e) => {
    e.preventDefault();
    const found = reports.find(
      (r) => r.id.toLowerCase() === searchQuery.trim().toLowerCase()
    );
    if (found) {
      onSelectReport(found.id);
    } else {
      alert(`No ticket found matching ID "${searchQuery}". Please check the ID format, e.g. CIVIC-2026-1001`);
    }
  };

  const handleUpvote = (id) => {
    if (!hasUpvoted) {
      onUpvoteReport(id);
      setHasUpvoted(true);
    }
  };

  // Status step index:
  // Submitted (0), Triaged (1), Assigned (2), In Progress (3), Resolved (4)
  const getStepIndex = (status) => {
    if (!status) return 1;
    const s = status.toLowerCase();
    if (s.includes("resolved")) return 4;
    if (s.includes("progress")) return 3;
    if (s.includes("assigned")) return 2;
    if (s.includes("triage")) return 1;
    return 0;
  };

  const currentStep = getStepIndex(activeReport?.status);

  return (
    <div className="tracker-page">
      <div className="tracker-container">
        
        {/* Search & Quick Pick Bar */}
        <div className="tracker-search-section">
          <div className="tracker-header-row">
            <div>
              <h2 className="tracker-title">Citizen Incident Tracker</h2>
              <p className="tracker-sub">
                Follow your complaint's live journey from citizen submission through AI triage to field crew resolution.
              </p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="tracker-search-bar">
            <Search className="w-5 h-5 text-slate-400" />
            <input 
              id="input-ticket-search"
              type="text" 
              className="tracker-search-input"
              placeholder="Enter your Ticket ID (e.g. CIVIC-2026-1003, CIVIC-2026-3001)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button id="btn-search-ticket" type="submit" className="btn-search-action">
              <span>Track Ticket</span>
            </button>
          </form>

          {/* Quick Select Buttons */}
          <div className="quick-tickets-row">
            <span className="text-xs text-slate-400 font-semibold">Sample Tickets:</span>
            {reports.slice(0, 5).map((r) => (
              <button
                key={r.id}
                className={`quick-ticket-chip ${activeReport?.id === r.id ? "active" : ""}`}
                onClick={() => {
                  setSearchQuery(r.id);
                  onSelectReport(r.id);
                  setHasUpvoted(false);
                }}
              >
                <span className="font-mono">{r.id}</span>
                <span className={`chip-badge badge-${r.priorityTier.toLowerCase()}`}>{r.priorityTier}</span>
              </button>
            ))}
          </div>
        </div>

        {activeReport ? (
          <div className="ticket-detail-card">
            
            {/* Top Ticket Header */}
            <div className="ticket-card-header">
              <div className="ticket-id-meta">
                <span className="ticket-badge-id font-mono">{activeReport.id}</span>
                <span className={`priority-tag priority-${activeReport.priorityTier.toLowerCase()}`}>
                  PRIORITY: {activeReport.priorityScore} / 100 • {activeReport.priorityTier}
                </span>
                <span className="category-tag">{activeReport.category}</span>
              </div>

              <div className="ticket-actions-right">
                <button 
                  id="btn-upvote"
                  className={`btn-upvote ${hasUpvoted ? "upvoted" : ""}`}
                  onClick={() => handleUpvote(activeReport.id)}
                  title="Corroborate that this issue affects you too"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{hasUpvoted ? "Corroborated!" : "Affects Me Too"} ({activeReport.upvotes || 0})</span>
                </button>
              </div>
            </div>

            {/* If Duplicate Alert */}
            {activeReport.duplicateOf && (
              <div className="duplicate-citizen-alert">
                <Copy className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-amber-300">Correlated Duplicate Report Linked</h4>
                  <p className="text-xs text-amber-200 mt-0.5">
                    Our AI deduplication engine linked this ticket to master incident <strong className="font-mono text-white">#{activeReport.duplicateOf}</strong> ({Math.round((activeReport.duplicateConfidence || 0.94) * 100)}% match). 
                    Multiple citizen notices have been consolidated to prevent redundant field crew dispatches while amplifying priority urgency.
                  </p>
                </div>
              </div>
            )}

            {/* Title & Description */}
            <div className="ticket-body-grid">
              <div className="ticket-main-info">
                <h3 className="ticket-headline">{activeReport.title}</h3>
                <p className="ticket-description">{activeReport.description}</p>

                {/* AI Executive Summary */}
                <div className="ai-summary-callout">
                  <div className="ai-callout-header">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>AI Executive Briefing</span>
                  </div>
                  <p className="ai-callout-text">"{activeReport.aiSummary}"</p>
                </div>

                {/* Metadata Row */}
                <div className="ticket-meta-grid">
                  <div className="meta-item">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <div>
                      <span className="meta-label">Location</span>
                      <span className="meta-val">{activeReport.location.address}</span>
                      <span className="meta-sub">{activeReport.location.landmark}</span>
                    </div>
                  </div>

                  <div className="meta-item">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <div>
                      <span className="meta-label">Assigned Agency</span>
                      <span className="meta-val text-cyan-300 font-semibold">{activeReport.assignedDepartment || "Triage Pending"}</span>
                    </div>
                  </div>

                  <div className="meta-item">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <div>
                      <span className="meta-label">Reported Timestamp</span>
                      <span className="meta-val font-mono">{new Date(activeReport.reportedAt).toLocaleTimeString()} • {new Date(activeReport.reportedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo Evidence */}
              <div className="ticket-photo-column">
                <span className="meta-label mb-2 block">Photographic Evidence</span>
                <div className="evidence-frame">
                  <img src={activeReport.imageUrl} alt={activeReport.title} className="evidence-img" />
                  <div className="evidence-pill">GPS Geo-Tagged</div>
                </div>
              </div>
            </div>

            {/* Transparent Lifecycle Stepper */}
            <div className="stepper-section">
              <h4 className="stepper-title">Report Lifecycle & SLA Tracking</h4>
              <div className="stepper-wrapper">
                
                {/* Step 1 */}
                <div className={`step-item ${currentStep >= 0 ? "step-done" : ""}`}>
                  <div className="step-circle">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="step-content">
                    <span className="step-label">1. Submitted</span>
                    <span className="step-time">Instant</span>
                  </div>
                </div>

                <div className={`step-connector ${currentStep >= 1 ? "conn-active" : ""}`}></div>

                {/* Step 2 */}
                <div className={`step-item ${currentStep >= 1 ? "step-done" : ""}`}>
                  <div className="step-circle">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="step-content">
                    <span className="step-label">2. AI Triaged</span>
                    <span className="step-time">0.8 sec</span>
                  </div>
                </div>

                <div className={`step-connector ${currentStep >= 2 ? "conn-active" : ""}`}></div>

                {/* Step 3 */}
                <div className={`step-item ${currentStep >= 2 ? "step-done" : ""}`}>
                  <div className="step-circle">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="step-content">
                    <span className="step-label">3. Agency Assigned</span>
                    <span className="step-time">{activeReport.assignedDepartment ? "Assigned" : "Pending"}</span>
                  </div>
                </div>

                <div className={`step-connector ${currentStep >= 3 ? "conn-active" : ""}`}></div>

                {/* Step 4 */}
                <div className={`step-item ${currentStep >= 3 ? "step-done" : ""}`}>
                  <div className="step-circle">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div className="step-content">
                    <span className="step-label">4. In Progress</span>
                    <span className="step-time">{currentStep >= 3 ? "Crew Dispatched" : "Queued"}</span>
                  </div>
                </div>

                <div className={`step-connector ${currentStep >= 4 ? "conn-active" : ""}`}></div>

                {/* Step 5 */}
                <div className={`step-item ${currentStep >= 4 ? "step-done" : ""}`}>
                  <div className="step-circle">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="step-content">
                    <span className="step-label">5. Resolved & Verified</span>
                    <span className="step-time">{currentStep >= 4 ? "Completed" : "Target: 4-24h"}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Explainable AI Justification Box */}
            <div className="explainable-justification-card">
              <div className="justification-header">
                <ShieldAlert className="w-5 h-5 text-cyan-400" />
                <div>
                  <h4 className="justification-title">Why this Priority Score? (Explainable AI Audit)</h4>
                  <p className="justification-sub">Our algorithm does not use a black-box model. Here is the transparent breakdown of factors used to evaluate this incident:</p>
                </div>
              </div>

              <div className="justification-body">
                <p className="justification-text font-medium text-slate-200">
                  {activeReport.priorityBreakdown?.reasoning || "Prioritized based on public hazard potential and transit density."}
                </p>

                <div className="factors-pills-row">
                  <div className="factor-pill">
                    <span className="factor-name">Safety & Fatality Risk</span>
                    <strong className="factor-val text-red-400">{activeReport.priorityBreakdown?.safetyRisk || 20} / 40</strong>
                  </div>
                  <div className="factor-pill">
                    <span className="factor-name">Arterial Transit Disruption</span>
                    <strong className="factor-val text-amber-400">{activeReport.priorityBreakdown?.infrastructureImpact || 15} / 25</strong>
                  </div>
                  <div className="factor-pill">
                    <span className="factor-name">School / Vulnerability Zone</span>
                    <strong className="factor-val text-purple-400">{activeReport.priorityBreakdown?.vulnerabilityFactor || 12} / 20</strong>
                  </div>
                  <div className="factor-pill">
                    <span className="factor-name">Aging & Public Duplicates</span>
                    <strong className="factor-val text-cyan-400">{activeReport.priorityBreakdown?.agingEscalation || 10} / 15</strong>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="empty-tracker-state">
            <AlertCircle className="w-10 h-10 text-slate-500 mb-2" />
            <p>No report selected. Use the search bar above or choose a sample ticket.</p>
          </div>
        )}

      </div>
    </div>
  );
}
