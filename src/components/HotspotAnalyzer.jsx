import React, { useState } from "react";
import { 
  Flame, 
  ArrowRight, 
  AlertTriangle, 
  Copy, 
  Cpu
} from "lucide-react";
import { generateActionBrief } from "../services/aiEngine";

export default function HotspotAnalyzer({ 
  hotspots = [], 
  onSelectReport, 
  onNavigateToCommand 
}) {
  const [selectedClusterIndex, setSelectedClusterIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeCluster = hotspots[selectedClusterIndex] || hotspots[0];
  const brief = activeCluster ? generateActionBrief(activeCluster) : null;

  const handleCopyBrief = () => {
    if (!brief) return;
    const text = `
MUNICIPAL ACTION DIRECTIVE [${brief.classification}]
Doc Ref: ${brief.documentId} | Generated: ${brief.timestamp}
Target Area: ${brief.locationHeader}
Incident Cluster: ${brief.incidentTitle}
Scope: ${brief.incidentCount}

ROOT CAUSE ANALYSIS:
${brief.rootCauseAnalysis}

MULTI-AGENCY TASK FORCE:
${brief.interAgencyTaskForce.map((t) => `• ${t.agency}: ${t.role}`).join("\n")}

RESOURCE COMMITMENT:
${brief.resourceCommitment}

TARGET SLA:
${brief.estimatedSLA}

MUNICIPAL COMMISSIONER DIRECTIVE:
${brief.decisionMakerAction}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!activeCluster) {
    return (
      <div className="hotspots-page">
        <div className="empty-panel-state">
          <p>No active multi-incident clusters detected at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hotspots-page">
      <div className="hotspots-container">
        
        {/* Banner */}
        <div className="hotspots-banner">
          <div className="badge-fast badge-red">
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span>STAGE 3 REVEAL: SPATIAL-SEMANTIC CLUSTER INTELLIGENCE</span>
          </div>
          <h2 className="hotspots-title">Compound Hotspots & Root-Cause Analysis</h2>
          <p className="hotspots-sub">
            AI spatial clustering uncovers cross-category systemic breakdowns that list-based dashboards fail to spot.
          </p>
        </div>

        {/* Hotspot Selector Tabs if multiple */}
        {hotspots.length > 1 && (
          <div className="cluster-tabs-row">
            {hotspots.map((hs, idx) => (
              <button
                key={hs.id}
                className={`cluster-tab-btn ${selectedClusterIndex === idx ? "active" : ""}`}
                onClick={() => {
                  setSelectedClusterIndex(idx);
                }}
              >
                <Flame className="w-4 h-4 text-red-400" />
                <span>{hs.title} ({hs.reportCount} incidents)</span>
              </button>
            ))}
          </div>
        )}

        {/* The Spotlight Cluster Grid */}
        <div className="cluster-main-grid">
          
          {/* Left Column: Visual Compound Diagram & Correlated Reports */}
          <div className="cluster-left-column">
            
            {/* Cluster Header Card */}
            <div className="cluster-overview-card">
              <div className="cluster-type-badge">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>{activeCluster.clusterType}</span>
                <span className="cluster-priority-pill">Max Priority: {activeCluster.maxPriority}</span>
              </div>
              <h3 className="cluster-card-title">{activeCluster.title}</h3>
              <p className="cluster-geo-meta">
                📍 {activeCluster.ward} • Within 350m Radius • {activeCluster.reportCount} Incidents across {activeCluster.categories.join(", ")}
              </p>

              {/* Root Cause Discovery Box */}
              <div className="root-cause-box">
                <div className="root-cause-header">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>AI Root-Cause Diagnosis</span>
                </div>
                <p className="root-cause-text">
                  "{activeCluster.rootCause}"
                </p>
              </div>

              {/* Cascading Chain Visualizer */}
              <div className="cascade-visualizer">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                  Cascading Failure Propagation Chain:
                </span>
                <div className="cascade-steps-row">
                  <div className="cascade-node node-drainage">
                    <span className="node-cat">1. Upstream SWD</span>
                    <span className="node-desc">Culvert silted with construction debris</span>
                  </div>
                  <div className="cascade-arrow">➔</div>
                  <div className="cascade-node node-flood">
                    <span className="node-cat">2. Surface Flood</span>
                    <span className="node-desc">1.5ft standing water over roadways</span>
                  </div>
                  <div className="cascade-arrow">➔</div>
                  <div className="cascade-node node-road">
                    <span className="node-cat">3. Road Collapse</span>
                    <span className="node-desc">Subgrade washout creates 2ft submerged crater</span>
                  </div>
                  <div className="cascade-arrow">➔</div>
                  <div className="cascade-node node-electric">
                    <span className="node-cat">4. Severe Hazard</span>
                    <span className="node-desc">Transformer box submerged & arcing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Correlated Reports Accordion/List */}
            <div className="cluster-reports-card">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                {activeCluster.reportCount} Correlated Incident Reports in this Hotspot:
              </h4>
              <div className="cluster-reports-list">
                {activeCluster.reports.map((r) => (
                  <div 
                    key={r.id} 
                    className="cluster-report-item"
                    onClick={() => onSelectReport(r.id)}
                  >
                    <div className="cluster-report-left">
                      <span className="font-mono text-xs font-bold text-cyan-400">#{r.id}</span>
                      <span className="cluster-report-title">{r.title}</span>
                    </div>
                    <div className="cluster-report-right">
                      <span className={`priority-tag-mini priority-${r.priorityTier.toLowerCase()}`}>
                        {r.priorityScore}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: 1-Click Executive Action Brief Directive */}
          <div className="cluster-right-column">
            <div className="action-brief-document">
              
              {/* Document Official Header */}
              <div className="brief-doc-header">
                <div className="flex items-center justify-between mb-2">
                  <span className="doc-ref font-mono">{brief.documentId}</span>
                  <span className="doc-classification font-mono">{brief.classification}</span>
                </div>
                <h3 className="brief-title">Autonomous Municipal Action Brief</h3>
                <span className="brief-timestamp font-mono">Issued: {brief.timestamp}</span>
              </div>

              {/* Location & Summary */}
              <div className="brief-section">
                <span className="brief-section-title">1. Operational Overview</span>
                <p className="brief-text-strong">{brief.incidentTitle}</p>
                <p className="brief-text-muted">{brief.locationHeader}</p>
                <p className="brief-text-muted">{brief.incidentCount}</p>
              </div>

              {/* Root Cause Assessment */}
              <div className="brief-section">
                <span className="brief-section-title">2. Root Cause Determination</span>
                <div className="brief-callout">
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {brief.rootCauseAnalysis}
                  </p>
                </div>
              </div>

              {/* Multi-Agency Response Taskforce */}
              <div className="brief-section">
                <span className="brief-section-title">3. Inter-Agency Task Force Directives</span>
                <div className="task-force-list">
                  {brief.interAgencyTaskForce.map((t, idx) => (
                    <div key={idx} className="task-force-item">
                      <div className="task-agency font-bold text-cyan-300">{t.agency}</div>
                      <div className="task-role text-xs text-slate-300 mt-0.5">{t.role}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resource Commitment & SLA */}
              <div className="brief-section">
                <span className="brief-section-title">4. Committed Resources & SLA Targets</span>
                <div className="brief-meta-grid">
                  <div className="brief-meta-box">
                    <span className="text-slate-400 text-xs">Required Heavy Machinery:</span>
                    <span className="text-white text-xs font-semibold mt-0.5">{brief.resourceCommitment}</span>
                  </div>
                  <div className="brief-meta-box">
                    <span className="text-slate-400 text-xs">Target Emergency SLA:</span>
                    <span className="text-emerald-400 text-xs font-bold font-mono mt-0.5">{brief.estimatedSLA}</span>
                  </div>
                </div>
              </div>

              {/* Commissioner Signature / Action */}
              <div className="brief-footer-action">
                <div className="directive-quote">
                  <strong>Decision-Maker Action: </strong>
                  <span>{brief.decisionMakerAction}</span>
                </div>

                <div className="brief-buttons-row">
                  <button 
                    id="btn-copy-brief"
                    className="btn-brief-copy"
                    onClick={handleCopyBrief}
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copied ? "Copied to Clipboard!" : "Copy Official Directive"}</span>
                  </button>

                  <button 
                    id="btn-goto-command-cluster"
                    className="btn-brief-dispatch"
                    onClick={() => {
                      onSelectReport(activeCluster.reports[0].id);
                      onNavigateToCommand();
                    }}
                  >
                    <span>Execute in Command Center →</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
