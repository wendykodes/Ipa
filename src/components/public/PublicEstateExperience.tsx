import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useIpaData } from '../../context/IpaDataContext';
import { formatMoney } from '../../types/ipaBrand';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Bookmark, 
  Check, 
  Compass, 
  SlidersHorizontal,
  Layers,
  MapPin,
  ChevronRight
} from 'lucide-react';

interface PublicEstateExperienceProps {
  onNavigateToDesignSpace: () => void;
  onNavigateToShop: () => void;
  onNavigateToMyHome: () => void;
}

export const PublicEstateExperience: React.FC<PublicEstateExperienceProps> = ({
  onNavigateToDesignSpace,
  onNavigateToShop,
  onNavigateToMyHome
}) => {
  const { projects, products, currency, savedProductIds, toggleSaveProduct, savedSpaceIds, toggleSaveSpace } = useIpaData();
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [activeStoryIdx, setActiveStoryIdx] = useState<number>(0);
  const navigate = useNavigate();

  const heroImage = '/images/hero_estate_interior_1791180692586.jpg';
  const nakaseroImage = '/images/villa_nakasero_residence_1791180703557.jpg';
  const belgraviaImage = '/images/townhouse_belgravia_monograph_1791180714159.jpg';

  const selectedProjects = [
    {
      id: projects[0]?.id || 'proj-kla-01',
      title: 'The Nakasero Hill Residence',
      location: 'Nakasero Ridge, Kampala',
      typology: 'Hilltop Modernist Villa',
      areaSqm: 680,
      year: '2026',
      heroImage: nakaseroImage,
      summary: 'A 680-square-meter private residence conceived around Kampala’s equatorial light. Features polished pale terrazzo, solid mahogany louvers, and bespoke linen drapery opening onto a cantilevered terrace.',
      materials: 'Polished Terrazzo · Solid African Mahogany · Italian Calacatta Marble · Architectural Bronze',
      slug: `/projects/${projects[0]?.id || 'proj-kla-01'}`
    },
    {
      id: projects[1]?.id || 'knightsbridge-duplex',
      title: 'The Belgravia Monograph',
      location: 'Belgravia, London SW1',
      typology: 'Grade II Listed Townhouse',
      areaSqm: 420,
      year: '2025',
      heroImage: belgraviaImage,
      summary: 'Restored Georgian proportions balanced with minimalist spatial joinery. Features smoked European herringbone oak, monolithic Paonazzo marble hearth, and custom bronze pocket screens.',
      materials: 'Smoked European Oak · Paonazzo Marble · Hand-Patinated Bronze · Bouclé Wool',
      slug: `/projects/${projects[1]?.id || 'knightsbridge-duplex'}`
    },
    {
      id: 'emirates-hills-villa',
      title: 'Villa Solarium',
      location: 'Emirates Hills, Dubai',
      typology: 'Modernist Sanctuary',
      areaSqm: 820,
      year: '2025',
      heroImage: '/images/dubai_penthouse_solarium_1791182756273.jpg',
      summary: 'An 820-square-meter architectural oasis balancing Roman silver travertine with panoramic structural glass and shaded reflection pools overlooking the Dubai skyline.',
      materials: 'Roman Silver Travertine · Bleached European Ash · Brushed Champagne Bronze · Sheer Linens',
      slug: '/projects/emirates-hills-villa'
    }
  ];

  const designStandards = [
    {
      number: '01',
      title: 'Spatial Architecture & 3D Reality',
      description: 'Millimeter-accurate 3D walkthroughs, solar orientation mapping, and spatial flow optimization before a single wall is touched.'
    },
    {
      number: '02',
      title: 'Atelier Millwork & Stone Selection',
      description: 'Direct quarry selection in Carrara and Verona paired with bespoke joinery hand-crafted in our Kampala and European workshops.'
    },
    {
      number: '03',
      title: 'Turnkey Execution & White Glove Handover',
      description: 'Single-source accountability from demolition and structural works through MEP installation to final scenting and linen dressing.'
    }
  ];

  const monographs = [
    {
      quote: "IPA Interiors turned an unfinished concrete shell into the most peaceful residence in Kampala. Every joint in the mahogany louvers fits like watchmaking.",
      author: "Dr. Patrick & Brenda Mugisha",
      estate: "The Nakasero Hill Residence, Kampala",
      year: "2026"
    },
    {
      quote: "Their team managed our London renovation while we were stationed overseas. The level of transparency, trade coordination, and finish quality is unmatched.",
      author: "Sir Julian & Lady Vance",
      estate: "Belgravia Townhouse, London SW1",
      year: "2025"
    }
  ];

  return (
    <div className="bg-[#FAF9F6] text-stone-900 selection:bg-[#FDF6F8] selection:text-[#801D31]">
      {/* 1. CINEMATIC EDITORIAL HERO */}
      <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden border-b border-[#EDE8E1]">
        {/* Full-Viewport Architectural Visual Background */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="IPA Interiors Private Residence"
            className="w-full h-full object-cover scale-[1.01] filter contrast-[1.04]"
          />
          {/* Measured Architectural Scrim Overlay for WCAG AA 4.5:1 Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/45 to-stone-950/40" />
        </div>

        {/* Top Region Line */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pt-12 flex items-center justify-between text-stone-300 text-xs font-mono tracking-[0.24em] uppercase">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#801D31]" />
            <span>International Architecture & Interiors</span>
          </div>
          <span className="hidden sm:inline">Estates · Townhouses · Penthouse Ateliers</span>
        </div>

        {/* Centered Hero Statement */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 py-24 text-center space-y-8 my-auto">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.26em] uppercase text-stone-300 font-mono">
            <span>London · Kampala · Dubai</span>
          </div>

          <h1 className="font-serif-luxury text-5xl sm:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.04] text-balance">
            Architecture of quiet grandeur.
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-200 font-light leading-relaxed">
            Private residences, bespoke joinery, and complete turnkey fit-outs delivered with single-source accountability across the UK, East Africa, and the Emirates.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onNavigateToDesignSpace}
              className="px-8 py-4 bg-[#801D31] hover:bg-[#6B1727] text-white text-xs uppercase tracking-[0.22em] font-medium rounded-[2px] transition-all cursor-pointer flex items-center gap-3 shadow-lg shadow-black/20"
            >
              <span>Commission a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/projects')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 text-xs uppercase tracking-[0.22em] font-medium rounded-[2px] transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Explore Selected Works</span>
            </button>
          </div>
        </div>

        {/* Bottom Coordinates Strip */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pb-8 flex items-center justify-between text-stone-300 text-xs border-t border-white/15 pt-4">
          <div className="flex items-center gap-6 font-mono text-[11px] tracking-widest uppercase">
            <span>0.3476° N (Kampala)</span>
            <span className="text-white/30">·</span>
            <span>51.5074° N (London)</span>
            <span className="text-white/30">·</span>
            <span>25.2048° N (Dubai)</span>
          </div>

          <div className="font-mono text-[11px] tracking-wider text-stone-300">
            Selected Currency: <strong className="text-white font-semibold">{currency}</strong>
          </div>
        </div>
      </section>

      {/* 2. THE MONOGRAPH PORTFOLIO (SELECTED PROJECTS) */}
      <section className="py-28 lg:py-36 max-w-7xl mx-auto px-6 lg:px-12 space-y-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EDE8E1] pb-8">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#801D31] font-semibold block">
              Monograph Portfolio
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl font-light text-stone-900 tracking-tight">
              Selected Private Residences
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            Every project is conceived from the raw concrete structure to bespoke furniture commissioning, balancing local sunlight with imported European materials.
          </p>
        </div>

        {/* Curated Editorial Monograph List */}
        <div className="space-y-28">
          {selectedProjects.map((proj, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={proj.id} className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                <div className={`lg:col-span-7 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                  <div className="relative aspect-[16/11] overflow-hidden bg-stone-100 border border-[#EDE8E1] group rounded-[2px] shadow-sm">
                    <img
                      src={proj.heroImage}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:pl-6 order-2' : 'lg:pr-6 order-2 lg:order-1'}`}>
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-stone-500 flex items-center gap-2">
                      <span className="text-[#801D31] font-semibold">{proj.location}</span>
                      <span aria-hidden="true">·</span>
                      <span>{proj.year}</span>
                    </div>
                    <h3 className="font-serif-luxury text-3xl sm:text-4xl font-light text-stone-900 leading-snug">
                      {proj.title}
                    </h3>
                  </div>

                  <p className="text-sm text-stone-600 leading-relaxed font-light">
                    {proj.summary}
                  </p>

                  <div className="pt-2 border-t border-[#EDE8E1] text-xs font-mono space-y-2 text-stone-500">
                    <div className="flex justify-between">
                      <span>Typology</span>
                      <span className="text-stone-900 font-medium">{proj.typology}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Internal Floor Area</span>
                      <span className="text-stone-900 font-medium tabular-nums">{proj.areaSqm} m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Material Palette</span>
                      <span className="text-stone-700 font-medium text-right max-w-xs">{proj.materials}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <Link
                      to={proj.slug}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 hover:text-[#801D31] transition-colors"
                    >
                      <span>View Full Monograph</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE TRANSFORMATION (BEFORE & AFTER SLIDER) */}
      <section className="py-24 bg-white border-y border-[#EDE8E1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EDE8E1] pb-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#801D31] font-semibold block">
                Turnkey Metamorphosis
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-stone-900 mt-1">
                From Raw Concrete to Finished Estate
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md font-light leading-relaxed">
              Drag the hairline divider to inspect the architectural transformation from initial site condition to white-glove handover.
            </p>
          </div>

          {/* Interactive Split View Slider */}
          <div className="relative aspect-[16/9] max-h-[600px] w-full overflow-hidden select-none border border-[#EDE8E1] bg-stone-100 shadow-sm">
            {/* After Image (Completed) */}
            <img
              src={nakaseroImage}
              alt="Completed Nakasero Residence"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Left Layer: Before Image (Raw Site) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1600&q=80"
                alt="Raw Site Shell"
                className="absolute inset-y-0 left-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%', minWidth: '100%' }}
              />
              <div className="absolute inset-0 bg-stone-950/20" />
              <div className="absolute top-6 left-6 text-xs font-mono uppercase tracking-[0.2em] text-white bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/20">
                Site State (Jan 2026)
              </div>
            </div>

            <div className="absolute top-6 right-6 text-xs font-mono uppercase tracking-[0.2em] text-stone-900 bg-white/95 backdrop-blur-md px-3.5 py-1.5 border border-[#EDE8E1] shadow-xs">
              Handover State (June 2026)
            </div>

            {/* Hairline Split bar */}
            <div
              className="absolute inset-y-0 w-0.5 bg-[#801D31] cursor-ew-resize z-20 shadow-[0_0_12px_rgba(128,29,49,0.5)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border border-[#801D31] shadow-md flex items-center justify-center text-[#801D31]">
                <Compass className="w-4 h-4 stroke-[1.8]" />
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              aria-label="Before and after transformation slider"
              className="absolute inset-0 opacity-0 cursor-ew-resize z-30 w-full h-full"
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-stone-500 pt-2">
            <span>Project: The Nakasero Hill Residence, Plot 28 Upper Kololo</span>
            <span className="text-stone-900 font-medium">Turnkey Fit-out Contract: {formatMoney(1850000000, currency)}</span>
          </div>
        </div>
      </section>

      {/* 4. THE PRECISION ARCHITECTURAL HARDWARE (DEADPAN ZERO-COMPUTE SHOWCASE) */}
      <section className="py-24 lg:py-32 bg-[#09090B] text-neutral-100 border-y border-neutral-800 tech-grid-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-[11px] font-mono-tech uppercase tracking-[0.22em] text-cork-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>IPA Precision Systems // Physical Architecture</span>
                <span className="text-neutral-600">/</span>
                <span className="text-neutral-400">Zero Compute</span>
              </div>
              <h2 className="font-display-tech text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
                Architectural Hardware Substrates
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-xl font-light leading-relaxed">
                Zero microcontrollers, zero tokens, zero cloud latency. Natural Italian Arabescato stone, bouclé, and smoked eucalyptus engineered as physical computing apparatuses.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/shop"
                className="px-5 py-3 bg-cork-500 hover:bg-[#B57C56] text-black font-mono-tech text-xs uppercase tracking-[0.18em] font-bold rounded-[2px] transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Launch Hardware Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 4-Column Precision Product Matrix */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.slice(0, 4).map((prod) => {
              const isSaved = savedProductIds.includes(prod.id);
              return (
                <div
                  key={prod.id}
                  className="group flex flex-col justify-between space-y-4 bg-[#121216] border border-neutral-800 hover:border-neutral-700 transition-all rounded-[2px] p-4"
                >
                  <div className="relative aspect-[4/5] bg-neutral-900 border border-neutral-800/80 overflow-hidden rounded-[1px]">
                    <img
                      src={prod.heroImage}
                      alt={prod.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <button
                      onClick={() => toggleSaveProduct(prod.id)}
                      className={`absolute top-2.5 right-2.5 p-2 backdrop-blur-md transition-colors cursor-pointer border ${
                        isSaved
                          ? 'bg-cork-500 text-black border-cork-500'
                          : 'bg-black/80 text-neutral-300 border-neutral-700 hover:text-white'
                      }`}
                      title={isSaved ? "Saved to your space" : "Save to my space"}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute top-2.5 left-2.5 text-[9px] font-mono-tech uppercase tracking-widest text-emerald-400 bg-black/85 backdrop-blur-md px-2 py-0.5 border border-neutral-700/80">
                      0 TOKENS
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 text-[9px] font-mono-tech uppercase tracking-widest text-neutral-300 bg-black/85 backdrop-blur-md px-2 py-0.5 border border-neutral-700/80">
                      {prod.sku}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[10px] font-mono-tech uppercase tracking-wider text-cork-400">
                      {prod.category} · {prod.provenance.split(',')[0]}
                    </div>
                    <h3 className="font-display-tech text-lg font-bold uppercase text-white group-hover:text-cork-400 transition-colors leading-snug">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-light">
                      {prod.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 flex items-center justify-between border-t border-neutral-800 text-xs font-mono-tech">
                    <div>
                      <span className="text-[9px] text-neutral-500 block uppercase">Hardware Cost</span>
                      <span className="font-mono-tech text-sm font-bold text-white tabular-nums">
                        {formatMoney(prod.basePriceUgx, currency)}
                      </span>
                    </div>
                    <Link
                      to={`/products/${prod.id}`}
                      className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[10px] uppercase font-mono-tech tracking-wider rounded-[2px] transition-colors"
                    >
                      Specs →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. THE THREE-ACT TURNKEY STANDARD */}
      <section className="py-24 bg-stone-900 text-white border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          <div className="max-w-2xl space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#DFBA67] font-semibold block">
              The Architecture of Living
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl font-light tracking-tight text-white">
              The Turnkey Standard
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
              We eliminate the friction between architectural concept, global supply chains, and local trade execution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 border-t border-stone-800 pt-12">
            {designStandards.map((std) => (
              <div key={std.number} className="space-y-4">
                <span className="font-serif-luxury text-4xl text-[#DFBA67] font-light block">
                  {std.number}
                </span>
                <h3 className="font-serif-luxury text-2xl font-light text-white">
                  {std.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
                  {std.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CLIENT MONOGRAPH TESTIMONIALS */}
      <section className="py-28 max-w-5xl mx-auto px-6 lg:px-12 text-center space-y-10">
        <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#801D31] font-semibold block">
          Client Monograph
        </span>

        <blockquote className="font-serif-luxury text-2xl sm:text-4xl font-light text-stone-900 leading-relaxed text-balance">
          "{monographs[activeStoryIdx].quote}"
        </blockquote>

        <div className="space-y-1">
          <div className="text-sm font-medium text-stone-900">
            {monographs[activeStoryIdx].author}
          </div>
          <div className="text-xs font-mono text-stone-500 uppercase tracking-wider">
            {monographs[activeStoryIdx].estate} · {monographs[activeStoryIdx].year}
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-4">
          {monographs.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStoryIdx(i)}
              className={`w-8 h-1 transition-all cursor-pointer ${
                activeStoryIdx === i ? 'bg-[#801D31]' : 'bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`View client testimonial ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 7. COMMISSION CALL TO ACTION */}
      <section className="py-24 sm:py-32 bg-white border-t border-[#EDE8E1]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#801D31] font-semibold block">
            Private Commissions
          </span>

          <h2 className="font-serif-luxury text-4xl sm:text-6xl text-stone-900 font-light leading-tight text-balance">
            Begin the realization of your estate.
          </h2>

          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-light">
            Whether embarking on an ultra-prime residential build or appointing an interior architecture partner for international properties, our directors are available for confidential consultations.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onNavigateToDesignSpace}
              className="px-8 py-4 bg-[#801D31] hover:bg-[#6B1727] text-white text-xs uppercase tracking-[0.22em] font-medium rounded-[2px] transition-all cursor-pointer flex items-center gap-3 shadow-md"
            >
              <span>Design Briefing Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 border border-stone-800 hover:bg-stone-900 hover:text-white text-stone-900 text-xs uppercase tracking-[0.22em] font-medium rounded-[2px] transition-all cursor-pointer"
            >
              Direct Studio Inquiry
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
