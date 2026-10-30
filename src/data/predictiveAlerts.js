/**
 * Predictive ML Drainage Basin & Flood Forecast Dataset
 * Hydrological spatial modeling to detect flood basins before citizen complaints peak.
 */

export const PREDICTIVE_ML_ALERTS = [
  {
    id: "PRED-BASIN-01",
    basinName: "Koramangala & Challaghatta (K&C) Valley Basin",
    subsector: "Sector 4B — Indiranagar 12th Main Drainage Corridor",
    floodProbability: 94,
    riskLevel: "EXTREME_PRE_EMPTIVE_ALERT",
    forecastWindow: "Next 2.5 Hours (15:00 - 17:30 IST)",
    predictedRainfall: "48 mm/hr (Convective Cloudburst Signature)",
    imperviousSurfaceRatio: "91% Concrete/Asphalt (Runoff Coeff: 0.88)",
    upstreamDrainSiltation: "78% Choked at Culvert #12",
    estimatedAffectedAreaM2: 85000,
    estimatedCitizensAtRisk: 14500,
    coordinates: { lat: 12.9725, lng: 77.6415 },
    modelConfidence: "96.2% (Ensemble Hydrological LSTM + Doppler Radar)",
    preEmptiveAction: "Pre-emptively dispatch 2x BWSSB high-capacity suction jetting units to 12th Main culvert NOW. Opening this bottleneck 90 mins prior to rainfall peak reduces localized standing water by 68% and prevents road collapse.",
    actionTriggered: false
  },
  {
    id: "PRED-BASIN-02",
    basinName: "Vrishabhavathi River Basin",
    subsector: "Sector 2 — Malleshwaram & Rajajinagar Lowlands",
    floodProbability: 76,
    riskLevel: "HIGH_FLOOD_PROBABILITY",
    forecastWindow: "Next 4 Hours (16:30 - 20:30 IST)",
    predictedRainfall: "32 mm/hr Intense Shower",
    imperviousSurfaceRatio: "84% (Runoff Coeff: 0.79)",
    upstreamDrainSiltation: "52% Silted",
    estimatedAffectedAreaM2: 42000,
    estimatedCitizensAtRisk: 8200,
    coordinates: { lat: 13.0035, lng: 77.5689 },
    modelConfidence: "89.4% (Spatial Rainfall Forecasting)",
    preEmptiveAction: "Pre-stage 2x portable submersible dewatering pumps near railway underpass before evening commuter peak.",
    actionTriggered: false
  },
  {
    id: "PRED-BASIN-03",
    basinName: "Agara-Bellandur Lake Wetland Buffer",
    subsector: "Sector 8 — Yamalur & Outer Ring Road Lowlands",
    floodProbability: 88,
    riskLevel: "CRITICAL_LAKE_OVERFLOW",
    forecastWindow: "Next 5 Hours (17:00 - 22:00 IST)",
    predictedRainfall: "55 mm Cumulative",
    imperviousSurfaceRatio: "94% (Tech Corridor Rapid Runoff)",
    upstreamDrainSiltation: "86% Choked with mixed silt & debris",
    estimatedAffectedAreaM2: 120000,
    estimatedCitizensAtRisk: 26000,
    coordinates: { lat: 12.9372, lng: 77.6698 },
    modelConfidence: "93.8% (Multi-Basin Runoff Hydrograph)",
    preEmptiveAction: "Open secondary emergency sluice gate #3 at Agara weir to lower reservoir head prior to storm inflow.",
    actionTriggered: false
  }
];
