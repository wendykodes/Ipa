import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIpaData } from '../../context/IpaDataContext';
import { formatMoney } from '../../types/ipaBrand';
import { 
  Check, 
  Minus, 
  Download, 
  ExternalLink, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  SlidersHorizontal,
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';

interface SpecRow {
  category: string;
  metric: string;
  parodyNote?: string;
  ipa01: string;
  ipa02: string;
  ipa03: string;
  ipa04: string;
  highlight?: boolean;
}

export const PrecisionSpecMatrix: React.FC<{
  onSelectProductForTuner?: (sku: string) => void;
}> = ({ onSelectProductForTuner }) => {
  const { currency, products } = useIpaData();
  const [activeView, setActiveView] = useState<'matrix' | 'benchmarks'>('matrix');
  const [downloaded, setDownloaded] = useState<boolean>(false);
  const [selectedCol, setSelectedCol] = useState<string | null>(null);

  // Products mapping
  const p1 = products.find(p => p.sku === 'IPA-SOF-BEL-01') || products[0];
  const p2 = products.find(p => p.sku === 'IPA-TBL-ARA-02') || products[1];
  const p3 = products.find(p => p.sku === 'IPA-LGT-CAS-03') || products[2];
  const p4 = products.find(p => p.sku === 'IPA-CAB-WAL-04') || products[3];

  const specRows: SpecRow[] = [
    {
      category: "COMPUTE & FIRMWARE",
      metric: "Silicon Requirement",
      parodyNote: "Zero microcontrollers or semiconductor silicon",
      ipa01: "0.00% (Pure Physics)",
      ipa02: "0.00% (Pure Physics)",
      ipa03: "0.00% (Pure Physics)",
      ipa04: "0.00% (Pure Physics)",
      highlight: true
    },
    {
      category: "COMPUTE & FIRMWARE",
      metric: "Token Ingestion Rate",
      parodyNote: "Continuous lifetime operation without API billing",
      ipa01: "0.00 Tokens/sec",
      ipa02: "0.00 Tokens/sec",
      ipa03: "0.00 Tokens/sec",
      ipa04: "0.00 Tokens/sec",
      highlight: true
    },
    {
      category: "COMPUTE & FIRMWARE",
      metric: "Firmware Substrate",
      ipa01: "Como Bouclé v2026.4",
      ipa02: "Tuscan Marble v4.8",
      ipa03: "Murano Glass v1.2",
      ipa04: "Eucalyptus Quilted v3.0"
    },
    {
      category: "THERMODYNAMICS",
      metric: "Thermal Envelope (TDP)",
      parodyNote: "100% natural ambient equilibrium",
      ipa01: "0.00 W (Passive Air)",
      ipa02: "0.00 W (Geological Heat Sink)",
      ipa03: "24.0 W (Warm Dim LED)",
      ipa04: "0.00 W (Passive Shade)"
    },
    {
      category: "THERMODYNAMICS",
      metric: "Cooling Architecture",
      ipa01: "Atmospheric Convection",
      ipa02: "High-Density Thermal Mass",
      ipa03: "Fluted Radiant Air Flow",
      ipa04: "Concealed Venting Port"
    },
    {
      category: "HARDWARE TELEMETRY",
      metric: "Structural Mass",
      ipa01: "185 kg (Ballasted Hardwood)",
      ipa02: "480 kg (Solid Arabescato)",
      ipa03: "42 kg (Fluted Murano Bronze)",
      ipa04: "165 kg (Quilted Eucalyptus)"
    },
    {
      category: "HARDWARE TELEMETRY",
      metric: "Acoustic Attenuation",
      parodyNote: "Acoustic wave dampening rating",
      ipa01: "NRC 0.88 (Superior)",
      ipa02: "NRC 0.12 (Reflective)",
      ipa03: "NRC 0.25 (Diffusive)",
      ipa04: "NRC 0.72 (Absorptive Cavity)"
    },
    {
      category: "INTERFACE LATENCY",
      metric: "Haptic Response Time",
      parodyNote: "Physical contact perception speed",
      ipa01: "0.000 ms (Instantaneous)",
      ipa02: "0.000 ms (Instantaneous)",
      ipa03: "0.000 ms (Photonic Speed)",
      ipa04: "0.000 ms (Touch Latch)"
    },
    {
      category: "RELIABILITY",
      metric: "Calculated MTBF",
      parodyNote: "Mean time between hardware breakdown",
      ipa01: "50+ Years Structural",
      ipa02: "300+ Years Geological",
      ipa03: "40+ Years Component",
      ipa04: "75+ Years Blum Hardware"
    }
  ];

  const handleDownloadWhitepaper = () => {
    const whitepaperContent = `================================================================================
IPA PRECISION ARCHITECTURAL HARDWARE // WHITEPAPER SPECIFICATION
THE DEEP-TECH ZERO-COMPUTE PHYSICAL INFRASTRUCTURE PARODY MATRIX
================================================================================

1. EXECUTIVE SUMMARY
Physical furniture conceived and engineered with the rigor of aerospace hardware. 
Operating on zero tokens, zero API keys, zero cloud latency, and 100% passive thermodynamics.

2. SPECIFICATION MATRIX OVERVIEW:
- Model IPA-01: Lumumba Curved Bouclé Modular Platform
  * Substrate: Kiln-dried African Hardwood & Como Bouclé Wool
  * Mass: 185 kg | Floor Load: 0.65 kN/m² | Acoustic Damping: NRC 0.88
  * Latency: 0.00ms | TDP: 0.00W

- Model IPA-02: Monolithic Arabescato Fluted Dining Array
  * Substrate: Tuscan Arabescato Vagli Marble & Smoked Oak
  * Mass: 480 kg | Floor Load: 1.68 kN/m² | Thermal Mass: Geological Sink
  * Latency: 0.00ms | TDP: 0.00W

- Model IPA-03: Cascade Gyroscope Photonic Array
  * Substrate: Mouth-blown Murano Glass & Patinated Bronze
  * Mass: 42 kg | Luminous Flux: 3800 lm | 2400K Warm Dim
  * Latency: Photonic Speed of Light

- Model IPA-04: Speakeasy Quilted Eucalyptus Credenza
  * Substrate: Iranian Honey Onyx & Blum Movento Core
  * Mass: 165 kg | Haptic Touch Latch: Silent Magnetic
  * Latency: 0.00ms | TDP: 0.00W

Issued by IPA Interiors Engineering Labs (London · Kampala · Carrara).
All hardware manufactured under ISO-14001 and British Architectural Standards.
================================================================================`;

    const blob = new Blob([whitepaperContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `IPA_Precision_Hardware_Spec_Matrix.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="bg-[#09090B] text-neutral-100 border border-neutral-800 rounded-[2px] p-6 lg:p-12 relative overflow-hidden tech-grid-dark shadow-2xl">
      {/* Editorial Tech Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-neutral-800 pb-8 mb-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono-tech uppercase tracking-[0.25em] text-cork-400 font-bold block">
              SYSTEM ARCHITECTURE // SPEC MATRIX
            </span>
            <span className="text-neutral-700">|</span>
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-emerald-400">
              0% Silicon · 100% Physical
            </span>
          </div>

          <h2 className="font-display-tech text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
            Hardware Comparison Matrix
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-2xl leading-relaxed">
            Side-by-side engineering specifications for our physical computing apparatuses. Engineered without tokens, cloud dependencies, or thermal throttling.
          </p>
        </div>

        {/* View Switcher & Whitepaper Download */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-neutral-900 border border-neutral-800 p-1 rounded-[2px] flex items-center">
            <button
              onClick={() => setActiveView('matrix')}
              className={`px-3 py-1.5 text-xs font-mono-tech uppercase tracking-wider transition-colors cursor-pointer rounded-[1px] ${
                activeView === 'matrix'
                  ? 'bg-cork-500 text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Full Spec Sheet
            </button>
            <button
              onClick={() => setActiveView('benchmarks')}
              className={`px-3 py-1.5 text-xs font-mono-tech uppercase tracking-wider transition-colors cursor-pointer rounded-[1px] ${
                activeView === 'benchmarks'
                  ? 'bg-cork-500 text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Parody Benchmarks
            </button>
          </div>

          <button
            onClick={handleDownloadWhitepaper}
            className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-mono-tech text-xs uppercase tracking-wider rounded-[2px] transition-all cursor-pointer flex items-center gap-2"
          >
            {downloaded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Whitepaper Ready</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-cork-400" />
                <span>Export Whitepaper</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* MATRIX TABLE VIEW */}
      {activeView === 'matrix' ? (
        <div className="overflow-x-auto pb-4">
          <table className="w-full text-left border-collapse min-w-[840px]">
            {/* Header: Product Tier Columns */}
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="py-6 px-4 w-1/4 text-xs font-mono-tech uppercase tracking-[0.2em] text-neutral-400 bg-neutral-950/60">
                  Hardware Parameter
                </th>

                {/* Col 1 */}
                <th 
                  onClick={() => setSelectedCol('p1')}
                  className={`py-6 px-4 w-[18.75%] cursor-pointer transition-colors ${
                    selectedCol === 'p1' ? 'bg-neutral-800/60' : 'hover:bg-neutral-900/50'
                  }`}
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono-tech text-cork-400 uppercase tracking-widest block">
                      Tier 01 // Seating
                    </span>
                    <span className="font-display-tech text-base font-bold text-white block">
                      IPA-01 Bouclé
                    </span>
                    <span className="text-xs font-mono-tech text-neutral-400 block tabular-nums">
                      {formatMoney(p1.basePriceUgx, currency)}
                    </span>
                    <Link
                      to={`/products/${p1.id}`}
                      className="inline-flex items-center gap-1 text-[10px] font-mono-tech uppercase tracking-wider text-cork-400 hover:text-white pt-1"
                    >
                      <span>Inspect</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </th>

                {/* Col 2 */}
                <th 
                  onClick={() => setSelectedCol('p2')}
                  className={`py-6 px-4 w-[18.75%] cursor-pointer transition-colors ${
                    selectedCol === 'p2' ? 'bg-neutral-800/60' : 'hover:bg-neutral-900/50'
                  }`}
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono-tech text-cork-400 uppercase tracking-widest block">
                      Tier 02 // Monolith
                    </span>
                    <span className="font-display-tech text-base font-bold text-white block">
                      IPA-02 Marble
                    </span>
                    <span className="text-xs font-mono-tech text-neutral-400 block tabular-nums">
                      {formatMoney(p2.basePriceUgx, currency)}
                    </span>
                    <Link
                      to={`/products/${p2.id}`}
                      className="inline-flex items-center gap-1 text-[10px] font-mono-tech uppercase tracking-wider text-cork-400 hover:text-white pt-1"
                    >
                      <span>Inspect</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </th>

                {/* Col 3 */}
                <th 
                  onClick={() => setSelectedCol('p3')}
                  className={`py-6 px-4 w-[18.75%] cursor-pointer transition-colors ${
                    selectedCol === 'p3' ? 'bg-neutral-800/60' : 'hover:bg-neutral-900/50'
                  }`}
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono-tech text-cork-400 uppercase tracking-widest block">
                      Tier 03 // Photon
                    </span>
                    <span className="font-display-tech text-base font-bold text-white block">
                      IPA-03 Cascade
                    </span>
                    <span className="text-xs font-mono-tech text-neutral-400 block tabular-nums">
                      {formatMoney(p3.basePriceUgx, currency)}
                    </span>
                    <Link
                      to={`/products/${p3.id}`}
                      className="inline-flex items-center gap-1 text-[10px] font-mono-tech uppercase tracking-wider text-cork-400 hover:text-white pt-1"
                    >
                      <span>Inspect</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </th>

                {/* Col 4 */}
                <th 
                  onClick={() => setSelectedCol('p4')}
                  className={`py-6 px-4 w-[18.75%] cursor-pointer transition-colors ${
                    selectedCol === 'p4' ? 'bg-neutral-800/60' : 'hover:bg-neutral-900/50'
                  }`}
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono-tech text-cork-400 uppercase tracking-widest block">
                      Tier 04 // Storage
                    </span>
                    <span className="font-display-tech text-base font-bold text-white block">
                      IPA-04 Credenza
                    </span>
                    <span className="text-xs font-mono-tech text-neutral-400 block tabular-nums">
                      {formatMoney(p4.basePriceUgx, currency)}
                    </span>
                    <Link
                      to={`/products/${p4.id}`}
                      className="inline-flex items-center gap-1 text-[10px] font-mono-tech uppercase tracking-wider text-cork-400 hover:text-white pt-1"
                    >
                      <span>Inspect</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </th>
              </tr>
            </thead>

            {/* Spec Matrix Body */}
            <tbody className="divide-y divide-neutral-800/70 font-mono-tech text-xs">
              {specRows.map((row, idx) => (
                <tr 
                  key={idx} 
                  className={`transition-colors ${
                    row.highlight 
                      ? 'bg-neutral-900/60 border-l-2 border-cork-500' 
                      : 'hover:bg-neutral-900/30'
                  }`}
                >
                  <td className="py-4 px-4 bg-neutral-950/60">
                    <span className="text-[10px] text-neutral-500 block uppercase tracking-wider">
                      {row.category}
                    </span>
                    <span className="font-medium text-white block mt-0.5">
                      {row.metric}
                    </span>
                    {row.parodyNote && (
                      <span className="text-[10px] text-cork-400/80 block mt-0.5 italic">
                        {row.parodyNote}
                      </span>
                    )}
                  </td>

                  <td className={`py-4 px-4 ${row.highlight ? 'text-emerald-400 font-bold' : 'text-neutral-300'}`}>
                    {row.ipa01}
                  </td>
                  <td className={`py-4 px-4 ${row.highlight ? 'text-emerald-400 font-bold' : 'text-neutral-300'}`}>
                    {row.ipa02}
                  </td>
                  <td className={`py-4 px-4 ${row.highlight ? 'text-emerald-400 font-bold' : 'text-neutral-300'}`}>
                    {row.ipa03}
                  </td>
                  <td className={`py-4 px-4 ${row.highlight ? 'text-emerald-400 font-bold' : 'text-neutral-300'}`}>
                    {row.ipa04}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* PARODY BENCHMARKS VIEW */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
          <div className="bg-neutral-900/80 border border-neutral-800 p-6 rounded-[2px] space-y-4">
            <div className="flex items-center gap-2 text-cork-400 text-xs font-mono-tech uppercase">
              <Zap className="w-4 h-4" />
              <span>Electricity & Grid Drain</span>
            </div>
            <h4 className="font-display-tech text-xl font-bold text-white">
              100% Zero Kilowatt Dependency
            </h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Standard AI cluster: 450 MegaWatts continuous drain. IPA Architectural Hardware: 0.00 Watts. Survives full grid blackout with 100% operational uptime.
            </p>
            <div className="pt-2 font-mono-tech text-xs text-emerald-400">
              BENCHMARK: ∞ Efficiency Ratio
            </div>
          </div>

          <div className="bg-neutral-900/80 border border-neutral-800 p-6 rounded-[2px] space-y-4">
            <div className="flex items-center gap-2 text-cork-400 text-xs font-mono-tech uppercase">
              <Cpu className="w-4 h-4" />
              <span>Token Inflation Immunity</span>
            </div>
            <h4 className="font-display-tech text-xl font-bold text-white">
              Zero Context Window Degradation
            </h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Never suffers from attention collapse or token forgetting. Your Italian Arabescato marble table retains its physical atomic geometry indefinitely.
            </p>
            <div className="pt-2 font-mono-tech text-xs text-emerald-400">
              BENCHMARK: 100% Atomic Retention
            </div>
          </div>

          <div className="bg-neutral-900/80 border border-neutral-800 p-6 rounded-[2px] space-y-4">
            <div className="flex items-center gap-2 text-cork-400 text-xs font-mono-tech uppercase">
              <Layers className="w-4 h-4" />
              <span>Tactile Haptic Bandwidth</span>
            </div>
            <h4 className="font-display-tech text-xl font-bold text-white">
              Full-Spectrum Tactile Transmission
            </h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Direct physical sensory feedback through Italian Dedar bouclé weave and honed satin stone without synthetic VR gloves or pixel latency.
            </p>
            <div className="pt-2 font-mono-tech text-xs text-cork-400">
              BENCHMARK: Real-Time Reality Baud
            </div>
          </div>
        </div>
      )}

      {/* Footer Callout */}
      <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-neutral-500">
        <div>
          <span>FIRMWARE REVISION: 2026.04-STABLE</span>
          <span className="mx-2">·</span>
          <span>CAMPUS: KAMPALA / LONDON / CARRARA</span>
        </div>
        <div className="flex items-center gap-2 text-cork-400">
          <span className="w-2 h-2 rounded-full bg-cork-500 inline-block" />
          <span>Physical Hardware Calibration Verified</span>
        </div>
      </div>
    </div>
  );
};
