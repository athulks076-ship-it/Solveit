import React, { useState } from "react";
import { 
  X, 
  PlayCircle, 
  MapPin, 
  Cpu, 
  Flame, 
  Truck, 
  Sparkles
} from "lucide-react";

export default function DemoTourModal({ 
  isOpen, 
  onClose, 
  onNavigateTab, 
  onSelectSampleReport 
}) {
  const [currentStep, setCurrentStep] = useState(1);

  if (!isOpen) return null;

  const steps = [
    {
      num: 1,
      title: "Stage 1: Citizen Quick-Capture (< 60 Seconds)",
      icon: MapPin,
      badgeColor: "text-cyan-400",
      description: "Demonstrates rapid citizen intake on a mobile-sized screen with auto-assisted category, GPS coordinates, photo upload, and one-click demo presets.",
      script: "Show how a citizen or field volunteer submits an incident in under a minute without tedious bureaucratic forms.",
      actionLabel: "Go to Capture Screen →",
      action: () => {
        onNavigateTab("capture");
        onClose();
      }
    },
    {
      num: 2,
      title: "Stage 2: AI Multi-Stage Triage Engine",
      icon: Cpu,
      badgeColor: "text-purple-400",
      description: "Demonstrates automated categorization, 1-line executive summarization, mathematical deduplication (<350m radius + semantic match), and Explainable Multi-Factor Prioritization (0-100).",
      script: "Highlight that priority is NOT an arbitrary black box: point out the breakdown of Public Safety Risk (38/40), Transit Impact (24/25), and School Zone (19/20).",
      actionLabel: "Inspect AI Scoring in Command Center →",
      action: () => {
        onSelectSampleReport("CIVIC-2026-3001"); // Wire outside school
        onNavigateTab("command");
        onClose();
      }
    },
    {
      num: 3,
      title: "Stage 3: Reveal Hotspots & 1-Minute Action Briefs",
      icon: Flame,
      badgeColor: "text-red-400",
      description: "Demonstrates spatial clustering that uncovers hidden root causes (e.g. Indiranagar Ward 4: blocked drain causing road collapse) and generates an instant Executive Action Brief for municipal commissioners.",
      script: "Show the cascading propagation visualizer and copy or inspect the official inter-agency directive.",
      actionLabel: "Open Hotspots & Action Briefs →",
      action: () => {
        onNavigateTab("hotspots");
        onClose();
      }
    },
    {
      num: 4,
      title: "Stage 4: Autonomous Dispatch & Transparent Citizen Tracking",
      icon: Truck,
      badgeColor: "text-emerald-400",
      description: "Demonstrates full-lifecycle governance: assigning the ticket to designated municipal departments (BBMP, BESCOM, BWSSB), advancing status, and checking the live citizen progress tracker.",
      script: "Show the real-time status advancement on the command center, then switch to the Citizen Tracker to see the SLA timeline updated immediately.",
      actionLabel: "Open Citizen Tracker →",
      action: () => {
        onSelectSampleReport("CIVIC-2026-1003");
        onNavigateTab("track");
        onClose();
      }
    }
  ];

  const activeStepData = steps[currentStep - 1];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container demo-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <PlayCircle className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="modal-title">5-Minute Judge Demonstration Tour</h3>
              <p className="modal-subtitle">Step-by-step walkthrough covering all 4 problem statement lifecycle requirements</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Selector Pills */}
        <div className="demo-step-nav">
          {steps.map((s) => (
            <button
              key={s.num}
              className={`demo-step-pill ${currentStep === s.num ? "active" : ""}`}
              onClick={() => setCurrentStep(s.num)}
            >
              <span>Step {s.num}</span>
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div className="demo-step-body">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-bold uppercase tracking-wider ${activeStepData.badgeColor}`}>
              Problem Statement Requirement {activeStepData.num} of 4
            </span>
          </div>

          <h4 className="demo-step-title">{activeStepData.title}</h4>
          <p className="demo-step-desc">{activeStepData.description}</p>

          <div className="demo-presenter-callout">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <div>
              <strong className="text-amber-200 text-xs uppercase block">What to Tell Judges:</strong>
              <p className="text-xs text-slate-200 mt-0.5">{activeStepData.script}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer flex items-center justify-between">
          <div className="flex gap-2">
            {currentStep > 1 && (
              <button 
                className="btn-modal-secondary"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                ← Previous Step
              </button>
            )}
            {currentStep < 4 && (
              <button 
                className="btn-modal-secondary"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Next Step →
              </button>
            )}
          </div>

          <button 
            className="btn-modal-primary"
            onClick={activeStepData.action}
          >
            <span>{activeStepData.actionLabel}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
