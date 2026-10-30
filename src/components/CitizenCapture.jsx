import React, { useState } from "react";
import confetti from "canvas-confetti";
import { 
  Camera, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Cpu, 
  FileCheck, 
  Copy,
  Zap,
  ShieldAlert,
  Loader2,
  UserCheck
} from "lucide-react";
import { CATEGORIES } from "../data/initialReports";
import { 
  detectDuplicate, 
  calculateExplainablePriority, 
  generateExecutiveSummary,
  calculateCitizenReputation
} from "../services/aiEngine";
import { generateReportId } from "../services/storageService";
import LocationPickerMap from "./LocationPickerMap";

export default function CitizenCapture({ 
  existingReports, 
  onReportCreated, 
  onNavigateToTrack, 
  onNavigateToCommand 
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Roads & Potholes");
  const [address, setAddress] = useState("12th Main Road, Indiranagar");
  const [landmark, setLandmark] = useState("Near 80ft Road Junction");
  const [lat, setLat] = useState(12.9725);
  const [lng, setLng] = useState(77.6418);
  const [ward, setWard] = useState("Ward 4 - Indiranagar");
  const [reporterName, setReporterName] = useState("Citizen Submitter");
  const [reporterPhone, setReporterPhone] = useState("+91 98450 77123");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80");

  // AI Pipeline Submission States
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0); // 0 to 4
  const [submissionResult, setSubmissionResult] = useState(null);

  // Quick Demo Presets
  const applyPreset = (type) => {
    if (type === "duplicate") {
      setTitle("Dangerous deep hole on road near silk board pillar 114");
      setDescription("A very large crater has formed right opposite metro pillar 114 on Hosur road. Vehicles are swerving into oncoming traffic. High risk of accidents.");
      setCategory("Roads & Potholes");
      setAddress("Hosur Main Road, near Metro Pillar 114, Silk Board");
      setLandmark("Metro Pillar 114");
      setWard("Ward 64 - Madivala");
      setLat(12.9175);
      setLng(77.6232);
      setImageUrl("https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80");
    } else if (type === "critical") {
      setTitle("11kV snapped live wire sparking into standing water outside school");
      setDescription("Overhead electrical power line broke and fell into a 1-foot puddle directly in front of the primary school gate. Wire is actively buzzing and throwing sparks.");
      setCategory("Public Safety Hazard");
      setAddress("14th Cross, Malleshwaram");
      setLandmark("Saraswati Primary School main gate");
      setWard("Ward 45 - Malleshwaram");
      setLat(13.0036);
      setLng(77.5690);
      setImageUrl("https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80");
    } else if (type === "cluster") {
      setTitle("Stormwater culvert collapsed causing road flooding");
      setDescription("The concrete storm drain wall has given way, blocking stormwater runoff and flooding the residential street up to vehicle wheel hubs.");
      setCategory("Drainage & Waterlogging");
      setAddress("12th Main Road, 5th Cross, Indiranagar");
      setLandmark("Near Indiranagar Club");
      setWard("Ward 4 - Indiranagar");
      setLat(12.9728);
      setLng(77.6416);
      setImageUrl("https://images.unsplash.com/photo-1541888946425-d0fbb1862401?w=600&auto=format&fit=crop&q=80");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please provide both an incident title and description.");
      return;
    }

    setIsProcessing(true);
    setProcessingStep(1);

    const tempCandidate = {
      title,
      description,
      category,
      location: { address, landmark, ward, lat, lng }
    };

    // Step 1: Vision & Semantic Classification
    setTimeout(() => {
      setProcessingStep(2);

      // Step 2: Geospatial & Semantic Duplicate Scan
      const duplicateAnalysis = detectDuplicate(tempCandidate, existingReports);

      setTimeout(() => {
        setProcessingStep(3);

        // Step 3: Explainable Multi-Factor Prioritization Matrix
        const priorityAnalysis = calculateExplainablePriority({
          ...tempCandidate,
          duplicateCount: duplicateAnalysis.isDuplicate ? 1 : 0,
          upvotes: 1
        });

        setTimeout(() => {
          setProcessingStep(4);

          // Step 4: Routing & Dispatch Synthesis
          const aiSummary = generateExecutiveSummary(title, description, category);
          const newId = generateReportId();

          // Department routing logic
          let department = "BBMP Ward Works";
          if (category === "Electricity & Streetlights" || /wire|spark|transformer|voltage/.test(description.toLowerCase())) {
            department = "BESCOM (Electricity)";
          } else if (category === "Drainage & Waterlogging" || /pipe|sewage|water|drain|flood/.test(description.toLowerCase())) {
            department = "BWSSB (Water Supply & Drainage)";
          } else if (category === "Waste & Sanitation" || /garbage|dump|plastic|poultry/.test(description.toLowerCase())) {
            department = "BBMP Solid Waste Management";
          } else if (category === "Public Safety Hazard") {
            department = "Disaster & Emergency Response";
          } else {
            department = "BBMP Road Infrastructure";
          }

          // Compute Citizen Credibility & Anti-Spam Score
          const reputation = calculateCitizenReputation(
            { name: reporterName, phone: reporterPhone },
            title,
            description
          );

          const completeReport = {
            id: newId,
            title,
            description,
            category,
            location: {
              address,
              landmark,
              ward,
              lat: Number(lat),
              lng: Number(lng)
            },
            status: duplicateAnalysis.isDuplicate ? "Triaged (Duplicate)" : "Triaged",
            assignedDepartment: department,
            priorityScore: priorityAnalysis.score,
            priorityTier: priorityAnalysis.tier,
            priorityBreakdown: priorityAnalysis.breakdown,
            aiSummary,
            duplicateOf: duplicateAnalysis.isDuplicate && duplicateAnalysis.matchedReport ? duplicateAnalysis.matchedReport.id : null,
            duplicateConfidence: duplicateAnalysis.confidence,
            duplicateReasoning: duplicateAnalysis.reasoning,
            duplicateCount: 0,
            reportedAt: new Date().toISOString(),
            reporter: { name: reporterName, phone: reporterPhone },
            reputation,
            clusterId: (lat > 12.970 && lat < 12.975 && lng > 77.638 && lng < 77.645) ? "CLUSTER-BLR-01" : null,
            upvotes: 1,
            imageUrl
          };

          // Save and celebrate
          onReportCreated(completeReport);
          setSubmissionResult({
            report: completeReport,
            duplicateAnalysis,
            priorityAnalysis,
            reputation
          });
          setIsProcessing(false);


          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.7 }
          });
        }, 600);
      }, 700);
    }, 600);
  };

  const handleResetForm = () => {
    setSubmissionResult(null);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="capture-page">
      {/* Phone-Frame / Responsive Container */}
      <div className="capture-wrapper">
        
        {/* Banner with 1-Min Guarantee */}
        <div className="capture-header-banner">
          <div>
            <div className="badge-fast">
              <Zap className="w-3.5 h-3.5" />
              <span>UNDER 60 SECONDS REPORTING</span>
            </div>
            <h2 className="capture-title">Report a Civic Hazard</h2>
            <p className="capture-desc">
              Your report is instantly analyzed by our AI triage engine for deduplication, hazard priority, and autonomous agency dispatch.
            </p>
          </div>

          {/* Quick Demo Fill Buttons */}
          <div className="demo-presets-box">
            <span className="demo-presets-label">⚡ 1-Click Demo Scenarios for Judges:</span>
            <div className="demo-presets-row">
              <button 
                id="btn-preset-duplicate"
                type="button" 
                className="btn-preset btn-preset-amber"
                onClick={() => applyPreset("duplicate")}
                title="Loads a report matching existing Silk Board Pillar 114"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Test Duplicate Detection (Pillar 114)</span>
              </button>

              <button 
                id="btn-preset-critical"
                type="button" 
                className="btn-preset btn-preset-red"
                onClick={() => applyPreset("critical")}
                title="Loads a high voltage wire sparking outside school"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Test Critical Urgency (Wire at School)</span>
              </button>

              <button 
                id="btn-preset-cluster"
                type="button" 
                className="btn-preset btn-preset-blue"
                onClick={() => applyPreset("cluster")}
                title="Loads a drainage collapse in Indiranagar Ward 4 hotspot"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Test Hotspot (Ward 4 Culvert)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Successful Submission View */}
        {submissionResult ? (
          <div className="submission-success-card">
            <div className="success-badge-top">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <div>
                <h3 className="success-headline">AI Intake & Triage Complete!</h3>
                <p className="success-sub">Registered as Ticket <strong className="font-mono text-cyan-300">{submissionResult.report.id}</strong></p>
              </div>
            </div>

            {/* AI Processing Summary Grid */}
            <div className="ai-result-grid">
              {/* Box 1: Priority Breakdown */}
              <div className="ai-result-box">
                <div className="ai-box-header">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Explainable Priority Score</span>
                  <span className={`priority-tag priority-${submissionResult.priorityAnalysis.tier.toLowerCase()}`}>
                    {submissionResult.priorityAnalysis.score} / 100 • {submissionResult.priorityAnalysis.tier}
                  </span>
                </div>
                <p className="ai-box-reasoning">
                  {submissionResult.priorityAnalysis.breakdown.reasoning}
                </p>
                <div className="score-bars">
                  <div className="score-bar-item">
                    <span>Safety Risk ({submissionResult.priorityAnalysis.breakdown.safetyRisk}/40)</span>
                    <div className="progress-bg"><div className="progress-fill fill-red" style={{ width: `${(submissionResult.priorityAnalysis.breakdown.safetyRisk/40)*100}%` }}></div></div>
                  </div>
                  <div className="score-bar-item">
                    <span>Arterial Impact ({submissionResult.priorityAnalysis.breakdown.infrastructureImpact}/25)</span>
                    <div className="progress-bg"><div className="progress-fill fill-amber" style={{ width: `${(submissionResult.priorityAnalysis.breakdown.infrastructureImpact/25)*100}%` }}></div></div>
                  </div>
                  <div className="score-bar-item">
                    <span>Vulnerability Zone ({submissionResult.priorityAnalysis.breakdown.vulnerabilityFactor}/20)</span>
                    <div className="progress-bg"><div className="progress-fill fill-purple" style={{ width: `${(submissionResult.priorityAnalysis.breakdown.vulnerabilityFactor/20)*100}%` }}></div></div>
                  </div>
                </div>
              </div>

              {/* Box 2: Duplicate Analysis */}
              <div className={`ai-result-box ${submissionResult.duplicateAnalysis.isDuplicate ? "box-highlight-amber" : ""}`}>
                <div className="ai-box-header">
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>Geospatial Deduplication Scan</span>
                  {submissionResult.duplicateAnalysis.isDuplicate ? (
                    <span className="badge-duplicate">DUPLICATE DETECTED ({Math.round(submissionResult.duplicateAnalysis.confidence * 100)}%)</span>
                  ) : (
                    <span className="badge-unique">UNIQUE INCIDENT</span>
                  )}
                </div>
                <p className="ai-box-reasoning">
                  {submissionResult.duplicateAnalysis.reasoning}
                </p>
                {submissionResult.duplicateAnalysis.isDuplicate && submissionResult.duplicateAnalysis.matchedReport && (
                  <div className="matched-report-pill">
                    <span>Linked to Master Ticket:</span>
                    <strong>#{submissionResult.duplicateAnalysis.matchedReport.id}</strong>
                    <span className="text-xs text-slate-400">({submissionResult.duplicateAnalysis.distanceMeters}m away)</span>
                  </div>
                )}
              </div>

              {/* Box 3: Automated Dispatch */}
              <div className="ai-result-box">
                <div className="ai-box-header">
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  <span>Autonomous Agency Routing</span>
                </div>
                <div className="routing-detail">
                  <span className="text-slate-400 text-xs uppercase font-semibold">Assigned Authority:</span>
                  <span className="text-base font-bold text-white">{submissionResult.report.assignedDepartment}</span>
                  <p className="text-xs text-slate-300 mt-1">
                    AI generated 1-line briefing: <em>"{submissionResult.report.aiSummary}"</em>
                  </p>
                </div>
              </div>

              {/* Box 4: Citizen Reputation & Anti-Spam Verification */}
              {submissionResult.reputation && (
                <div className="ai-result-box">
                  <div className="ai-box-header">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <span>Citizen Credibility & Anti-Spam Verification</span>
                    <span className="badge-reputation font-mono">
                      {submissionResult.reputation.trustScore}/100 • {submissionResult.reputation.tier.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="reputation-badges-row">
                    {submissionResult.reputation.badges.map((b, i) => (
                      <span key={i} className="reputation-chip">✓ {b}</span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 mt-2">
                    Historical Accuracy: <strong className="text-emerald-400 font-mono">{submissionResult.reputation.historicalAccuracy}</strong> • Spam Risk: <strong className="text-cyan-400">{submissionResult.reputation.spamRisk}</strong>
                  </p>
                </div>
              )}
            </div>


            {/* Post Actions */}
            <div className="success-action-buttons">
              <button 
                id="btn-goto-tracker"
                className="btn-primary-action"
                onClick={() => onNavigateToTrack(submissionResult.report.id)}
              >
                <span>Track Progress on Citizen Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button 
                id="btn-goto-command"
                className="btn-secondary-action"
                onClick={() => onNavigateToCommand(submissionResult.report.id)}
              >
                <span>Inspect in Decision Command Center</span>
              </button>

              <button 
                id="btn-report-another"
                className="btn-ghost-action"
                onClick={handleResetForm}
              >
                <span>Submit Another Report</span>
              </button>
            </div>
          </div>
        ) : (
          /* Report Submission Form */
          <form onSubmit={handleSubmit} className="capture-form">
            
            {/* Category Select */}
            <div className="form-group">
              <label className="form-label">
                <span>1. Select Civic Category</span>
                <span className="label-tip">Auto-assisted</span>
              </label>
              <div className="category-pill-grid">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`cat-pill ${category === cat ? "active" : ""}`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Title & Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="input-title">
                <span>2. What is the Problem?</span>
                <span className="label-tip">Be concise</span>
              </label>
              <input 
                id="input-title"
                type="text"
                className="form-input"
                placeholder="e.g. Deep sinkhole near Metro Pillar 114 / Live sparking wire"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="input-desc">
                <span>3. Provide Details (Voice or Text)</span>
                <span className="label-tip">Include any safety risks</span>
              </label>
              <textarea 
                id="input-desc"
                className="form-textarea"
                rows="3"
                placeholder="Describe the severity, depth, water level, or danger to vehicles and pedestrians..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Photo / Media Dropzone */}
            <div className="form-group">
              <label className="form-label">
                <span>4. Photographic Evidence</span>
                <span className="label-tip">JPG/PNG with auto-geo tagging</span>
              </label>
              <div className="photo-dropzone">
                {imageUrl ? (
                  <div className="photo-preview-wrapper">
                    <img src={imageUrl} alt="Incident preview" className="photo-preview-img" />
                    <div className="photo-overlay-tag">
                      <Camera className="w-3.5 h-3.5" />
                      <span>Evidence Attached</span>
                    </div>
                  </div>
                ) : (
                  <div className="dropzone-empty">
                    <Camera className="w-8 h-8 text-slate-400" />
                    <span>Click or tap to snap a photo</span>
                  </div>
                )}
              </div>
            </div>

            {/* Location Section */}
            <div className="form-group">
              <div className="location-header-row">
                <label className="form-label">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>5. Location (Click Map Pin or Enter Address)</span>
                </label>
                <span className="text-xs text-emerald-400 font-mono">GPS: {lat.toFixed(4)}, {lng.toFixed(4)}</span>
              </div>

              {/* Interactive Mini Map Pin Picker */}
              <LocationPickerMap 
                lat={lat} 
                lng={lng} 
                onLocationSelect={(newLat, newLng) => {
                  setLat(newLat);
                  setLng(newLng);
                }} 
              />

              <div className="location-inputs-grid" style={{ marginTop: "8px" }}>
                <div>
                  <label className="sub-label">Street / Colony Address</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="e.g. 12th Main Road, Indiranagar"
                  />
                </div>
                <div>
                  <label className="sub-label">Prominent Landmark</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={landmark} 
                    onChange={(e) => setLandmark(e.target.value)} 
                    placeholder="e.g. Near Metro Pillar 114 / St. Mary's School"
                  />
                </div>
              </div>
            </div>

            {/* Citizen Details */}
            <div className="form-row-2">
              <div>
                <label className="sub-label">Your Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={reporterName} 
                  onChange={(e) => setReporterName(e.target.value)} 
                />
              </div>
              <div>
                <label className="sub-label">Mobile Number (for SMS & Tracking)</label>
                <input 
                  type="text" 
                  className="form-input font-mono" 
                  value={reporterPhone} 
                  onChange={(e) => setReporterPhone(e.target.value)} 
                />
              </div>
            </div>

            {/* Submit Action */}
            <button 
              id="btn-submit-report"
              type="submit" 
              className="btn-submit-main"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>AI Triage Pipeline in Progress...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>Analyze & Submit to City Action Grid</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Real-time AI Pipeline Processing Modal */}
        {isProcessing && (
          <div className="ai-processing-overlay">
            <div className="ai-processing-modal">
              <div className="ai-pulse-ring">
                <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>
              <h3 className="ai-modal-title">Autonomous AI Triage Engine</h3>
              <p className="ai-modal-sub">Executing real-time multi-stage inference pipeline</p>

              <div className="pipeline-steps-list">
                <div className={`pipeline-step ${processingStep >= 1 ? "step-active" : ""}`}>
                  <div className="step-icon-dot">{processingStep > 1 ? "✓" : "1"}</div>
                  <span>Extracting visual features & semantic taxonomy...</span>
                </div>
                <div className={`pipeline-step ${processingStep >= 2 ? "step-active" : ""}`}>
                  <div className="step-icon-dot">{processingStep > 2 ? "✓" : "2"}</div>
                  <span>Cross-referencing 40+ incidents for geo-spatial deduplication...</span>
                </div>
                <div className={`pipeline-step ${processingStep >= 3 ? "step-active" : ""}`}>
                  <div className="step-icon-dot">{processingStep > 3 ? "✓" : "3"}</div>
                  <span>Computing Explainable Multi-Factor Priority Matrix (0-100)...</span>
                </div>
                <div className={`pipeline-step ${processingStep >= 4 ? "step-active" : ""}`}>
                  <div className="step-icon-dot">4</div>
                  <span>Routing to municipal agency & generating executive action brief...</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
