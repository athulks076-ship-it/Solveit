/**
 * IoT Sensor Network & Municipal Telemetry Grid
 * Live sensors deployed across Bangalore Central correlating with citizen reports
 */

export const IOT_SENSORS = [
  {
    id: "IOT-SWD-04",
    name: "Ultrasonic Culvert Depth Sensor",
    type: "WATER_LEVEL",
    location: {
      address: "12th Main Road Culvert, Indiranagar, Ward 4",
      lat: 12.9720,
      lng: 77.6410,
      ward: "Ward 4 - Indiranagar"
    },
    reading: "1.48 m",
    threshold: "1.20 m",
    percentage: 92,
    status: "CRITICAL_OVERFLOW",
    lastPing: "Just now (12s ago)",
    battery: "94%",
    correlatedIncidentId: "CIVIC-2026-1001",
    telemetryLog: "Water height rising +4.2 cm/min due to downstream culvert debris blockage."
  },
  {
    id: "IOT-GRID-11",
    name: "Substation Feeder Pillar Telemetry",
    type: "ELECTRICAL_GRID",
    location: {
      address: "12th Main, 6th Cross Junction, Indiranagar",
      lat: 12.9723,
      lng: 77.6407,
      ward: "Ward 4 - Indiranagar"
    },
    reading: "440 V / 32 A Ground Leak",
    threshold: "0.5 A Ground Leak",
    percentage: 98,
    status: "GROUND_FAULT_ARCING",
    lastPing: "28s ago",
    battery: "AC Powered",
    correlatedIncidentId: "CIVIC-2026-1005",
    telemetryLog: "Submerged terminal block detected. Phase B arcing intermittently in water."
  },
  {
    id: "IOT-GRID-45",
    name: "Overhead 11kV Line Tension & Continuity",
    type: "ELECTRICAL_GRID",
    location: {
      address: "14th Cross, Malleshwaram School Corridor",
      lat: 13.0034,
      lng: 77.5691,
      ward: "Ward 45 - Malleshwaram"
    },
    reading: "0 kg / 0 kV (Open Loop)",
    threshold: "280 kg Tension",
    percentage: 100,
    status: "LINE_SNAPPED",
    lastPing: "1m ago",
    battery: "Solar + LiFePO4",
    correlatedIncidentId: "CIVIC-2026-3001",
    telemetryLog: "Phase conductor mechanical snap confirmed. Emergency circuit breaker trip at Substation #7."
  },
  {
    id: "IOT-ROAD-64",
    name: "Subsurface Pavement Deflection Monitor",
    type: "STRUCTURAL_ROAD",
    location: {
      address: "Hosur Main Road, opposite Metro Pillar 114",
      lat: 12.9173,
      lng: 77.6233,
      ward: "Ward 64 - Madivala"
    },
    reading: "52 mm Shear Displacement",
    threshold: "15 mm Displacement",
    percentage: 88,
    status: "SUBSURFACE_CAVITY",
    lastPing: "45s ago",
    battery: "91%",
    correlatedIncidentId: "CIVIC-2026-2001",
    telemetryLog: "Severe soil shear strain detected beneath right transit lane. Sinkhole progression active."
  },
  {
    id: "IOT-SWD-12",
    name: "Pressurized Water Main Acoustic Hydrophone",
    type: "WATER_PRESSURE",
    location: {
      address: "80 Feet Road, 4th Block, Koramangala",
      lat: 12.9346,
      lng: 77.6290,
      ward: "Ward 68 - Koramangala"
    },
    reading: "1.2 Bar (Drop from 6.8 Bar)",
    threshold: "5.5 Bar Normal",
    percentage: 82,
    status: "PRESSURE_RUPTURE",
    lastPing: "3m ago",
    battery: "88%",
    correlatedIncidentId: "CIVIC-2026-3002",
    telemetryLog: "Acoustic signature matches high-pressure line burst. Estimated discharge: 850 L/min."
  },
  {
    id: "IOT-AIR-18",
    name: "Electrochemical Biohazard Gas Sensor",
    type: "ENVIRONMENTAL",
    location: {
      address: "Victoria Hospital Road, Kalasipalya",
      lat: 12.9614,
      lng: 77.5742,
      ward: "Ward 139 - KR Market"
    },
    reading: "18 ppm Ammonia / VOC",
    threshold: "5 ppm Safety Limit",
    percentage: 75,
    status: "BIOHAZARD_SPILL",
    lastPing: "2m ago",
    battery: "95%",
    correlatedIncidentId: "CIVIC-2026-4002",
    telemetryLog: "Elevated volatile bio-waste decomposition plume detected in open street air."
  }
];

export const ZONE_ENGINEERS = [
  {
    ward: "Ward 4 - Indiranagar",
    department: "BWSSB (Water Supply & Drainage)",
    name: "Er. Ramesh Narayan",
    role: "Assistant Executive Engineer (AEE - SWD)",
    phone: "+91 98450 11920",
    whatsapp: "+919845011920"
  },
  {
    ward: "Ward 4 - Indiranagar",
    department: "BBMP Road Infrastructure",
    name: "Er. Sunita Kulkarni",
    role: "Executive Engineer (Major Roads)",
    phone: "+91 98801 44210",
    whatsapp: "+919880144210"
  },
  {
    ward: "Ward 45 - Malleshwaram",
    department: "BESCOM Emergency Squad",
    name: "Er. B. K. Somashekar",
    role: "Divisional Technical Officer",
    phone: "+91 94480 33819",
    whatsapp: "+919448033819"
  },
  {
    ward: "Ward 64 - Madivala",
    department: "BMRCL / BBMP Major Roads",
    name: "Er. P. Venkatesh",
    role: "Transit Corridor Superintendent",
    phone: "+91 97410 55821",
    whatsapp: "+919741055821"
  },
  {
    ward: "General Citywide",
    department: "Disaster & Emergency Response",
    name: "Capt. Arvind Joshi",
    role: "Municipal Incident Commander",
    phone: "+91 99000 88123",
    whatsapp: "+919900088123"
  }
];
