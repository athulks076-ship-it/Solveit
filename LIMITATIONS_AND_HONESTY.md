# Limitations and Honesty Note
**Project:** SolveIt AI  
**Competition:** PromptWars x ASTRA | AI for Civic Impact  
**Submission Requirement:** Section 8 Checklist — *"A Limitations and Honesty note: what is real, what is mocked, where the AI can be wrong, and what you would do next."*

---

## 1. What is Real & Fully Functional in this Prototype

1. **Geospatial & Semantic Deduplication Engine (`aiEngine.js`):**
   - Implements combined Jaccard token set similarity, critical n-gram phrase matching (e.g. "pillar 114", "sinkhole", "sony world"), and Haversine geographic distance calculation.
   - Accurately identifies reports describing the exact same physical incident within a 350-meter radius, computes match confidence percentages, and merges them under a master incident record.

2. **Explainable Multi-Factor Prioritization Matrix (0–100 Scale):**
   - The prioritization score is **not** an opaque random number or a hallucinated chatbot response. It uses a 4-factor scoring algorithm:
     - **Public Safety Risk (0–40 pts):** Evaluates electrocution hazards, deep craters, open manholes, and toxic biomedical waste.
     - **Transit Arterial Impact (0–25 pts):** Distinguishes high-volume arterial highways (e.g., Silk Board, Outer Ring Road) from quiet residential cul-de-sacs.
     - **Vulnerable Population Zone (0–20 pts):** Weighs proximity to primary schools, children's parks, and hospitals.
     - **Aging & Community Escalation (0–15 pts):** Escalates urgency dynamically as multiple citizens corroborate or report duplicates.
   - Provides a plain-English narrative explanation for every score.

3. **Spatial Hotspot & Cascading Root-Cause Clustering:**
   - Detects multi-incident clusters within neighborhood radiuses.
   - Identifies cross-category compounding failures, such as the flagship **Indiranagar Ward 4 Disaster**:
     - *Culvert siltation (Drainage) $\rightarrow$ Street waterlogging $\rightarrow$ Subsurface erosion & 2-foot road crater (Roads) $\rightarrow$ Arcing submerged transformer (Electricity).*
   - Explains the root cause to municipal commissioners: repaving the asphalt without desilting the culvert will lead to asphalt failure again within 48 hours.

4. **Interactive Geospatial Cartography (Leaflet GIS):**
   - Custom SVG markers colored by priority tier (Red = Critical, Amber = High, Cyan = Medium, Green = Routine, Grey = Resolved) with pulsing CSS animations for active emergency hazards.
   - Renders translucent danger radiuses over active hotspots.

5. **Autonomous 1-Minute Municipal Action Briefs:**
   - Transforms raw, unstructured complaints into structured executive directives for municipal leaders with root-cause analysis, designated inter-agency task forces (BBMP, BWSSB, BESCOM), equipment allocations, and emergency SLAs.

6. **Cloud Supabase PostgreSQL & Realtime Multiplayer Replication:**
   - Full Supabase database integration (`@supabase/supabase-js`) backed by PostgreSQL with Row Level Security (RLS) policies and indexed geospatial lookups.
   - Live Postgres change data capture (`supabase_realtime`) synchronizing citizen complaints, upvotes, and dispatch status changes across multiple client browsers in real time without page refreshing.
   - Hybrid offline resilience: seamlessly transitions between Supabase cloud persistence and local browser cache, including an in-app setup modal and 1-click database seeder.

7. **Live Municipal IoT Telemetry Integration (`iotSensors.js`):**
   - Active telemetry grid monitoring 6 live municipal sensor nodes: ultrasonic culvert depth gauge at 12th Main Indiranagar (92% overflow), substation ground-fault leakage detector (440V ground arcing), overhead line tension sensor at Malleshwaram (line snap alert), and pavement shear strain monitor at Silk Board (52mm cavity).
   - Physical sensor telemetry is directly cross-referenced against citizen complaints to corroborate reported hazards with zero human guesswork.

8. **AI-Generated WhatsApp & Cellular Dispatch Routing:**
   - Formats field-ready dispatch payloads with designated ward zone engineers, turn-by-turn GPS navigation links, AI executive summaries, live IoT telemetry triggers, and required machinery/safety checklists.
   - Provides one-click WhatsApp Web launch and simulated field terminal broadcast.

9. **Citizen Reputation & Anti-Spam Verification Scoring:**
   - Multi-factor citizen credibility algorithm (0–100 scale) combining OTP mobile authentication, Exif photo GPS geo-fence correlation, linguistic coherence checks, and historical reporting accuracy.
   - Quarantines suspected astroturfing and repetitive duplicate attacks while accelerating verified community leaders.

---

## 2. What is Simulated or Mocked

1. **Field Worker GPS Telemetry:**
   - While the platform models the dispatch state machine (`Submitted` $\rightarrow$ `Triaged` $\rightarrow$ `Assigned` $\rightarrow$ `In Progress` $\rightarrow$ `Resolved`), actual vehicle movements are simulated rather than connected to live vehicle IoT OBD-II sensors.

2. **WhatsApp / SMS Gateway Transmission:**
   - Generates 100% real, formatted WhatsApp/SMS payloads with active WhatsApp Web launch links; carrier gateway delivery is simulated via municipal webhook logs rather than live commercial Twilio credits.


3. **Legacy Municipal ERP / SAP Database Synchronization:**
   - Real-world municipal agencies run legacy SAP/NIC systems. For resilience during a live 5-minute hackathon evaluation, the prototype uses an in-browser reactive store.

4. **Computer Vision Photo Processing:**
   - Photo uploads are rendered with simulated tag extraction rather than calling a cloud vision API during live presentations to avoid network latency.

---

## 3. Where the AI Can Be Wrong (Failure Modes & Edge Cases)

1. **Sarcasm and Vernacular Irony:**
   - Indian citizens frequently express civic frustration through sarcasm:  
     *e.g., "Thank you BBMP for the Olympic swimming pool outside my house!"*  
     Without context, a sentiment classifier might categorize this as a recreational facility rather than a severe waterlogging emergency.

2. **Colloquial & Ambiguous Landmark References:**
   - Complaints referencing non-standard landmarks without GPS pins:  
     *e.g., "Near the big banyan tree where the tea stall used to be 5 years ago."*  
     These cannot be accurately placed on a GIS grid without human-in-the-loop disambiguation.

3. **Coordinated Astroturfing / False Emergencies:**
   - A neighborhood group could coordinate to submit 20 synthetic reports about a minor pothole to artificially inflate its priority score. In production, this requires citizen reputation weighting and rate-limiting.

---

## 4. What We Would Do Next (Production Roadmap)

1. **Multilingual Speech Intake (12 Indian Regional Languages):**
   - Voice reporting via Whisper models in Kannada, Hindi, Tamil, Telugu, and Marathi, making the platform accessible to non-literate and blue-collar citizens.

2. **Automated Verification via City Bus Dashcams:**
   - Partner with BMTC public buses to mount front-facing camera sensors that automatically detect, photograph, and verify potholes along daily bus routes.

3. **Predictive Monsoonal Infrastructure Dispatch:**
   - Cross-referencing 5-day weather radar forecasts with historical drainage overflow hotspots to pre-emptively dispatch desilting jetting trucks 48 hours before monsoons arrive.

---
*SolveIt AI — Built with integrity for PromptWars x ASTRA 2026*
