import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useIpaData } from '../context/IpaDataContext';
import { formatMoney } from '../types/ipaBrand';
import { 
  ArrowLeft, 
  Bookmark, 
  Check, 
  Send, 
  Download, 
  Cpu, 
  Zap, 
  Activity, 
  Layers, 
  SlidersHorizontal,
  ShieldCheck,
  Compass
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, currency, savedProductIds, toggleSaveProduct } = useIpaData();
  const [inquirySent, setInquirySent] = useState<boolean>(false);
  const [customNotes, setCustomNotes] = useState<string>('');
  const [selectedSubstrate, setSelectedSubstrate] = useState<string>('Standard Spec');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const product = products.find(p => p.id === id) || products[0];
  const isSaved = savedProductIds.includes(product.id);

  // Gallery array
  const allImages = [product.heroImage, ...(product.galleryImages || [])];

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 4500);
  };

  const handleDownloadSchematics = () => {
    const schematicContent = `================================================================================
IPA PRECISION ARCHITECTURAL SYSTEMS // SCHEMATIC BLUEPRINT
HARDWARE MODEL: ${product.sku}
NAME: ${product.title.toUpperCase()}
================================================================================

1. PHYSICAL DIMENSIONS:
- Width: ${product.dimensions.widthCm} cm
- Depth: ${product.dimensions.depthCm} cm
- Height: ${product.dimensions.heightCm} cm
- Customizable Envelope: ${product.dimensions.customizable ? 'YES (Bespoke Tolerance ±1.5mm)' : 'FIXED MONOLITH'}

2. DEEP-TECH SUBSYSTEM TELEMETRY:
- Compute Architecture: Pure Physics · Zero Microcontrollers · 0.00 FLOPS
- Token Cost: $0.00 / hr (Indefinite Context Window)
- Thermal Design Power: 0.00 Watts (100% Atmospheric Convection)
- Latency: 0.000 ms (Instantaneous Photonic Observation)
- Substrate Materials: ${product.materials.join(', ')}
- Provenance: ${product.provenance}
- Production Lead Time: ${product.leadTimeWeeks} Weeks Handcrafted

3. QUALITY & COMPLIANCE:
- Standard: British Architectural & Structural Engineering Standard
- Calibration: Fully Inspected at IPA Central Labs (Kampala / Carrara / London)
================================================================================`;

    const blob = new Blob([schematicContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `IPA_Schematic_${product.sku}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#09090B] text-neutral-100 min-h-screen py-10 md:py-16 tech-grid-dark selection:bg-cork-500 selection:text-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-10">
        
        {/* Navigation & Telemetry Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-[0.2em] text-neutral-400 hover:text-cork-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Hardware Matrix</span>
          </Link>

          <div className="flex items-center gap-4 text-xs font-mono-tech text-neutral-500">
            <span>MODEL: <strong className="text-white">{product.sku}</strong></span>
            <span className="text-neutral-700">·</span>
            <span>STATUS: <strong className="text-emerald-400">READY FOR COMMISSION</strong></span>
            <span className="text-neutral-700">·</span>
            <span>TDP: <strong className="text-cork-400">0.00W</strong></span>
          </div>
        </div>

        {/* Hero Hardware Layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Visual Apparatus & Dimensional Blueprint */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Viewport */}
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-900 border border-neutral-800 rounded-[2px] group">
              <img
                src={allImages[activeImageIndex] || product.heroImage}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />

              {/* Technical HUD Overlays */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-2.5 py-1 bg-black/85 backdrop-blur-md border border-neutral-700/80 text-[10px] font-mono-tech uppercase tracking-widest text-emerald-400">
                  ZERO SILICON · 100% ORGANIC
                </span>
                <span className="px-2.5 py-1 bg-black/85 backdrop-blur-md border border-neutral-700/80 text-[10px] font-mono-tech uppercase tracking-widest text-cork-400">
                  REF // {product.id}
                </span>
              </div>

              {/* Schematic Dimension Callout Box on Image */}
              <div className="absolute bottom-4 right-4 bg-black/85 backdrop-blur-md border border-neutral-700/80 px-3.5 py-2 font-mono-tech text-[11px] text-neutral-200">
                <span>ENVELOPE: {product.dimensions.widthCm} × {product.dimensions.depthCm} × {product.dimensions.heightCm} cm</span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`relative w-24 aspect-[4/3] rounded-[2px] overflow-hidden border transition-all cursor-pointer ${
                      activeImageIndex === i
                        ? 'border-cork-500 ring-1 ring-cork-500'
                        : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Architectural Blueprint & Substrate Blueprint Card */}
            <div className="bg-[#121216] border border-neutral-800 p-6 rounded-[2px] space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-cork-400">
                  <Compass className="w-4 h-4 text-cork-500" />
                  <span>Physical Architecture Blueprint</span>
                </div>
                <button
                  onClick={handleDownloadSchematics}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cork-400" />
                  <span>Download Schematics</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono-tech">
                <div className="bg-neutral-900/80 p-3 border border-neutral-800/80 rounded-[2px]">
                  <span className="text-[10px] text-neutral-500 block uppercase">Substrate Class</span>
                  <span className="text-white font-semibold mt-1 block">Aerospace Organic</span>
                </div>
                <div className="bg-neutral-900/80 p-3 border border-neutral-800/80 rounded-[2px]">
                  <span className="text-[10px] text-neutral-500 block uppercase">Inference Speed</span>
                  <span className="text-emerald-400 font-semibold mt-1 block">0.000 ms</span>
                </div>
                <div className="bg-neutral-900/80 p-3 border border-neutral-800/80 rounded-[2px]">
                  <span className="text-[10px] text-neutral-500 block uppercase">Thermal Envelope</span>
                  <span className="text-white font-semibold mt-1 block">0.0W (Passive)</span>
                </div>
                <div className="bg-neutral-900/80 p-3 border border-neutral-800/80 rounded-[2px]">
                  <span className="text-[10px] text-neutral-500 block uppercase">Tolerance</span>
                  <span className="text-cork-400 font-semibold mt-1 block">±1.0 mm Artisanal</span>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Hand-quarried and custom-joined under architectural supervision. Structural load analysis confirms suitability for high-density suspended slab floors and lateral living penthouses.
              </p>
            </div>
          </div>

          {/* Right Column: Technical Specification & Bespoke Commission Module */}
          <div className="lg:col-span-5 bg-[#121216] border border-neutral-800 p-8 rounded-[2px] shadow-2xl space-y-8">
            {/* Header Block */}
            <div className="space-y-3 border-b border-neutral-800 pb-6">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="uppercase tracking-[0.2em] text-cork-400 font-bold">
                  {product.category}
                </span>
                <span className="text-neutral-500">FIRMWARE: v2026.4</span>
              </div>

              <h1 className="font-display-tech text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight leading-tight">
                {product.title}
              </h1>

              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                {product.subtitle}
              </p>

              <div className="pt-3">
                <span className="text-[10px] uppercase font-mono-tech text-neutral-500 block tracking-wider">
                  Hardware Commission (Zero Cloud Subscription)
                </span>
                <span className="font-mono-tech text-2xl font-bold text-white tabular-nums">
                  {formatMoney(product.basePriceUgx, currency)}
                </span>
              </div>
            </div>

            {/* Parody Spec-Sheet Table */}
            <div className="space-y-4">
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-neutral-400 block font-semibold">
                Telemetry & Material Specifications
              </span>

              <div className="p-4 bg-neutral-900/80 border border-neutral-800 space-y-2.5 font-mono-tech text-xs rounded-[2px]">
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">Provenance / Foundry:</span>
                  <span className="text-neutral-200 text-right">{product.provenance}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">Dimensions:</span>
                  <span className="text-neutral-200 text-right">
                    {product.dimensions.widthCm}W × {product.dimensions.depthCm}D × {product.dimensions.heightCm}H cm
                  </span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">Fabrication Lead Time:</span>
                  <span className="text-cork-400 text-right font-medium">{product.leadTimeWeeks} Weeks Bespoke Build</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">Token Consumption Rate:</span>
                  <span className="text-emerald-400 text-right font-bold">0.00 Tokens / hr (Offline Native)</span>
                </div>
                <div className="pt-1">
                  <span className="text-neutral-500 block mb-1">Substrate Elements:</span>
                  <span className="text-neutral-300 leading-relaxed">{product.materials.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Substrate Configuration Options */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400 block">
                Select Architectural Substrate Tier:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Standard Spec', 'High-Inertia Extra Mass', 'Satin Honed Finish', 'Acoustic Wool Spec'].map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setSelectedSubstrate(tier)}
                    className={`p-2.5 text-[11px] font-mono-tech uppercase text-left transition-all border rounded-[2px] cursor-pointer ${
                      selectedSubstrate === tier
                        ? 'bg-neutral-800 border-cork-500 text-white font-bold'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Form: Commission Request */}
            <form onSubmit={handleInquiry} className="space-y-4 pt-4 border-t border-neutral-800">
              <div className="space-y-1.5">
                <label className="text-xs font-mono-tech uppercase tracking-wider text-neutral-300 block">
                  Commission Specification & Residence Notes
                </label>
                <textarea
                  rows={3}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Specify custom marble veining, dimensional adjustments (±mm), delivery destination, or project residence..."
                  className="w-full p-3 text-xs font-mono-tech bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-cork-500 rounded-[2px]"
                />
              </div>

              {inquirySent ? (
                <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-mono-tech flex items-center gap-2 rounded-[2px]">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Hardware specification transmitted to Atelier Director. Telemetry logged.</span>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-cork-500 hover:bg-[#B57C56] text-black text-xs font-mono-tech uppercase tracking-[0.2em] font-bold rounded-[2px] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Commission Hardware Unit</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleSaveProduct(product.id)}
                    className={`p-3.5 border transition-colors cursor-pointer rounded-[2px] ${
                      isSaved
                        ? 'bg-cork-500 text-black border-cork-500'
                        : 'border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500 bg-neutral-900'
                    }`}
                    title={isSaved ? "Saved to your space" : "Save to my space"}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              )}
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};
