import React, { useState } from "react";
import { 
  X, 
  Send, 
  Copy, 
  CheckCircle2, 
  MessageSquare, 
  ExternalLink,
  Radio
} from "lucide-react";
import { ZONE_ENGINEERS, IOT_SENSORS } from "../data/iotSensors";
import { generateWhatsAppDispatchPayload } from "../services/aiEngine";

export default function WhatsAppDispatchModal({ report, isOpen, onClose }) {
  const [selectedEngineerIndex, setSelectedEngineerIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [dispatchedSim, setDispatchedSim] = useState(false);
  const [dispatchTime] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  if (!isOpen || !report) return null;

  // Find default matching engineer by ward/department
  const defaultEngineer = ZONE_ENGINEERS[selectedEngineerIndex] || ZONE_ENGINEERS[0];
  
  // Find correlated IoT sensor if any
  const correlatedSensor = IOT_SENSORS.find(s => s.correlatedIncidentId === report.id);

  const payload = generateWhatsAppDispatchPayload(report, defaultEngineer, correlatedSensor);

  const handleCopy = () => {
    navigator.clipboard.writeText(payload.message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSimulateDispatch = () => {
    setDispatchedSim(true);
    setTimeout(() => setDispatchedSim(false), 4000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container dispatch-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <div className="dispatch-badge-icon">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="modal-title">AI WhatsApp & Cellular Dispatch Router</h3>
              <p className="modal-subtitle">Direct Automated Payload Delivery to Ward Zone Engineers</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body-scroll">
          
          {/* Top Configuration Grid */}
          <div className="dispatch-config-grid">
            <div>
              <label className="sub-label">Select Target Zone Engineer</label>
              <select 
                className="form-input text-xs font-semibold"
                value={selectedEngineerIndex}
                onChange={(e) => setSelectedEngineerIndex(Number(e.target.value))}
              >
                {ZONE_ENGINEERS.map((eng, idx) => (
                  <option key={idx} value={idx}>
                    {eng.name} — {eng.role} ({eng.department})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="sub-label">Engineer WhatsApp / Cellular Endpoint</label>
              <div className="form-input flex items-center justify-between text-xs font-mono text-emerald-400">
                <span>{defaultEngineer.whatsapp}</span>
                <span className="text-slate-400 font-sans text-2xs">Carrier: BSNL/Jio Gov APN</span>
              </div>
            </div>
          </div>

          {/* Correlated IoT Telemetry Banner if detected */}
          {correlatedSensor && (
            <div className="dispatch-iot-alert">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                <strong className="text-xs text-cyan-300 font-bold uppercase">IoT Ground Sensor Verified:</strong>
                <span className="text-xs text-white font-mono">{correlatedSensor.id} ({correlatedSensor.name})</span>
              </div>
              <p className="text-xs text-cyan-100 mt-1">
                Telemetry reading <strong>{correlatedSensor.reading}</strong> corroborates citizen report with 100% physical signal confirmation.
              </p>
            </div>
          )}

          {/* WhatsApp Message Preview Bubble */}
          <div className="whatsapp-preview-card">
            <div className="whatsapp-bubble-header">
              <div className="flex items-center gap-2">
                <span className="whatsapp-avatar">SE</span>
                <div>
                  <span className="whatsapp-sender">SolveIt Autonomous Dispatch Service</span>
                  <span className="whatsapp-status">To: {defaultEngineer.name} ({defaultEngineer.phone})</span>
                </div>
              </div>
              <span className="whatsapp-time">{dispatchTime}</span>
            </div>

            <pre className="whatsapp-message-text">{payload.message}</pre>

            <div className="whatsapp-bubble-footer">
              <span className="text-xs text-slate-400">Target SLA: <strong className="text-emerald-400 font-mono">{payload.targetSLA}</strong></span>
              <span className="text-xs text-cyan-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> End-to-End Encrypted
              </span>
            </div>
          </div>

          {dispatchedSim && (
            <div className="simulated-dispatch-banner">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong className="text-emerald-300 text-xs">Simulated Cellular Transmission Complete!</strong>
                <p className="text-xs text-emerald-200 mt-0.5">
                  Payload pushed to Engineer Terminal <code>TER-BLR-04</code> via Municipal Webhook. Awaiting engineer ACK.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="modal-footer flex items-center justify-between">
          <button 
            type="button"
            className="btn-modal-secondary flex items-center gap-2"
            onClick={handleCopy}
          >
            <Copy className="w-4 h-4" />
            <span>{copied ? "Copied to Clipboard!" : "Copy Payload"}</span>
          </button>

          <div className="flex items-center gap-2">
            <button 
              type="button"
              className="btn-simulate-dispatch"
              onClick={handleSimulateDispatch}
            >
              <Radio className="w-4 h-4" />
              <span>Simulate Cellular Dispatch</span>
            </button>

            <a 
              href={payload.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-whatsapp-direct"
            >
              <Send className="w-4 h-4" />
              <span>Open in WhatsApp Web</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
