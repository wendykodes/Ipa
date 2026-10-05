export type DeviceType = 'iphone' | 'pixel' | 'ipad' | 'responsive';

export type ActiveTab = 'atelier' | 'estimator' | 'portal' | 'moodboard' | 'concierge';

export type MainViewMode = 'simulator' | 'store-previews' | 'architecture' | 'deployment-checklist';

export interface ProjectItem {
  id: string;
  title: string;
  location: string;
  typology: 'Residential' | 'Commercial' | 'Penthouse' | 'Bespoke Joinery';
  areaSqm: number;
  durationWeeks: number;
  heroImage: string;
  beforeImage?: string;
  afterImage?: string;
  description: string;
  year: string;
  materials: string[];
  hotspots?: {
    id: string;
    x: number; // percentage
    y: number; // percentage
    label: string;
    detail: string;
  }[];
}

export interface SpecificationTier {
  id: 'select' | 'haute' | 'imperial';
  name: string;
  tagline: string;
  ratePerSqmGbp: number;
  ratePerSqmEur: number;
  ratePerSqmUsd: number;
  ratePerSqmAed: number;
  features: string[];
  recommendedFor: string;
}

export interface ClientMilestone {
  id: string;
  title: string;
  phaseNumber: number;
  status: 'completed' | 'in_progress' | 'pending_approval' | 'upcoming';
  date: string;
  description: string;
  actionRequired?: {
    type: 'swatch_approval' | 'cad_signoff' | 'invoice_payment' | 'site_visit';
    title: string;
    items: {
      id: string;
      name: string;
      image: string;
      status: 'pending' | 'approved' | 'rejected';
      detail: string;
    }[];
  };
}

export interface SiteUpdateLog {
  id: string;
  date: string;
  author: string;
  role: string;
  message: string;
  image: string;
  tags: string[];
}

export interface MoodboardPreset {
  id: string;
  name: string;
  vibe: string;
  description: string;
  palette: { name: string; hex: string; role: string }[];
  materials: { name: string; type: string; origin: string }[];
  lighting: string;
  heroImage: string;
}

export interface StoreListingData {
  appName: string;
  subtitle: string;
  developer: string;
  bundleId: string;
  version: string;
  category: string;
  price: string;
  rating: number;
  reviewCount: number;
  privacy: string;
  keywords: string[];
  description: string;
  whatsNew: string;
  featureBullets: string[];
}
