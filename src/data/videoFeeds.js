/**
 * Live Municipal Video Feeds Directory: CCTV Surveillance & Drone Patrols
 * Real-time streams embedded directly alongside Leaflet GIS markers.
 */

export const VIDEO_FEEDS = [
  {
    id: "CAM-BLR-104",
    name: "BBMP Traffic & Drainage CCTV #104",
    type: "CCTV_SURVEILLANCE",
    location: "12th Main Road Junction, Indiranagar",
    coordinates: { lat: 12.9721, lng: 77.6414 },
    status: "LIVE • STREAMING 1080p",
    fps: 30,
    bitrate: "4.2 Mbps",
    correlatedIncidentId: "CIVIC-2026-1001",
    aiVisionDetections: [
      { label: "Water Level Detected", value: "1.48m (Culvert Overflow)", alert: true },
      { label: "Vehicle Obstruction", value: "2 Delivery Scooters Stalled", alert: true },
      { label: "Pedestrian Flow", value: "High Risk Wading", alert: true }
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    posterUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb1862401?w=800&auto=format&fit=crop&q=80",
    panTiltZoomEnabled: true
  },
  {
    id: "DRONE-SQUAD-02",
    name: "Autonomous Aerial Drone Squad #2 (DJI Matrice 300)",
    type: "DRONE_AERIAL_PATROL",
    location: "Hosur Road Metro Pillar 114, Silk Board",
    coordinates: { lat: 12.9174, lng: 77.6231 },
    status: "AIRBORNE • ALT: 45m AGL",
    fps: 60,
    bitrate: "8.5 Mbps (Thermal + RGB)",
    correlatedIncidentId: "CIVIC-2026-2001",
    aiVisionDetections: [
      { label: "Asphalt Cavity Size", value: "4.4m x 3.8m Crater", alert: true },
      { label: "Subsurface Void", value: "Thermal Density Anomaly Detected", alert: true },
      { label: "Traffic Queue", value: "850m Arterial Gridlock", alert: true }
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    posterUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80",
    panTiltZoomEnabled: true
  },
  {
    id: "CAM-BESCOM-08",
    name: "BESCOM Substation Perimeter Cam #08",
    type: "CCTV_SURVEILLANCE",
    location: "14th Cross, Malleshwaram Primary School",
    coordinates: { lat: 13.0035, lng: 77.5689 },
    status: "LIVE • HAZARD DETECTED",
    fps: 30,
    bitrate: "3.8 Mbps",
    correlatedIncidentId: "CIVIC-2026-3001",
    aiVisionDetections: [
      { label: "Active Electrical Arc", value: "11kV Sparking on Fence", alert: true },
      { label: "Pedestrian Proximity", value: "School Gate 18m Away", alert: true },
      { label: "Ground Water State", value: "Electrified Pool Risk", alert: true }
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    posterUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80",
    panTiltZoomEnabled: false
  }
];
