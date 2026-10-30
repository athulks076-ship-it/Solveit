import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function LocationPickerMap({ lat, lng, onLocationSelect }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const onLocationSelectRef = useRef(onLocationSelect);
  const initialLatRef = useRef(Number(lat) || 12.9725);
  const initialLngRef = useRef(Number(lng) || 77.6418);

  useEffect(() => {
    onLocationSelectRef.current = onLocationSelect;
  }, [onLocationSelect]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up existing map if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    if (mapContainerRef.current._leaflet_id) {
      delete mapContainerRef.current._leaflet_id;
    }

    const map = L.map(mapContainerRef.current, {
      center: [initialLatRef.current, initialLngRef.current],
      zoom: 14,
      zoomControl: true
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);

    // Custom pulsing pin icon
    const customPin = L.divIcon({
      className: "picker-pin-wrapper",
      html: `
        <div style="
          width: 30px; 
          height: 30px; 
          background: #ef4444; 
          border: 3px solid #ffffff; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.6);
          color: white;
          font-weight: bold;
          font-size: 14px;
        ">📍</div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    const marker = L.marker([initialLatRef.current, initialLngRef.current], {
      icon: customPin,
      draggable: true
    }).addTo(map);

    markerRef.current = marker;
    mapInstanceRef.current = map;

    // Click map to reposition pin
    map.on("click", (e) => {
      const { lat: clickedLat, lng: clickedLng } = e.latlng;
      marker.setLatLng([clickedLat, clickedLng]);
      if (onLocationSelectRef.current) {
        onLocationSelectRef.current(Number(clickedLat.toFixed(5)), Number(clickedLng.toFixed(5)));
      }
    });

    // Drag marker
    marker.on("dragend", () => {
      const pos = marker.getLatLng();
      if (onLocationSelectRef.current) {
        onLocationSelectRef.current(Number(pos.lat.toFixed(5)), Number(pos.lng.toFixed(5)));
      }
    });

    // Force size calculation
    setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  // Update marker position when lat/lng change from presets
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      const currentPos = markerRef.current.getLatLng();
      if (Math.abs(currentPos.lat - lat) > 0.0001 || Math.abs(currentPos.lng - lng) > 0.0001) {
        markerRef.current.setLatLng([lat, lng]);
        mapInstanceRef.current.setView([lat, lng], 14, { animate: true });
      }
    }
  }, [lat, lng]);

  return (
    <div className="location-picker-map-wrapper">
      <div 
        ref={mapContainerRef} 
        style={{ width: "100%", height: "180px", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)" }}
      ></div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "6px" }}>
        <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>👆 Click or drag pin anywhere on map to change location</span>
        <span style={{ fontSize: "0.7rem", color: "#00f2fe", fontFamily: "JetBrains Mono, monospace" }}>
          [{lat.toFixed(4)}, {lng.toFixed(4)}]
        </span>
      </div>
    </div>
  );
}
