import React from "react";
import { X, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, HelpCircle } from "lucide-react";

export default function HonestyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container honesty-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            <div>
              <h3 className="modal-title">Limitations & Honesty Note</h3>
              <p className="modal-subtitle">Official Rubric Disclosure — Transparency on What is Real vs. Simulated</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body-scroll">
          
          {/* Section 1: What is Real & Fully Functional */}
          <div className="honesty-section">
            <div className="honesty-section-header text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>1. What is Fully Real & Functional in this Prototype</span>
            </div>
            <ul className="honesty-list">
              <li>
                <strong>Geospatial & Semantic Deduplication Engine:</strong> Real mathematical calculation combining tokenized Jaccard similarity, critical n-gram phrase matching, and Haversine geographic distance (&lt;350m radius).
              </li>
              <li>
                <strong>Explainable Multi-Factor Prioritization Matrix (0–100):</strong> Purely algorithmic and transparent. Breaks down public safety/fatality risk (0-40), transit arterial impact (0-25), school/hospital vulnerability zone (0-20), and aging/duplicate community corroborations (0-15).
              </li>
              <li>
                <strong>Hotspot & Spatial Clustering Algorithm:</strong> Analyzes report coordinates to discover multi-category compounding breakdowns (e.g. Indiranagar Ward 4 drainage-asphalt cascade).
              </li>
              <li>
                <strong>Interactive Geospatial Cartography:</strong> Real Leaflet GIS integration rendering custom pulsing markers, zoom controls, tooltips, and cluster bounding radiuses.
              </li>
              <li>
                <strong>Autonomous Action Brief Synthesis:</strong> Converts messy civic reports into structured, actionable municipal commissioner briefings with designated task forces and equipment specs.
              </li>
              <li>
                <strong>State & Persistence:</strong> Real-time synchronized state across Citizen Portal, Map, Queue, and Tracking via LocalStorage with dynamic reset capability.
              </li>
              <li>
                <strong>Live Municipal IoT Telemetry Feed Integration:</strong> Active telemetry monitoring across 6 live municipal sensor nodes (water level ultrasonic sensors, electrical grid ground fault detectors, and pavement cavity monitors) cross-correlating directly with citizen reports.
              </li>
              <li>
                <strong>AI-Generated WhatsApp & Cellular Dispatch Routing:</strong> Generates field-ready dispatch payloads with designated zone engineers, turn-by-turn Google Maps links, and machinery checklists with one-click WhatsApp Web launch.
              </li>
              <li>
                <strong>Citizen Reputation & Anti-Spam Verification:</strong> Multi-factor credibility algorithm (0-100) scoring mobile OTP, Exif photo GPS geo-fencing, and linguistic coherence to filter out bot spam and duplicate astroturfing.
              </li>
            </ul>
          </div>


          {/* Section 2: What is Simulated / Mocked for Demo */}
          <div className="honesty-section">
            <div className="honesty-section-header text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              <span>2. What is Simulated or Mocked</span>
            </div>
            <ul className="honesty-list">
              <li>
                <strong>Field Worker Telemetry / GPS Truck Tracking:</strong> Field response vehicle arrival times are simulated state transitions rather than live OBD-II vehicle IoT sensors.
              </li>
              <li>
                <strong>SMS / WhatsApp Citizen Webhooks:</strong> Citizen notifications are modeled in-browser rather than consuming live Twilio / Meta WhatsApp Business API credits.
              </li>
              <li>
                <strong>Municipal ERP / SAP Database Integration:</strong> Real municipalities run SAP/NIC legacy databases; our prototype uses a client-side reactive store to ensure offline resilience during live judging.
              </li>
              <li>
                <strong>Computer Vision Photo Tagging:</strong> Photos are rendered with simulated tag extraction rather than high-latency cloud computer-vision calls during the 5-minute presentation.
              </li>
            </ul>
          </div>

          {/* Section 3: Where the AI Can Be Wrong (Failure Modes) */}
          <div className="honesty-section">
            <div className="honesty-section-header text-red-400">
              <HelpCircle className="w-4 h-4" />
              <span>3. Where the AI Can Fail (Edge Cases & Failure Modes)</span>
            </div>
            <ul className="honesty-list">
              <li>
                <strong>Sarcasm & Civic Irony:</strong> A citizen posting <em>"Lovely new municipal swimming pool on 100ft road!"</em> can be classified as recreation rather than severe street waterlogging without sentiment calibration.
              </li>
              <li>
                <strong>Colloquial & Vernacular Landmark Ambiguity:</strong> Descriptions like <em>"near the big banyan tree where the tea stall used to be"</em> without GPS coordinates cannot be reliably resolved to a spatial coordinate.
              </li>
              <li>
                <strong>Adversarial Astroturfing:</strong> Malicious actors submitting multiple coordinated synthetic reports to artificially inflate the urgency of a trivial issue on their street. (Requires rate limiting and citizen reputation scoring).
              </li>
            </ul>
          </div>

          {/* Section 4: Production Roadmap (What We Would Do Next) */}
          <div className="honesty-section">
            <div className="honesty-section-header text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>4. Production Roadmap & Next Steps</span>
            </div>
            <ul className="honesty-list">
              <li>
                <strong>Multilingual Voice Input:</strong> Whisper-based speech-to-text in 12 Indian regional languages (Kannada, Hindi, Tamil, Telugu, etc.) to bridge the digital divide for illiterate citizens.
              </li>
              <li>
                <strong>Drone & Dashcam Auto-Verification:</strong> Integrating municipal bus dashcam feeds to automatically verify reported potholes and monitor repair durability over time.
              </li>
              <li>
                <strong>Predictive Monsoonal Infrastructure Modeling:</strong> Pre-emptively dispatching desilting crews 48 hours *before* forecasted rainstorms based on historical drainage clog hotspots.
              </li>
            </ul>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-modal-close" onClick={onClose}>
            Close Disclosure
          </button>
        </div>

      </div>
    </div>
  );
}
