/**
 * Initial Synthetic Dataset: 40 realistic civic reports in Bangalore Central grid.
 * Carefully crafted to include:
 * - 4 deliberate duplicate groups (e.g. Silk Board sinkhole, Koramangala broken pipe, Russell Market dump)
 * - 3 critical urgent safety hazards (live wire in floodwater, uncovered manhole at school crossing, toxic hospital waste spill)
 * - Geographic cluster: Indiranagar Ward 4 (compounding storm drain failure + waterlogging + road breakdown)
 * - Realistic civic categories, timestamps, addresses, and geo-coordinates.
 */

export const INITIAL_REPORTS = [
  // --- INDIRANAGAR WARD 4 COMPOUNDING CLUSTER (HOTSPOT #1) ---
  {
    id: "CIVIC-2026-1001",
    title: "Stormwater drain completely choked with construction debris",
    description: "Main stormwater drain (SWD) culvert behind 12th Main is completely plugged with cement bags and mud from nearby construction. Water has nowhere to escape even during light drizzle.",
    category: "Drainage & Waterlogging",
    location: {
      address: "12th Main Road, near 80ft Junction, Indiranagar, Ward 4",
      lat: 12.9719,
      lng: 77.6412,
      ward: "Ward 4 - Indiranagar",
      landmark: "Behind Coffee Day on 12th Main"
    },
    status: "Triaged",
    assignedDepartment: "BWSSB (Water Supply & Drainage)",
    priorityScore: 84,
    priorityTier: "CRITICAL",
    priorityBreakdown: {
      safetyRisk: 30,
      infrastructureImpact: 22,
      vulnerabilityFactor: 18,
      agingEscalation: 14,
      reasoning: "Blockage in critical arterial stormwater drain culvert. Direct upstream cause of recurring road sub-base flooding and transit disruption."
    },
    aiSummary: "Culvert blocked with construction sludge, causing high-risk urban drainage failure.",
    duplicateOf: null,
    duplicateCount: 1,
    reportedAt: "2026-10-30T07:15:00Z",
    reporter: { name: "Ananya Sharma", phone: "+91 98450 12891" },
    clusterId: "CLUSTER-BLR-01",
    upvotes: 18,
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb1862401?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "CIVIC-2026-1002",
    title: "Severe street waterlogging up to knee height outside residences",
    description: "Water has accumulated on the street since morning rain. At least 1.5 feet standing water, entering ground floor driveways. Vehicles cannot pass.",
    category: "Drainage & Waterlogging",
    location: {
      address: "12th Main Rd, 4th Cross, Indiranagar, Ward 4",
      lat: 12.9725,
      lng: 77.6419,
      ward: "Ward 4 - Indiranagar",
      landmark: "Opposite Aditi Apartments"
    },
    status: "Under Review",
    assignedDepartment: "BBMP Stormwater Management",
    priorityScore: 78,
    priorityTier: "HIGH",
    priorityBreakdown: {
      safetyRisk: 28,
      infrastructureImpact: 20,
      vulnerabilityFactor: 16,
      agingEscalation: 14,
      reasoning: "Substantial standing water impacting 20+ residential units and stranding two-wheelers. Compounded by clogged main culvert nearby."
    },
    aiSummary: "1.5-foot standing water inundating residential entrances and impeding local transit.",
    duplicateOf: null,
    duplicateCount: 2,
    reportedAt: "2026-10-30T08:00:00Z",
    reporter: { name: "Rahul Deshmukh", phone: "+91 98860 33145" },
    clusterId: "CLUSTER-BLR-01",
    upvotes: 24,
    imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "CIVIC-2026-1003",
    title: "Asphalt collapse and deep crater under standing floodwater",
    description: "The road surface has collapsed under the floodwater on 12th Main. Motorcyclists cannot see the 2-foot deep trench hidden beneath dirty water. Two delivery riders fell this morning.",
    category: "Roads & Potholes",
    location: {
      address: "12th Main Rd, 5th Cross, Indiranagar, Ward 4",
      lat: 12.9731,
      lng: 77.6415,
      ward: "Ward 4 - Indiranagar",
      landmark: "Near Indiranagar Club gate"
    },
    status: "Assigned",
    assignedDepartment: "BBMP Road Infrastructure",
    priorityScore: 92,
    priorityTier: "CRITICAL",
    priorityBreakdown: {
      safetyRisk: 38,
      infrastructureImpact: 24,
      vulnerabilityFactor: 17,
      agingEscalation: 13,
      reasoning: "Hidden 2-foot road crater submerged beneath water causing immediate injury risk. Structural subgrade eroded by unmitigated drainage spillover."
    },
    aiSummary: "Submerged 2-foot asphalt crater causing vehicle accidents on active residential road.",
    duplicateOf: null,
    duplicateCount: 3,
    reportedAt: "2026-10-30T08:45:00Z",
    reporter: { name: "Dr. K. Srinivas", phone: "+91 97412 88201" },
    clusterId: "CLUSTER-BLR-01",
    upvotes: 42,
    imageUrl: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "CIVIC-2026-1004",
    title: "Sewage manhole lid dislodged and spewing contaminated waste",
    description: "Heavy backpressure from clogged storm drain has popped the sewer manhole cap. Dark raw sewage is gushing onto the sidewalk and mixing with rainwater.",
    category: "Drainage & Waterlogging",
    location: {
      address: "10th Cross, off 12th Main, Indiranagar, Ward 4",
      lat: 12.9738,
      lng: 77.6422,
      ward: "Ward 4 - Indiranagar",
      landmark: "Near Green Park Bakery"
    },
    status: "Assigned",
    assignedDepartment: "BWSSB (Water Supply & Drainage)",
    priorityScore: 89,
    priorityTier: "CRITICAL",
    priorityBreakdown: {
      safetyRisk: 36,
      infrastructureImpact: 21,
      vulnerabilityFactor: 18,
      agingEscalation: 14,
      reasoning: "Biohazard and pedestrian fall risk from open manhole combined with raw sewage flooding public pedestrian walkway."
    },
    aiSummary: "Dislodged manhole discharging raw sewage into pedestrian footway and storm runoff.",
    duplicateOf: null,
    duplicateCount: 1,
    reportedAt: "2026-10-30T09:10:00Z",
    reporter: { name: "Pooja Hegde", phone: "+91 99001 54321" },
    clusterId: "CLUSTER-BLR-01",
    upvotes: 31,
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb1862401?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "CIVIC-2026-1005",
    title: "Streetlight feeder pillar flooded and sparking intermittently",
    description: "The metal electricity feeder box is sitting in 1 foot of water and buzzes loudly with occasional sparks. High shock hazard for children wading through water.",
    category: "Electricity & Streetlights",
    location: {
      address: "12th Main, near 6th Cross, Indiranagar, Ward 4",
      lat: 12.9722,
      lng: 77.6408,
      ward: "Ward 4 - Indiranagar",
      landmark: "Corner electrical transformer box"
    },
    status: "Under Review",
    assignedDepartment: "BESCOM (Electricity)",
    priorityScore: 95,
    priorityTier: "CRITICAL",
    priorityBreakdown: {
      safetyRisk: 40,
      infrastructureImpact: 22,
      vulnerabilityFactor: 20,
      agingEscalation: 13,
      reasoning: "Submerged electrical distribution box with active arcing inside pedestrian floodwaters. Imminent electrocution fatality risk."
    },
    aiSummary: "Submerged electrical junction box actively arcing in pedestrian standing water.",
    duplicateOf: null,
    duplicateCount: 1,
    reportedAt: "2026-10-30T09:30:00Z",
    reporter: { name: "Vikas Menon", phone: "+91 94480 67123" },
    clusterId: "CLUSTER-BLR-01",
    upvotes: 56,
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&auto=format&fit=crop&q=80"
  },

  // --- DELIBERATE DUPLICATE GROUP 1: SILK BOARD METRO PILLAR 114 SINKHOLE ---
  {
    id: "CIVIC-2026-2001",
    title: "Massive sinkhole opening near Metro Pillar 114 Silk Board",
    description: "Road surface collapsed creating a 4x4 foot sinkhole directly in the right traffic lane near pillar 114. Cars have to swerve dangerously into oncoming bus lanes.",
    category: "Roads & Potholes",
    location: {
      address: "Hosur Main Road, opposite Metro Pillar 114, Silk Board Junction",
      lat: 12.9174,
      lng: 77.6231,
      ward: "Ward 64 - Madivala",
      landmark: "Metro Pillar 114"
    },
    status: "In Progress",
    assignedDepartment: "BMRCL / BBMP Major Roads",
    priorityScore: 91,
    priorityTier: "CRITICAL",
    priorityBreakdown: {
      safetyRisk: 37,
      infrastructureImpact: 25,
      vulnerabilityFactor: 16,
      agingEscalation: 13,
      reasoning: "Major transit bottleneck hazard on principal interstate arterial road carrying 80,000 PCU daily."
    },
    aiSummary: "4x4 ft crater on high-speed arterial highway causing severe crash risk and traffic stall.",
    duplicateOf: null,
    duplicateCount: 4,
    reportedAt: "2026-10-30T06:30:00Z",
    reporter: { name: "Arun Kumar", phone: "+91 98451 90812" },
    clusterId: "CLUSTER-BLR-02",
    upvotes: 68,
    imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "CIVIC-2026-2002",
    title: "Dangerous big hole near silkboard metro pillar 114",
    description: "Huge pothole at pillar 114 silk board. Very deep cavity road broken down. Huge jam happening.",
    category: "Roads & Potholes",
    location: {
      address: "Near Metro Pillar 114, Silk Board flyover descent",
      lat: 12.9176,
      lng: 77.6233,
      ward: "Ward 64 - Madivala",
      landmark: "Pillar 114"
    },
    status: "Triaged",
    assignedDepartment: "BMRCL / BBMP Major Roads",
    priorityScore: 91,
    priorityTier: "CRITICAL",
    priorityBreakdown: {
      safetyRisk: 37,
      infrastructureImpact: 25,
      vulnerabilityFactor: 16,
      agingEscalation: 13,
      reasoning: "Exact duplicate of master incident CIVIC-2026-2001 within 25 meters."
    },
    aiSummary: "Deep roadway cavity near Silk Board metro pillar causing vehicle gridlock.",
    duplicateOf: "CIVIC-2026-2001",
    duplicateConfidence: 0.96,
    duplicateCount: 0,
    reportedAt: "2026-10-30T07:10:00Z",
    reporter: { name: "Farhan Ali", phone: "+91 97401 22441" },
    clusterId: "CLUSTER-BLR-02",
    upvotes: 14,
    imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "CIVIC-2026-2003",
    title: "Cavity on road opposite metro 114 accident risk",
    description: "Please fix road cave-in outside pillar 114. Two cab drivers punctured their tyres. Huge gridlock.",
    category: "Roads & Potholes",
    location: {
      address: "Silk Board junction, next to pillar 114 towards HSR",
      lat: 12.9175,
      lng: 77.6230,
      ward: "Ward 64 - Madivala",
      landmark: "Metro 114"
    },
    status: "Triaged",
    assignedDepartment: "BMRCL / BBMP Major Roads",
    priorityScore: 91,
    priorityTier: "CRITICAL",
    priorityBreakdown: {
      safetyRisk: 37,
      infrastructureImpact: 25,
      vulnerabilityFactor: 16,
      agingEscalation: 13,
      reasoning: "Duplicate report matching CIVIC-2026-2001 (94% confidence match, 18m distance)."
    },
    aiSummary: "Subsurface road cavity near metro pillar damaging tires and aggravating congestion.",
    duplicateOf: "CIVIC-2026-2001",
    duplicateConfidence: 0.94,
    duplicateCount: 0,
    reportedAt: "2026-10-30T07:45:00Z",
    reporter: { name: "Sneha Nair", phone: "+91 98800 77129" },
    clusterId: "CLUSTER-BLR-02",
    upvotes: 19,
    imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80"
  },

  // --- URGENT PUBLIC SAFETY HAZARDS (OUTSIDE CLUSTERS) ---
  {
    id: "CIVIC-2026-3001",
    title: "Live 11kV overhead wire snapped and sparking in school zone",
    description: "Tree branch brought down live electricity wire right on the gate of Saraswati Vidya Mandir Primary School. Wire is sparking on the wet iron fence. School ends at 1 PM, 400 children will exit here.",
    category: "Public Safety Hazard",
    location: {
      address: "14th Cross, Malleshwaram, Ward 45",
      lat: 13.0035,
      lng: 77.5689,
      ward: "Ward 45 - Malleshwaram",
      landmark: "Saraswati Primary School main gate"
    },
    status: "Assigned",
    assignedDepartment: "BESCOM Emergency Squad",
    priorityScore: 98,
    priorityTier: "CRITICAL",
    priorityBreakdown: {
      safetyRisk: 40,
      infrastructureImpact: 23,
      vulnerabilityFactor: 20,
      agingEscalation: 15,
      reasoning: "Highest severity alert: Live high-tension wire energizing school fence where 400+ primary school students will exit shortly."
    },
    aiSummary: "High-voltage snapped wire actively sparking on school entrance fence.",
    duplicateOf: null,
    duplicateCount: 2,
    reportedAt: "2026-10-30T10:05:00Z",
    reporter: { name: "Headmistress Geeta Rao", phone: "+91 94490 12003" },
    clusterId: null,
    upvotes: 89,
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "CIVIC-2026-3002",
    title: "Main water transmission line burst flooding entire street",
    description: "Massive pressurized water pipe has burst near 80ft Road Koramangala. A 20-foot water fountain has erupted, tearing up road tiles and wasting drinking water.",
    category: "Drainage & Waterlogging",
    location: {
      address: "80 Feet Road, 4th Block, Koramangala",
      lat: 12.9345,
      lng: 77.6288,
      ward: "Ward 68 - Koramangala",
      landmark: "Near Sony World Signal"
    },
    status: "Assigned",
    assignedDepartment: "BWSSB (Water Supply & Drainage)",
    priorityScore: 86,
    priorityTier: "CRITICAL",
    priorityBreakdown: {
      safetyRisk: 26,
      infrastructureImpact: 25,
      vulnerabilityFactor: 18,
      agingEscalation: 17,
      reasoning: "Critical municipal drinking water pipeline rupture causing commercial corridor flooding and loss of 50,000L clean water/hour."
    },
    aiSummary: "Pressurized municipal pipeline burst causing 20ft jet and street inundation.",
    duplicateOf: null,
    duplicateCount: 3,
    reportedAt: "2026-10-30T07:50:00Z",
    reporter: { name: "Deepak Chawla", phone: "+91 99801 44552" },
    clusterId: "CLUSTER-BLR-03",
    upvotes: 47,
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb1862401?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "CIVIC-2026-3003",
    title: "Water pipeline rupture near Sony world signal flooding road",
    description: "Drinking water pipe burst near Sony signal 80ft road. Big fountain coming out.",
    category: "Drainage & Waterlogging",
    location: {
      address: "Sony World Signal, 80 Feet Rd, Koramangala",
      lat: 12.9348,
      lng: 77.6291,
      ward: "Ward 68 - Koramangala",
      landmark: "Sony Signal corner"
    },
    status: "Triaged",
    assignedDepartment: "BWSSB (Water Supply & Drainage)",
    priorityScore: 86,
    priorityTier: "CRITICAL",
    priorityBreakdown: {
      safetyRisk: 26,
      infrastructureImpact: 25,
      vulnerabilityFactor: 18,
      agingEscalation: 17,
      reasoning: "Duplicate of master incident CIVIC-2026-3002 (93% similarity, 45m distance)."
    },
    aiSummary: "Duplicate report of active pressurized water line rupture at Sony World junction.",
    duplicateOf: "CIVIC-2026-3002",
    duplicateConfidence: 0.93,
    duplicateCount: 0,
    reportedAt: "2026-10-30T08:15:00Z",
    reporter: { name: "Sunil Shenoy", phone: "+91 98450 78219" },
    clusterId: "CLUSTER-BLR-03",
    upvotes: 8,
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb1862401?w=600&auto=format&fit=crop&q=80"
  },

  // --- WASTE & SANITATION ISSUES ---
  {
    id: "CIVIC-2026-4001",
    title: "Massive illegal municipal garbage dump overflowing into lake buffer",
    description: "Three tipper trucks dumped mixed commercial poultry and plastic waste right on the perimeter wall of Bellandur Lake. Stray cattle and dogs feeding on contaminated plastic.",
    category: "Waste & Sanitation",
    location: {
      address: "Yamalur Main Road, Bellandur Lake perimeter",
      lat: 12.9372,
      lng: 77.6698,
      ward: "Ward 150 - Bellandur",
      landmark: "Behind Yamalur Bridge"
    },
    status: "Under Review",
    assignedDepartment: "BBMP Solid Waste Management",
    priorityScore: 74,
    priorityTier: "HIGH",
    priorityBreakdown: {
      safetyRisk: 26,
      infrastructureImpact: 16,
      vulnerabilityFactor: 18,
      agingEscalation: 14,
      reasoning: "Illegal bulk disposal near sensitive ecological lake buffer zone; public health vector for stray animal proliferation."
    },
    aiSummary: "Illegal commercial waste dump near wetland reserve threatening environmental health.",
    duplicateOf: null,
    duplicateCount: 0,
    reportedAt: "2026-10-30T06:10:00Z",
    reporter: { name: "Lakshmi Narayanan", phone: "+91 98453 00192" },
    clusterId: null,
    upvotes: 35,
    imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "CIVIC-2026-4002",
    title: "Biological hospital waste dumped openly behind diagnostic lab",
    description: "Syringes, used blood collection vials, and discarded intravenous tubing dumped in open trash cans right opposite a street food vendor.",
    category: "Public Safety Hazard",
    location: {
      address: "Near Victoria Hospital Road, Kalasipalya",
      lat: 12.9612,
      lng: 77.5744,
      ward: "Ward 139 - KR Market",
      landmark: "Opposite Sri Krishna Bhavan"
    },
    status: "Assigned",
    assignedDepartment: "Health & Biomedical Inspection Dept",
    priorityScore: 94,
    priorityTier: "CRITICAL",
    priorityBreakdown: {
      safetyRisk: 39,
      infrastructureImpact: 19,
      vulnerabilityFactor: 20,
      agingEscalation: 16,
      reasoning: "Severe biomedical hazard in dense marketplace food corridor violating Bio-Medical Waste Handling rules."
    },
    aiSummary: "Open disposal of infectious sharps and bio-waste in crowded public commercial zone.",
    duplicateOf: null,
    duplicateCount: 1,
    reportedAt: "2026-10-30T09:05:00Z",
    reporter: { name: "Suresh Babu", phone: "+91 97410 33811" },
    clusterId: null,
    upvotes: 52,
    imageUrl: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&auto=format&fit=crop&q=80"
  },

  // --- ELECTRICITY & LIGHTING ---
  {
    id: "CIVIC-2026-5001",
    title: "10 consecutive streetlights completely dead on dark stretch",
    description: "Entire 600m stretch of Outer Ring Road service road near Marathahalli has been pitch black for 4 nights. Two chain snatching attempts reported yesterday.",
    category: "Electricity & Streetlights",
    location: {
      address: "ORR Service Road, near Marathahalli Bridge",
      lat: 12.9556,
      lng: 77.7011,
      ward: "Ward 85 - Doddanekkundi",
      landmark: "Between Kalamandir and Bridge"
    },
    status: "Assigned",
    assignedDepartment: "BESCOM Streetlight Cell",
    priorityScore: 76,
    priorityTier: "HIGH",
    priorityBreakdown: {
      safetyRisk: 28,
      infrastructureImpact: 19,
      vulnerabilityFactor: 16,
      agingEscalation: 13,
      reasoning: "Prolonged lighting failure on arterial tech-corridor service lane elevating female pedestrian safety risks."
    },
    aiSummary: "600m arterial corridor blackout causing severe public safety and crime vulnerability.",
    duplicateOf: null,
    duplicateCount: 0,
    reportedAt: "2026-10-29T21:40:00Z",
    reporter: { name: "Meera Krishnan", phone: "+91 98801 99220" },
    clusterId: null,
    upvotes: 29,
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "CIVIC-2026-5002",
    title: "Streetlight pole rusted at base and leaning at 45 degree angle",
    description: "Cast iron electric pole has rusted through its base anchor bolts and is leaning precariously over the busy school bus pickup point.",
    category: "Electricity & Streetlights",
    location: {
      address: "17th Cross, Sector 3, HSR Layout",
      lat: 12.9122,
      lng: 77.6389,
      ward: "Ward 174 - HSR Layout",
      landmark: "Near BDA Complex HSR"
    },
    status: "Under Review",
    assignedDepartment: "BESCOM (Electricity)",
    priorityScore: 82,
    priorityTier: "CRITICAL",
    priorityBreakdown: {
      safetyRisk: 34,
      infrastructureImpact: 17,
      vulnerabilityFactor: 18,
      agingEscalation: 13,
      reasoning: "Imminent structural collapse of electrified steel pole onto active student drop-off zone."
    },
    aiSummary: "Rusted electrified pole leaning at acute angle over active pedestrian walkway.",
    duplicateOf: null,
    duplicateCount: 0,
    reportedAt: "2026-10-30T07:25:00Z",
    reporter: { name: "Anand Murthy", phone: "+91 94481 05412" },
    clusterId: null,
    upvotes: 21,
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&auto=format&fit=crop&q=80"
  },

  // --- ROUTINE CIVIC REPORTS (For diverse baseline) ---
  {
    id: "CIVIC-2026-6001",
    title: "Overgrown roadside shrubs blocking view of stop sign",
    description: "Wild bougainvillea and tree branches completely conceal the stop sign and pedestrian crossing signal at the corner.",
    category: "Roads & Potholes",
    location: {
      address: "5th Main, Jayanagar 4th Block",
      lat: 12.9298,
      lng: 77.5833,
      ward: "Ward 152 - Jayanagar",
      landmark: "Opposite NMKRV College"
    },
    status: "Resolved",
    assignedDepartment: "BBMP Horticulture & Traffic",
    priorityScore: 42,
    priorityTier: "MEDIUM",
    priorityBreakdown: {
      safetyRisk: 14,
      infrastructureImpact: 12,
      vulnerabilityFactor: 10,
      agingEscalation: 6,
      reasoning: "Traffic regulatory signage obscured by uncontrolled vegetation; low immediate hazard but minor collision risk."
    },
    aiSummary: "Overgrown foliage concealing regulatory traffic signage at cross intersection.",
    duplicateOf: null,
    duplicateCount: 0,
    reportedAt: "2026-10-28T11:20:00Z",
    resolvedAt: "2026-10-29T16:00:00Z",
    reporter: { name: "Vinod Joshi", phone: "+91 98440 22109" },
    clusterId: null,
    upvotes: 7,
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "CIVIC-2026-6002",
    title: "Pothole in middle of residential cross road",
    description: "Approximately 1 foot wide pothole formed after recent rain. Low traffic street, but two-wheelers need to slow down.",
    category: "Roads & Potholes",
    location: {
      address: "8th Cross, Wilson Garden",
      lat: 12.9511,
      lng: 77.5934,
      ward: "Ward 118 - Sudham Nagar",
      landmark: "Near Chinnaswamy Stadium rear"
    },
    status: "Under Review",
    assignedDepartment: "BBMP Ward Works",
    priorityScore: 35,
    priorityTier: "ROUTINE",
    priorityBreakdown: {
      safetyRisk: 10,
      infrastructureImpact: 10,
      vulnerabilityFactor: 8,
      agingEscalation: 7,
      reasoning: "Minor asphalt depression on low-speed interior residential lane with negligible safety hazard."
    },
    aiSummary: "Minor 1ft pothole on quiet secondary residential alleyway.",
    duplicateOf: null,
    duplicateCount: 0,
    reportedAt: "2026-10-30T09:40:00Z",
    reporter: { name: "Praveen Gowda", phone: "+91 97422 11984" },
    clusterId: null,
    upvotes: 4,
    imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "CIVIC-2026-6003",
    title: "Garbage bin lid broken and uncollected dry leaves",
    description: "Green park bin has broken hinges and dried neem leaves are spilling around the walkway.",
    category: "Waste & Sanitation",
    location: {
      address: "Cubbon Park, near Band Stand",
      lat: 12.9762,
      lng: 77.5929,
      ward: "Ward 77 - Sampangirama Nagar",
      landmark: "Cubbon Park Library pathway"
    },
    status: "Resolved",
    assignedDepartment: "BBMP Horticulture & Solid Waste",
    priorityScore: 28,
    priorityTier: "ROUTINE",
    priorityBreakdown: {
      safetyRisk: 6,
      infrastructureImpact: 8,
      vulnerabilityFactor: 8,
      agingEscalation: 6,
      reasoning: "Aesthetic park maintenance task with zero structural or public safety risk."
    },
    aiSummary: "Damaged park trash receptacle and organic leaf litter on walking track.",
    duplicateOf: null,
    duplicateCount: 0,
    reportedAt: "2026-10-27T08:15:00Z",
    resolvedAt: "2026-10-28T14:30:00Z",
    reporter: { name: "Tara N.", phone: "+91 98861 40012" },
    clusterId: null,
    upvotes: 3,
    imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "CIVIC-2026-6004",
    title: "Broken sidewalk paver slab causing trip hazard outside metro station",
    description: "Two granite sidewalk paving tiles are cracked and loose directly outside Trinity Metro exit A.",
    category: "Roads & Potholes",
    location: {
      address: "MG Road, Trinity Circle Metro Entrance A",
      lat: 12.9729,
      lng: 77.6171,
      ward: "Ward 111 - Shantala Nagar",
      landmark: "Trinity Metro Station Gate A"
    },
    status: "Assigned",
    assignedDepartment: "BMRCL / BBMP Pedestrian Cell",
    priorityScore: 58,
    priorityTier: "MEDIUM",
    priorityBreakdown: {
      safetyRisk: 18,
      infrastructureImpact: 18,
      vulnerabilityFactor: 14,
      agingEscalation: 8,
      reasoning: "Pedestrian slip/trip hazard situated at high-footfall metro transit station portal."
    },
    aiSummary: "Loose sidewalk paving slabs at high-traffic metro station entrance.",
    duplicateOf: null,
    duplicateCount: 0,
    reportedAt: "2026-10-30T08:20:00Z",
    reporter: { name: "Shreya Sen", phone: "+91 99011 88442" },
    clusterId: null,
    upvotes: 16,
    imageUrl: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "CIVIC-2026-6005",
    title: "Water stagnation in public playground corner breeding mosquitoes",
    description: "Rainwater accumulated in the swing corner of BBMP playground for over 5 days with visible mosquito larvae.",
    category: "Drainage & Waterlogging",
    location: {
      address: "11th Main, 4th Block East, Jayanagar",
      lat: 12.9271,
      lng: 77.5889,
      ward: "Ward 153 - Pattabhiram Nagar",
      landmark: "Near Shalini Grounds"
    },
    status: "Under Review",
    assignedDepartment: "Public Health & Vector Control",
    priorityScore: 68,
    priorityTier: "HIGH",
    priorityBreakdown: {
      safetyRisk: 24,
      infrastructureImpact: 14,
      vulnerabilityFactor: 18,
      agingEscalation: 12,
      reasoning: "Vector-borne disease outbreak risk (dengue/chikungunya) in high-density children's recreation park."
    },
    aiSummary: "Prolonged water stagnation with active mosquito breeding in children's park.",
    duplicateOf: null,
    duplicateCount: 0,
    reportedAt: "2026-10-29T15:10:00Z",
    reporter: { name: "Ramesh Babu", phone: "+91 98450 66291" },
    clusterId: null,
    upvotes: 22,
    imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80"
  }
];

export const MUNICIPAL_DEPARTMENTS = [
  "BBMP Road Infrastructure",
  "BWSSB (Water Supply & Drainage)",
  "BESCOM (Electricity)",
  "BBMP Solid Waste Management",
  "Public Health & Vector Control",
  "Disaster & Emergency Response",
  "BMRCL Transit Coordination"
];

export const CATEGORIES = [
  "Roads & Potholes",
  "Drainage & Waterlogging",
  "Electricity & Streetlights",
  "Waste & Sanitation",
  "Public Safety Hazard"
];
