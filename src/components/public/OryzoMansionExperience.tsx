import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sliders, 
  Layers, 
  Sparkles, 
  Check, 
  Maximize2, 
  RotateCw, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Compass, 
  ShieldCheck, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Eye,
  Activity,
  ChevronRight,
  Flame,
  Thermometer,
  Box,
  Cpu,
  Feather,
  Umbrella,
  Grid,
  Wind
} from 'lucide-react';
import { Architectural3DCanvas, Architectural3DParams } from './Architectural3DCanvas';
import { MagneticCursor } from '../shop/three/MagneticCursor';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface OryzoMansionExperienceProps {
  onNavigateToDesignSpace?: () => void;
  onNavigateToShop?: () => void;
  onNavigateToMyHome?: () => void;
}

// 16 Sequential Luxury Mansion Experience Chapters (Oryzo.ai Full-Page Choreography)
const MANSION_CHAPTERS = [
  {
    step: 1,
    id: 'ch-estate',
    tag: 'ACT 01 // THE ESTATE',
    name: 'THE ESTATE',
    subtitle: 'Establishing context, landscape, and arrival.',
    narrative: 'The journey begins with an expansive establishing perspective of the grounds. Topography, atmosphere, and architectural massing define a home long before the threshold is approached.',
    capability: 'Site acquisition, master topography modeling, and equatorial microclimate planning.',
    spec: '14,000 m² Site Domain · Nakasero Ridge Topography · Master Context',
    tolerance: '±0.5% natural grade contour balancing'
  },
  {
    step: 2,
    id: 'ch-lawn',
    tag: 'ACT 02 // THE LAWN & PLINTH',
    name: 'THE LAWN & PLINTH',
    subtitle: 'The experience of a home begins before entering the building.',
    narrative: 'Precision landscape architecture meets natural stone terracing. 1,400+ botanical grass tufts sway organically across laser-graded velvet turf, leading past an 85-year sculpted Japanese cloud pine and weathered basalt boulders toward a sunken reflection pool with floating travertine stepping plinths.',
    capability: 'Integrated landscape architecture, microclimate wind corridors, and bio-retention water bodies.',
    spec: 'Kyoto Zoysia Hybrid · Tivoli Travertine Plinths · Cloud Pine Niwaki · 4.8m Basalt Water Basin',
    tolerance: '±0.4mm laser-level across 32m podium'
  },
  {
    step: 3,
    id: 'ch-lighting',
    tag: 'ACT 03 // THE SCULPTURAL LIGHTING',
    name: 'THE LIGHTING',
    subtitle: 'Lighting establishes atmosphere, guides movement, and changes how space feels.',
    narrative: 'A sculptural garden lamp is introduced as an individual design element. Scroll progress reveals its monolithic cast-bronze pedestal, recessed optical lens, and the pool of warm 2700K golden illumination it casts across the lawn and stone path.',
    capability: 'Custom luminaire design, dark-sky compliant optics, and dusk atmosphere modeling.',
    spec: 'Custom Cast Bronze · 2700K Warm Ambiance · 98 CRI Optical Lens',
    tolerance: 'Zero upward lumens (Dark-Sky Compliant)'
  },
  {
    step: 4,
    id: 'ch-entrance',
    tag: 'ACT 04 // THE MONUMENTAL ARRIVAL',
    name: 'THE ENTRANCE',
    subtitle: 'The entrance expresses the character of the home before the visitor steps inside.',
    narrative: 'Transitioning toward the front door. The camera reveals the stepped travertine approach, fluted architectural bronze surround, and a 3.8-meter vertical pivot door of quarter-sawn African mahogany swinging smoothly on concealed hydraulic bearings.',
    capability: 'Precision architectural millwork, concealed hydraulic floor pivots, and bronze foundry work.',
    spec: '3.8m African Mahogany · Fluted Architectural Bronze · Concealed Pivot',
    tolerance: '±0.2mm perimeter gap joinery'
  },
  {
    step: 5,
    id: 'ch-envelope',
    tag: 'ACT 05 // THE STRUCTURAL ENVELOPE',
    name: 'THE ENVELOPE & COLUMNS',
    subtitle: 'Monolithic travertine surfaces, bronze columns, and thermal massing.',
    narrative: 'The structural envelope rises. Deep-set Roman travertine cantilevered slabs and extruded bronze mullions frame panoramic horizontal vistas while stabilizing indoor temperatures against equatorial thermal radiation.',
    capability: 'Passive solar massing, heavy stone envelope engineering, and structural bronze fabrication.',
    spec: 'Roman Silver Travertine Slabs · Architectural Bronze Mullions · Structural Cantilevers',
    tolerance: '±0.2mm stone veneer jointing alignment'
  },
  {
    step: 6,
    id: 'ch-artwork',
    tag: 'ACT 06 // THE CURATED ARTWORK',
    name: 'THE ARTWORK',
    subtitle: 'Art and personal objects give a home its emotional identity.',
    narrative: 'Moving into the interior gallery corridor. A carefully composed site-specific lost-wax cast bronze sculpture is revealed on a honed limestone pedestal, illuminated by 98 CRI museum downlights against an acoustic wall tapestry relief.',
    capability: 'Fine art curation, bespoke sculpture commissions, and museum-grade conservation lighting.',
    spec: 'Lost-Wax Cast Bronze Sculpture · Honed Limestone Niche · Museum Downlighting',
    tolerance: '0% specular glare · Museum Art Conservation'
  },
  {
    step: 7,
    id: 'ch-furniture',
    tag: 'ACT 07 // THE LIVING SALON',
    name: 'THE FURNITURE',
    subtitle: 'The quality of a room comes from the relationships between its elements.',
    narrative: 'Progressively revealing the living salon through its principal elements: a low-slung curved bouclé modular sofa, hand-carved travertine coffee plinth, smoked oak side blocks, and a woven natural wool area rug that preserve panoramic exterior horizons.',
    capability: 'Bespoke residential atelier, curved upholstered seating, and artisanal stone carving.',
    spec: 'Natural Bouclé · Hand-Carved Travertine · 100% Woven Wool',
    tolerance: 'Zero synthetic polyurethane · 100% natural wool'
  },
  {
    step: 8,
    id: 'ch-kitchen',
    tag: 'ACT 08 // THE CULINARY GALLERY',
    name: 'THE KITCHEN',
    subtitle: 'Functional spaces become beautiful when materials, layout, and craftsmanship work together.',
    narrative: 'Transitioning to the kitchen wing. The camera frames a monolithic Calacatta Oro marble waterfall island with concealed induction cooking, brass architectural barstools, and fluted smoked oak cabinetry with integrated extraction.',
    capability: 'High-precision stone fabrication, mitred bookmatched marble, and concealed appliance joinery.',
    spec: 'Calacatta Oro Marble · Smoked European Oak · Concealed Induction',
    tolerance: 'Bookmatched 20mm marble mitred edges'
  },
  {
    step: 9,
    id: 'ch-wine',
    tag: 'ACT 09 // THE SOMMELIER VAULT',
    name: 'THE WINE CELLAR',
    subtitle: 'Subterranean climate preservation meets tactile luxury.',
    narrative: 'Descending into the climate-controlled sommelier sanctuary. An illuminated monolithic translucent amber onyx feature wall glows behind bronze precision bottle cradles, centered around a cantilevered volcanic quartz tasting monolith.',
    capability: 'Hermetic micro-climate conditioning, illuminated onyx stonework, and sommelier precision racks.',
    spec: 'Backlit Italian Amber Onyx · 14°C Hermetic Climate · Nero Basalt Monolith',
    tolerance: '±0.1°C temperature variance · 65% RH stability'
  },
  {
    step: 10,
    id: 'ch-study',
    tag: 'ACT 10 // THE ATELIER STUDY',
    name: 'THE ATELIER LIBRARY',
    subtitle: 'A secluded intellectual retreat crafted from smoked eucalyptus and patinated brass.',
    narrative: 'Stepping into the double-height executive study. Full-height fluted smoked eucalyptus joinery houses first-edition monographs, flanked by a patinated bronze rolling library ladder and a hand-stitched saddle leather writing slab.',
    capability: 'Double-height library joinery, bespoke executive furniture, and acoustic isolation design.',
    spec: 'Smoked Eucalyptus Millwork · Patinated Bronze Ladder · Saddle Leather Desk',
    tolerance: '48dB acoustic isolation rating'
  },
  {
    step: 11,
    id: 'ch-spa',
    tag: 'ACT 11 // THE WELLNESS SANCTUARY',
    name: 'THE WELLNESS SPA',
    subtitle: 'Hydrotherapy, natural light, and sensory restoration.',
    narrative: 'Transitioning into the private bath sanctuary. A hand-carved freestanding oval bathtub sculpted from a single block of Grigio Orobico marble rests beneath a structural ceiling skylight, opening to an enclosed bamboo light court.',
    capability: 'Monolithic stone sculpture, structural skylight apertures, and interior botanical integration.',
    spec: 'Grigio Orobico Marble Soaking Vessel · Skylight Beam · Zen Bamboo Court',
    tolerance: 'Seamless carved monolithic basin (zero grout joints)'
  },
  {
    step: 12,
    id: 'ch-skypool',
    tag: 'ACT 12 // THE SKY POOL & SOLARIUM',
    name: 'THE SKY POOL & FIRE PIT',
    subtitle: 'Floating waters bridging architecture and the sky.',
    narrative: 'Ascending to the cantilevered rooftop solarium. A dramatic crystalline infinity pool cantilevers 4.2 meters outward over the garden canopy, bordered by heated volcanic basalt decking and a sunken fireside lounge with glowing volcanic embers.',
    capability: 'Cantilevered aquatic engineering, infinity edge detailing, and integrated outdoor fire hearths.',
    spec: '4.2m Structural Cantilever · Bio-Crystalline Pool · Volcanic Ember Fire Pit',
    tolerance: '15,000kg dynamic water hydrostatic load rating'
  },
  {
    step: 13,
    id: 'ch-sanctuary',
    tag: 'ACT 13 // ARCHITECTURAL CONTINUITY',
    name: 'THE UPPER SANCTUARY',
    subtitle: 'Establishing continuity between rooms, finishes, and the architecture.',
    narrative: 'Elevating to show spatial continuity between public salons and private sanctuaries. The upper master suite features aerodynamic motorized cedar louvers that deflect 85% of equatorial solar heat while opening onto a panoramic solarium terrace.',
    capability: 'Multi-level spatial choreography, passive thermal comfort, and aerodynamic louvers.',
    spec: 'Western Red Cedar Louvers · Acoustic Glazing · Structural Cantilever',
    tolerance: '85% solar heat deflection · 42dB acoustic isolation'
  },
  {
    step: 14,
    id: 'ch-assembly',
    tag: 'ACT 14 // UNIFIED SYNTHESIS',
    name: 'THE ASSEMBLY',
    subtitle: 'All introduced elements belong to one unified home.',
    narrative: 'A deliberate camera pullback commences. All 12 architectural strata—from the subterranean wine vault and ground reflection pool to the living salon, private study, wellness spa, and cantilevered sky pool—unite into one coherent architectural world.',
    capability: 'Turnkey architectural management, BIM clash detection, and end-to-end estate construction.',
    spec: '12 Coordinated Architectural Strata · Continuous Travertine Vein Flow',
    tolerance: 'Turnkey Handover within ±0.3mm tolerance'
  },
  {
    step: 15,
    id: 'ch-reveal',
    tag: 'ACT 15 // THE MANSION REVEAL',
    name: 'THE MANSION REVEAL',
    subtitle: 'A complete luxury residence and its grounds in a memorable architectural composition.',
    narrative: 'The full luxury residence is revealed in an epic, illuminated composition. The estate corresponds directly to every space and material discovered during the journey. Freely explore the 360° model, toggle solar daylight to dusk, and deconstruct the strata.',
    capability: 'Complete bespoke private estate design and turnkey execution.',
    spec: '820 m² Gross Area · 12 Architectural Strata · Turnkey Delivery',
    tolerance: 'Fully Habitated & Monitored'
  },
  {
    step: 16,
    id: 'ch-invitation',
    tag: 'ACT 16 // THE INVITATION',
    name: 'THE INVITATION',
    subtitle: 'Every residence is a portrait. We engineer the frame.',
    narrative: 'Transition from the mansion experience into a confidential partnership. We accept a limited annual allocation of private residential commissions across Kampala, London Mayfair, and Dubai DIFC under strict mutual NDA.',
    capability: 'Private family office commissions, international residential ateliers, and architectural monographs.',
    spec: 'Kampala Atelier · London Practice · Dubai Suite',
    tolerance: 'Strict Non-Disclosure Guaranteed'
  }
];

export const OryzoMansionExperience: React.FC<OryzoMansionExperienceProps> = ({
  onNavigateToDesignSpace,
  onNavigateToShop,
  onNavigateToMyHome,
}) => {
  const navigate = useNavigate();
  const mainContainerRef = useRef<HTMLDivElement>(null);

  // Global Page Scroll States
  const [globalScrollProgress, setGlobalScrollProgress] = useState<number>(0);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false);

  // 3D Architectural Scene Parameters
  const [threeParams, setThreeParams] = useState<Architectural3DParams>({
    timeOfDay: 'day',
    explodedLevel: 0,
    activeLayer: 'all',
    cameraAngle: 'perspective',
    roughness: 0.45,
    travertineTone: 'roman-silver',
    renderMode: 'pbr',
    scrollProgress: 0,
    assemblyProgress: 1,
    thermalMode: false,
    thermalTemperature: 298,
    lawnTone: 'zoysia',
    windSpeed: 1.2,
    waterRipple: true,
  });

  // Lawn & Landscape Laboratory State (Chapter 2 interactive controls)
  const [lawnTone, setLawnTone] = useState<'zoysia' | 'bentgrass' | 'zen-gravel'>('zoysia');
  const [windBreeze, setWindBreeze] = useState<number>(1.2);
  const [waterRippleActive, setWaterRippleActive] = useState<boolean>(true);

  // Wine Vault interactive states (Act 9)
  const [wineCellarTemp, setWineCellarTemp] = useState<number>(14);
  const [wineOnyxGlow, setWineOnyxGlow] = useState<boolean>(true);

  // Wellness Spa states (Act 11)
  const [spaWaterTemp, setSpaWaterTemp] = useState<number>(38);
  const [spaSteam, setSpaSteam] = useState<boolean>(true);

  // Rooftop Sky Pool & Fire Pit states (Act 12)
  const [poolFireEmber, setPoolFireEmber] = useState<boolean>(true);
  const [skyPoolFlow, setSkyPoolFlow] = useState<'crystalline' | 'mirror-still'>('crystalline');

  // Sync controls with threeParams
  useEffect(() => {
    setThreeParams((prev) => ({
      ...prev,
      lawnTone,
      windSpeed: windBreeze,
      waterRipple: waterRippleActive,
      wineTemp: wineCellarTemp,
      wineOnyxGlow,
      spaSteam,
      poolFireEmber,
    }));
  }, [lawnTone, windBreeze, waterRippleActive, wineCellarTemp, wineOnyxGlow, spaSteam, poolFireEmber]);

  // Reveal Chapter Interactive Controls
  const [revealTimeOfDay, setRevealTimeOfDay] = useState<'day' | 'golden-hour' | 'night'>('golden-hour');
  const [revealExploded, setRevealExploded] = useState<number>(0);
  const [monographDownloaded, setMonographDownloaded] = useState<boolean>(false);

  // Spec Matrix Tier Selection
  const [selectedTier, setSelectedTier] = useState<'tier-1' | 'tier-2' | 'tier-3'>('tier-2');

  // Selected Monograph Modal
  const [activeMonographId, setActiveMonographId] = useState<string | null>(null);

  // Commissioning Desk State
  const [commissionForm, setCommissionForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'Kampala (Nakasero / Kololo)',
    tier: 'Master Estate (600–900 m²)',
    timeline: 'Immediate (0–6 Months)',
    ndaAccepted: true,
  });
  const [commissionSubmitted, setCommissionSubmitted] = useState<boolean>(false);

  // --------------------------------------------------------------------------
  // 1. Initial Telemetry Loading Sequence
  // --------------------------------------------------------------------------
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoadingComplete(true), 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 14) + 6;
      });
    }, 55);

    return () => clearInterval(timer);
  }, []);

  // --------------------------------------------------------------------------
  // 2. Lenis Smooth Scroll & Continuous 16-Chapter Progress Sync
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!loadingComplete) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    const onGlobalScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      
      setGlobalScrollProgress(progress);

      // Map progress directly to the 16 chapters
      const chapterIdx = Math.min(15, Math.floor(progress * 16));
      setCurrentChapterIndex(chapterIdx);

      // Assembly progress (1.0 to 13.0)
      const assemblyStep = 1 + progress * 11.8;

      // Solar lighting modulation based on chapter:
      // Ch 1-2: Day
      // Ch 3: Night/Dusk (Sculptural lamp highlights)
      // Ch 4-8: Warm Interior Day
      // Ch 9: Atmospheric Cellar Night
      // Ch 10-11: Day & Skylight
      // Ch 12: Sunset Golden Hour & Embers
      // Ch 14-16: Golden Hour or User Selected
      let activeTimeOfDay: 'day' | 'golden-hour' | 'night' = 'day';
      if (progress >= 0.12 && progress < 0.19) {
        activeTimeOfDay = 'night'; // Lamp activation
      } else if (progress >= 0.50 && progress < 0.57) {
        activeTimeOfDay = 'night'; // Sommelier wine cellar
      } else if (progress >= 0.70 && progress < 0.78) {
        activeTimeOfDay = 'golden-hour'; // Sky pool twilight
      } else if (progress >= 0.85) {
        activeTimeOfDay = revealTimeOfDay;
      }

      setThreeParams((prev) => ({
        ...prev,
        scrollProgress: progress,
        assemblyProgress: assemblyStep,
        timeOfDay: activeTimeOfDay,
        explodedLevel: progress >= 0.84 ? revealExploded : 0,
      }));
    };

    window.addEventListener('scroll', onGlobalScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onGlobalScroll);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [loadingComplete, revealTimeOfDay, revealExploded]);

  // Jump smoothly to a specific chapter
  const scrollToChapter = (idx: number) => {
    const el = document.getElementById(MANSION_CHAPTERS[idx].id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div 
      ref={mainContainerRef} 
      className="relative min-h-screen bg-[#07080a] text-[#EDE8E1] font-sans antialiased selection:bg-[#cbb592] selection:text-black overflow-x-hidden"
    >
      <MagneticCursor />

      {/* =========================================================================
          ACT 00: INITIAL TELEMETRY PRELOADER HUD
          ========================================================================= */}
      {!loadingComplete && (
        <div className="fixed inset-0 z-[100] bg-[#07080a] flex flex-col justify-between p-8 lg:p-14 text-white font-mono transition-opacity duration-700">
          <div className="flex justify-between items-start text-xs text-white/50 tracking-widest uppercase">
            <div>
              <span className="text-[#cbb592] font-semibold">IPA INTERIORS</span> // THE EVOLVING MANSION
            </div>
            <div>[EQUATORIAL COORDINATES: 0.3162° N, 32.5822° E]</div>
          </div>

          <div className="max-w-xl space-y-6">
            <div className="text-4xl lg:text-5xl font-light tracking-tight text-white font-sans">
              The Evolving Mansion
            </div>
            <p className="text-xs text-white/60 font-mono tracking-wider leading-relaxed">
              Progressive architectural synthesis. Discovering a luxury residence piece by piece—from raw terrain and illuminated dusk to monumental monolithic stone and living sanctuaries.
            </p>
            <div className="w-full bg-white/10 h-[2px] overflow-hidden">
              <div 
                className="bg-[#cbb592] h-full transition-all duration-100 ease-out" 
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-mono text-white/40">
              <span>JOINERY TOLERANCE: ±0.2mm</span>
              <span className="text-[#cbb592] font-semibold">{loadingProgress}% INITIALIZED</span>
            </div>
          </div>

          <div className="text-[10px] text-white/30 tracking-widest uppercase flex justify-between font-mono">
            <span>KAMPALA · LONDON MAYFAIR · DUBAI DIFC</span>
            <span>PRESS ANYWHERE TO COMMENCE</span>
          </div>
        </div>
      )}

      {/* =========================================================================
          PERSISTENT 3D BACKGROUND CANVAS (Follows Entire Page Scroll)
          ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Architectural3DCanvas 
          params={threeParams}
          className="w-full h-full"
          interactive={globalScrollProgress > 0.82}
        />
        {/* Subtle Vignette & Grain Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(7,8,10,0.15)_0%,rgba(7,8,10,0.85)_100%)]" />
      </div>

      {/* =========================================================================
          MASTER FLOATING HUD (Oryzo.ai Fixed Header Interface)
          ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-5 pointer-events-none flex justify-between items-center text-xs font-mono tracking-wider">
        <div className="flex items-center space-x-6 pointer-events-auto">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-2 text-white/90 hover:text-white group transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#cbb592] inline-block animate-pulse" />
            <span className="font-semibold tracking-widest uppercase">IPA ATELIER</span>
            <span className="text-white/40 font-normal">| THE EVOLVING MANSION</span>
          </button>
        </div>

        {/* Center: Live Scroll Chapter Indicator */}
        <div className="hidden md:flex items-center space-x-4 bg-black/60 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 pointer-events-auto text-[11px]">
          <span className="text-[#cbb592] font-semibold">
            {MANSION_CHAPTERS[currentChapterIndex]?.tag.split('//')[0].trim()}
          </span>
          <span className="text-white/30">|</span>
          <span className="text-white/80 uppercase truncate max-w-[220px]">
            {MANSION_CHAPTERS[currentChapterIndex]?.name}
          </span>
          <span className="text-white/40 font-mono">
            {Math.round(globalScrollProgress * 100)}%
          </span>
        </div>

        {/* Right Navigation & Audio Controls */}
        <div className="flex items-center space-x-4 pointer-events-auto">
          {/* Quick Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-8 h-8 rounded-full border border-white/15 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:border-[#cbb592] transition-colors"
            title="Acoustic Ambience"
          >
            {soundEnabled ? <Volume2 size={13} className="text-[#cbb592]" /> : <VolumeX size={13} />}
          </button>

          {/* Direct CTA */}
          <button
            onClick={() => {
              if (onNavigateToDesignSpace) onNavigateToDesignSpace();
              else navigate('/design-studio');
            }}
            className="px-4 py-2 bg-white/10 hover:bg-[#cbb592] text-white hover:text-black rounded-full border border-white/15 transition-all duration-300 font-mono tracking-widest uppercase text-[10px] font-semibold flex items-center space-x-1.5 shadow-lg"
          >
            <span>BESPOKE STUDIO</span>
            <ArrowUpRight size={12} />
          </button>
        </div>
      </header>

      {/* Floating Vertical Chapter Tracker (Left edge) */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col space-y-2.5 pointer-events-auto">
        {MANSION_CHAPTERS.map((ch, idx) => {
          const isActive = currentChapterIndex === idx;
          return (
            <button
              key={ch.id}
              onClick={() => scrollToChapter(idx)}
              className="group flex items-center space-x-3 text-left focus:outline-none"
            >
              <div 
                className={`h-[2px] transition-all duration-300 ${
                  isActive ? 'w-8 bg-[#cbb592]' : 'w-3 bg-white/20 group-hover:w-5 group-hover:bg-white/60'
                }`} 
              />
              <span className={`text-[9px] font-mono tracking-widest uppercase transition-opacity duration-300 ${
                isActive ? 'opacity-100 text-white font-semibold' : 'opacity-0 group-hover:opacity-70 text-white/60'
              }`}>
                {ch.step < 10 ? '0' : ''}{ch.step} {ch.name}
              </span>
            </button>
          );
        })}
      </nav>

      {/* =========================================================================
          SCROLLING EDITORIAL CONTENT WRAPPER
          ========================================================================= */}
      <main className="relative z-10">

        {/* -----------------------------------------------------------------------
            PROLOGUE HERO: ESTABLISHING THE EVOLVING RESIDENCE
            ----------------------------------------------------------------------- */}
        <section className="min-h-screen flex flex-col justify-end px-6 lg:px-20 pb-20 pt-36">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center space-x-3 px-3.5 py-1.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase text-[#cbb592]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cbb592]" />
              <span>THE EVOLVING MANSION ARCHITECTURE</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.08] font-sans">
              Discover and assemble a luxury residence, <br className="hidden md:inline" />
              <span className="italic font-serif text-[#EDE8E1]/90">piece by intentional piece.</span>
            </h1>

            <p className="max-w-2xl text-base md:text-lg text-white/70 font-light leading-relaxed">
              Every scroll chapter unearths a foundational design element—exploring its emotional meaning, physical materiality, and technical precision—before incorporating it into the evolving 3D architectural world.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6">
              <button
                onClick={() => scrollToChapter(0)}
                className="px-6 py-3.5 bg-[#cbb592] hover:bg-[#d8c5a6] text-black font-mono tracking-widest text-xs uppercase font-semibold rounded-full flex items-center space-x-2 transition-transform duration-300 hover:scale-105 shadow-xl"
              >
                <span>BEGIN THE PROGRESSION</span>
                <ChevronDown size={14} />
              </button>
              <div className="text-xs font-mono text-white/40 tracking-wider">
                SCROLL TO WITNESS ARCHITECTURAL EMERGENCE ↓
              </div>
            </div>
          </div>
        </section>

        {/* -----------------------------------------------------------------------
            CHAPTERS 1 THROUGH 13: THE SEQUENTIAL DESIGN STORIES
            ----------------------------------------------------------------------- */}
        {MANSION_CHAPTERS.slice(0, 13).map((chapter, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <section
              key={chapter.id}
              id={chapter.id}
              className="min-h-screen flex items-center px-6 lg:px-20 py-32"
            >
              <div className={`w-full max-w-7xl mx-auto flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} justify-between items-center gap-12`}>
                
                {/* Text Editorial Card (Glassmorphic, High-Contrast) */}
                <div className="w-full lg:max-w-xl bg-black/60 backdrop-blur-xl p-8 lg:p-12 rounded-2xl border border-white/10 shadow-2xl space-y-6">
                  
                  {/* Step & Technical Badge */}
                  <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-[#cbb592]">
                    <span>{chapter.tag}</span>
                    <span className="text-white/40">CHAPTER {chapter.step < 10 ? '0' : ''}{chapter.step} OF 16</span>
                  </div>

                  {/* Headline & Emotional Subtitle */}
                  <div className="space-y-2">
                    <h2 className="text-3xl lg:text-4xl font-light text-white tracking-tight">
                      {chapter.name}
                    </h2>
                    <p className="text-base text-[#cbb592] font-serif italic">
                      "{chapter.subtitle}"
                    </p>
                  </div>

                  {/* Narrative Breakdown */}
                  <div className="space-y-4 pt-2 text-xs text-white/70 font-mono leading-relaxed divide-y divide-white/10">
                    
                    {/* The Narrative */}
                    <div className="pt-3">
                      <span className="text-white font-semibold block uppercase tracking-wider mb-1 text-[10px] text-white/90">
                        01 // THE DESIGN ELEMENT & SPATIAL ROLE
                      </span>
                      <p>{chapter.narrative}</p>
                    </div>

                    {/* IPA Design Capability */}
                    <div className="pt-3">
                      <span className="text-white font-semibold block uppercase tracking-wider mb-1 text-[10px] text-[#cbb592]">
                        02 // IPA ARCHITECTURAL CAPABILITY
                      </span>
                      <p className="italic font-serif text-sm text-white/90">
                        {chapter.capability}
                      </p>
                    </div>

                    {/* Chapter 2 Specific: Interactive Landscape & Lawn Studio */}
                    {chapter.id === 'ch-lawn' && (
                      <div className="pt-4 space-y-4 bg-white/[0.03] p-4 rounded-xl border border-white/10">
                        <div className="flex justify-between items-center text-[10px] font-mono text-[#cbb592]">
                          <span className="flex items-center gap-1.5 font-semibold">
                            <Sparkles size={12} />
                            INTERACTIVE TURF & HARDSCAPE LABORATORY
                          </span>
                          <span className="text-white/40">1,400+ BOTANICAL INSTANCES</span>
                        </div>

                        {/* Turf Varietal Selector */}
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-mono uppercase tracking-wider text-white/50 block">
                            TURF VARIETAL SPECIFICATION
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            <button
                              onClick={() => setLawnTone('zoysia')}
                              className={`px-2.5 py-2 text-[10px] font-mono rounded-lg border text-left transition-all ${
                                lawnTone === 'zoysia'
                                  ? 'bg-[#193318] border-[#cbb592] text-white shadow-lg shadow-green-950/40'
                                  : 'bg-black/40 border-white/10 text-white/60 hover:text-white'
                              }`}
                            >
                              <div className="font-semibold text-[#cbb592]">Kyoto Zoysia</div>
                              <div className="text-[8px] text-white/50">Imperial Velvet · 12mm</div>
                            </button>

                            <button
                              onClick={() => setLawnTone('bentgrass')}
                              className={`px-2.5 py-2 text-[10px] font-mono rounded-lg border text-left transition-all ${
                                lawnTone === 'bentgrass'
                                  ? 'bg-[#274a24] border-[#cbb592] text-white shadow-lg shadow-green-900/40'
                                  : 'bg-black/40 border-white/10 text-white/60 hover:text-white'
                              }`}
                            >
                              <div className="font-semibold text-[#cbb592]">Highland Sage</div>
                              <div className="text-[8px] text-white/50">Alpine Bent · Silken</div>
                            </button>

                            <button
                              onClick={() => setLawnTone('zen-gravel')}
                              className={`px-2.5 py-2 text-[10px] font-mono rounded-lg border text-left transition-all ${
                                lawnTone === 'zen-gravel'
                                  ? 'bg-[#40382d] border-[#cbb592] text-white shadow-lg shadow-amber-950/40'
                                  : 'bg-black/40 border-white/10 text-white/60 hover:text-white'
                              }`}
                            >
                              <div className="font-semibold text-[#cbb592]">Zen Limestone</div>
                              <div className="text-[8px] text-white/50">Crushed Plinth · Raked</div>
                            </button>
                          </div>
                        </div>

                        {/* Breeze Velocity & Water Ripple Controls */}
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-white/50 block flex items-center gap-1">
                              <Wind size={10} /> MICROCLIMATE BREEZE
                            </span>
                            <div className="flex gap-1.5">
                              {[
                                { label: '0.5× Calm', val: 0.5 },
                                { label: '1.2× Drift', val: 1.2 },
                                { label: '2.4× Ridge', val: 2.4 }
                              ].map(b => (
                                <button
                                  key={b.val}
                                  onClick={() => setWindBreeze(b.val)}
                                  className={`flex-1 py-1 text-[9px] font-mono rounded border text-center transition-all ${
                                    windBreeze === b.val
                                      ? 'bg-[#cbb592] text-black border-[#cbb592] font-semibold'
                                      : 'bg-black/30 border-white/10 text-white/60 hover:text-white'
                                  }`}
                                >
                                  {b.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-white/50 block">
                              REFLECTION BASIN
                            </span>
                            <button
                              onClick={() => setWaterRippleActive(!waterRippleActive)}
                              className={`w-full py-1 text-[9px] font-mono rounded border text-center transition-all ${
                                waterRippleActive
                                  ? 'bg-blue-950/60 border-blue-400/40 text-blue-200'
                                  : 'bg-black/30 border-white/10 text-white/60'
                              }`}
                            >
                              {waterRippleActive ? '🌊 Dynamic Ripples Active' : '🪞 Mirror Still Glass'}
                            </button>
                          </div>
                        </div>

                        {/* Botanical Telemetry Readouts */}
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-[9px] font-mono text-white/60">
                          <div>
                            <span className="text-white/30 block">ROOT SATURATION</span>
                            <span className="text-[#cbb592]">74.2% Optimal</span>
                          </div>
                          <div>
                            <span className="text-white/30 block">SPECIMEN CLOUD PINE</span>
                            <span className="text-white/90">85-Yr Niwaki</span>
                          </div>
                          <div>
                            <span className="text-white/30 block">BASALT BOULDERS</span>
                            <span className="text-white/90">Weathered Slate</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Chapter 9 Specific: Interactive Sommelier Cellar Studio */}
                    {chapter.id === 'ch-wine' && (
                      <div className="pt-4 space-y-4 bg-white/[0.03] p-4 rounded-xl border border-white/10">
                        <div className="flex justify-between items-center text-[10px] font-mono text-[#cbb592]">
                          <span className="flex items-center gap-1.5 font-semibold">
                            <Sparkles size={12} />
                            SOMMELIER CELLAR MICRO-CLIMATE LABORATORY
                          </span>
                          <span className="text-white/40">HERMETIC CELLAR</span>
                        </div>

                        {/* Cellar Storage Temperature Selector */}
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-mono uppercase tracking-wider text-white/50 block">
                            CELLAR PRESERVATION TEMPERATURE
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { label: '12°C Grand Cru', val: 12, sub: 'Champagne & White' },
                              { label: '14°C Sommelier', val: 14, sub: 'Bordeaux & Burgundy' },
                              { label: '16°C Vintage', val: 16, sub: 'Rhône & Port Vault' },
                            ].map((t) => (
                              <button
                                key={t.val}
                                onClick={() => setWineCellarTemp(t.val)}
                                className={`px-2.5 py-2 text-[10px] font-mono rounded-lg border text-left transition-all ${
                                  wineCellarTemp === t.val
                                    ? 'bg-[#3b2414] border-[#cbb592] text-white shadow-lg shadow-amber-950/40'
                                    : 'bg-black/40 border-white/10 text-white/60 hover:text-white'
                                }`}
                              >
                                <div className="font-semibold text-[#cbb592]">{t.label}</div>
                                <div className="text-[8px] text-white/50">{t.sub}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Backlit Translucent Onyx Feature & Humidity */}
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-white/50 block">
                              TRANSLUCENT ONYX WALL
                            </span>
                            <button
                              onClick={() => setWineOnyxGlow(!wineOnyxGlow)}
                              className={`w-full py-1 text-[9px] font-mono rounded border text-center transition-all ${
                                wineOnyxGlow
                                  ? 'bg-amber-950/60 border-amber-400/40 text-amber-200'
                                  : 'bg-black/30 border-white/10 text-white/60'
                              }`}
                            >
                              {wineOnyxGlow ? '✨ Amber Luminescence Active' : '🌑 Dimmed Onyx Veins'}
                            </button>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-white/50 block">
                              HYGROMETRIC SENSORS
                            </span>
                            <div className="py-1 px-2 text-[9px] font-mono rounded border border-white/10 bg-black/30 text-[#cbb592] flex justify-between items-center">
                              <span>HUMIDITY</span>
                              <span className="text-white font-semibold">65.4% RH</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Chapter 11 Specific: Wellness Spa & Hydrotherapy */}
                    {chapter.id === 'ch-spa' && (
                      <div className="pt-4 space-y-4 bg-white/[0.03] p-4 rounded-xl border border-white/10">
                        <div className="flex justify-between items-center text-[10px] font-mono text-[#cbb592]">
                          <span className="flex items-center gap-1.5 font-semibold">
                            <Sparkles size={12} />
                            WELLNESS HYDROTHERAPY & HAMMAM ATELIER
                          </span>
                          <span className="text-white/40">GRIGIO OROBICO STONE</span>
                        </div>

                        {/* Water Temperature Selector */}
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-mono uppercase tracking-wider text-white/50 block">
                            FREESTANDING MONOLITH SOAKING TEMPERATURE
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { label: '36°C Ambient', val: 36, sub: 'Circulation Therapy' },
                              { label: '38°C Immersion', val: 38, sub: 'Deep Muscle Release' },
                              { label: '40°C Mineral', val: 40, sub: 'Detoxifying Thermal' },
                            ].map((st) => (
                              <button
                                key={st.val}
                                onClick={() => setSpaWaterTemp(st.val)}
                                className={`px-2.5 py-2 text-[10px] font-mono rounded-lg border text-left transition-all ${
                                  spaWaterTemp === st.val
                                    ? 'bg-[#1b2631] border-[#cbb592] text-white shadow-lg'
                                    : 'bg-black/40 border-white/10 text-white/60 hover:text-white'
                                }`}
                              >
                                <div className="font-semibold text-[#cbb592]">{st.label}</div>
                                <div className="text-[8px] text-white/50">{st.sub}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Zen Bamboo Court & Steam Controls */}
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-white/50 block">
                              NATURAL LIGHTWELL SHAFT
                            </span>
                            <button
                              onClick={() => setSpaSteam(!spaSteam)}
                              className={`w-full py-1 text-[9px] font-mono rounded border text-center transition-all ${
                                spaSteam
                                  ? 'bg-cyan-950/60 border-cyan-400/40 text-cyan-200'
                                  : 'bg-black/30 border-white/10 text-white/60'
                              }`}
                            >
                              {spaSteam ? '☀️ Daylight Sunbeam Active' : '🌙 Ambient Night Light'}
                            </button>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-white/50 block">
                              ZEN BAMBOO COURTYARD
                            </span>
                            <div className="py-1 px-2 text-[9px] font-mono rounded border border-white/10 bg-black/30 text-white/80 flex justify-between items-center">
                              <span>SPECIMENS</span>
                              <span className="text-[#cbb592] font-semibold">8 Bamboo Stems</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Chapter 12 Specific: Rooftop Sky Pool & Sunken Fire Pit */}
                    {chapter.id === 'ch-skypool' && (
                      <div className="pt-4 space-y-4 bg-white/[0.03] p-4 rounded-xl border border-white/10">
                        <div className="flex justify-between items-center text-[10px] font-mono text-[#cbb592]">
                          <span className="flex items-center gap-1.5 font-semibold">
                            <Sparkles size={12} />
                            ROOFTOP SKY POOL & SUNKEN FIRE HEARTH
                          </span>
                          <span className="text-white/40">4.2M CANTILEVER</span>
                        </div>

                        {/* Volcanic Fire Hearth Toggle & Water Mode */}
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-white/50 block">
                              VOLCANIC FIRE PIT EMBERS
                            </span>
                            <button
                              onClick={() => setPoolFireEmber(!poolFireEmber)}
                              className={`w-full py-2 text-[9px] font-mono rounded border text-center transition-all ${
                                poolFireEmber
                                  ? 'bg-amber-950/70 border-amber-400/50 text-amber-100 shadow-lg shadow-amber-950/50'
                                  : 'bg-black/30 border-white/10 text-white/60'
                              }`}
                            >
                              {poolFireEmber ? '🔥 Volcanic Flame Embers Active' : '🌑 Quenched Hearth'}
                            </button>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-white/50 block">
                              BIO-CRYSTALLINE WATER FLOW
                            </span>
                            <button
                              onClick={() => setSkyPoolFlow(skyPoolFlow === 'crystalline' ? 'mirror-still' : 'crystalline')}
                              className={`w-full py-2 text-[9px] font-mono rounded border text-center transition-all ${
                                skyPoolFlow === 'crystalline'
                                  ? 'bg-teal-950/70 border-teal-400/50 text-teal-100'
                                  : 'bg-black/30 border-white/10 text-white/60'
                              }`}
                            >
                              {skyPoolFlow === 'crystalline' ? '🌊 Glazed Infinity Bio-Flow' : '🪞 Mirror Horizon Sump'}
                            </button>
                          </div>
                        </div>

                        {/* Engineering Metrics */}
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-[9px] font-mono text-white/60">
                          <div>
                            <span className="text-white/30 block">STRUCTURAL OVERHANG</span>
                            <span className="text-[#cbb592]">4.2m Outward</span>
                          </div>
                          <div>
                            <span className="text-white/30 block">WATER MASS</span>
                            <span className="text-white/90">15.4 Tonnes</span>
                          </div>
                          <div>
                            <span className="text-white/30 block">INFINITY EDGE</span>
                            <span className="text-white/90">Zero-Lip Glazed</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Technical Spec Readout Footer */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap justify-between items-center text-[10px] font-mono text-white/50 gap-2">
                    <div>
                      <span className="text-white/30">SPEC:</span> {chapter.spec}
                    </div>
                    <div>
                      <span className="text-white/30">TOLERANCE:</span> <span className="text-[#cbb592]">{chapter.tolerance}</span>
                    </div>
                  </div>
                </div>

                {/* Spatial Anchor Label for 3D Camera Focus */}
                <div className="hidden lg:flex flex-col items-center space-y-4 text-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-[#cbb592]">
                    <Layers size={18} />
                  </div>
                  <div className="font-mono text-[9px] tracking-widest text-white/40 uppercase">
                    PERSISTENT 3D MODEL ASSEMBLY <br />
                    <span className="text-white font-semibold">STAGE {chapter.step < 10 ? '0' : ''}{chapter.step} ACTIVE</span>
                  </div>
                </div>

              </div>
            </section>
          );
        })}

        {/* -----------------------------------------------------------------------
            ACT 14: THE ASSEMBLY (Camera Pullback & Exploded Strata Inspection)
            ----------------------------------------------------------------------- */}
        <section 
          id={MANSION_CHAPTERS[13].id}
          className="min-h-screen flex items-center px-6 lg:px-20 py-32"
        >
          <div className="w-full max-w-4xl mx-auto bg-black/70 backdrop-blur-xl p-8 lg:p-14 rounded-2xl border border-white/10 shadow-2xl space-y-6">
            <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-[#cbb592]">
              <span>{MANSION_CHAPTERS[13].tag}</span>
              <span className="text-white/40">CHAPTER 14 OF 16</span>
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-light text-white tracking-tight">
              {MANSION_CHAPTERS[13].name}
            </h2>
            <p className="text-lg text-[#cbb592] font-serif italic">
              "{MANSION_CHAPTERS[13].subtitle}"
            </p>
            
            <p className="text-sm font-mono text-white/70 leading-relaxed">
              {MANSION_CHAPTERS[13].narrative}
            </p>

            <div className="pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-white/60">
              <div>
                <span className="text-white/40 block text-[10px] uppercase">CAPABILITY:</span>
                {MANSION_CHAPTERS[13].capability}
              </div>
              <div>
                <span className="text-white/40 block text-[10px] uppercase">SPECIFICATION:</span>
                <span className="text-[#cbb592]">{MANSION_CHAPTERS[13].spec}</span>
              </div>
            </div>
          </div>
        </section>

        {/* -----------------------------------------------------------------------
            ACT 15: THE MANSION REVEAL (Interactive 360° Inspector)
            ----------------------------------------------------------------------- */}
        <section 
          id={MANSION_CHAPTERS[14].id}
          className="min-h-screen flex flex-col justify-between px-6 lg:px-20 py-24 bg-gradient-to-t from-black via-black/80 to-transparent"
        >
          {/* Header Callout */}
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#cbb592]">
              <Sparkles size={13} />
              <span>{MANSION_CHAPTERS[14].tag}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-none">
              {MANSION_CHAPTERS[14].name}
            </h2>
            <p className="max-w-2xl text-base text-white/70 font-light leading-relaxed">
              {MANSION_CHAPTERS[14].narrative}
            </p>
          </div>

          {/* Interactive Staging Controls Overlay */}
          <div className="my-12 p-6 lg:p-8 bg-black/70 backdrop-blur-xl rounded-2xl border border-white/10 max-w-4xl space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-white/10 pb-4">
              <div className="font-mono text-xs text-white/90 uppercase tracking-widest flex items-center space-x-2">
                <Sliders size={14} className="text-[#cbb592]" />
                <span>INTERACTIVE MONOGRAPH INSPECTOR</span>
              </div>
              <div className="text-[10px] font-mono text-white/40">
                DRAG 3D MODEL FREELY TO EXPLORE ALL 360° FACADES
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
              
              {/* Control 1: Time of Day Illumination */}
              <div className="space-y-3">
                <span className="text-white/50 text-[10px] uppercase tracking-wider block">
                  01 // SOLAR TIME OF DAY
                </span>
                <div className="flex rounded-lg border border-white/10 overflow-hidden p-1 bg-white/5">
                  <button
                    onClick={() => {
                      setRevealTimeOfDay('day');
                      setThreeParams((p) => ({ ...p, timeOfDay: 'day' }));
                    }}
                    className={`flex-1 py-1.5 px-2 text-[10px] rounded flex items-center justify-center space-x-1.5 transition-colors ${
                      revealTimeOfDay === 'day' ? 'bg-[#cbb592] text-black font-semibold' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Sun size={11} />
                    <span>DAYLIGHT</span>
                  </button>
                  <button
                    onClick={() => {
                      setRevealTimeOfDay('golden-hour');
                      setThreeParams((p) => ({ ...p, timeOfDay: 'golden-hour' }));
                    }}
                    className={`flex-1 py-1.5 px-2 text-[10px] rounded flex items-center justify-center space-x-1.5 transition-colors ${
                      revealTimeOfDay === 'golden-hour' ? 'bg-[#cbb592] text-black font-semibold' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Flame size={11} />
                    <span>GOLDEN HOUR</span>
                  </button>
                  <button
                    onClick={() => {
                      setRevealTimeOfDay('night');
                      setThreeParams((p) => ({ ...p, timeOfDay: 'night' }));
                    }}
                    className={`flex-1 py-1.5 px-2 text-[10px] rounded flex items-center justify-center space-x-1.5 transition-colors ${
                      revealTimeOfDay === 'night' ? 'bg-[#cbb592] text-black font-semibold' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Moon size={11} />
                    <span>NIGHT DUSK</span>
                  </button>
                </div>
              </div>

              {/* Control 2: Exploded Axonometric Deconstruction */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] text-white/50 uppercase tracking-wider">
                  <span>02 // AXONOMETRIC EXPLODE</span>
                  <span className="text-[#cbb592]">{Math.round(revealExploded * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={revealExploded}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setRevealExploded(val);
                    setThreeParams((p) => ({ ...p, explodedLevel: val }));
                  }}
                  className="w-full accent-[#cbb592] bg-white/10 h-1.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-white/30">
                  <span>SOLID MANSION</span>
                  <span>EXPLODED STRATA</span>
                </div>
              </div>

              {/* Control 3: Quick Chamber Camera Jumps */}
              <div className="space-y-3">
                <span className="text-white/50 text-[10px] uppercase tracking-wider block">
                  03 // TELEPORT CAMERA
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setThreeParams((p) => ({ ...p, cameraAngle: 'axonometric' }))}
                    className="py-1 px-2 text-[9px] border border-white/10 rounded bg-white/5 hover:bg-white/15 text-white/80 transition-colors"
                  >
                    AXONOMETRIC 45°
                  </button>
                  <button
                    onClick={() => setThreeParams((p) => ({ ...p, cameraAngle: 'front' }))}
                    className="py-1 px-2 text-[9px] border border-white/10 rounded bg-white/5 hover:bg-white/15 text-white/80 transition-colors"
                  >
                    PORTAL ELEVATION
                  </button>
                  <button
                    onClick={() => setThreeParams((p) => ({ ...p, cameraAngle: 'interior' }))}
                    className="py-1 px-2 text-[9px] border border-white/10 rounded bg-white/5 hover:bg-white/15 text-white/80 transition-colors"
                  >
                    SALON INTERIOR
                  </button>
                  <button
                    onClick={() => setThreeParams((p) => ({ ...p, cameraAngle: 'aerial' }))}
                    className="py-1 px-2 text-[9px] border border-white/10 rounded bg-white/5 hover:bg-white/15 text-white/80 transition-colors"
                  >
                    SITE AERIAL
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Built Real Projects Monograph Portfolio */}
          <div className="space-y-8">
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#cbb592]">
                  VERIFIED RESIDENTIAL COMMISSIONS
                </span>
                <h3 className="text-2xl font-light text-white">
                  Built Monograph Portfolio
                </h3>
              </div>
              <span className="text-xs font-mono text-white/40">
                ESTATE PORTFOLIO 2024–2026
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1: Nakasero Hill Residence */}
              <div 
                onClick={() => setActiveMonographId('nakasero')}
                className="group relative bg-black/40 border border-white/10 rounded-xl overflow-hidden hover:border-[#cbb592]/60 transition-all duration-500 cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src="/images/villa_nakasero_residence_1791180703557.jpg" 
                    alt="Nakasero Hill Residence"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <div className="p-6 space-y-3 font-mono">
                  <div className="flex justify-between text-[10px] text-white/40">
                    <span>KAMPALA, UGANDA</span>
                    <span className="text-[#cbb592]">680 m² GROSS</span>
                  </div>
                  <h4 className="text-lg font-sans text-white group-hover:text-[#cbb592] transition-colors">
                    Nakasero Hill Residence
                  </h4>
                  <p className="text-xs text-white/60 font-light line-clamp-2">
                    Tiered Roman silver travertine, custom mahogany pivot, and solar-deflecting cedar louvers on Nakasero Ridge.
                  </p>
                  <div className="pt-2 flex items-center text-[10px] text-[#cbb592] space-x-1">
                    <span>INSPECT MONOGRAPH</span>
                    <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>

              {/* Card 2: Belgravia Townhouse */}
              <div 
                onClick={() => setActiveMonographId('belgravia')}
                className="group relative bg-black/40 border border-white/10 rounded-xl overflow-hidden hover:border-[#cbb592]/60 transition-all duration-500 cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src="/images/townhouse_belgravia_monograph_1791180714159.jpg" 
                    alt="Belgravia Monograph"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <div className="p-6 space-y-3 font-mono">
                  <div className="flex justify-between text-[10px] text-white/40">
                    <span>LONDON MAYFAIR</span>
                    <span className="text-[#cbb592]">420 m² GROSS</span>
                  </div>
                  <h4 className="text-lg font-sans text-white group-hover:text-[#cbb592] transition-colors">
                    Belgravia Monograph
                  </h4>
                  <p className="text-xs text-white/60 font-light line-clamp-2">
                    Heritage Georgian volume fused with fluted architectural bronze, Calacatta Oro scullery, and museum acoustic styling.
                  </p>
                  <div className="pt-2 flex items-center text-[10px] text-[#cbb592] space-x-1">
                    <span>INSPECT MONOGRAPH</span>
                    <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>

              {/* Card 3: Villa Solarium */}
              <div 
                onClick={() => setActiveMonographId('solarium')}
                className="group relative bg-black/40 border border-white/10 rounded-xl overflow-hidden hover:border-[#cbb592]/60 transition-all duration-500 cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src="/images/hero_estate_interior_1791180692586.jpg" 
                    alt="Villa Solarium"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <div className="p-6 space-y-3 font-mono">
                  <div className="flex justify-between text-[10px] text-white/40">
                    <span>DUBAI EMIRATES HILLS</span>
                    <span className="text-[#cbb592]">820 m² GROSS</span>
                  </div>
                  <h4 className="text-lg font-sans text-white group-hover:text-[#cbb592] transition-colors">
                    Villa Solarium Sanctuary
                  </h4>
                  <p className="text-xs text-white/60 font-light line-clamp-2">
                    Monolithic cantilevered travertine canopy, subterranean wine vault, and zero-threshold reflection pool living.
                  </p>
                  <div className="pt-2 flex items-center text-[10px] text-[#cbb592] space-x-1">
                    <span>INSPECT MONOGRAPH</span>
                    <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Specification Matrix */}
          <div className="mt-20 space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#cbb592]">
                STANDARDS MATRIX // PRECISION DELIVERABLES
              </span>
              <h3 className="text-3xl font-light text-white">
                Architectural Program Comparison
              </h3>
              <p className="text-xs font-mono text-white/50">
                Detailed feature breakdown across our three dedicated residential tiers.
              </p>
            </div>

            {/* Matrix Table */}
            <div className="border border-white/10 rounded-xl overflow-hidden bg-black/60 backdrop-blur-xl font-mono text-xs">
              <div className="grid grid-cols-4 bg-white/5 border-b border-white/10 p-4 font-semibold text-white/80 text-[11px]">
                <div>SPECIFICATION</div>
                <div className={selectedTier === 'tier-1' ? 'text-[#cbb592]' : ''}>PRIVATE RESIDENCE</div>
                <div className={selectedTier === 'tier-2' ? 'text-[#cbb592]' : ''}>MASTER ESTATE (FEATURED)</div>
                <div className={selectedTier === 'tier-3' ? 'text-[#cbb592]' : ''}>SOVEREIGN SANCTUARY</div>
              </div>

              <div className="divide-y divide-white/5 text-[11px] text-white/70">
                <div className="grid grid-cols-4 p-4 items-center">
                  <div className="text-white/40">Gross Floor Area</div>
                  <div>400 – 600 m²</div>
                  <div className="text-white font-semibold">600 – 900 m²</div>
                  <div>1,000 – 2,500 m²</div>
                </div>
                <div className="grid grid-cols-4 p-4 items-center">
                  <div className="text-white/40">Stone Sourcing</div>
                  <div>Tivoli Travertine (Honed)</div>
                  <div className="text-white font-semibold">Roman Silver Travertine (Quarried)</div>
                  <div>Basalt Noir & Custom Vein Extraction</div>
                </div>
                <div className="grid grid-cols-4 p-4 items-center">
                  <div className="text-white/40">Pivot Portal</div>
                  <div>2.8m Mahogany</div>
                  <div className="text-white font-semibold">3.8m African Mahogany + Bronze</div>
                  <div>4.5m Monolithic Cast-Bronze Hydraulic</div>
                </div>
                <div className="grid grid-cols-4 p-4 items-center">
                  <div className="text-white/40">Joinery Tolerance</div>
                  <div>±0.5mm Handcrafted</div>
                  <div className="text-white font-semibold">±0.2mm Precision CNC + Hand Finish</div>
                  <div>±0.1mm Aerospace Architectural Finish</div>
                </div>
                <div className="grid grid-cols-4 p-4 items-center">
                  <div className="text-white/40">Culinary Scullery</div>
                  <div>Integrated Island</div>
                  <div className="text-white font-semibold">Dual Island + Hidden Scullery</div>
                  <div>Triple Gallery + Chef's Commercial Grade</div>
                </div>
                <div className="grid grid-cols-4 p-4 items-center">
                  <div className="text-white/40">Acoustic Rating</div>
                  <div>STC 48</div>
                  <div className="text-white font-semibold">STC 58 (Studio Grade)</div>
                  <div>STC 65 (Anerobic Zero Reverberation)</div>
                </div>
                <div className="grid grid-cols-4 p-4 items-center">
                  <div className="text-white/40">Turnkey Handover</div>
                  <div>12 Months</div>
                  <div className="text-white font-semibold">16 Months</div>
                  <div>24 Months (White-Glove Private Vault)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -----------------------------------------------------------------------
            ACT 16: THE INVITATION (Client Commissioning Desk & Master Footer)
            ----------------------------------------------------------------------- */}
        <section 
          id={MANSION_CHAPTERS[15].id}
          className="min-h-screen flex flex-col justify-between px-6 lg:px-20 py-28 bg-[#07080a] border-t border-white/10"
        >
          {/* Monumental Headline Payoff */}
          <div className="max-w-5xl space-y-8">
            <span className="text-xs font-mono tracking-widest uppercase text-[#cbb592]">
              {MANSION_CHAPTERS[15].tag}
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.08]">
              "Every residence is a portrait. <br />
              <span className="font-serif italic text-[#cbb592]">We engineer the frame."</span>
            </h2>
            <p className="max-w-2xl text-base text-white/70 font-light leading-relaxed">
              {MANSION_CHAPTERS[15].narrative}
            </p>
          </div>

          {/* Commission Intake Form */}
          <div className="my-16 max-w-4xl bg-black/60 backdrop-blur-xl p-8 lg:p-12 rounded-2xl border border-white/10 space-y-8">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div className="text-xs font-mono uppercase tracking-widest text-white">
                PRIVATE CLIENT COMMISSIONING DESK
              </div>
              <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#cbb592]">
                <ShieldCheck size={13} />
                <span>STRICT NON-DISCLOSURE ENFORCED</span>
              </div>
            </div>

            {commissionSubmitted ? (
              <div className="p-8 bg-[#cbb592]/10 border border-[#cbb592]/30 rounded-xl text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#cbb592] text-black mx-auto flex items-center justify-center font-bold">
                  <Check size={20} />
                </div>
                <h4 className="text-xl font-light text-white">
                  Commission Protocol Initialized
                </h4>
                <p className="text-xs font-mono text-white/70 max-w-md mx-auto leading-relaxed">
                  Thank you, {commissionForm.name || 'Valued Client'}. Our Principal Architectural Partner will contact you within 24 hours via secure encrypted protocol.
                </p>
                <div className="pt-2 text-[10px] font-mono text-white/40">
                  REF: IPA-RES-{Math.floor(100000 + Math.random() * 900000)}
                </div>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setCommissionSubmitted(true);
                }}
                className="space-y-6 text-xs font-mono"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-white/60 tracking-wider uppercase text-[10px]">
                      Full Name / Family Office
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Al-Mansoor Residence"
                      value={commissionForm.name}
                      onChange={(e) => setCommissionForm({ ...commissionForm, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#cbb592] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/60 tracking-wider uppercase text-[10px]">
                      Encrypted Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@sanctuary.com"
                      value={commissionForm.email}
                      onChange={(e) => setCommissionForm({ ...commissionForm, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#cbb592] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-white/60 tracking-wider uppercase text-[10px]">
                      Estate Location
                    </label>
                    <select
                      value={commissionForm.location}
                      onChange={(e) => setCommissionForm({ ...commissionForm, location: e.target.value })}
                      className="w-full bg-[#111215] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cbb592] transition-colors"
                    >
                      <option>Kampala (Nakasero / Kololo / Muyenga)</option>
                      <option>London (Mayfair / Belgravia / Kensington)</option>
                      <option>Dubai (Emirates Hills / Palm Jumeirah)</option>
                      <option>Entebbe Lakefront Estate</option>
                      <option>Bespoke International Location</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/60 tracking-wider uppercase text-[10px]">
                      Scale Tier
                    </label>
                    <select
                      value={commissionForm.tier}
                      onChange={(e) => setCommissionForm({ ...commissionForm, tier: e.target.value })}
                      className="w-full bg-[#111215] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cbb592] transition-colors"
                    >
                      <option>Master Estate (600–900 m²)</option>
                      <option>Private Residence (400–600 m²)</option>
                      <option>Sovereign Sanctuary (1,000+ m²)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/60 tracking-wider uppercase text-[10px]">
                      Target Completion
                    </label>
                    <select
                      value={commissionForm.timeline}
                      onChange={(e) => setCommissionForm({ ...commissionForm, timeline: e.target.value })}
                      className="w-full bg-[#111215] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cbb592] transition-colors"
                    >
                      <option>Immediate (0–6 Months)</option>
                      <option>Turnkey Construction (6–18 Months)</option>
                      <option>Long-Range Land Acquisition</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <input
                    type="checkbox"
                    id="ndaCheck"
                    checked={commissionForm.ndaAccepted}
                    onChange={(e) => setCommissionForm({ ...commissionForm, ndaAccepted: e.target.checked })}
                    className="accent-[#cbb592] rounded"
                  />
                  <label htmlFor="ndaCheck" className="text-white/60 text-[10px]">
                    I require mutual Non-Disclosure Agreement (NDA) executed prior to architectural blueprint review.
                  </label>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="px-8 py-4 bg-[#cbb592] hover:bg-[#d8c5a6] text-black font-semibold rounded-full flex items-center space-x-2 transition-transform duration-300 hover:scale-105 shadow-xl text-xs uppercase tracking-widest"
                  >
                    <span>SUBMIT COMMISSION DOSSIER</span>
                    <ArrowRight size={14} />
                  </button>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <button 
                      type="button"
                      onClick={() => {
                        setMonographDownloaded(true);
                        setTimeout(() => setMonographDownloaded(false), 4500);
                      }}
                      className="inline-flex items-center space-x-2 text-white/50 hover:text-white transition-colors text-[11px]"
                    >
                      <Download size={13} />
                      <span>DOWNLOAD MONOGRAPH OVERVIEW (PDF)</span>
                    </button>
                    {monographDownloaded && (
                      <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono text-[#cbb592] bg-[#cbb592]/10 border border-[#cbb592]/30 px-3 py-1 rounded-full animate-fade-in">
                        <Check size={12} />
                        <span>Monograph PDF (48pp) Transferred</span>
                      </span>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Monolithic Master Architectural Footer */}
          <footer className="pt-16 border-t border-white/10 space-y-12 text-xs font-mono text-white/60">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              <div className="space-y-3">
                <div className="text-white font-semibold tracking-widest uppercase text-[11px]">
                  KAMPALA ATELIER
                </div>
                <p className="text-white/40 leading-relaxed text-[11px]">
                  Plot 14 Nakasero Hill Road <br />
                  Central Kampala, Uganda <br />
                  Coordinates: 0.3162° N, 32.5822° E
                </p>
                <div className="text-[#cbb592] text-[10px] font-semibold">
                  +256 700 882 910
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-white font-semibold tracking-widest uppercase text-[11px]">
                  LONDON PRACTICE
                </div>
                <p className="text-white/40 leading-relaxed text-[11px]">
                  24 Berkeley Square, Mayfair <br />
                  London W1J 6HE, United Kingdom <br />
                  Coordinates: 51.5098° N, 0.1465° W
                </p>
                <div className="text-[#cbb592] text-[10px] font-semibold">
                  +44 20 7946 0912
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-white font-semibold tracking-widest uppercase text-[11px]">
                  DUBAI SUITE
                </div>
                <p className="text-white/40 leading-relaxed text-[11px]">
                  Gate Precinct 4, Level 5, DIFC <br />
                  Dubai, United Arab Emirates <br />
                  Coordinates: 25.2048° N, 55.2708° E
                </p>
                <div className="text-[#cbb592] text-[10px] font-semibold">
                  +971 4 362 7000
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-white font-semibold tracking-widest uppercase text-[11px]">
                  COMMISSION DIRECTORY
                </div>
                <ul className="space-y-1.5 text-white/50 text-[11px]">
                  <li>
                    <button 
                      onClick={() => navigate('/design-studio')}
                      className="hover:text-white transition-colors"
                    >
                      Bespoke Design Studio →
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => navigate('/shop')}
                      className="hover:text-white transition-colors"
                    >
                      Architectural Hardware →
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => navigate('/my-home')}
                      className="hover:text-white transition-colors"
                    >
                      Client Monograph Portal →
                    </button>
                  </li>
                </ul>
              </div>

            </div>

            <div className="pt-8 border-t border-white/5 flex flex-wrap justify-between items-center text-[10px] text-white/30 gap-4">
              <div>
                © 2026 IPA INTERIORS & ARCHITECTURAL ATELIER. ALL RIGHTS RESERVED.
              </div>
              <div className="flex space-x-6">
                <span>PBR WEBLAB ENGINE</span>
                <span>ZERO COMPUTE ZERO TOKENS</span>
                <span>CONFIDENTIALITY AGREEMENT</span>
              </div>
            </div>
          </footer>

        </section>

      </main>

      {/* =========================================================================
          MONOGRAPH MODAL DETAIL DRAWER
          ========================================================================= */}
      {activeMonographId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#101216] border border-white/15 rounded-2xl max-w-2xl w-full p-8 font-mono text-xs space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveMonographId(null)}
              className="absolute top-6 right-6 text-white/40 hover:text-white text-base"
            >
              ✕
            </button>

            <div className="space-y-2">
              <span className="text-[10px] text-[#cbb592] uppercase tracking-widest">
                VERIFIED ESTATE MONOGRAPH
              </span>
              <h3 className="text-2xl font-light text-white font-sans">
                {activeMonographId === 'nakasero' && 'Nakasero Hill Residence (Kampala)'}
                {activeMonographId === 'belgravia' && 'Belgravia Monograph (London Mayfair)'}
                {activeMonographId === 'solarium' && 'Villa Solarium Sanctuary (Dubai)'}
              </h3>
            </div>

            <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10">
              <img
                src={
                  activeMonographId === 'nakasero'
                    ? '/images/villa_nakasero_residence_1791180703557.jpg'
                    : activeMonographId === 'belgravia'
                    ? '/images/townhouse_belgravia_monograph_1791180714159.jpg'
                    : '/images/hero_estate_interior_1791180692586.jpg'
                }
                alt="Estate detail"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 text-white/70 leading-relaxed text-[11px]">
              <p>
                <strong>Architectural Narrative:</strong> Engineered as a generational family sanctuary. The project coordinated over 200 tonnes of Roman silver travertine imported directly from Tivoli, bookmatched by hand on site, and framed by custom concealed mahogany pivot assemblies.
              </p>
              <p>
                <strong>Acoustic & Environmental Modeling:</strong> Equatorially oriented to harness prevailing Lake Victoria breezes through aerodynamic cedar louvers, reducing artificial air conditioning load by 68%.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[10px]">
              <span className="text-[#cbb592]">STATUS: HABITATED & RESTRICTED ACCESS</span>
              <button
                onClick={() => setActiveMonographId(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-white transition-colors"
              >
                CLOSE DOSSIER
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
