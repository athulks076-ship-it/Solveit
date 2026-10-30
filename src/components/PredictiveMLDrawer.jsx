import React, { useState } from "react";
import { 
  CloudRain, 
  CheckCircle2, 
  Send, 
  MapPin, 
  Clock, 
  X,
  Activity,
  Droplets,
  Layers
} from "lucide-react";
import { PREDICTIVE_ML_ALERTS } from "../data/predictiveAlerts";

export default function PredictiveMLDrawer({ isOpen, onClose, onFocusCoordinates }) {
  const [alerts, setAlerts] = useState(PREDICTIVE_ML_ALERTS);

  if (!isOpen) return null;

  const handleAuthorizePreDispatch = (id) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, actionTriggered: true } : a))
    );
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container predictive-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <div className="predictive-header-icon">
              <CloudRain className="w-5 h-5 text-cyan-400 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="modal-title">Predictive ML Drainage Basin Spatial Forecasting</h3>
                <span className="badge-live-cyan">LSTM HYDROLOGY ACTIVE</span>
              </div>
              <p className="modal-subtitle">
                Pre-storm spatial forecasting highlighting urban drainage basins likely to flood 2–4 hours before citizen reports peak.
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body-scroll">
          
          <div className="predictive-alerts-list">
            {alerts.map((alert) => {
              const isExtreme = alert.floodProbability >= 90;

              return (
                <div 
                  key={alert.id} 
                  className={`predictive-card ${isExtreme ? "card-extreme-flood" : ""}`}
                >
                  {/* Card Top */}
                  <div className="predictive-card-top">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-cyan-400 font-bold">{alert.id}</span>
                        <span className={`predictive-risk-pill ${isExtreme ? "risk-extreme" : "risk-high"}`}>
                          {alert.floodProbability}% PROBABILITY • {alert.riskLevel.replace(/_/g, " ")}
                        </span>
                      </div>
                      <h4 className="predictive-basin-name">{alert.basinName}</h4>
                      <span className="text-xs text-slate-300 font-medium">{alert.subsector}</span>
                    </div>

                    <div className="predictive-prob-gauge">
                      <span className="gauge-pct font-mono">{alert.floodProbability}%</span>
                      <span className="gauge-label">Peak Flood Risk</span>
                    </div>
                  </div>

                  {/* Forecasting Metrics Grid */}
                  <div className="predictive-metrics-grid">
                    <div className="pred-metric-box">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <div>
                        <span className="pred-label">Storm Forecast Window:</span>
                        <strong className="pred-val text-white">{alert.forecastWindow}</strong>
                      </div>
                    </div>

                    <div className="pred-metric-box">
                      <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                      <div>
                        <span className="pred-label">Anticipated Precipitation:</span>
                        <strong className="pred-val text-white">{alert.predictedRainfall}</strong>
                      </div>
                    </div>

                    <div className="pred-metric-box">
                      <Layers className="w-3.5 h-3.5 text-purple-400" />
                      <div>
                        <span className="pred-label">Impervious Surface Ratio:</span>
                        <strong className="pred-val text-white">{alert.imperviousSurfaceRatio}</strong>
                      </div>
                    </div>

                    <div className="pred-metric-box">
                      <Activity className="w-3.5 h-3.5 text-emerald-400" />
                      <div>
                        <span className="pred-label">Citizen Exposure at Risk:</span>
                        <strong className="pred-val text-white font-mono">{alert.estimatedCitizensAtRisk.toLocaleString()} Residents</strong>
                      </div>
                    </div>
                  </div>

                  {/* Pre-Emptive Mitigation Directive */}
                  <div className="pre-emptive-action-box">
                    <strong className="text-xs text-cyan-300 uppercase block mb-1">
                      💡 AI Pre-Emptive Mitigation Directive (Action Window: Next 45 Mins):
                    </strong>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      "{alert.preEmptiveAction}"
                    </p>
                  </div>

                  {/* Confirmation Banner if dispatched */}
                  {alert.actionTriggered && (
                    <div className="simulated-dispatch-banner">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xs text-emerald-300 font-semibold">
                        Pre-emptive mitigation directive authorized & transmitted to Ward Drainage Squad. Crews dispatched ahead of storm surge!
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="predictive-actions-row">
                    <button 
                      className="btn-focus-map"
                      onClick={() => {
                        onFocusCoordinates(alert.coordinates.lat, alert.coordinates.lng);
                        onClose();
                      }}
                    >
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Focus Basin on Map</span>
                    </button>

                    <button 
                      className={`btn-authorize-pred ${alert.actionTriggered ? "authorized" : ""}`}
                      onClick={() => handleAuthorizePreDispatch(alert.id)}
                      disabled={alert.actionTriggered}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{alert.actionTriggered ? "Pre-Emptive Dispatch Active" : "Authorize Pre-Emptive Field Dispatch"}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-modal-close" onClick={onClose}>
            Close Forecast Center
          </button>
        </div>

      </div>
    </div>
  );
}
