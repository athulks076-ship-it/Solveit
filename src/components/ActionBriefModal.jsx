import React, { useState } from "react";
import { X, FileText, Copy } from "lucide-react";
import { generateActionBrief } from "../services/aiEngine";

export default function ActionBriefModal({ report, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !report) return null;

  const brief = generateActionBrief(report);

  const handleCopy = () => {
    const text = `
MUNICIPAL OPERATIONAL DIRECTIVE [${brief.classification}]
Ref ID: ${brief.documentId} | Generated: ${brief.timestamp}
Location: ${brief.locationHeader}
Subject: ${brief.incidentTitle}
Ticket: ${brief.incidentCount}

HAZARD & ROOT CAUSE:
${brief.rootCauseAnalysis}

ASSIGNED TASK FORCE:
${brief.interAgencyTaskForce.map(t => `• ${t.agency}: ${t.role}`).join("\n")}

RESOURCE COMMITMENT:
${brief.resourceCommitment}

TARGET SLA:
${brief.estimatedSLA}

COMMISSIONER ACTION:
${brief.decisionMakerAction}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container action-brief-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="modal-title">Executive Municipal Action Brief</h3>
              <p className="modal-subtitle">AI-Synthesized Operational Directive for Immediate Decision-Making</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Document Body */}
        <div className="brief-modal-body">
          <div className="brief-doc-paper">
            
            <div className="doc-meta-banner">
              <div>
                <span className="font-mono text-xs text-slate-400">Ref: {brief.documentId}</span>
                <span className="doc-tag-urgent">{brief.classification}</span>
              </div>
              <span className="font-mono text-xs text-slate-400">{brief.timestamp}</span>
            </div>

            <h4 className="brief-paper-title">{brief.incidentTitle}</h4>
            <p className="brief-paper-loc">📍 {brief.locationHeader} • {brief.incidentCount}</p>

            <div className="brief-paper-section">
              <span className="paper-section-heading">1. Incident Assessment & Severity Rationale</span>
              <p className="paper-body-text">{brief.rootCauseAnalysis}</p>
            </div>

            <div className="brief-paper-section">
              <span className="paper-section-heading">2. Assigned Response Agency & Directive</span>
              {brief.interAgencyTaskForce.map((t, i) => (
                <div key={i} className="paper-task-item">
                  <strong className="text-cyan-300 font-bold">{t.agency}</strong>
                  <span className="text-slate-300 text-xs block mt-0.5">{t.role}</span>
                </div>
              ))}
            </div>

            <div className="brief-paper-grid">
              <div>
                <span className="paper-section-heading">3. Committed Resources</span>
                <p className="paper-body-text font-medium">{brief.resourceCommitment}</p>
              </div>
              <div>
                <span className="paper-section-heading">4. Target SLA</span>
                <p className="paper-body-text text-emerald-400 font-mono font-bold">{brief.estimatedSLA}</p>
              </div>
            </div>

            <div className="paper-decision-directive">
              <strong>Municipal Directive: </strong>
              <span>{brief.decisionMakerAction}</span>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer flex justify-between items-center">
          <button className="btn-modal-secondary" onClick={onClose}>
            Dismiss
          </button>

          <button className="btn-modal-primary" onClick={handleCopy}>
            <Copy className="w-4 h-4" />
            <span>{copied ? "Copied to Clipboard!" : "Copy Action Brief"}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
