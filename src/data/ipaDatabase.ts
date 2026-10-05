import { 
  FullProject, 
  CommerceProduct, 
  CrmLead, 
  UserProfile, 
  ReferralRecord 
} from '../types/ipaDomain';

// Simulated authentic initial seed data reflecting Kampala, London, and international ultra-prime estates
export const INITIAL_PRODUCTS: CommerceProduct[] = [
  {
    id: 'prod-001',
    sku: 'IPA-SOF-BEL-01',
    title: 'The Lumumba Curved Bouclé Modular Lounge',
    subtitle: 'Bespoke sculptural curved seating with brushed champagne brass plinth',
    category: 'Furniture',
    source: 'in_house_artisan',
    leadTimeWeeks: 6,
    basePriceUgx: 28500000, // ~£5,870
    materials: ['Italian Dedar Bouclé Wool', 'Kiln-dried Hardwood Frame', 'High-Resilience Latex Core', 'Brushed Brass Plinth'],
    dimensions: { widthCm: 320, depthCm: 140, heightCm: 76, customizable: true },
    supplierName: 'IPA Atelier Joinery & Upholstery Works',
    inStock: true,
    heroImage: '/images/atelier_modular_sofa_1791180725188.jpg',
    galleryImages: [
      '/images/atelier_modular_sofa_1791180725188.jpg'
    ],
    description: 'Designed exclusively by the IPA Interior Architecture team. Gentle ergonomic curves foster intimate dialogue while anchoring grand lateral living spaces.',
    provenance: 'Hand-crafted at IPA Central Atelier, Kampala with textiles milled in Como, Italy',
    associatedProjectIds: ['proj-kla-01', 'knightsbridge-duplex'],
    roomTypologies: ['Great Hall & Formal Lounge', 'Penthouse Salon', 'Executive Suite']
  },
  {
    id: 'prod-002',
    sku: 'IPA-TBL-ARA-02',
    title: 'Monolithic Arabescato Fluted Dining Table',
    subtitle: 'Bookmatched Italian marble slab top with twin fluted smoked oak architectural pedestals',
    category: 'Surfaces & Stone',
    source: 'italian_import',
    leadTimeWeeks: 8,
    basePriceUgx: 48000000, // ~£9,890
    materials: ['Italian Arabescato Vagli Marble', 'Smoked European Oak', 'Internal Steel Substructure'],
    dimensions: { widthCm: 300, depthCm: 120, heightCm: 75, customizable: true },
    supplierName: 'Carrara Stone Works & IPA Millwork Division',
    inStock: false,
    heroImage: '/images/atelier_marble_dining_1791180734940.jpg',
    galleryImages: [
      '/images/atelier_marble_dining_1791180734940.jpg'
    ],
    description: 'A structural centerpiece celebrating organic geological drama. Each slab is hand-selected from Tuscan quarries and finished with satin honed tactile treatment.',
    provenance: 'Carrara, Italy and bespoke joinery finished in Nakasero, Kampala',
    associatedProjectIds: ['proj-kla-01'],
    roomTypologies: ['Bespoke Dining Atelier', 'Executive Boardroom']
  },
  {
    id: 'prod-003',
    sku: 'IPA-LGT-CAS-03',
    title: 'Cascade Gyroscope Chandelier',
    subtitle: 'Concentric hand-blown smoked fluted glass and patinated bronze rings',
    category: 'Lighting',
    source: 'supplier_sourced',
    leadTimeWeeks: 5,
    basePriceUgx: 19500000, // ~£4,020
    materials: ['Mouth-blown Murano Fluted Glass', 'Aged Patinated Bronze', 'Integrated 2400K Warm Dim LED'],
    dimensions: { widthCm: 110, depthCm: 110, heightCm: 130, customizable: true },
    supplierName: 'Venetian Lighting Atelier',
    inStock: true,
    heroImage: '/images/cascade_gyroscope_chandelier_1791182766635.jpg',
    galleryImages: [
      '/images/cascade_gyroscope_chandelier_1791182766635.jpg'
    ],
    description: 'Architectural illumination that transcends functional lighting. Casts gentle warm fluted shadows across stone walls without harsh glare.',
    provenance: 'Murano, Italy',
    associatedProjectIds: ['proj-kla-01', 'belgravia-townhouse'],
    roomTypologies: ['Grand Entrance Void', 'Double-Height Living']
  },
  {
    id: 'prod-004',
    sku: 'IPA-CAB-WAL-04',
    title: 'The Speakeasy Cocktail Credenza',
    subtitle: 'Smoked eucalyptus veneer with pocket pivot doors and backlit amber onyx bar',
    category: 'Joinery',
    source: 'in_house_artisan',
    leadTimeWeeks: 7,
    basePriceUgx: 34000000, // ~£7,010
    materials: ['Smoked Eucalyptus Quilted Veneer', 'Iranian Honey Onyx', 'Solid Brushed Brass Inlays', 'Soft-Close Blum Movento'],
    dimensions: { widthCm: 220, depthCm: 55, heightCm: 90, customizable: true },
    supplierName: 'IPA Master Cabinetry Division',
    inStock: true,
    heroImage: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A concealed entertainment jewel box. Opens silently via touch latch to reveal mirror-backed stemware racks, wine preservation, and ambient gold backlighting.',
    provenance: 'IPA Joinery Works, Kampala',
    associatedProjectIds: ['proj-kla-01', 'knightsbridge-duplex'],
    roomTypologies: ['Private Lounge', 'Bespoke Bar', 'Master Dressing']
  }
];

export const INITIAL_PROJECTS: FullProject[] = [
  {
    id: 'proj-kla-01',
    projectCode: 'IPA-KLA-2026-01',
    title: 'The Nakasero Hill Residence',
    tagline: 'A 680-sqm cantilevered modernist estate overlooking the Kampala city skyline',
    clientId: 'user-client-01',
    clientName: 'Dr. Patrick & Brenda Mugisha',
    clientEmail: 'mugisha.residence@gmail.com',
    clientPhone: '+256 772 345 678',
    location: {
      city: 'Kampala',
      address: 'Plot 28 Upper Kololo Terrace, Nakasero Ridge, Kampala',
      country: 'Uganda'
    },
    typology: 'Luxury Private Residence',
    stage: 'on_site_installation',
    progressPercentage: 74,
    targetHandoverDate: '15 June 2026',
    startDate: '10 January 2026',
    leadArchitect: 'Elena Rostova, RIBA & Ronald Kato, MUIA',
    projectManager: 'David Henderson',
    totalContractValueUgx: 1850000000, // ~£381,400 / ~$493,000
    totalPaidUgx: 1387500000, // 75% paid
    currency: 'UGX',
    heroImage: '/images/villa_nakasero_residence_1791180703557.jpg',
    beforeImage: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80',
    afterImage: '/images/villa_nakasero_residence_1791180703557.jpg',
    isPublishedPublicPortfolio: true,
    warrantyExpiryDate: '15 June 2028',
    rooms: [
      {
        id: 'room-01',
        projectId: 'proj-kla-01',
        name: 'Great Hall & Formal Lounge',
        floorAreaSqm: 140,
        ceilingHeightM: 4.2,
        status: 'in_production',
        conceptRenderUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        designNotes: 'Double volume void anchored by Roman Silver Travertine cantilevered fireplace hearth and bespoke acoustic fluted oak panelling.',
        keyProducts: [
          { productId: 'prod-001', productTitle: 'The Lumumba Curved Bouclé Modular Lounge', quantity: 2, status: 'delivered' },
          { productId: 'prod-003', productTitle: 'Cascade Gyroscope Chandelier', quantity: 1, status: 'installed' }
        ],
        palette: [
          { name: 'Warm Alabaster Plaster', hex: '#F5F2EC', role: 'Limewash Walls' },
          { name: 'Roman Silver Travertine', hex: '#D2C3B0', role: 'Feature Stone' },
          { name: 'Smoked Truffle Oak', hex: '#584639', role: 'Joinery Finishes' }
        ],
        materials: [
          { name: 'Roman Travertine Navona', origin: 'Tivoli, Italy', type: 'Natural Stone' },
          { name: 'European Smoked Oak', origin: 'France', type: 'Architectural Joinery' }
        ]
      },
      {
        id: 'room-02',
        projectId: 'proj-kla-01',
        name: 'Primary Suite Dressing Atelier & Bath',
        floorAreaSqm: 85,
        ceilingHeightM: 3.2,
        status: 'client_review',
        conceptRenderUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        designNotes: 'Floor-to-ceiling glass wardrobe carcasses with internal concealed LED channels, suede drawer liners, and bookmatched Sahara Noir vanity.',
        keyProducts: [
          { productId: 'prod-004', productTitle: 'The Speakeasy Cocktail Credenza', quantity: 1, status: 'specified' }
        ],
        palette: [
          { name: 'Obsidian Velvet Lacquer', hex: '#1C1A19', role: 'Wardrobe Carcass' },
          { name: 'Sahara Noir Marble', hex: '#2A2928', role: 'Vanity Slab' },
          { name: 'Champagne Satin Brass', hex: '#CBB280', role: 'Hardware & Trims' }
        ],
        materials: [
          { name: 'Sahara Noir Polished Slab', origin: 'Tunisia', type: 'Natural Stone' },
          { name: 'Micro-perforated Acoustic Suede', origin: 'Germany', type: 'Wall Treatment' }
        ]
      }
    ],
    designVersions: [
      {
        id: 'ver-01',
        projectId: 'proj-kla-01',
        versionNumber: 1,
        title: 'Initial Concept & Spatial Layout v1.0',
        status: 'superseded',
        createdAt: '22 Jan 2026',
        createdByDesigner: 'Elena Rostova',
        revisionComment: 'Client requested larger dressing room island and secondary prep kitchen.',
        renderUrls: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'],
        costImpactUgx: 0
      },
      {
        id: 'ver-02',
        projectId: 'proj-kla-01',
        versionNumber: 2,
        title: 'Approved Architectural Specification v2.0',
        status: 'approved',
        createdAt: '14 Feb 2026',
        createdByDesigner: 'Elena Rostova',
        approvedAt: '18 Feb 2026',
        approvedBy: 'Dr. Patrick Mugisha (Client Signature)',
        renderUrls: [
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80'
        ],
        costImpactUgx: 185000000
      }
    ],
    changeOrders: [
      {
        id: 'co-01',
        projectId: 'proj-kla-01',
        changeOrderNumber: 'CO-2026-001',
        title: 'Upgrade Master Ensuite to Bookmatched Paonazzo Slab',
        description: 'Transition from standard cut marble tiles to dual full-height bookmatched Italian Paonazzo slabs for the double shower enclosure.',
        reason: 'material_upgrade',
        status: 'invoiced_and_active',
        requestedDate: '02 Mar 2026',
        approvedDate: '05 Mar 2026',
        originalScope: 'Honed Calacatta 60x120 tiles',
        revisedScope: 'Two continuous 3.2m bookmatched Paonazzo slabs with mitred edges',
        costDeltaUgx: 42000000, // ~£8,650
        timeDeltaDays: 7,
        requestedBy: 'Brenda Mugisha (Client)'
      }
    ],
    procurementItems: [
      {
        id: 'po-01',
        projectId: 'proj-kla-01',
        poNumber: 'PO-IPA-2026-088',
        supplierName: 'Carrara Marmi Direct s.r.l.',
        supplierLocation: 'Carrara, Italy',
        itemDescription: 'Full container shipment: Arabescato Vagli & Roman Travertine slabs',
        quantity: 1,
        unitCostUgx: 210000000,
        totalCostUgx: 210000000,
        status: 'customs_cleared',
        expectedDeliveryDate: '28 Mar 2026',
        actualDeliveryDate: '26 Mar 2026',
        trackingReference: 'MSC-MED-UG-998234'
      },
      {
        id: 'po-02',
        projectId: 'proj-kla-01',
        poNumber: 'PO-IPA-2026-104',
        supplierName: 'IPA Central Joinery Works',
        supplierLocation: 'Kampala, Uganda',
        itemDescription: 'Primary Dressing Suite: Smoked Oak Carcasses & Bronze Pivot Hardware',
        quantity: 1,
        unitCostUgx: 145000000,
        totalCostUgx: 145000000,
        status: 'in_fabrication',
        expectedDeliveryDate: '15 Apr 2026',
        trackingReference: 'INTERNAL-JOB-441'
      }
    ],
    snags: [
      {
        id: 'sng-01',
        projectId: 'proj-kla-01',
        roomId: 'room-01',
        description: 'Lounge LED channel #3 dimming curve calibrated to 2200K warmer tone.',
        severity: 'electrical_retest',
        status: 'rectified',
        loggedDate: '22 Mar 2026'
      },
      {
        id: 'sng-02',
        projectId: 'proj-kla-01',
        roomId: 'room-02',
        description: 'Vanity mirror demister pad requires second line check before final stone seal.',
        severity: 'joinery_alignment',
        status: 'assigned_to_trade',
        loggedDate: '28 Mar 2026'
      }
    ],
    invoices: [
      {
        id: 'inv-01',
        invoiceNumber: 'INV-IPA-2026-012',
        projectId: 'proj-kla-01',
        title: 'Initial Deposit & Architectural 3D Signoff (40%)',
        milestoneDescription: 'Execution of design brief, on-site laser survey, and approved spatial plans.',
        amountUgx: 740000000,
        status: 'paid_in_full',
        dueDate: '20 Jan 2026',
        paidDate: '21 Jan 2026',
        paymentMethod: 'Bank Wire (Stanbic/Barclays)',
        transactionReference: 'STANBIC-RTGS-9912039'
      },
      {
        id: 'inv-02',
        invoiceNumber: 'INV-IPA-2026-038',
        projectId: 'proj-kla-01',
        title: 'Procurement & Trade Fabrication Milestone (35%)',
        milestoneDescription: 'Release of imported stone containers, joinery millwork carcass build, and MEP installation.',
        amountUgx: 647500000,
        status: 'paid_in_full',
        dueDate: '01 Mar 2026',
        paidDate: '03 Mar 2026',
        paymentMethod: 'Bank Wire (Stanbic/Barclays)',
        transactionReference: 'BARCLAYS-WIRE-448102'
      },
      {
        id: 'inv-03',
        invoiceNumber: 'INV-IPA-2026-061',
        projectId: 'proj-kla-01',
        title: 'On-Site Fitting & Finishes Balance (15%)',
        milestoneDescription: 'Stone installation, sanitaryware fit-off, bespoke cabinetry erection.',
        amountUgx: 277500000,
        status: 'issued',
        dueDate: '10 May 2026'
      },
      {
        id: 'inv-04',
        invoiceNumber: 'INV-IPA-2026-090',
        projectId: 'proj-kla-01',
        title: 'Final Handover, Snag Signoff & 2-Year Warranty (10%)',
        milestoneDescription: 'Final white-glove dressing, deep clean, client walk-through signoff, key handover.',
        amountUgx: 185000000,
        status: 'draft',
        dueDate: '15 Jun 2026'
      }
    ]
  },
  {
    id: 'knightsbridge-duplex',
    projectCode: 'IPA-LON-2025-08',
    title: 'The Knightsbridge Duplex',
    tagline: 'Lateral apartment union creating a double-height void in Prime Central London',
    clientId: 'user-client-02',
    clientName: 'Lord & Lady Sterling',
    clientEmail: 'sterling.residences@mayfairtrust.co.uk',
    clientPhone: '+44 20 7946 0888',
    location: {
      city: 'London',
      address: '18 Cadogan Square, Knightsbridge, London SW1X',
      country: 'United Kingdom'
    },
    typology: 'Ultra-Prime Penthouse',
    stage: 'aftercare_and_warranty',
    progressPercentage: 100,
    targetHandoverDate: '15 November 2025',
    startDate: '01 May 2025',
    leadArchitect: 'Marcus Vance, RIBA',
    projectManager: 'Arthur Davies',
    totalContractValueUgx: 6887000000, // ~£1,420,000
    totalPaidUgx: 6887000000,
    currency: 'GBP',
    heroImage: '/images/townhouse_belgravia_monograph_1791180714159.jpg',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    afterImage: '/images/townhouse_belgravia_monograph_1791180714159.jpg',
    isPublishedPublicPortfolio: true,
    warrantyExpiryDate: '15 November 2027',
    rooms: [],
    designVersions: [],
    changeOrders: [],
    procurementItems: [],
    snags: [],
    invoices: []
  },
  {
    id: 'emirates-hills-villa',
    projectCode: 'IPA-DXB-2025-04',
    title: 'Villa Solarium',
    tagline: 'An 820-sqm travertine architectural sanctuary with shaded reflection pools',
    clientId: 'user-client-03',
    clientName: 'Sheikh Mansoor Al-Qasimi',
    clientEmail: 'al.qasimi.investments@difc.ae',
    clientPhone: '+971 50 123 4567',
    location: {
      city: 'Dubai',
      address: 'Sector E, Emirates Hills, Dubai',
      country: 'UAE'
    },
    typology: 'Luxury Private Residence',
    stage: 'aftercare_and_warranty',
    progressPercentage: 100,
    targetHandoverDate: '12 December 2025',
    startDate: '15 February 2025',
    leadArchitect: 'Elena Rostova, RIBA & Zayd Harith',
    projectManager: 'Tariq Mansoor',
    totalContractValueUgx: 10400000000, // ~AED 10,200,000
    totalPaidUgx: 10400000000,
    currency: 'AED',
    heroImage: '/images/dubai_penthouse_solarium_1791182756273.jpg',
    beforeImage: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80',
    afterImage: '/images/dubai_penthouse_solarium_1791182756273.jpg',
    isPublishedPublicPortfolio: true,
    warrantyExpiryDate: '12 December 2027',
    rooms: [],
    designVersions: [],
    changeOrders: [],
    procurementItems: [],
    snags: [],
    invoices: []
  }
];

export const INITIAL_LEADS: CrmLead[] = [
  {
    id: 'lead-01',
    fullName: 'Hon. Grace Nabatanzi',
    email: 'grace.nabatanzi@parliament.go.ug',
    phone: '+256 701 445 566',
    source: 'Instagram @ipainteriors',
    stage: 'consultation_scheduled',
    estimatedBudgetUgx: 950000000, // ~£195k
    propertyLocation: 'Buziga Hill, Kampala',
    projectScope: 'Full Turnkey Villa Interior Architecture & Custom Millwork for newly roofed structure',
    assignedTeamMember: 'Elena Rostova (Lead Architect)',
    notes: 'Interested in open travertine floor layout, bookmatched Italian stone kitchen, and integrated Lutron lighting.',
    createdAt: '25 Sep 2026',
    lastContactedAt: '28 Sep 2026'
  },
  {
    id: 'lead-02',
    fullName: 'Julian Montgomery-Scott',
    email: 'j.montgomery@kenmareholdings.com',
    phone: '+44 7700 900 123',
    source: 'Architectural Referral',
    stage: 'proposal_sent',
    estimatedBudgetUgx: 3400000000, // ~£700k
    propertyLocation: 'Kensington Church St, London W8',
    projectScope: 'Complete heritage renovation of Grade II listed 4-storey lateral townhouse',
    assignedTeamMember: 'Marcus Vance (London Director)',
    notes: 'Proposal draft delivered. Meeting booked to sign initial retainers next Tuesday.',
    createdAt: '18 Sep 2026',
    lastContactedAt: '27 Sep 2026'
  },
  {
    id: 'lead-03',
    fullName: 'Dr. Samuel Kiggundu',
    email: 'sam.kiggundu@apexcardiology.com',
    phone: '+256 782 112 233',
    source: 'Website Design My Space',
    stage: 'new_lead',
    estimatedBudgetUgx: 650000000,
    propertyLocation: 'Entebbe Waterfront Peninsula',
    projectScope: 'Modern organic Japandi penthouse styling with bespoke oak joinery',
    assignedTeamMember: 'Ronald Kato',
    notes: 'Submitted via Design My Space generator with 3 saved moodboards.',
    createdAt: '29 Sep 2026',
    lastContactedAt: '29 Sep 2026'
  }
];

export const INITIAL_USER_PROFILES: UserProfile[] = [
  {
    id: 'user-client-01',
    name: 'Dr. Patrick Mugisha',
    email: 'mugisha.residence@gmail.com',
    phone: '+256 772 345 678',
    role: 'customer',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    title: 'Private Homeowner',
    tier: 'VIP Private Client',
    preferredCurrency: 'UGX'
  },
  {
    id: 'user-designer-01',
    name: 'Elena Rostova',
    email: 'elena@ipainteriors.com',
    phone: '+256 700 890 125',
    role: 'designer',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    title: 'Senior Interior Architect (RIBA)',
    preferredCurrency: 'UGX'
  },
  {
    id: 'user-pm-01',
    name: 'David Henderson',
    email: 'david@ipainteriors.com',
    phone: '+256 700 890 126',
    role: 'project_manager',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    title: 'Head of Project Delivery & Joinery',
    preferredCurrency: 'UGX'
  },
  {
    id: 'user-admin-01',
    name: 'IPA Command Center',
    email: 'director@ipainteriors.com',
    phone: '+256 700 890 100',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    title: 'Executive Managing Director',
    preferredCurrency: 'UGX'
  }
];

export const INITIAL_REFERRALS: ReferralRecord[] = [
  {
    id: 'ref-01',
    referrerClientId: 'user-client-01',
    referrerName: 'Dr. Patrick Mugisha',
    referredContactName: 'Hon. Grace Nabatanzi (Buziga Hill Villa)',
    status: 'consultation_booked',
    rewardType: 'VIP Atelier Credit (UGX 5,000,000)'
  }
];
