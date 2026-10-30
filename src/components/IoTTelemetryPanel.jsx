import React from "react";
import { 
  Radio, 
  Activity, 
  Waves, 
  Zap, 
  AlertTriangle, 
  Battery,
  Clock,
  MapPin,
  ChevronRight
} from "lucide-react";
import { IOT_SENSORS } from "../data/iotSensors";

export default function IoTTelemetryPanel({ onSelectIncident, onClose }) {
  return (
    <div className="iot-telemetry-container">
      {/* Banner */}
      <div className="iot-telemetry-header">
        <div className="flex items-center gap-2">
          <div className="iot-live-pulse-wrapper">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="iot-title">Live Municipal IoT Telemetry Feed</h3>
              <span className="badge-live-cyan">6 SENSORS BROADCASTING</span>
            </div>
            <p className="iot-sub">Real-time edge telemetry cross-correlated with citizen reports to eliminate false alarms and confirm physical hazards.</p>
          </div>
        </div>

        {onClose && (
          <button className="btn-modal-secondary text-xs" onClick={onClose}>
            Close Feed
          </button>
        )}
      </div>

      {/* Grid of Live Sensors */}
      <div className="iot-sensors-grid">
        {IOT_SENSORS.map((sensor) => {
          const isCritical = sensor.status.includes("CRITICAL") || sensor.status.includes("FAULT") || sensor.status.includes("SNAPPED");
          
          return (
            <div 
              key={sensor.id} 
              className={`iot-sensor-card ${isCritical ? "sensor-card-alert" : ""}`}
            >
              {/* Sensor Header */}
              <div className="sensor-card-top">
                <div className="flex items-center gap-2">
                  <span className="sensor-type-icon">
                    {sensor.type === "WATER_LEVEL" && <Waves className="w-4 h-4 text-cyan-400" />}
                    {sensor.type === "ELECTRICAL_GRID" && <Zap className="w-4 h-4 text-amber-400" />}
                    {sensor.type === "STRUCTURAL_ROAD" && <Activity className="w-4 h-4 text-red-400" />}
                    {sensor.type === "WATER_PRESSURE" && <Waves className="w-4 h-4 text-blue-400" />}
                    {sensor.type === "ENVIRONMENTAL" && <AlertTriangle className="w-4 h-4 text-purple-400" />}
                  </span>
                  <div>
                    <span className="sensor-id-code font-mono">{sensor.id}</span>
                    <h5 className="sensor-name">{sensor.name}</h5>
                  </div>
                </div>

                <span className={`sensor-status-chip ${isCritical ? "chip-red" : "chip-amber"}`}>
                  {sensor.status.replace(/_/g, " ")}
                </span>
              </div>

              {/* Sensor Reading Big Display */}
              <div className="sensor-metric-display">
                <div className="metric-primary-value">
                  <span className="font-mono text-xl font-extrabold text-white">{sensor.reading}</span>
                  <span className="text-xs text-slate-400 block mt-0.5">Threshold: {sensor.threshold}</span>
                </div>
                <div className="metric-gauge-wrapper">
                  <span className="text-xs font-mono font-bold text-cyan-400">{sensor.percentage}% Load</span>
                  <div className="gauge-bar-bg">
                    <div 
                      className={`gauge-bar-fill ${isCritical ? "fill-red" : "fill-amber"}`} 
                      style={{ width: `${sensor.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Telemetry Log */}
              <p className="sensor-telemetry-note">
                <strong>Log: </strong>{sensor.telemetryLog}
              </p>

              {/* Sensor Location & Battery */}
              <div className="sensor-footer-meta">
                <span className="flex items-center gap-1 text-slate-400">
                  <MapPin className="w-3 h-3" />
                  <span>{sensor.location.ward}</span>
                </span>
                <span className="flex items-center gap-1 text-slate-400 font-mono">
                  <Battery className="w-3 h-3 text-emerald-400" />
                  <span>{sensor.battery}</span>
                </span>
                <span className="flex items-center gap-1 text-slate-400 font-mono">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>{sensor.lastPing}</span>
                </span>
              </div>

              {/* Correlated Incident Cross Link */}
              {sensor.correlatedIncidentId && (
                <button 
                  className="btn-correlated-incident"
                  onClick={() => onSelectIncident(sensor.correlatedIncidentId)}
                  title="View matching citizen report corroborated by this sensor"
                >
                  <span className="text-xs text-cyan-300 font-semibold">Corroborates Citizen Ticket #{sensor.correlatedIncidentId}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
