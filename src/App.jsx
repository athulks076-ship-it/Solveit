import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CitizenCapture from "./components/CitizenCapture";
import CitizenTracker from "./components/CitizenTracker";
import DecisionDashboard from "./components/DecisionDashboard";
import HotspotAnalyzer from "./components/HotspotAnalyzer";
import HonestyModal from "./components/HonestyModal";
import DemoTourModal from "./components/DemoTourModal";
import ActionBriefModal from "./components/ActionBriefModal";
import SupabaseModal from "./components/SupabaseModal";
import { 
  loadReports, 
  saveReports, 
  resetReports,
  fetchReportsFromSupabase,
  saveReportToSupabase,
  updateReportStatusInSupabase,
  assignDepartmentInSupabase,
  upvoteReportInSupabase,
  subscribeToRealtimeReports,
  getSupabaseConfig,
  mapDbRowToReport
} from "./services/storageService";
import { detectHotspots } from "./services/aiEngine";

export default function App() {
  const [reports, setReports] = useState(() => loadReports());
  const [currentTab, setCurrentTab] = useState("command"); // default to Command Center to impress immediately!
  const [selectedReportId, setSelectedReportId] = useState("CIVIC-2026-1003");
  const [isHonestyOpen, setIsHonestyOpen] = useState(false);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);
  const [isSupabaseOpen, setIsSupabaseOpen] = useState(false);
  const [briefModalReport, setBriefModalReport] = useState(null);
  const [supabaseConfig, setSupabaseConfig] = useState(() => getSupabaseConfig());

  // Compute live hotspots
  const hotspots = detectHotspots(reports);

  // Persist reports locally whenever changed
  useEffect(() => {
    saveReports(reports);
  }, [reports]);

  // Initial cloud fetch & realtime websocket subscription
  useEffect(() => {
    let isMounted = true;

    async function loadCloudData() {
      if (supabaseConfig.isConfigured) {
        const res = await fetchReportsFromSupabase();
        if (isMounted && res.data && res.data.length > 0) {
          setReports(res.data);
        }
      }
    }

    loadCloudData();

    // Subscribe to Postgres Realtime changes
    const unsubscribe = subscribeToRealtimeReports((payload) => {
      if (!isMounted) return;
      const { eventType, new: newRow, old: oldRow } = payload;
      if (eventType === "INSERT" && newRow) {
        const incoming = mapDbRowToReport(newRow);
        setReports((prev) => {
          if (prev.some((r) => r.id === incoming.id)) return prev;
          return [incoming, ...prev];
        });
      } else if (eventType === "UPDATE" && newRow) {
        const updated = mapDbRowToReport(newRow);
        setReports((prev) =>
          prev.map((r) => (r.id === updated.id ? { ...r, ...updated } : r))
        );
      } else if (eventType === "DELETE" && oldRow) {
        setReports((prev) => prev.filter((r) => r.id !== oldRow.id));
      }
    });

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, [supabaseConfig]);

  // Handler: New Report Created
  const handleReportCreated = (newReport) => {
    setReports((prev) => [newReport, ...prev]);
    setSelectedReportId(newReport.id);
    saveReportToSupabase(newReport);
  };

  // Handler: Status Update (Triaged -> Assigned -> In Progress -> Resolved)
  const handleUpdateStatus = (reportId, newStatus) => {
    const resolvedAt = newStatus === "Resolved" ? new Date().toISOString() : null;
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          return {
            ...r,
            status: newStatus,
            resolvedAt: resolvedAt || r.resolvedAt
          };
        }
        return r;
      })
    );
    updateReportStatusInSupabase(reportId, newStatus, resolvedAt);
  };

  // Handler: Department Assignment
  const handleAssignDepartment = (reportId, dept) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, assignedDepartment: dept } : r))
    );
    assignDepartmentInSupabase(reportId, dept);
  };

  // Handler: Upvote Corroboration
  const handleUpvoteReport = (reportId) => {
    let currentCount = 0;
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          currentCount = r.upvotes || 0;
          const newUpvotes = currentCount + 1;
          return {
            ...r,
            upvotes: newUpvotes,
            priorityScore: Math.min(99, r.priorityScore + 1)
          };
        }
        return r;
      })
    );
    upvoteReportInSupabase(reportId, currentCount);
  };

  // Handler: Reset Demo Data
  const handleResetData = () => {
    if (window.confirm("Reset all reports to original 40 synthetic dataset?")) {
      const fresh = resetReports();
      setReports(fresh);
      setSelectedReportId("CIVIC-2026-1003");
    }
  };

  // Refresh from cloud after seeding
  const handleCloudDataSeeded = async () => {
    const res = await fetchReportsFromSupabase();
    if (res.data && res.data.length > 0) {
      setReports(res.data);
    }
  };

  return (
    <div className="app-container">
      {/* Top Navigation & System Status Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        reports={reports}
        onResetData={handleResetData}
        onOpenDemoTour={() => setIsDemoTourOpen(true)}
        onOpenHonesty={() => setIsHonestyOpen(true)}
        isSupabaseConnected={supabaseConfig.isConfigured}
        onOpenSupabaseModal={() => setIsSupabaseOpen(true)}
      />

      {/* Main Tab Views */}
      <main className="main-content">
        {currentTab === "capture" && (
          <CitizenCapture
            existingReports={reports}
            onReportCreated={handleReportCreated}
            onNavigateToTrack={(id) => {
              setSelectedReportId(id);
              setCurrentTab("track");
            }}
            onNavigateToCommand={(id) => {
              setSelectedReportId(id);
              setCurrentTab("command");
            }}
          />
        )}

        {currentTab === "command" && (
          <DecisionDashboard
            reports={reports}
            selectedReportId={selectedReportId}
            onSelectReport={(id) => setSelectedReportId(id)}
            onUpdateStatus={handleUpdateStatus}
            onAssignDepartment={handleAssignDepartment}
            hotspots={hotspots}
            onOpenActionBrief={(rep) => setBriefModalReport(rep)}
          />
        )}

        {currentTab === "hotspots" && (
          <HotspotAnalyzer
            hotspots={hotspots}
            onSelectReport={(id) => {
              setSelectedReportId(id);
              setCurrentTab("command");
            }}
            onNavigateToCommand={() => setCurrentTab("command")}
          />
        )}

        {currentTab === "track" && (
          <CitizenTracker
            reports={reports}
            selectedReportId={selectedReportId}
            onSelectReport={(id) => setSelectedReportId(id)}
            onUpvoteReport={handleUpvoteReport}
          />
        )}
      </main>

      {/* Floating 5-Min Tour Button if not active */}
      <div className="floating-guide-trigger">
        <button 
          id="btn-floating-guide"
          className="btn-floating-tour" 
          onClick={() => setIsDemoTourOpen(true)}
        >
          <span>🎯 Judge 5-Min Demo Tour</span>
        </button>
      </div>

      {/* Modals */}
      <HonestyModal
        isOpen={isHonestyOpen}
        onClose={() => setIsHonestyOpen(false)}
      />

      <DemoTourModal
        isOpen={isDemoTourOpen}
        onClose={() => setIsDemoTourOpen(false)}
        onNavigateTab={(tab) => setCurrentTab(tab)}
        onSelectSampleReport={(id) => setSelectedReportId(id)}
      />

      <ActionBriefModal
        report={briefModalReport}
        isOpen={Boolean(briefModalReport)}
        onClose={() => setBriefModalReport(null)}
      />

      <SupabaseModal
        isOpen={isSupabaseOpen}
        onClose={() => setIsSupabaseOpen(false)}
        onConnectionChanged={(cfg) => setSupabaseConfig(cfg)}
        onDataSeeded={handleCloudDataSeeded}
      />
    </div>
  );
}
