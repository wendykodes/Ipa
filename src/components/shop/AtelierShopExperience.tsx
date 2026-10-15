import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIpaData } from '../../context/IpaDataContext';
import { formatMoney } from '../../types/ipaBrand';
import { 
  Bookmark, 
  ArrowRight, 
  Check, 
  SlidersHorizontal,
  Cpu,
  Layers,
  Zap,
  RotateCw,
  Activity,
  Terminal,
  Grid,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { HardwareTunerDials } from './HardwareTunerDials';
import { PrecisionSpecMatrix } from './PrecisionSpecMatrix';
import { OryzoInteractiveStage } from './three/OryzoInteractiveStage';
import { Box } from 'lucide-react';

export const AtelierShopExperience: React.FC = () => {
  const { products, currency, savedProductIds, toggleSaveProduct } = useIpaData();
  const [activeTab, setActiveTab] = useState<'3d-stage' | 'catalog' | 'matrix' | 'tuner'>('3d-stage');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quoteRequestedId, setQuoteRequestedId] = useState<string | null>(null);
  const [selectedSkuForTuner, setSelectedSkuForTuner] = useState<string>('IPA-01');

  const categories = [
    { label: 'All Apparatuses', value: 'All' },
    { label: 'Seating Platforms', value: 'Furniture' },
    { label: 'Monolithic Stone', value: 'Surfaces & Stone' },
    { label: 'Photonic Emitters', value: 'Lighting' },
    { label: 'Architectural Joinery', value: 'Joinery' }
  ];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleRequestQuote = (id: string) => {
    setQuoteRequestedId(id);
    setTimeout(() => setQuoteRequestedId(null), 3500);
  };

  const handleTunerSelect = (sku: string) => {
    setSelectedSkuForTuner(sku);
    setActiveTab('tuner');
  };

  // Hardware Parody Specs mapping for products
  const getProductHardwareSpecs = (sku: string) => {
    switch(sku) {
      case 'IPA-SOF-BEL-01':
        return {
          compute: '0.00 FLOPS · Zero Silicon',
          latency: '0.000 ms (Instant Haptic)',
          thermal: '0.0 W (Passive Convection)',
          tokenRate: '0.00 Tokens/hr',
          acoustic: 'NRC 0.88 Damping',
          mass: '185 kg Hardwood/Brass'
        };
      case 'IPA-TBL-ARA-02':
        return {
          compute: '0.00 FLOPS · Pure Physics',
          latency: '0.000 ms (Photonic Line-of-Sight)',
          thermal: '0.0 W (Geological Heat Sink)',
          tokenRate: '0.00 Tokens/hr',
          acoustic: 'NRC 0.12 Specular',
          mass: '480 kg Arabescato Marble'
        };
      case 'IPA-LGT-CAS-03':
        return {
          compute: 'Analog Photonic Array',
          latency: 'Photonic Speed of Light',
          thermal: '24.0 W (Warm Dim LED)',
          tokenRate: '0.00 Tokens/hr',
          acoustic: 'NRC 0.25 Ambient',
          mass: '42 kg Murano Glass'
        };
      case 'IPA-CAB-WAL-04':
      default:
        return {
          compute: 'Blum Mechanical Movento',
          latency: '0.000 ms (Magnetic Touch)',
          thermal: '0.0 W (Passive Venting)',
          tokenRate: '0.00 Tokens/hr',
          acoustic: 'NRC 0.72 Absorptive',
          mass: '165 kg Quilted Veneer'
        };
    }
  };

  if (activeTab === '3d-stage') {
    return (
      <div className="relative min-h-screen bg-[#08080A]">
        {/* Quick Tab Switcher Ribbon fixed at top center */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 bg-neutral-900/95 border border-neutral-700 p-1 flex items-center gap-1 shadow-2xl">
          <button
            onClick={() => setActiveTab('3d-stage')}
            className="px-3 py-1.5 text-[11px] font-mono-tech uppercase tracking-wider bg-white text-black font-bold flex items-center gap-1.5"
          >
            <Box className="w-3.5 h-3.5 text-emerald-600" />
            <span>3D Stage (Oryzo)</span>
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className="px-3 py-1.5 text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Catalog</span>
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className="px-3 py-1.5 text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Specs</span>
          </button>
          <button
            onClick={() => setActiveTab('tuner')}
            className="px-3 py-1.5 text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Tuner</span>
          </button>
        </div>

        <OryzoInteractiveStage
          onExploreCatalog={() => setActiveTab('catalog')}
          onOpenSpecs={() => setActiveTab('matrix')}
          onOpenTuner={() => setActiveTab('tuner')}
        />
      </div>
    );
  }

  return (
    <div className="bg-[#09090B] text-neutral-100 min-h-screen py-12 md:py-16 tech-grid-dark selection:bg-cork-500 selection:text-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        
        {/* TOP STATUS TICKER (Satirical Deadpan AI Hardware Parody) */}
        <div className="border border-neutral-800 bg-[#121216]/90 p-3 sm:px-6 rounded-[2px] flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-bold tracking-wider">HARDWARE SUBSYSTEM STATUS:</span>
            <span className="text-cork-400">100% OPERATIONAL (NO CLUSTER OUTAGES)</span>
          </div>
          <div className="flex items-center gap-6 text-[11px] text-neutral-400">
            <span>INFERENCE COST: <strong className="text-emerald-400 font-bold">$0.000</strong></span>
            <span className="hidden sm:inline">THERMAL THROTTLING: <strong className="text-white">NONE (AIR-COOLED)</strong></span>
            <span>TOKEN DRAIN: <strong className="text-cork-400">ZERO</strong></span>
          </div>
        </div>

        {/* EDITORIAL HERO SECTION */}
        <div className="border-b border-neutral-800 pb-12 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[11px] uppercase tracking-[0.25em] text-cork-400 font-mono-tech font-bold block">
                  IPA PRECISION SYSTEMS // PHYSICAL ARCHITECTURE
                </span>
                <span className="text-neutral-700">/</span>
                <span className="text-[10px] font-mono-tech text-neutral-400 tracking-wider">
                  RELEASE v2026.4
                </span>
              </div>
              <h1 className="font-display-tech text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white leading-none">
                Precision Architectural Hardware
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl font-light leading-relaxed">
                Physical computing apparatuses engineered without microcontrollers, neural tokens, or cloud downtime. Solid Italian Arabescato stone, Como bouclé, and patinated bronze crafted with aerospace-grade precision.
              </p>
            </div>

            {/* TAB SELECTOR: 3D STAGE / CATALOG / SPEC MATRIX / PARAMETER TUNER */}
            <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-[2px] self-start lg:self-auto overflow-x-auto">
              <button
                onClick={() => setActiveTab('3d-stage')}
                className={`px-4 py-2.5 text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer rounded-[1px] whitespace-nowrap flex items-center gap-2 ${
                  (activeTab as string) === '3d-stage'
                    ? 'bg-cork-500 text-black font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Box className="w-3.5 h-3.5 text-emerald-400" />
                <span>3D Stage (Oryzo Engine)</span>
              </button>

              <button
                onClick={() => setActiveTab('catalog')}
                className={`px-4 py-2.5 text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer rounded-[1px] whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'catalog'
                    ? 'bg-cork-500 text-black font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Hardware Catalog</span>
              </button>

              <button
                onClick={() => setActiveTab('matrix')}
                className={`px-4 py-2.5 text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer rounded-[1px] whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'matrix'
                    ? 'bg-cork-500 text-black font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Spec Matrix</span>
              </button>

              <button
                onClick={() => setActiveTab('tuner')}
                className={`px-4 py-2.5 text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer rounded-[1px] whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'tuner'
                    ? 'bg-cork-500 text-black font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Parameter Tuner</span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills (When on Catalog View) */}
          {activeTab === 'catalog' && (
            <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1">
              <span className="text-[10px] font-mono-tech text-neutral-500 uppercase tracking-widest mr-2">FILTER:</span>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3 py-1.5 text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer rounded-[2px] border whitespace-nowrap ${
                    selectedCategory === cat.value
                      ? 'bg-neutral-100 text-black border-neutral-100 font-bold'
                      : 'bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* TAB 1: HARDWARE CATALOG VIEW */}
        {activeTab === 'catalog' && (
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
              {filteredProducts.map((prod) => {
                const isSaved = savedProductIds.includes(prod.id);
                const hasQuote = quoteRequestedId === prod.id;
                const specs = getProductHardwareSpecs(prod.sku);

                return (
                  <div
                    key={prod.id}
                    className="group flex flex-col justify-between bg-[#121216] border border-neutral-800 hover:border-neutral-700 transition-all rounded-[2px] overflow-hidden"
                  >
                    {/* Media Frame */}
                    <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden border-b border-neutral-800">
                      <img
                        src={prod.heroImage}
                        alt={prod.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Technical Parody Overlays */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-black/85 backdrop-blur-md border border-neutral-700/80 text-[10px] font-mono-tech uppercase tracking-widest text-emerald-400">
                          ZERO COMPUTE
                        </span>
                        <span className="px-2 py-1 bg-black/85 backdrop-blur-md border border-neutral-700/80 text-[10px] font-mono-tech uppercase tracking-widest text-cork-400">
                          {prod.sku}
                        </span>
                      </div>

                      <button
                        onClick={() => toggleSaveProduct(prod.id)}
                        className={`absolute top-3 right-3 p-2.5 backdrop-blur-md transition-colors cursor-pointer border ${
                          isSaved
                            ? 'bg-cork-500 text-black border-cork-500 font-bold'
                            : 'bg-black/80 text-neutral-300 hover:text-white border-neutral-700'
                        }`}
                        title={isSaved ? "Saved to active project" : "Bookmark hardware spec"}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>

                      {/* Bottom Live Telemetry Overlay Bar */}
                      <div className="absolute bottom-0 inset-x-0 bg-black/90 backdrop-blur-md border-t border-neutral-800/80 px-4 py-2 flex items-center justify-between text-[10px] font-mono-tech text-neutral-300">
                        <span>LATENCY: {specs.latency}</span>
                        <span>TDP: {specs.thermal}</span>
                      </div>
                    </div>

                    {/* Content & Specs Block */}
                    <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[11px] font-mono-tech uppercase tracking-wider text-cork-400">
                          <span>{prod.category}</span>
                          <span className="text-neutral-600">·</span>
                          <span>{prod.provenance.split(',')[0]}</span>
                          <span className="text-neutral-600">·</span>
                          <span>Lead {prod.leadTimeWeeks}w</span>
                        </div>

                        <Link
                          to={`/products/${prod.id}`}
                          className="block font-display-tech text-2xl sm:text-3xl font-bold uppercase text-white hover:text-cork-400 transition-colors leading-tight tracking-tight"
                        >
                          {prod.title}
                        </Link>

                        <p className="text-xs text-neutral-400 leading-relaxed font-light">
                          {prod.description}
                        </p>

                        {/* SPEC SHEET CALLOUT MATRIX FOR THIS ITEM */}
                        <div className="p-4 bg-neutral-900/90 border border-neutral-800/80 rounded-[2px] font-mono-tech text-xs space-y-2">
                          <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                            <span className="text-neutral-500">Compute Load:</span>
                            <span className="text-emerald-400 font-semibold">{specs.compute}</span>
                          </div>
                          <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                            <span className="text-neutral-500">Structural Ballast:</span>
                            <span className="text-neutral-300">{specs.mass}</span>
                          </div>
                          <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                            <span className="text-neutral-500">Acoustic Dissipation:</span>
                            <span className="text-neutral-300">{specs.acoustic}</span>
                          </div>
                          <div className="flex justify-between pt-0.5">
                            <span className="text-neutral-500">Form Factor:</span>
                            <span className="text-neutral-300">
                              {prod.dimensions.widthCm}W × {prod.dimensions.depthCm}D × {prod.dimensions.heightCm}H cm
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Pricing and Action Strip */}
                      <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] text-neutral-500 uppercase font-mono-tech block tracking-wider">
                            Unit Cost (Zero Recurring API)
                          </span>
                          <span className="font-mono-tech text-xl font-bold text-white tabular-nums">
                            {formatMoney(prod.basePriceUgx, currency)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleTunerSelect(prod.sku)}
                            className="px-3.5 py-2.5 border border-neutral-700 hover:border-cork-400 text-neutral-300 hover:text-white text-[11px] font-mono-tech uppercase tracking-wider rounded-[2px] transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
                            title="Tune physics parameters"
                          >
                            <SlidersHorizontal className="w-3.5 h-3.5 text-cork-400" />
                            <span>Tune</span>
                          </button>

                          <Link
                            to={`/products/${prod.id}`}
                            className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-[11px] font-mono-tech uppercase tracking-wider font-semibold rounded-[2px] transition-colors whitespace-nowrap"
                          >
                            Inspect
                          </Link>

                          <button
                            onClick={() => handleRequestQuote(prod.id)}
                            disabled={hasQuote}
                            className={`px-5 py-2.5 text-[11px] font-mono-tech uppercase tracking-wider font-bold rounded-[2px] transition-all cursor-pointer whitespace-nowrap ${
                              hasQuote
                                ? 'bg-emerald-600 text-white'
                                : 'bg-cork-500 hover:bg-[#B57C56] text-black'
                            }`}
                          >
                            {hasQuote ? (
                              <span className="flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5 text-white" />
                                Transmitted
                              </span>
                            ) : (
                              'Commission'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: SPEC-SHEET MATRIX VIEW */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <PrecisionSpecMatrix 
              onSelectProductForTuner={(sku) => handleTunerSelect(sku)} 
            />
          </div>
        )}

        {/* TAB 3: HARDWARE PARAMETER TUNER VIEW */}
        {activeTab === 'tuner' && (
          <div className="space-y-6">
            <HardwareTunerDials 
              activeModelSku={selectedSkuForTuner} 
            />
          </div>
        )}

      </div>
    </div>
  );
};
