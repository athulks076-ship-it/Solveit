# SolveIt — From Complaints to Action
> **PromptWars x ASTRA | AI for Civic Impact | Problem Statement Submission**  
> *Transforming scattered citizen complaints into prioritized, explainable, and trackable municipal action.*

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Leaflet](https://img.shields.io/badge/Leaflet-GIS-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🏛️ Executive Summary

Every day, municipal governance breaks down not from a lack of citizen complaints, but from **unstructured, duplicate, unprioritized noise**. Emergency hazards (live high-voltage wires in flooded streets, open sinkholes) sit in the same FIFO queue as routine requests (overgrown weeds, park trash). Meanwhile, a single water main burst generates 30 separate complaints, paralyzing inspection teams.

**SolveIt** is an autonomous civic intelligence and dispatch operating system that transforms scattered citizen reports into prioritized, explainable, and trackable civic action across all four required stages of the complaint lifecycle.

---

## 🚀 The 4 Lifecycle Stages Covered

### 1. Capture (< 60 Seconds)
- **Frictionless Mobile-First Intake:** Citizens report hazards in under a minute with auto-assisted category pills, photo dropzone, and GPS coordinates.
- **1-Click Test Scenarios:** Built-in demo presets for judges:
  - *Silk Board Pillar 114 Sinkhole* (Tests Deduplication)
  - *11kV Wire Sparking at Primary School* (Tests Critical Hazard Priority)
  - *Indiranagar Ward 4 Culvert Collapse* (Tests Hotspot Detection)

### 2. Understand (Multi-Vector AI Triage Engine)
- **Executive Summarization:** Converts verbose, rambling complaints into crisp 12-word operational summaries.
- **Semantic & Geospatial Deduplication:** Evaluates candidate reports against existing databases combining Jaccard token similarity, n-gram matching, and Haversine geo-distance ($<350\text{m}$). Detects duplicates with confidence percentages and merges them under a master ticket.
- **Explainable Multi-Factor Prioritization (0–100 Scale):** Replaces black-box scores with a transparent mathematical matrix:
  - **Public Safety & Fatality Risk (0–40 pts):** Evaluates electrocution, collapse, and biohazards.
  - **Transit Arterial Impact (0–25 pts):** Major highway vs. residential alleyway.
  - **Vulnerable Population Proximity (0–20 pts):** Proximity to schools, hospitals, and transit hubs.
  - **Escalation & Public Corroborations (0–15 pts):** Corroborating duplicate reports and aging.
  - **Plain-English Justification:** Detailed narrative explaining why one report outranks another.

### 3. Reveal (Interactive Map & Hotspot Intelligence)
- **Geospatial GIS Map (Leaflet):** Priority-coded pulsing markers (Red = Critical, Amber = High, Cyan = Medium, Green = Routine, Grey = Resolved) and warning radius rings.
- **Compound Hotspot Detection:** Uncovers systemic breakdowns that list views miss.
  - *Flagship Hotspot:* **Indiranagar Ward 4 Drainage-Road Collapse** (5 interconnected reports: clogged storm culvert $\rightarrow$ street waterlogging $\rightarrow$ asphalt subsurface collapse $\rightarrow$ arcing submerged transformer).
  - Identifies that repaving the road without jetting the culvert will lead to road failure again within 48 hours.
- **1-Click AI Municipal Action Brief:** Generates official commissioner directives with root-cause analysis, inter-agency task force designations (BBMP, BWSSB, BESCOM), equipment commitments, and target 2-hour SLAs.

### 4. Act (Dispatch & Transparent Citizen Tracking)
- **Authority Dispatch Flow:** Assigns tickets to municipal departments and advances status (`Submitted` $\rightarrow$ `Triaged` $\rightarrow$ `Assigned` $\rightarrow$ `In Progress` $\rightarrow$ `Resolved`).
- **Citizen Public Tracker:** Citizens enter their Ticket ID (e.g. `CIVIC-2026-1003`) to view live step progress, assigned crew, and the full transparent AI priority audit. If their report was merged as a duplicate, they receive consolidated updates.

---

## 🧠 AI Capabilities Implemented

| Capability | How It Works | Evaluation Impact |
| :--- | :--- | :--- |
| **Geospatial Deduplication** | Text token Jaccard + Bigram overlap + Haversine distance ($\le 350\text{m}$). | Prevents duplicate crew dispatches; consolidates citizen urgency. |
| **Explainable Prioritization** | 4-Factor transparent scoring matrix (Safety 40, Transit 25, School 20, Escalation 15). | Explains *why* one report outranks another in plain English. |
| **Hotspot & Cluster Detection** | Spatial radius clustering + Cross-category compounding failure heuristics. | Uncovers root causes (e.g., drain siltation causing road collapse). |
| **1-Minute Action Briefs** | AI synthesis of incident clusters into municipal commissioner directives. | Translates raw complaints into actionable field assignments. |

---

## 📊 Synthetic Dataset Design

The repository includes a curated dataset of **40 realistic civic reports** across the Bangalore Central grid:
1. **Deliberate Duplicate Group:** 3 reports describing the sinkhole at Silk Board Metro Pillar 114 (94% confidence match).
2. **Urgent Safety Hazards:** Live 11kV snapped wire sparking outside Saraswati Primary School gate (Priority 98/100, Critical).
3. **Compound Neighborhood Hotspot:** 5 interconnected reports along 12th Main Road, Indiranagar Ward 4.
4. **Diverse Baselines:** Streetlights, park maintenance, vector mosquito control, biomedical waste.

---

## ⚡ Quick Start & Setup

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Launch
```bash
# Clone the repository
git clone https://github.com/your-username/civicpulse-ai.git
cd civicpulse-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

### 🗄️ Supabase PostgreSQL & Realtime Configuration (Optional)

SolveIt AI supports both **Offline Browser Demo Mode** and **Live Cloud Supabase Synchronization**.

#### Option A: 1-Click UI Setup (No Terminal / Restart Needed)
1. In the web application header, click the **`Supabase: Setup`** button.
2. Enter your **Supabase Project URL** and **Public Anon Key**.
3. Click **Test Connection** & **Save & Connect**.
4. Click **Seed 40 Demo Reports** to push the complete incident database into your Supabase table in 1 click!

#### Option B: Environment Variables
Create or edit `.env` in the project root:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

#### Database Schema Setup
Execute the ready-to-run [supabase_schema.sql](file:///c:/Users/smith/OneDrive/Documents/Promptwar/supabase_schema.sql) in your **Supabase SQL Editor** to create the `reports` table with Row Level Security (RLS) policies and real-time replication.

---

## 🎯 5-Minute Demonstration Journey for Judges

Follow this target 5-minute walkthrough directly in the app:
1. **Step 1: Quick Capture (< 1 min):** Navigate to `1. Capture Problem <60s`. Click the quick demo preset *"Test Critical Urgency (Wire at School)"*. Click *"Analyze & Submit to City Action Grid"*.
2. **Step 2: Show AI Triage:** Observe the animated pipeline completing categorization, deduplication check, and explainable priority scoring (98/100, Critical).
3. **Step 3: Surface Hotspot Insight:** Navigate to `3. Hotspots & Action Briefs`. Inspect the Indiranagar Ward 4 cascading failure diagram. Click *"Copy Official Directive"* or inspect the 1-Click Action Brief.
4. **Step 4: Dispatch & Track:** In `2. Command Center & Map`, change status of ticket #1003 to *"In Progress"*. Then click `4. Track Action (Citizen View)` and enter ticket #1003 to see the live stepper and transparent AI explanation.
5. **Step 5: Transparency Note:** Click the *"Limitations & Honesty Note"* button in the top navigation to review real vs. simulated features.

---

## 📜 Limitations & Honesty Note

*(As required by Section 8 of the Problem Statement)*

- **What is Real:**
  - Real-time mathematical deduplication algorithm combining semantic tokens and geographic coordinates.
  - Multi-factor explainable prioritization engine with plain-language reasoning.
  - Spatial hotspot clustering and cascading root-cause detection.
  - Interactive Leaflet cartography with custom priority SVG markers.
  - LocalStorage reactive state persistence with live reset capability.
- **What is Simulated:**
  - Field response vehicle GPS telemetry (simulated state changes rather than live vehicle IoT OBD-II sensors).
  - WhatsApp/SMS citizen webhooks (rendered in-browser rather than consuming external paid API credits).
  - Municipal ERP/SAP database synchronization (mocked via client-side storage for offline resilience during judging).
- **AI Failure Modes:**
  - Sarcastic citizen phrasing (*"Thanks for the swimming pool!"*) without context.
  - Colloquial landmarks without geo-pins (*"near the old banyan tree"*).
- **Roadmap:**
  - Multilingual speech-to-text in 12 regional languages.
  - Automated pothole depth estimation using public bus dashcams.

---

## 🛠️ Tech Stack
- **Frontend:** React 19, Vite 8, Vanilla CSS Design System (Glassmorphic Dark Mode)
- **Icons:** Lucide-React
- **Mapping:** Leaflet GIS & Carto Voyager Open Cartography
- **Celebration Feedback:** Canvas-Confetti

---

*SolveIt — PromptWars x ASTRA Hackathon 2026*
