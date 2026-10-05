import { CurrencyCode } from './ipaBrand';

// Role-based Access Control
export type UserRole = 
  | 'customer' 
  | 'lead' 
  | 'designer' 
  | 'project_manager' 
  | 'procurement' 
  | 'finance' 
  | 'installer' 
  | 'admin' 
  | 'supplier';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl: string;
  title?: string;
  tier?: 'VIP Private Client' | 'Corporate Developer' | 'Trade Partner';
  preferredCurrency: CurrencyCode;
}

// 1. PRODUCT (Hybrid Commerce Model: In-house bespoke, supplier-sourced, made-to-order)
export type ProductSource = 'in_house_artisan' | 'italian_import' | 'supplier_sourced' | 'made_to_order' | 'curated_art';

export interface CommerceProduct {
  id: string;
  sku: string;
  title: string;
  subtitle: string;
  category: 'Furniture' | 'Lighting' | 'Surfaces & Stone' | 'Joinery' | 'Textiles & Art' | 'Sanitaryware';
  source: ProductSource;
  leadTimeWeeks: number;
  basePriceUgx: number;
  materials: string[];
  dimensions: {
    widthCm: number;
    depthCm: number;
    heightCm: number;
    customizable: boolean;
  };
  supplierName: string;
  inStock: boolean;
  heroImage: string;
  galleryImages: string[];
  description: string;
  provenance: string; // e.g. "Brianza, Italy", "Kampala Artisan Workshop", "Carrara Quarry"
  associatedProjectIds?: string[];
  roomTypologies: string[];
}

// 2. ROOM
export interface ProjectRoom {
  id: string;
  projectId: string;
  name: string; // e.g. "Great Hall & Formal Lounge", "Primary Suite Dressing Atelier"
  floorAreaSqm: number;
  ceilingHeightM: number;
  status: 'brief' | 'concept' | 'client_review' | 'approved' | 'in_production' | 'installed' | 'signed_off';
  conceptRenderUrl: string;
  beforePhotoUrl?: string;
  afterPhotoUrl?: string;
  designNotes: string;
  keyProducts: {
    productId: string;
    productTitle: string;
    quantity: number;
    status: 'specified' | 'client_approved' | 'ordered' | 'delivered' | 'installed';
    customNotes?: string;
  }[];
  palette: { name: string; hex: string; role: string }[];
  materials: { name: string; origin: string; type: string }[];
}

// 3. DESIGN CONCEPTS & REVISIONS (Versioned - Historical records never overwritten)
export interface DesignConceptVersion {
  id: string;
  projectId: string;
  roomId?: string;
  versionNumber: number; // v1.0, v1.1, v2.0
  title: string;
  status: 'draft' | 'shared_with_client' | 'changes_requested' | 'approved' | 'superseded';
  createdAt: string;
  createdByDesigner: string;
  approvedAt?: string;
  approvedBy?: string;
  revisionComment?: string;
  renderUrls: string[];
  specificationDocumentUrl?: string;
  costImpactUgx: number;
}

// 4. CHANGE ORDERS (Formal change control)
export interface ChangeOrder {
  id: string;
  projectId: string;
  changeOrderNumber: string; // CO-2026-001
  title: string;
  description: string;
  reason: 'client_request' | 'site_condition' | 'material_upgrade' | 'architectural_revision';
  status: 'draft' | 'pending_client_approval' | 'approved' | 'rejected' | 'invoiced_and_active';
  requestedDate: string;
  approvedDate?: string;
  originalScope: string;
  revisedScope: string;
  costDeltaUgx: number; // Can be positive or negative
  timeDeltaDays: number;
  requestedBy: string;
}

// 5. PROCUREMENT & PURCHASE ORDERS
export interface ProcurementItem {
  id: string;
  projectId: string;
  poNumber: string;
  supplierName: string;
  supplierLocation: string;
  itemDescription: string;
  quantity: number;
  unitCostUgx: number;
  totalCostUgx: number;
  status: 'sourcing' | 'po_issued' | 'in_fabrication' | 'shipped_in_transit' | 'customs_cleared' | 'received_at_warehouse' | 'delivered_to_site' | 'installed';
  expectedDeliveryDate: string;
  actualDeliveryDate?: string;
  trackingReference?: string;
}

// 6. INSTALLATION SCHEDULE & SNAGGING
export interface InstallationSnag {
  id: string;
  projectId: string;
  roomId: string;
  description: string;
  severity: 'minor_touchup' | 'joinery_alignment' | 'electrical_retest' | 'stone_repolish';
  status: 'identified' | 'assigned_to_trade' | 'rectified' | 'verified_by_architect';
  loggedDate: string;
  photoUrl?: string;
}

// 7. FINANCIAL TRANSACTION & INVOICE
export interface FinancialInvoice {
  id: string;
  invoiceNumber: string; // INV-IPA-2026-042
  projectId: string;
  title: string;
  milestoneDescription: string;
  amountUgx: number;
  status: 'draft' | 'issued' | 'partially_paid' | 'paid_in_full' | 'overdue';
  dueDate: string;
  paidDate?: string;
  paymentMethod?: 'Bank Wire (Stanbic/Barclays)' | 'Stripe Corporate' | 'Pesapal / Mobile Money' | 'Direct Transfer';
  transactionReference?: string;
}

// 8. THE CORE BUSINESS OBJECT: PROJECT
export interface FullProject {
  id: string;
  projectCode: string; // e.g. "IPA-KLA-2026-01"
  title: string;
  tagline: string;
  areaSqm?: number;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  location: {
    city: 'Kampala' | 'Entebbe' | 'London' | 'Dubai' | 'Nairobi' | 'Kigali';
    address: string;
    country: string;
  };
  typology: 'Ultra-Prime Penthouse' | 'Luxury Private Residence' | 'Executive Commercial' | 'Bespoke Joinery & Fit-Out';
  stage: 
    | 'brief_and_site_survey'
    | 'spatial_concept_3d'
    | 'design_signoff_revision'
    | 'procurement_and_joinery'
    | 'on_site_installation'
    | 'snagging_and_inspection'
    | 'white_glove_handover'
    | 'aftercare_and_warranty';
  progressPercentage: number;
  targetHandoverDate: string;
  startDate: string;
  leadArchitect: string;
  projectManager: string;
  totalContractValueUgx: number;
  totalPaidUgx: number;
  currency: CurrencyCode;
  heroImage: string;
  beforeImage?: string;
  afterImage?: string;
  rooms: ProjectRoom[];
  designVersions: DesignConceptVersion[];
  changeOrders: ChangeOrder[];
  procurementItems: ProcurementItem[];
  snags: InstallationSnag[];
  invoices: FinancialInvoice[];
  warrantyExpiryDate: string;
  isPublishedPublicPortfolio: boolean;
}

// 9. CRM LEAD PIPELINE
export interface CrmLead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  source: 'Instagram @ipainteriors' | 'Architectural Referral' | 'Private Client Network' | 'Website Design My Space';
  stage: 'new_lead' | 'contacted' | 'consultation_scheduled' | 'proposal_sent' | 'contract_won' | 'nurture';
  estimatedBudgetUgx: number;
  propertyLocation: string;
  projectScope: string;
  assignedTeamMember: string;
  notes: string;
  createdAt: string;
  lastContactedAt: string;
}

// 10. REVIEWS & REFERRALS
export interface ReferralRecord {
  id: string;
  referrerClientId: string;
  referrerName: string;
  referredContactName: string;
  status: 'pending_contact' | 'consultation_booked' | 'project_contracted' | 'reward_issued';
  rewardType: 'VIP Atelier Credit (UGX 5,000,000)' | 'Complimentary Scent & Art Package' | 'Priority Design Access';
}
