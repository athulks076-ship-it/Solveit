import React, { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { IOT_SENSORS } from "../data/iotSensors";
import { VIDEO_FEEDS } from "../data/videoFeeds";
import { PREDICTIVE_ML_ALERTS } from "../data/predictiveAlerts";
import { Radio, Video, CloudRain } from "lucide-react";

export default function GeospatialMap({ 
  reports = [], 
  selectedReportId, 
  onSelectReport, 
  hotspots = [],
  onOpenVideoFeed,
  onOpenPredictiveDrawer
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const clusterLayerRef = useRef(null);
  const iotLayerRef = useRef(null);
  const videoLayerRef = useRef(null);
  const predLayerRef = useRef(null);

  const [showIotSensors, setShowIotSensors] = useState(true);
  const [showVideoFeeds, setShowVideoFeeds] = useState(true);
  const [showPredictiveBasins, setShowPredictiveBasins] = useState(true);

  // Helper to draw pins, clusters, video cameras, and predictive flood basins
  const renderLayers = useCallback((map, markersLayer, clusterLayer, iotLayer, videoLayer, predLayer) => {
    if (!map || !markersLayer || !clusterLayer || !iotLayer || !videoLayer || !predLayer) return;

    markersLayer.clearLayers();
    clusterLayer.clearLayers();
    iotLayer.clearLayers();
    videoLayer.clearLayers();
    predLayer.clearLayers();

    // 1. Draw Hotspot Cluster Radii (Translucent warning zones)
    hotspots.forEach((hs) => {
      if (!hs.center?.lat || !hs.center?.lng) return;

      const circle = L.circle([hs.center.lat, hs.center.lng], {
        radius: 380,
        color: hs.maxPriority >= 85 ? "#ef4444" : "#f59e0b",
        weight: 2,
        fillColor: hs.maxPriority >= 85 ? "#ef4444" : "#f59e0b",
        fillOpacity: 0.18,
        dashArray: "6, 6"
      });

      circle.bindTooltip(`
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px;">
          <strong style="color: #ef4444; font-size: 13px;">🚨 ${hs.title}</strong><br/>
          <span style="font-size: 11px; color: #334155;">${hs.reportCount} Correlated Failures • Max Priority: ${hs.maxPriority}</span>
        </div>
      `, { permanent: false, direction: "top" });

      circle.addTo(clusterLayer);
    });

    // 2. Draw Predictive ML Drainage Basins (Pre-storm spatial forecasting)
    if (showPredictiveBasins) {
      PREDICTIVE_ML_ALERTS.forEach((basin) => {
        const isExtreme = basin.floodProbability >= 90;
        const basinCircle = L.circle([basin.coordinates.lat, basin.coordinates.lng], {
          radius: 520,
          color: isExtreme ? "#00f2fe" : "#3b82f6",
          weight: 2,
          fillColor: isExtreme ? "#00f2fe" : "#3b82f6",
          fillOpacity: 0.12,
          dashArray: "4, 8"
        });

        basinCircle.bindPopup(`
          <div class="map-popup-card">
            <div class="popup-header">
              <span class="popup-id font-mono text-cyan-400">PREDICTIVE ML FORECAST</span>
              <span class="popup-tier" style="background: rgba(0,242,254,0.2); color: #00f2fe; border: 1px solid #00f2fe;">
                ${basin.floodProbability}% RISK
              </span>
            </div>
            <h4 class="popup-title">⛈️ ${basin.basinName}</h4>
            <p class="popup-desc font-mono" style="color: #67e8f9; font-size: 11px;">${basin.subsector}</p>
            <div style="background: rgba(0,0,0,0.5); padding: 6px; border-radius: 4px; margin: 6px 0; font-size: 11px;">
              <span>Predicted Rainfall: <strong style="color: white;">${basin.predictedRainfall}</strong></span><br/>
              <span>Window: <strong style="color: #fbbf24;">${basin.forecastWindow}</strong></span>
            </div>
            <p class="popup-desc">${basin.preEmptiveAction}</p>
            <button class="btn-popup-inspect" onclick="window.__openPredictiveDrawer()">
              Open Predictive ML Mitigation Center →
            </button>
          </div>
        `);

        basinCircle.addTo(predLayer);
      });
    }

    // 3. Draw Live CCTV & Drone Video Stream Markers
    if (showVideoFeeds) {
      VIDEO_FEEDS.forEach((feed) => {
        const isDrone = feed.type.includes("DRONE");
        const videoHtml = `
          <div class="custom-video-pin ${isDrone ? "pin-drone" : "pin-cctv"}">
            <span class="video-pin-icon">${isDrone ? "🛸" : "🎥"}</span>
            <span class="video-live-dot"></span>
          </div>
        `;

        const videoIcon = L.divIcon({
          className: "custom-leaflet-video-icon",
          html: videoHtml,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        const marker = L.marker([feed.coordinates.lat, feed.coordinates.lng], {
          icon: videoIcon
        });

        marker.bindPopup(`
          <div class="map-popup-card">
            <div class="popup-header">
              <span class="popup-id font-mono text-red-400">LIVE SURVEILLANCE FEED</span>
              <span class="popup-tier" style="background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid #ef4444;">
                ${feed.status}
              </span>
            </div>
            <h4 class="popup-title">${isDrone ? "🛸" : "🎥"} ${feed.name}</h4>
            <p class="popup-desc font-mono" style="color: #94a3b8; font-size: 11px;">📍 ${feed.location}</p>
            <div style="position: relative; height: 90px; border-radius: 4px; overflow: hidden; margin: 6px 0;">
              <img src="${feed.posterUrl}" style="width: 100%; height: 100%; object-fit: cover;" />
              <div style="position: absolute; bottom: 4px; left: 4px; background: rgba(0,0,0,0.7); padding: 2px 6px; font-size: 10px; border-radius: 3px; color: #34d399;">
                CV Detections: ${feed.aiVisionDetections.length} Active
              </div>
            </div>
            <button class="btn-popup-inspect" onclick="window.__openVideoFeed('${feed.id}')">
              Watch Live Stream (1080p + AI HUD) →
            </button>
          </div>
        `);

        marker.addTo(videoLayer);
      });
    }

    // 4. Draw Live Municipal IoT Telemetry Sensor Beacons
    if (showIotSensors) {
      IOT_SENSORS.forEach((sensor) => {
        const isCritical = sensor.status.includes("CRITICAL") || sensor.status.includes("FAULT") || sensor.status.includes("SNAPPED");
        const beaconHtml = `
          <div class="custom-iot-pin ${isCritical ? "iot-pin-critical" : "iot-pin-warning"}">
            <span class="iot-pin-icon">📡</span>
            <span class="iot-pin-pulse"></span>
          </div>
        `;

        const iotIcon = L.divIcon({
          className: "custom-leaflet-iot-icon",
          html: beaconHtml,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        const marker = L.marker([sensor.location.lat, sensor.location.lng], {
          icon: iotIcon
        });

        marker.bindPopup(`
          <div class="map-popup-card">
            <div class="popup-header">
              <span class="popup-id font-mono text-cyan-400">IOT TELEMETRY NODE</span>
              <span class="popup-tier" style="background: rgba(0, 242, 254, 0.2); color: #00f2fe; border: 1px solid #00f2fe;">
                ${sensor.id}
              </span>
            </div>
            <h4 class="popup-title">${sensor.name}</h4>
            <div style="background: rgba(0,0,0,0.4); padding: 6px; border-radius: 4px; margin-bottom: 6px;">
              <span style="font-size: 11px; color: #94a3b8; display: block;">Live Reading:</span>
              <strong style="font-size: 14px; color: ${isCritical ? '#ef4444' : '#f59e0b'}; font-family: monospace;">${sensor.reading}</strong>
              <span style="font-size: 10px; color: #64748b; display: block;">Threshold: ${sensor.threshold}</span>
            </div>
            <p class="popup-desc">${sensor.telemetryLog}</p>
            <div class="popup-meta">
              <span>📍 ${sensor.location.address}</span>
              <span>🔋 Battery: ${sensor.battery} • Last Ping: ${sensor.lastPing}</span>
            </div>
            ${sensor.correlatedIncidentId ? `
              <button class="btn-popup-inspect" onclick="window.__selectReportFromMap('${sensor.correlatedIncidentId}')">
                Inspect Correlated Citizen Ticket #${sensor.correlatedIncidentId} →
              </button>
            ` : ''}
          </div>
        `);

        marker.addTo(iotLayer);
      });
    }

    // 5. Plot Citizen Report Markers
    reports.forEach((report) => {
      if (!report.location?.lat || !report.location?.lng) return;

      const isSelected = report.id === selectedReportId;
      const isCritical = report.priorityTier === "CRITICAL" && report.status !== "Resolved";
      const isResolved = report.status === "Resolved";

      let markerColor = "#00f2fe"; // medium default
      if (isResolved) markerColor = "#64748b";
      else if (report.priorityTier === "CRITICAL") markerColor = "#ef4444";
      else if (report.priorityTier === "HIGH") markerColor = "#f59e0b";
      else if (report.priorityTier === "ROUTINE") markerColor = "#10b981";

      const htmlContent = `
        <div class="custom-map-pin ${isSelected ? "pin-selected" : ""} ${isCritical ? "pin-critical-pulse" : ""}" style="--pin-color: ${markerColor}">
          <span class="pin-score">${report.priorityScore}</span>
        </div>
      `;

      const customIcon = L.divIcon({
        className: "custom-leaflet-div-icon",
        html: htmlContent,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([report.location.lat, report.location.lng], {
        icon: customIcon
      });

      marker.bindPopup(`
        <div class="map-popup-card">
          <div class="popup-header">
            <span class="popup-id font-mono">${report.id}</span>
            <span class="popup-tier" style="background: ${markerColor}22; color: ${markerColor}; border: 1px solid ${markerColor}66;">
              ${report.priorityTier} (${report.priorityScore})
            </span>
          </div>
          <h4 class="popup-title">${report.title}</h4>
          <p class="popup-desc">${report.aiSummary || report.description}</p>
          <div class="popup-meta">
            <span>📍 ${report.location.ward || "Central"}</span>
            <span>🏢 ${report.assignedDepartment || "Triage Pending"}</span>
          </div>
          <button class="btn-popup-inspect" onclick="window.__selectReportFromMap('${report.id}')">
            Inspect Incident Details →
          </button>
        </div>
      `);

      marker.on("click", () => {
        onSelectReport(report.id);
      });

      marker.addTo(markersLayer);

      if (isSelected) {
        map.setView([report.location.lat, report.location.lng], 14, { animate: true });
      }
    });

    window.__selectReportFromMap = (id) => onSelectReport(id);
    window.__openVideoFeed = (feedId) => {
      const target = VIDEO_FEEDS.find(v => v.id === feedId);
      if (target && onOpenVideoFeed) onOpenVideoFeed(target);
    };
    window.__openPredictiveDrawer = () => {
      if (onOpenPredictiveDrawer) onOpenPredictiveDrawer();
    };
  }, [reports, selectedReportId, hotspots, showIotSensors, showVideoFeeds, showPredictiveBasins, onSelectReport, onOpenVideoFeed, onOpenPredictiveDrawer]);

  const renderLayersRef = useRef(renderLayers);
  useEffect(() => {
    renderLayersRef.current = renderLayers;
  }, [renderLayers]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    if (mapContainerRef.current._leaflet_id) {
      delete mapContainerRef.current._leaflet_id;
    }

    const map = L.map(mapContainerRef.current, {
      center: [12.960, 77.630],
      zoom: 12,
      zoomControl: false
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    const markersLayer = L.layerGroup().addTo(map);
    const clusterLayer = L.layerGroup().addTo(map);
    const iotLayer = L.layerGroup().addTo(map);
    const videoLayer = L.layerGroup().addTo(map);
    const predLayer = L.layerGroup().addTo(map);

    markersLayerRef.current = markersLayer;
    clusterLayerRef.current = clusterLayer;
    iotLayerRef.current = iotLayer;
    videoLayerRef.current = videoLayer;
    predLayerRef.current = predLayer;
    mapInstanceRef.current = map;

    renderLayersRef.current(map, markersLayer, clusterLayer, iotLayer, videoLayer, predLayer);

    const t1 = setTimeout(() => map.invalidateSize(), 100);
    const t2 = setTimeout(() => map.invalidateSize(), 400);

    const handleResize = () => map.invalidateSize();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", handleResize);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersLayerRef.current = null;
        clusterLayerRef.current = null;
        iotLayerRef.current = null;
        videoLayerRef.current = null;
        predLayerRef.current = null;
      }
    };
  }, []);

  // Update Layers on prop or toggle change
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    renderLayers(
      mapInstanceRef.current,
      markersLayerRef.current,
      clusterLayerRef.current,
      iotLayerRef.current,
      videoLayerRef.current,
      predLayerRef.current
    );
  }, [renderLayers]);

  return (
    <div className="map-view-wrapper">
      <div 
        id="civic-map" 
        ref={mapContainerRef} 
        className="leaflet-map-canvas"
        style={{ width: "100%", height: "100%", minHeight: "420px" }}
      ></div>

      {/* Floating Toggles Bar */}
      <div className="map-floating-controls-bar">
        <button 
          id="btn-toggle-video-feeds"
          className={`btn-map-layer-toggle ${showVideoFeeds ? "active" : ""}`}
          onClick={() => setShowVideoFeeds(!showVideoFeeds)}
          title="Toggle live CCTV and drone camera stream pins"
        >
          <Video className="w-3.5 h-3.5 text-red-400" />
          <span>Live Video Feeds ({VIDEO_FEEDS.length})</span>
        </button>

        <button 
          id="btn-toggle-pred-basins"
          className={`btn-map-layer-toggle ${showPredictiveBasins ? "active" : ""}`}
          onClick={() => setShowPredictiveBasins(!showPredictiveBasins)}
          title="Toggle predictive ML flood forecasting basins"
        >
          <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
          <span>Predictive Flood Basins ({PREDICTIVE_ML_ALERTS.length})</span>
        </button>

        <button 
          id="btn-toggle-iot-layer"
          className={`btn-map-layer-toggle ${showIotSensors ? "active" : ""}`}
          onClick={() => setShowIotSensors(!showIotSensors)}
          title="Toggle live municipal IoT sensor nodes"
        >
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>IoT Sensors ({IOT_SENSORS.length})</span>
        </button>
      </div>
      
      {/* Map Legend */}
      <div className="map-legend-card">
        <span className="legend-title">Prioritization Legend</span>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-dot dot-critical"></span>
            <span>Critical (80-100)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot dot-high"></span>
            <span>High (60-79)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot dot-medium"></span>
            <span>Medium (40-59)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot dot-routine"></span>
            <span>Routine (&lt;40)</span>
          </div>
          <div className="legend-item">
            <span className="text-xs">🎥</span>
            <span className="text-red-400 font-semibold">CCTV / Drone Stream</span>
          </div>
          <div className="legend-item">
            <span className="text-xs">⛈️</span>
            <span className="text-cyan-400 font-semibold">ML Flood Basin</span>
          </div>
          <div className="legend-item">
            <span className="text-xs">📡</span>
            <span className="text-emerald-400 font-semibold">IoT Sensor Node</span>
          </div>
        </div>
      </div>
    </div>
  );
}
