import { ProjectItem, SpecificationTier, ClientMilestone, SiteUpdateLog, MoodboardPreset, StoreListingData } from '../types/interior';

export const STORE_METADATA: StoreListingData = {
  appName: "IPA Interiors International",
  subtitle: "Bespoke Interior Architecture & Turnkey Staging",
  developer: "IPA Interiors International Ltd",
  bundleId: "com.ipainteriors.app",
  version: "2.4.0",
  category: "Lifestyle / Architecture & Design",
  price: "Free (Client Portal & Project Concierge)",
  rating: 4.9,
  reviewCount: 382,
  privacy: "No tracking data collected. Strict client NDA & encrypted media.",
  keywords: [
    "interior design",
    "interior architecture",
    "luxury penthouse",
    "turnkey fit-out",
    "bespoke joinery",
    "millwork",
    "renovation estimator",
    "client project tracker",
    "IPA interiors"
  ],
  description: "IPA Interiors International Ltd brings haute couture spatial design, architectural joinery, and complete turnkey transformation directly to your pocket. Designed specifically for discerning homeowners, penthouse developers, and VIP clients.\n\nKey Capabilities:\n• Live Project Dashboard: Real-time on-site photography, trade milestone progress, and digital sign-offs.\n• Instant Fit-Out Estimator: Calculate realistic budgets, millwork costs, and execution timelines for luxury residences worldwide.\n• Material & Swatch Approval: Inspect and approve imported Italian stone slabs, bespoke timber finishes, and textile swatches with high-fidelity zoom.\n• Direct Architectural Concierge: Instant encrypted line to your Lead Interior Architect and Project Director.",
  whatsNew: "Version 2.4.0 introduces the interactive Turnkey Fit-Out Estimator with multi-currency support (GBP, EUR, USD, AED), high-resolution material swatch inspections, and instant direct booking with the London & International design teams.",
  featureBullets: [
    "High-fidelity luxury portfolio with Before / After interactive sliders",
    "Interactive spatial cost calculator for residential & commercial fit-outs",
    "Private VIP Client Hub with daily site updates and swatch approval",
    "AI-assisted interior aesthetic advisor and curated palette generator",
    "Direct link to Instagram @ipainteriors_international_ltd and WhatsApp Concierge"
  ]
};

export const SPECIFICATION_TIERS: SpecificationTier[] = [
  {
    id: 'select',
    name: 'Atelier Select',
    tagline: 'Refined contemporary living with premium European finishes',
    ratePerSqmGbp: 1250,
    ratePerSqmEur: 1450,
    ratePerSqmUsd: 1600,
    ratePerSqmAed: 5900,
    features: [
      'Engineered wide-plank European oak flooring',
      'Architectural recessed trimless LED lighting',
      'Curated designer sanitaryware (Laufen / Hansgrohe)',
      'Custom floor-to-ceiling wardrobe joinery',
      'Standard 8-week design & 12-week build phase'
    ],
    recommendedFor: 'Luxury town apartments, boutique rental investments, and pied-à-terres'
  },
  {
    id: 'haute',
    name: 'Haute Couture',
    tagline: 'Bespoke architectural joinery, bookmatched marble, and smart living',
    ratePerSqmGbp: 2450,
    ratePerSqmEur: 2850,
    ratePerSqmUsd: 3150,
    ratePerSqmAed: 11600,
    features: [
      'Bookmatched Italian Calacatta or Arabescato marble slabs',
      'Custom fluted walnut & smoked eucalyptus millwork',
      'Full Lutron Homeworks lighting & automated motorized drapery',
      'Bespoke acoustic wall panelling & concealed pivot doors',
      'Dedicated on-site architectural project manager'
    ],
    recommendedFor: 'Prime penthouses, bespoke family residences, and executive duplexes'
  },
  {
    id: 'imperial',
    name: 'Imperial Turnkey',
    tagline: 'Museum-grade craftsmanship, rare exotics, and white-glove dressing',
    ratePerSqmGbp: 3950,
    ratePerSqmEur: 4600,
    ratePerSqmUsd: 5100,
    ratePerSqmAed: 18800,
    features: [
      'Rare Patagonia / Saint Laurent marble & solid cast bronze metalwork',
      'Master craftsman custom cabinetry and hidden speakeasy bars',
      'Crestron / Bang & Olufsen integrated AV & climate automation',
      'Full white-glove interior styling: bespoke linens, fine art curation, Lalique crystal',
      'Lifetime warranty on all bespoke joinery and private client liaison'
    ],
    recommendedFor: 'Super-prime estates, private villas in Mayfair, Kensington, Dubai & Monaco'
  }
];

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'knightsbridge-duplex',
    title: 'The Knightsbridge Duplex',
    location: 'Knightsbridge, London',
    typology: 'Penthouse',
    areaSqm: 380,
    durationWeeks: 22,
    year: '2025',
    heroImage: '/images/townhouse_belgravia_monograph_1791180714159.jpg',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    afterImage: '/images/townhouse_belgravia_monograph_1791180714159.jpg',
    description: 'A comprehensive structural overhaul converting two lateral apartments into a breathtaking duplex penthouse featuring double-height ceiling voids, bespoke bronze screening, and bookmatched marble accents.',
    materials: ['Italian Arabescato Marble', 'Smoked European Oak', 'Aged Patinated Brass', 'Dedar Bouclé Wool'],
    hotspots: [
      {
        id: 'h1',
        x: 48,
        y: 62,
        label: 'Monolithic Arabescato Island',
        detail: 'Hand-selected from Carrara quarries with mitred waterfall edges and integrated concealed induction.'
      },
      {
        id: 'h2',
        x: 78,
        y: 45,
        label: 'Fluted Smoked Oak Joinery',
        detail: 'Bespoke millwork fabricated in-house with soft-closing touch latches and concealed ambient LED tracks.'
      },
      {
        id: 'h3',
        x: 25,
        y: 75,
        label: 'Custom Bouclé Modular Lounge',
        detail: 'Custom designed by IPA Interiors, upholstered in Italian textured bouclé with brushed brass plinth.'
      }
    ]
  },
  {
    id: 'emirates-hills-villa',
    title: 'Villa Solarium',
    location: 'Emirates Hills, Dubai',
    typology: 'Residential',
    areaSqm: 820,
    durationWeeks: 34,
    year: '2025',
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    description: 'An architectural oasis balancing organic travertine textures with sharp geometric minimalism. Expansive floor-to-ceiling glass reveals seamless transitions between internal galleries and shaded reflection pools.',
    materials: ['Roman Silver Travertine', 'Bleached Ash Joinery', 'Brushed Champagne Bronze', 'Loro Piana Linens'],
    hotspots: [
      {
        id: 'h4',
        x: 52,
        y: 50,
        label: 'Honed Silver Travertine Hearth',
        detail: '6-meter continuous travertine clad fireplace wall with bioethanol linear burner.'
      },
      {
        id: 'h5',
        x: 82,
        y: 35,
        label: 'Minimalist Architectural Glazing',
        detail: 'Ultra-slim structural glass panels recessed flush into finished flooring.'
      }
    ]
  },
  {
    id: 'belgravia-townhouse',
    title: 'The Belgravia Residence',
    location: 'Belgravia, London',
    typology: 'Residential',
    areaSqm: 520,
    durationWeeks: 28,
    year: '2024',
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    description: 'Grade II listed heritage townhouse sensitively renewed with modern architectural interventions, discreet mechanical ventilation, and contemporary French neoclassical boiserie.',
    materials: ['Nero Marquina Marble', 'French Chevron Parquet', 'Fine Boiserie Panelling', 'Silk Velvet Drapery'],
    hotspots: [
      {
        id: 'h6',
        x: 35,
        y: 40,
        label: 'Restored Georgian Cornicing',
        detail: 'Hand-cast fibrous plaster mouldings paired with minimalist trimless downlights.'
      },
      {
        id: 'h7',
        x: 65,
        y: 70,
        label: 'Custom Bronze Pivot Door',
        detail: 'Custom engineered 2.8m pivot entrance door with acid-etched fluted glass inserts.'
      }
    ]
  },
  {
    id: 'mayfair-boardroom',
    title: 'Mayfair Family Office & Lounge',
    location: 'Mayfair, London',
    typology: 'Commercial',
    areaSqm: 260,
    durationWeeks: 14,
    year: '2024',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
    description: 'High-end commercial fit-out combining executive boardroom precision with the intimacy and luxury of a private members club. Features acoustic suede wall cladding and custom boardroom tables.',
    materials: ['Figured Eucalyptus', 'Micro-perforated Acoustic Suede', 'Dark Gunmetal Trim', 'Saddle Leather'],
  }
];

export const ACTIVE_CLIENT_PROJECT = {
  projectName: "The Belgravia Residence",
  clientName: "Lord & Lady Sterling",
  contractValue: "£1,420,000",
  startDate: "12 Oct 2025",
  targetHandover: "28 May 2026",
  currentProgressPercent: 68,
  leadArchitect: "Marcus Vance, RIBA",
  siteAddress: "14 Eaton Place, Belgravia, London SW1X",
  milestones: [
    {
      id: 'm1',
      title: 'Architectural Spatial Plan & 3D Render Signoff',
      phaseNumber: 1,
      status: 'completed',
      date: '18 Nov 2025',
      description: 'Full spatial layout, MEP layouts, and ultra-high-definition CGI walkthroughs approved by client.'
    },
    {
      id: 'm2',
      title: 'Structural Works & First Fix MEP Services',
      phaseNumber: 2,
      status: 'completed',
      date: '15 Jan 2026',
      description: 'Steel beam installations, subfloor levelling, Lutron control wiring, and HVAC routing completed.'
    },
    {
      id: 'm3',
      title: 'Custom Joinery Fabrication & Dry Fit',
      phaseNumber: 3,
      status: 'in_progress',
      date: 'Current Phase',
      description: 'Atelier workshop fabrication of primary suite dressing room and bespoke bar millwork.',
      actionRequired: {
        type: 'swatch_approval',
        title: 'Review & Approve Dressing Room Swatches',
        items: [
          {
            id: 'sw1',
            name: 'Smoked European Walnut (Satin Matt)',
            image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=400&q=80',
            status: 'approved',
            detail: 'Grain pattern calibrated for full height wardrobe doors.'
          },
          {
            id: 'sw2',
            name: 'Sahara Noir Polished Marble Slab',
            image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80',
            status: 'pending',
            detail: 'Feature stone for the master ensuite vanity top.'
          },
          {
            id: 'sw3',
            name: 'Hermès Saddle Leather Drawer Inlays',
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80',
            status: 'pending',
            detail: 'Watch and jewelry compartment lining.'
          }
        ]
      }
    },
    {
      id: 'm4',
      title: 'Fine Stone Laying & Wet Area Waterproofing',
      phaseNumber: 4,
      status: 'upcoming',
      date: 'Target: 14 Apr 2026',
      description: 'Installation of master bathroom marble slabs, micro-cement walls, and Dornbracht brushed brass fittings.'
    },
    {
      id: 'm5',
      title: 'Soft Furnishing Staging & White-Glove Handover',
      phaseNumber: 5,
      status: 'upcoming',
      date: 'Target: 28 May 2026',
      description: 'Final styling, fine art hanging, deep sanitization, scent installation, and keys handover.'
    }
  ] as ClientMilestone[],
  dailyLogs: [
    {
      id: 'log-1',
      date: 'Yesterday, 15:40',
      author: 'David Henderson',
      role: 'Head of Joinery',
      message: 'Wardrobe carcass installation progressing on Level 2. Lighting channels routed clean for recessed 2700K warm LED strips.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      tags: ['Level 2', 'Bespoke Joinery', 'LED Lighting']
    },
    {
      id: 'log-2',
      date: '24 Sep, 11:15',
      author: 'Elena Rostova',
      role: 'Senior Interior Architect',
      message: 'Inspected bookmatched Arabescato slabs delivered from Italy. Grain alignment matches the approved 3D renders with zero deviation.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      tags: ['Materials', 'Quality Assurance', 'Marble']
    }
  ] as SiteUpdateLog[]
};

export const MOODBOARD_PRESETS: MoodboardPreset[] = [
  {
    id: 'organic-monolith',
    name: 'Warm Organic Minimalist',
    vibe: 'Wabi-Sabi Luxury & Tactile Serenity',
    description: 'Subtle earth tones, continuous limestone microcement surfaces, limewash plaster, and tactile Belgian linens create a calming sanctuary.',
    palette: [
      { name: 'Warm Alabaster', hex: '#F4F0EB', role: 'Base Walls' },
      { name: 'Honed Travertine', hex: '#D6C7B2', role: 'Stone Surfaces' },
      { name: 'Smoked Truffle', hex: '#635347', role: 'Accent Wood' },
      { name: 'Deep Umber', hex: '#2C2523', role: 'Hardware & Trim' }
    ],
    materials: [
      { name: 'Roman Travertine Navona', type: 'Natural Stone', origin: 'Tivoli, Italy' },
      { name: 'Wire-brushed White Oak', type: 'Hardwood Joinery', origin: 'France' },
      { name: 'Unlacquered Burnished Brass', type: 'Architectural Hardware', origin: 'UK' },
      { name: 'Heavy Belgian Linen', type: 'Drapery & Upholstery', origin: 'Belgium' }
    ],
    lighting: 'Concealed 2400K cove illumination, plaster-in directional spotlights (CRI 98), alabaster wall sconces.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'haussmann-noir',
    name: 'Modern Neoclassical Noir',
    vibe: 'Moody Dramatic Elegance',
    description: 'Crisp heritage panel mouldings contrasted with deep charcoal lacquer, smoky mirrored glass, and sculptural bronze accents.',
    palette: [
      { name: 'Obsidian Velvet', hex: '#161517', role: 'Cabinetry & Doors' },
      { name: 'Aged Champagne', hex: '#C5A059', role: 'Cast Bronze Detail' },
      { name: 'Statuary White', hex: '#EBEAE5', role: 'Cornicing & Ceiling' },
      { name: 'Espresso Walnut', hex: '#3B2F2F', role: 'Chevron Flooring' }
    ],
    materials: [
      { name: 'Nero Marquina / Calacatta Paonazzo', type: 'Feature Stone', origin: 'Spain / Italy' },
      { name: 'High-Gloss Smoked Eucalyptus', type: 'Millwork Finish', origin: 'Germany' },
      { name: 'Brushed Gunmetal Titanium', type: 'Metalwork', origin: 'Switzerland' },
      { name: 'Silk-Wool Cut Velvet', type: 'Soft Furnishing', origin: 'Venice, Italy' }
    ],
    lighting: 'Low-glare glare-less trimless apertures, museum picture lights, backlit onyx wine display.',
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'japandi-architectural',
    name: 'Architectural Japandi',
    vibe: 'Precision Spatial Balance',
    description: 'Clean horizontal lines, fluted timber slats, paper lanterns, low-profile bespoke furniture, and unadorned stone monoliths.',
    palette: [
      { name: 'Sand Plaster', hex: '#E6DFD5', role: 'Limewash Walls' },
      { name: 'Hinoki Cypress', hex: '#CBB292', role: 'Screening & Joinery' },
      { name: 'Charcoal Shou Sugi Ban', hex: '#2B2B2B', role: 'Architectural Accent' },
      { name: 'Moss Taupe', hex: '#7D7A68', role: 'Textile Accent' }
    ],
    materials: [
      { name: 'Pietra Piasentina Stone', type: 'Flooring & Sinks', origin: 'Friuli, Italy' },
      { name: 'Fluted American Walnut', type: 'Acoustic Panelling', origin: 'USA' },
      { name: 'Washi Paper & Silk Cord', type: 'Lighting diffusers', origin: 'Kyoto, Japan' },
      { name: 'Chunky Wool Bouclé', type: 'Seating Upholstery', origin: 'Denmark' }
    ],
    lighting: 'Diffused washi luminaires, soft linear step lighting, perimeter grazing along stone surfaces.',
    heroImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80'
  }
];

export const TECH_STACK_COMPARISON = [
  {
    approach: 'Capacitor (Web + Native Bridge)',
    verdict: 'Recommended for IPA Interiors',
    recommended: true,
    timeToMarket: '3 - 4 Weeks',
    cost: 'Optimal',
    codebase: 'Single React/TypeScript codebase for Web, iOS & Android',
    pros: [
      '100% UI consistency across iPhone, iPad, Android & Web',
      'Native camera, push notifications, FaceID/Biometrics, and file sharing via simple plugins',
      'Instant over-the-air updates without waiting for App Store review for design refreshes',
      'Reuses high-end web styling, CSS transitions, and 3D web viewers effortlessly'
    ],
    cons: [
      'Deep custom 3D gaming engines require native plugins (not needed for interior apps)'
    ],
    storeApproval: '100% Approved when rich interactive tools (estimator, portal, camera) are included.'
  },
  {
    approach: 'React Native / Expo',
    verdict: 'Strong Alternative for Massive Scale',
    recommended: false,
    timeToMarket: '8 - 12 Weeks',
    cost: 'Moderate - High',
    codebase: 'Shared JS/TS logic, separate styling components (Native primitives)',
    pros: [
      'Very high fluid 60/120fps gesture performance',
      'Huge ecosystem of community packages',
      'Direct access to ARKit / ARCore via native modules'
    ],
    cons: [
      'Cannot reuse web DOM CSS libraries (requires rewrite of web UI in Native components)',
      'Upgrading React Native versions can introduce native build breakages'
    ],
    storeApproval: 'Standard native app approval'
  },
  {
    approach: 'Flutter (Dart)',
    verdict: 'Good for Heavy Custom Animation',
    recommended: false,
    timeToMarket: '10 - 14 Weeks',
    cost: 'High (requires Dart engineers)',
    codebase: 'Dart language only, completely separate from web frontend',
    pros: [
      'Pixel-perfect canvas rendering identical on all devices',
      'High computational performance'
    ],
    cons: [
      'Requires separate Dart team; cannot share code with IPA website or web portal',
      'Larger binary size for initial download'
    ],
    storeApproval: 'Standard native app approval'
  },
  {
    approach: 'PWA + TWA (Trusted Web Activity)',
    verdict: 'Best for Ultra-Low Budget',
    recommended: false,
    timeToMarket: '1 - 2 Weeks',
    cost: 'Lowest',
    codebase: 'Web only wrapped in Chrome TWA for Play Store',
    pros: [
      'No native code required',
      'Runs anywhere immediately'
    ],
    cons: [
      'Apple App Store rejects pure TWAs / PWAs unless heavy native functionality is demonstrated',
      'Limited iOS push notification reliability compared to native APNs'
    ],
    storeApproval: 'Approved on Google Play, high risk of rejection on Apple App Store (Guideline 4.2)'
  }
];
