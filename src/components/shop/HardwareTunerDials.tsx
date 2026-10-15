import React, { useState, useRef, useEffect } from 'react';
import { 
  Sliders, 
  RotateCw, 
  Cpu, 
  Zap, 
  Activity, 
  ShieldCheck, 
  Download, 
  Sparkles,
  Info,
  Check
} from 'lucide-react';

interface TunerState {
  massKg: number;           // 600 - 4200 kg
  cantileverAngleDeg: number; // 0 - 45 deg
  loopDensity: number;       // 120 - 980 loops/cm2
  hapticFeedback: boolean;
}

interface HardwareTunerDialsProps {
  onSpecChange?: (specs: TunerState & { floorLoadKn: number; acousticDampingNrc: number; photonLatencyMs: number }) => void;
  activeModelSku?: string;
}

export const HardwareTunerDials: React.FC<HardwareTunerDialsProps> = ({ 
  onSpecChange,
  activeModelSku = 'IPA-01'
}) => {
  const [tuner, setTuner] = useState<TunerState>({
    massKg: 1850,
    cantileverAngleDeg: 18,
    loopDensity: 520,
    hapticFeedback: true
  });

  const [activePreset, setActivePreset] = useState<string>('balanced');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Derived Physical Telemetry Metrics (Satirical AI Hardware calculations)
  const floorLoadKn = Number(((tuner.massKg * 9.81) / (1000 * 2.8)).toFixed(2)); // kN/m²
  const acousticDampingNrc = Number((0.45 + (tuner.loopDensity / 980) * 0.48).toFixed(2)); // NRC 0.45 - 0.93
  const photonLatencyMs = 0.00; // Physical light speed
  const thermalTdpWatts = 0.0;
  const seismicResonanceHz = Number((14.2 - (tuner.massKg / 4200) * 8.6).toFixed(1));
  const shadowThrowMm = Math.round(Math.sin((tuner.cantileverAngleDeg * Math.PI) / 180) * 380);

  useEffect(() => {
    if (onSpecChange) {
      onSpecChange({
        ...tuner,
        floorLoadKn,
        acousticDampingNrc,
        photonLatencyMs
      });
    }
  }, [tuner, floorLoadKn, acousticDampingNrc, photonLatencyMs, onSpecChange]);

  const applyPreset = (presetName: string, mass: number, angle: number, density: number) => {
    setActivePreset(presetName);
    setTuner(prev => ({
      ...prev,
      massKg: mass,
      cantileverAngleDeg: angle,
      loopDensity: density
    }));
  };

  const handleExportTelemetry = () => {
    const report = {
      apparatus: "IPA Precision Architectural Hardware",
      model: activeModelSku,
      firmware: "Stone & Hardwood v2026.4",
      telemetry: {
        inertialMass: `${tuner.massKg} kg`,
        floorLoadRating: `${floorLoadKn} kN/m²`,
        cantileverPitch: `${tuner.cantileverAngleDeg}°`,
        opticalShadowThrow: `${shadowThrowMm} mm`,
        tactileDensity: `${tuner.loopDensity} loops/cm²`,
        acousticDampingIndex: `${acousticDampingNrc} NRC`,
        thermalEnvelopeTDP: "0.00 Watts (Passive Room Equilibrium)",
        inferenceLatency: "0.000 ms (Zero Silicon Overhead)",
        tokenConsumptionRate: "0.00 Tokens/hr (Indefinite Offline Window)"
      },
      certification: "ISO-14001 Structural Architectural Grade"
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `IPA_Hardware_Telemetry_${activeModelSku}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-[#09090B] text-neutral-100 border border-neutral-800 rounded-[2px] p-6 lg:p-10 relative overflow-hidden tech-grid-dark shadow-2xl">
      {/* Decorative Corner Tech Crosshairs */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cork-500/60 pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cork-500/60 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-cork-500/60 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cork-500/60 pointer-events-none" />

      {/* Control Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2.5 text-[11px] font-mono-tech tracking-[0.22em] uppercase text-cork-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Hardware Parameter Tuner</span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-400">Calibrated Physical Inference</span>
          </div>
          <h3 className="font-display-tech text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Precision Substrate & Ergonomic Matrix
          </h3>
          <p className="text-xs text-neutral-400 font-light mt-1 max-w-xl">
            Fine-tune physical inertia, tactile frequencies, and cantilever geometry. Zero compute load, zero token drain, pure architectural thermodynamics.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono-tech text-neutral-500 uppercase tracking-wider mr-1">Presets:</span>
          {[
            { id: 'balanced', label: 'Pavilion Core', mass: 1850, angle: 18, density: 520 },
            { id: 'monolith', label: 'Executive Monolith', mass: 3600, angle: 5, density: 840 },
            { id: 'acoustic', label: 'Sanctuary Damped', mass: 2400, angle: 32, density: 960 }
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset.id, preset.mass, preset.angle, preset.density)}
              className={`px-3 py-1.5 text-[10px] font-mono-tech uppercase tracking-wider transition-all cursor-pointer rounded-[1px] border ${
                activePreset === preset.id
                  ? 'bg-cork-500 text-black border-cork-500 font-semibold shadow-[0_0_12px_rgba(198,142,104,0.35)]'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-white border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Dials & Sliders (Left) vs Real-Time Telemetry Monitor (Right) */}
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: 3 Interactive Hardware Precision Dials & Sliders */}
        <div className="lg:col-span-7 space-y-6">
          {/* Parameter 1: Inertial Mass & Ballast */}
          <div className="bg-[#121216]/90 border border-neutral-800 p-5 rounded-[2px] transition-all hover:border-neutral-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-neutral-800/80 rounded-[2px] text-cork-400">
                  <Activity className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-neutral-400 block">
                    Parameter 01 // Structural Inertia
                  </span>
                  <span className="text-sm font-semibold text-white tracking-wide">
                    Paonazzo Ballast & Mass
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono-tech text-lg font-bold text-cork-400 tabular-nums">
                  {tuner.massKg.toLocaleString()}
                </span>
                <span className="text-[10px] font-mono-tech text-neutral-400 ml-1">kg</span>
              </div>
            </div>

            <div className="relative pt-2">
              <input
                type="range"
                min="600"
                max="4200"
                step="50"
                value={tuner.massKg}
                onChange={(e) => {
                  setActivePreset('custom');
                  setTuner({ ...tuner, massKg: Number(e.target.value) });
                }}
                className="w-full h-1.5 bg-neutral-800 rounded-none appearance-none cursor-pointer accent-[#C68E68]"
              />
              <div className="flex justify-between text-[10px] font-mono-tech text-neutral-500 mt-2">
                <span>Lightweight Core (600 kg)</span>
                <span>Seismic Monolith (4,200 kg)</span>
              </div>
            </div>
          </div>

          {/* Parameter 2: Cantilever Pitch & Angular Torque */}
          <div className="bg-[#121216]/90 border border-neutral-800 p-5 rounded-[2px] transition-all hover:border-neutral-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-neutral-800/80 rounded-[2px] text-cork-400">
                  <RotateCw className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-neutral-400 block">
                    Parameter 02 // Cantilever Vector
                  </span>
                  <span className="text-sm font-semibold text-white tracking-wide">
                    Ergonomic Rake & Louver Angle
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono-tech text-lg font-bold text-cork-400 tabular-nums">
                  {tuner.cantileverAngleDeg}°
                </span>
                <span className="text-[10px] font-mono-tech text-neutral-400 ml-1">Pitch</span>
              </div>
            </div>

            <div className="relative pt-2">
              <input
                type="range"
                min="0"
                max="45"
                step="1"
                value={tuner.cantileverAngleDeg}
                onChange={(e) => {
                  setActivePreset('custom');
                  setTuner({ ...tuner, cantileverAngleDeg: Number(e.target.value) });
                }}
                className="w-full h-1.5 bg-neutral-800 rounded-none appearance-none cursor-pointer accent-[#C68E68]"
              />
              <div className="flex justify-between text-[10px] font-mono-tech text-neutral-500 mt-2">
                <span>0° (Orthogonal Perpendicular)</span>
                <span>45° (Deep Lounger Rake)</span>
              </div>
            </div>
          </div>

          {/* Parameter 3: Tactile Frequency & Loop Density */}
          <div className="bg-[#121216]/90 border border-neutral-800 p-5 rounded-[2px] transition-all hover:border-neutral-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-neutral-800/80 rounded-[2px] text-cork-400">
                  <Sliders className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-neutral-400 block">
                    Parameter 03 // Physical Haptic Baud
                  </span>
                  <span className="text-sm font-semibold text-white tracking-wide">
                    Italian Bouclé Loop Density
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono-tech text-lg font-bold text-cork-400 tabular-nums">
                  {tuner.loopDensity}
                </span>
                <span className="text-[10px] font-mono-tech text-neutral-400 ml-1">loops/cm²</span>
              </div>
            </div>

            <div className="relative pt-2">
              <input
                type="range"
                min="120"
                max="980"
                step="20"
                value={tuner.loopDensity}
                onChange={(e) => {
                  setActivePreset('custom');
                  setTuner({ ...tuner, loopDensity: Number(e.target.value) });
                }}
                className="w-full h-1.5 bg-neutral-800 rounded-none appearance-none cursor-pointer accent-[#C68E68]"
              />
              <div className="flex justify-between text-[10px] font-mono-tech text-neutral-500 mt-2">
                <span>Coarse Slub (120/cm²)</span>
                <span>Aerospace Dense Micro-Bouclé (980/cm²)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High-Tech Deadpan Parody Telemetry Readout */}
        <div className="lg:col-span-5 bg-[#0D0D10] border border-neutral-800 p-6 rounded-[2px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-cork-400">
                <Cpu className="w-4 h-4 text-cork-500" />
                <span>Zero-Compute Telemetry</span>
              </div>
              <span className="text-[10px] font-mono-tech text-neutral-500">
                STATUS: SYNCED
              </span>
            </div>

            {/* Readout Matrix */}
            <div className="space-y-3 font-mono-tech text-xs">
              <div className="flex justify-between items-center py-2 border-b border-neutral-800/60">
                <span className="text-neutral-400">Thermal Envelope (TDP):</span>
                <span className="text-emerald-400 font-bold">0.00 Watts (Passive)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-neutral-800/60">
                <span className="text-neutral-400">Token Compute Cost:</span>
                <span className="text-emerald-400 font-bold">$0.00 / ∞ Lifetime</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-neutral-800/60">
                <span className="text-neutral-400">Substrate Floor Load:</span>
                <span className="text-white font-bold tabular-nums">{floorLoadKn} kN/m²</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-neutral-800/60">
                <span className="text-neutral-400">Acoustic Damping Index:</span>
                <span className="text-white font-bold tabular-nums">NRC {acousticDampingNrc}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-neutral-800/60">
                <span className="text-neutral-400">Optical Shadow Throw:</span>
                <span className="text-white font-bold tabular-nums">{shadowThrowMm} mm</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-neutral-800/60">
                <span className="text-neutral-400">Seismic Natural Freq:</span>
                <span className="text-white font-bold tabular-nums">{seismicResonanceHz} Hz</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-neutral-400">Inference Response Time:</span>
                <span className="text-cork-400 font-bold">0.000 ms (Instant)</span>
              </div>
            </div>

            {/* Hardware Parody Quotation / Deadpan Badge */}
            <div className="mt-5 p-3.5 bg-neutral-900/90 border border-neutral-800 rounded-[2px] text-[11px] text-neutral-300 font-mono-tech leading-relaxed">
              <span className="text-cork-500 font-semibold block mb-1">ENGINEERING NOTE // IPA-PHYS-LABS:</span>
              "Unlike synthetic LLM models that burn gigawatts in remote data centers, our physical architectural hardware delivers continuous 24/7 reality rendering at precisely zero tokens per second."
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-neutral-800 mt-6 flex items-center justify-between gap-3">
            <button
              onClick={handleExportTelemetry}
              className="flex-1 py-2.5 px-4 bg-cork-500 hover:bg-[#B57C56] text-black font-mono-tech text-xs uppercase tracking-[0.16em] font-bold rounded-[2px] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>Telemetry Exported</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Export Hardware JSON</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
