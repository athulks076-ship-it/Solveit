import React, { useState } from "react";
import { 
  X, 
  Video, 
  Eye, 
  Crosshair, 
  Compass, 
  Cpu, 
  ChevronRight,
  Sliders
} from "lucide-react";

export default function LiveVideoModal({ feed, isOpen, onClose, onInspectTicket }) {
  const [thermalMode, setThermalMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hudActive, setHudActive] = useState(true);
  const [hudTime] = useState(() => new Date().toLocaleTimeString());

  if (!isOpen || !feed) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container video-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Stream Header */}
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <div className="stream-live-badge-box">
              <span className="stream-live-dot"></span>
              <Video className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="modal-title font-mono">{feed.id}: {feed.name}</h3>
                <span className="badge-live font-mono text-2xs">{feed.status}</span>
              </div>
              <p className="modal-subtitle">
                📍 {feed.location} • [{feed.coordinates.lat.toFixed(4)}, {feed.coordinates.lng.toFixed(4)}] • {feed.fps} FPS ({feed.bitrate})
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player & HUD Screen */}
        <div className="video-player-frame">
          <video 
            src={feed.videoUrl} 
            poster={feed.posterUrl}
            autoPlay 
            loop 
            muted 
            playsInline
            className={`live-video-element ${thermalMode ? "video-thermal-filter" : ""}`}
            style={{ transform: `scale(${zoomLevel})` }}
          />

          {/* AI Vision HUD Overlay */}
          {hudActive && (
            <div className="video-hud-overlay">
              {/* Top HUD Row */}
              <div className="hud-top-bar">
                <div className="hud-chip">
                  <span className="text-red-400 font-bold font-mono">REC ●</span>
                  <span className="font-mono text-white text-xs">{hudTime}</span>
                </div>
                <div className="hud-chip">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  <span className="text-cyan-300 font-mono text-xs">AI EDGE INFERENCE ACTIVE (YOLOv11-Civic)</span>
                </div>
                <div className="hud-chip">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-mono text-white text-xs">HDOP: 0.8 • GPS LOCKED</span>
                </div>
              </div>

              {/* Center Crosshairs */}
              <div className="hud-center-crosshair">
                <Crosshair className="w-12 h-12 text-cyan-400 opacity-60" />
              </div>

              {/* Real-time AI Detections Floating Tags */}
              <div className="hud-detections-list">
                <span className="hud-detections-label">REAL-TIME CV DETECTIONS:</span>
                {feed.aiVisionDetections.map((det, i) => (
                  <div key={i} className="hud-detection-tag">
                    <span className="det-label">{det.label}:</span>
                    <strong className="det-val text-amber-300 font-mono">{det.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Stream Controls & Correlation Panel */}
        <div className="video-controls-bar">
          <div className="flex items-center gap-2">
            <button 
              className={`btn-control-chip ${hudActive ? "active" : ""}`}
              onClick={() => setHudActive(!hudActive)}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>AI HUD Overlay</span>
            </button>

            <button 
              className={`btn-control-chip ${thermalMode ? "active" : ""}`}
              onClick={() => setThermalMode(!thermalMode)}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Thermal IR Mode</span>
            </button>

            <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded border border-slate-700 text-xs">
              <span className="text-slate-400">Zoom:</span>
              <button className="px-1 font-bold text-white" onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.25))}>-</button>
              <span className="font-mono text-cyan-400">{zoomLevel}x</span>
              <button className="px-1 font-bold text-white" onClick={() => setZoomLevel(Math.min(2.5, zoomLevel + 0.25))}>+</button>
            </div>
          </div>

          {/* Correlated Ticket Link */}
          {feed.correlatedIncidentId && (
            <button 
              className="btn-inspect-stream-ticket"
              onClick={() => {
                onInspectTicket(feed.correlatedIncidentId);
                onClose();
              }}
            >
              <span>Inspect Correlated Ticket #{feed.correlatedIncidentId}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
