import React, { useState, useEffect, useRef } from 'react';
import { 
  Sliders, 
  RotateCw, 
  Layers, 
  Zap, 
  Thermometer, 
  ShieldCheck, 
  Activity, 
  Maximize2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Download, 
  ArrowRight,
  Eye,
  Info,
  Check
} from 'lucide-react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hardware3DCanvas, Hardware3DParams } from './Hardware3DCanvas';
import { MagneticCursor } from './MagneticCursor';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface OryzoInteractiveStageProps {
  onExploreCatalog?: () => void;
  onOpenSpecs?: () => void;
  onOpenTuner?: () => void;
}

export const OryzoInteractiveStage: React.FC<OryzoInteractiveStageProps> = ({
  onExploreCatalog,
  onOpenSpecs,
  onOpenTuner,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  // 3D Scene Parameters State
  const [params, setParams] = useState<Hardware3DParams>({
    temperature: 298, // 298 K (~25°C ambient)
    roughness: 0.28,
    restitution: 0.72,
    exploded: 0.0,
    lightingMood: 'obsidian',
    activeHotspot: null,
    scrollProgress: 0.0,
  });

  // UI Interactive States
  const [currentChapter, setCurrentChapter] = useState<number>(0);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [isSpecDrawerOpen, setIsSpecDrawerOpen] = useState<boolean>(false);
  const [isFlipCardFlipped, setIsFlipCardFlipped] = useState<boolean>(false);
  const [selectedSubsystem, setSelectedSubsystem] = useState<string>('core');
  const [isExportingBlueprint, setIsExportingBlueprint] = useState<boolean>(false);

  // Lenis Smooth Scroll + GSAP ScrollTrigger setup
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Setup ScrollTrigger on the 4-stage track
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: scrollSectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress;
        setParams((prev) => ({ ...prev, scrollProgress: progress }));

        // Update active chapter based on scroll position
        if (progress < 0.25) {
          setCurrentChapter(0);
        } else if (progress < 0.55) {
          setCurrentChapter(1);
        } else if (progress < 0.82) {
          setCurrentChapter(2);
        } else {
          setCurrentChapter(3);
        }
      },
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      scrollTriggerInstance.kill();
    };
  }, []);

  const handleHotspotSelect = (id: string) => {
    setParams((prev) => ({
      ...prev,
      activeHotspot: prev.activeHotspot === id ? null : id,
    }));
    setSelectedSubsystem(id);
  };

  const handleDownloadBlueprint = () => {
    setIsExportingBlueprint(true);
    setTimeout(() => {
      const specData = `
================================================================================
ORYZO // MONOLITH OS-1 PRECISION HARDWARE BENCHMARK WHITE-PAPER
================================================================================
Model: SUBSTRATE MONOLITH OS-1 (REV 4.9.1)
Architecture: ZERO-COMPUTE / PASSIVE NEURAL INGESTION
Substrate Density: 3,240 kg/m³ (Machined Monolithic Basalt)
Optical Element: Borosilicate Glass Refractive Prism (IOR 1.52)
Resonance Core: Nested Concentric Brass Gyroscopic Damping Ring
Active Temperature: ${params.temperature} K (${(params.temperature - 273.15).toFixed(1)}°C)
Surface Roughness: ${(params.roughness * 100).toFixed(0)}% (${params.roughness < 0.3 ? 'Diamond Lapped' : 'Matte Micro-Blasted'})
Kinematic Restitution: ${(params.restitution * 100).toFixed(0)}% (Damped Spring Ratio)
Token Consumption: 0.0000000000 Tokens/Hour (Zero Tokens Required)
MTBF: 1,200,000 Operating Cycles
Export Timestamp: ${new Date().toISOString()}
================================================================================
      `;
      const blob = new Blob([specData], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `MONOLITH-OS1-BENCHMARK-${Date.now()}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      setIsExportingBlueprint(false);
    }, 600);
  };

  // Chapter Descriptions for the 4 Scroll Phases
  const chapters = [
    {
      num: '01',
      title: 'ZERO-COMPUTE MONOLITH',
      tagline: '100% Physical Presence. Zero Tokens. Zero Compute.',
      desc: 'Precision-machined basalt and cold-rolled titanium alloy chassis engineered for indefinite continuous uptime without electrical current, algorithmic drift, or inference latency.',
      specs: [
        { label: 'Compute Engine', value: 'Zero-Compute Core' },
        { label: 'Token Ingestion', value: '0.000000 / hr' },
        { label: 'Inertial Mass', value: '1,840 kg' },
      ],
    },
    {
      num: '02',
      title: 'AXONOMETRIC SEPARATION',
      tagline: 'Exploded Mechanical Hierarchy & Tolerances',
      desc: 'Sub-micron CNC clearances permit seamless mechanical separation across 6 vertical tiers. Notice the integrated laser-etched thermal fins and internal concentric resonance ring.',
      specs: [
        { label: 'Layer Clearances', value: '±0.004 mm' },
        { label: 'Articulated Tiers', value: '6 Independent Layers' },
        { label: 'Tensile Modulus', value: '340 GPa' },
      ],
    },
    {
      num: '03',
      title: 'BOROSILICATE REFRACTION',
      tagline: 'Passive Optical Prism & Sub-Surface Lensing',
      desc: 'Crown-mounted borosilicate prism (IOR 1.52) passively collimates ambient interior daylight into an internal optical cavity, eliminating digital status LEDs entirely.',
      specs: [
        { label: 'Refractive Index', value: '1.520 nd' },
        { label: 'Optical Transmittance', value: '94.2%' },
        { label: 'Thermal Envelope', value: '< 0.02 W/mK' },
      ],
    },
    {
      num: '04',
      title: 'KINEMATIC DAMPING MATRIX',
      tagline: 'Seismic Isolation & Tactile Grounding',
      desc: 'Base-mounted leveling pedestal with ground-contact radial friction dampener dissipates building vibrational noise, ensuring absolute stillness in any boardroom or private penthouse.',
      specs: [
        { label: 'Damping Factor', value: '0.985 Critical' },
        { label: 'Floor Load Rating', value: '24.8 kN/m²' },
        { label: 'Resonant Frequency', value: '< 1.4 Hz' },
      ],
    },
  ];

  return (
    <div ref={containerRef} className="relative w-full bg-[#08080A] text-neutral-100 overflow-hidden font-display-tech selection:bg-[#D4A373]/30 selection:text-white">
      {/* Magnetic Cursor with dynamic micro-labels */}
      <MagneticCursor cursorLabel="EXPLORE" />

      {/* FULLSCREEN BACKGROUND 3D WEBGL CANVAS (STICKY PINNED) */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Hardware3DCanvas params={params} />

        {/* Subtle Vignette & Gradient Overlays */}
        <div className="absolute inset-0 pointer-events-none bg-radial-[circle_at_center,transparent_40%,rgba(8,8,10,0.85)_100%]" />
        <div className="absolute inset-x-0 top-0 h-32 pointer-events-none bg-gradient-to-b from-[#08080A] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-[#08080A] via-[#08080A]/60 to-transparent" />
      </div>

      {/* FIXED TOP EDITORIAL HEADER & METADATA BAR */}
      <header className="fixed top-0 inset-x-0 z-20 pointer-events-none px-6 lg:px-12 py-5 flex items-center justify-between border-b border-neutral-800/80 bg-black/40 backdrop-blur-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="px-2 py-0.5 border border-white/20 bg-white/5 text-[9px] font-mono-tech tracking-[0.25em] uppercase text-[#D4A373]">
            ORYZO // SPEC-01
          </div>
          <div className="text-sm font-semibold tracking-tight text-white uppercase">
            MONOLITH OS-1 <span className="text-neutral-500 font-mono-tech text-xs ml-1 font-normal">v4.9</span>
          </div>
        </div>

        {/* Center Live Telemetry */}
        <div className="hidden md:flex items-center gap-6 font-mono-tech text-[10px] tracking-wider text-neutral-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            TOKEN CONSUMPTION: <strong className="text-neutral-200">0.00 / HR</strong>
          </span>
          <span className="text-neutral-600">/</span>
          <span>
            TEMP: <strong className="text-neutral-200">{params.temperature} K</strong>
          </span>
          <span className="text-neutral-600">/</span>
          <span>
            SURFACE: <strong className="text-neutral-200">{params.roughness < 0.3 ? 'MIRROR' : 'MATTE'}</strong>
          </span>
        </div>

        {/* Right Action Switchers */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsSpecDrawerOpen(!isSpecDrawerOpen)}
            data-cursor-label="TELEMETRY"
            className="px-3 py-1.5 border border-neutral-700 bg-neutral-900/80 hover:bg-white hover:text-black hover:border-white transition-all text-xs font-mono-tech tracking-wider uppercase flex items-center gap-2"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{isSpecDrawerOpen ? 'Close Telemetry' : 'Live Telemetry'}</span>
          </button>

          {onExploreCatalog && (
            <button
              onClick={onExploreCatalog}
              data-cursor-label="CATALOG"
              className="px-3 py-1.5 border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-all text-xs font-mono-tech tracking-wider uppercase flex items-center gap-1.5"
            >
              <span>Catalog</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </header>

      {/* FLOATING INTERACTIVE 3D HOTSPOTS ON CANVAS */}
      <div className="fixed top-28 left-8 z-10 hidden xl:flex flex-col gap-2 pointer-events-auto">
        <div className="text-[9px] font-mono-tech tracking-[0.25em] text-neutral-500 uppercase mb-1">
          SUB-SYSTEM INSPECTORS
        </div>

        {[
          { id: 'crystal', label: '01. Borosilicate Prism', desc: 'IOR 1.52 Optical Dome' },
          { id: 'fins', label: '02. Heat-Sink Fin Stack', desc: 'Laser-Cut Micro Vanes' },
          { id: 'gyro', label: '03. Zero-Compute Gyro', desc: 'Concentric Brass Rings' },
          { id: 'base', label: '04. Kinematic Pedestal', desc: 'Seismic Ground Plate' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleHotspotSelect(item.id)}
            data-cursor-label="FOCUS"
            className={`group text-left px-3 py-2 border transition-all duration-200 ${
              params.activeHotspot === item.id
                ? 'bg-white text-black border-white shadow-lg'
                : 'bg-black/60 border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
            }`}
          >
            <div className="text-xs font-mono-tech font-bold uppercase tracking-wider group-hover:translate-x-0.5 transition-transform">
              {item.label}
            </div>
            <div className="text-[10px] text-neutral-500 font-mono-tech">
              {item.desc}
            </div>
          </button>
        ))}

        {params.activeHotspot && (
          <button
            onClick={() => setParams((p) => ({ ...p, activeHotspot: null }))}
            className="text-[10px] font-mono-tech tracking-widest text-[#D4A373] hover:underline uppercase pt-1"
          >
            [ Reset Camera Focus ]
          </button>
        )}
      </div>

      {/* RIGHT-SIDE INTERACTIVE 3D FLIP CARD (MICRO-INTERACTION) */}
      <div className="fixed top-28 right-8 z-10 hidden lg:block w-72 pointer-events-auto perspective-1000">
        <div
          onClick={() => setIsFlipCardFlipped(!isFlipCardFlipped)}
          data-cursor-label="FLIP"
          className={`relative w-full transition-transform duration-700 cursor-pointer preserve-3d ${
            isFlipCardFlipped ? 'rotate-y-180' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Card Front: Precision Spec Summary */}
          <div className="w-full bg-[#0E0E12]/90 border border-neutral-800 p-5 space-y-4 backface-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <span className="text-[9px] font-mono-tech tracking-[0.25em] text-[#D4A373] uppercase">
                HARDWARE ARCHITECTURE
              </span>
              <span className="text-[9px] font-mono-tech text-neutral-500">
                CLICK TO FLIP ↻
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold tracking-tight uppercase text-white">
                Zero-Compute Engine
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Physical mass replaces neural inference. Zero tokens consumed per prompt. 100% deterministic presence.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono-tech pt-2 border-t border-neutral-800/80">
              <div className="p-2 bg-black/40 border border-neutral-800">
                <span className="text-neutral-500 block">EST. MTBF</span>
                <span className="text-neutral-200 font-bold">1.2M Cycles</span>
              </div>
              <div className="p-2 bg-black/40 border border-neutral-800">
                <span className="text-neutral-500 block">LATENCY</span>
                <span className="text-emerald-400 font-bold">0.00 ms (Instant)</span>
              </div>
            </div>

            <div className="text-[9px] font-mono-tech text-neutral-500 text-center tracking-wider pt-1">
              [ Tap to inspect reverse telemetry ]
            </div>
          </div>

          {/* Card Back: Parody AI Telemetry */}
          <div 
            className="w-full bg-[#0E0E12]/95 border border-neutral-700 p-5 space-y-3 shadow-2xl absolute inset-0 backface-hidden"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <span className="text-[9px] font-mono-tech tracking-[0.25em] text-emerald-400 uppercase">
                PASSIVE NEURAL FIELD
              </span>
              <span className="text-[9px] font-mono-tech text-neutral-500">
                FLIP BACK ↺
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono-tech">
              <div className="flex justify-between border-b border-neutral-800/60 py-1">
                <span className="text-neutral-500">Substrate Temp:</span>
                <span className="text-neutral-200">{params.temperature} K</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800/60 py-1">
                <span className="text-neutral-500">Restitution:</span>
                <span className="text-neutral-200">{(params.restitution * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800/60 py-1">
                <span className="text-neutral-500">Friction Coeff:</span>
                <span className="text-neutral-200">0.012 μ</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800/60 py-1">
                <span className="text-neutral-500">GPU Heating:</span>
                <span className="text-emerald-400">0.00 W (No Silicon)</span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadBlueprint();
              }}
              className="w-full py-1.5 border border-neutral-700 bg-black hover:bg-white hover:text-black transition-colors text-[10px] font-mono-tech tracking-wider uppercase flex items-center justify-center gap-1.5"
            >
              <Download className="w-3 h-3" />
              <span>{isExportingBlueprint ? 'Compiling...' : 'Export Whitepaper'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* EXPANDABLE TELEMETRY DRAWER (SLIDE-IN MODAL) */}
      {isSpecDrawerOpen && (
        <div className="fixed top-20 right-6 z-30 w-80 max-w-[90vw] bg-[#0E0E12] border border-neutral-700 p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#D4A373]" />
              <h3 className="text-xs font-mono-tech tracking-[0.2em] font-bold uppercase text-white">
                Live Substrate Telemetry
              </h3>
            </div>
            <button
              onClick={() => setIsSpecDrawerOpen(false)}
              className="text-neutral-400 hover:text-white font-mono-tech text-xs"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4 font-mono-tech text-xs">
            <div className="p-3 bg-black/60 border border-neutral-800 space-y-1.5">
              <div className="text-[10px] text-neutral-500 uppercase tracking-widest">
                Scroll Stage & Camera Vector
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Progress:</span>
                <strong className="text-white">{(params.scrollProgress * 100).toFixed(1)}%</strong>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Active Chapter:</span>
                <strong className="text-[#D4A373]">
                  {chapters[currentChapter]?.num} // {chapters[currentChapter]?.title}
                </strong>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between border-b border-neutral-800/80 py-1">
                <span className="text-neutral-400">Physical Volume:</span>
                <span className="text-white">1.0m × 0.9m × 1.4m</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800/80 py-1">
                <span className="text-neutral-400">Total Weight:</span>
                <span className="text-white">1,840 kg</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800/80 py-1">
                <span className="text-neutral-400">Floor Static Load:</span>
                <span className="text-white">18.2 kN/m²</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800/80 py-1">
                <span className="text-neutral-400">Silicon Dependence:</span>
                <span className="text-emerald-400 font-bold">0.00% Absolute Zero</span>
              </div>
            </div>

            <button
              onClick={handleDownloadBlueprint}
              className="w-full py-2 bg-white text-black hover:bg-[#D4A373] hover:text-white transition-colors text-xs font-mono-tech tracking-wider uppercase font-bold flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExportingBlueprint ? 'Compiling Monograph...' : 'Download Full Spec Sheet'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 4-STAGE SCROLL-DRIVEN TRACK (LENIS + GSAP SCROLLTRIGGER ENGINE) */}
      <div ref={scrollSectionRef} className="relative z-10 w-full pointer-events-none">
        {chapters.map((chapter, idx) => (
          <section
            key={chapter.num}
            className="min-h-screen flex items-center px-6 lg:px-20 py-24"
          >
            <div className={`max-w-xl transition-all duration-700 pointer-events-auto ${
              currentChapter === idx ? 'opacity-100 translate-y-0' : 'opacity-25 translate-y-4'
            }`}>
              {/* Corner crosshairs and spec badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-mono-tech tracking-[0.25em] text-[#D4A373] uppercase border border-[#D4A373]/30 px-2 py-0.5">
                  STAGE {chapter.num} / 04
                </span>
                <span className="text-xs font-mono-tech text-neutral-500 uppercase tracking-widest">
                  + + SCROLL SEQUENCE
                </span>
              </div>

              {/* Editorial Header */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase leading-[0.95] mb-4 text-white">
                {chapter.title}
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 font-mono-tech tracking-wide mb-6">
                {chapter.tagline}
              </p>

              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-8">
                {chapter.desc}
              </p>

              {/* Technical Spec Matrix Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-t border-neutral-800 pt-5">
                {chapter.specs.map((s, sIdx) => (
                  <div key={sIdx} className="p-2.5 bg-black/60 border border-neutral-800/80">
                    <div className="text-[9px] font-mono-tech text-neutral-500 uppercase tracking-wider">
                      {s.label}
                    </div>
                    <div className="text-xs font-mono-tech font-bold text-neutral-200 mt-0.5">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* COLLAPSIBLE BOTTOM CONTROL DOCK (STRICT THREE.JS SKILL DIRECTIVE: ZERO VIEWPORT OCCLUSION) */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 w-full max-w-[940px] px-4 pointer-events-auto">
        {/* Dock Header & Collapse Toggle */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            data-cursor-label="DOCK"
            className="px-4 py-1.5 bg-[#0E0E12] border border-neutral-700 border-b-0 text-[10px] font-mono-tech tracking-[0.2em] uppercase text-neutral-300 hover:text-white hover:bg-neutral-900 transition-all flex items-center gap-2"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Show Real-Time 3D Tuner Dock</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>▾ Collapse Dock [Zen Mode]</span>
              </>
            )}
          </button>
        </div>

        {/* Dock Body */}
        {!isDockCollapsed && (
          <div className="bg-[#0E0E12]/95 border border-neutral-700 p-4 sm:p-5 shadow-2xl backdrop-blur-none space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-3">
                <Sliders className="w-4 h-4 text-[#D4A373]" />
                <span className="text-xs font-mono-tech tracking-[0.2em] font-bold uppercase text-white">
                  Dynamic Parameter Dials
                </span>
                <span className="text-[10px] font-mono-tech text-neutral-500 hidden sm:inline">
                  (Live Uniform & Physics Controls)
                </span>
              </div>

              {/* Studio Lighting Mood Switcher */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono-tech">
                <span className="text-neutral-500 uppercase mr-1">Studio Mood:</span>
                {[
                  { id: 'obsidian', label: 'Obsidian' },
                  { id: 'clean-lab', label: 'Clean Lab' },
                  { id: 'cyber-sunset', label: 'Cyber Dusk' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setParams((p) => ({ ...p, lightingMood: m.id as any }))}
                    className={`px-2 py-0.5 border uppercase transition-colors ${
                      params.lightingMood === m.id
                        ? 'bg-white text-black border-white font-bold'
                        : 'border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Interactive Parameter Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Slider 1: Substrate Temperature */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono-tech">
                  <span className="text-neutral-400 uppercase flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-[#D4A373]" />
                    Thermal Glow
                  </span>
                  <span className="text-white font-bold">{params.temperature} K</span>
                </div>
                <input
                  type="range"
                  min="270"
                  max="450"
                  step="1"
                  value={params.temperature}
                  onChange={(e) => setParams((p) => ({ ...p, temperature: Number(e.target.value) }))}
                  className="w-full accent-[#D4A373] bg-neutral-800 h-1 cursor-pointer"
                />
                <div className="flex justify-between text-[8px] font-mono-tech text-neutral-500">
                  <span>270K (Cryo)</span>
                  <span>450K (Thermal)</span>
                </div>
              </div>

              {/* Slider 2: Micro-Surface Roughness */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono-tech">
                  <span className="text-neutral-400 uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    Micro-Roughness
                  </span>
                  <span className="text-white font-bold">{(params.roughness * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.85"
                  step="0.01"
                  value={params.roughness}
                  onChange={(e) => setParams((p) => ({ ...p, roughness: Number(e.target.value) }))}
                  className="w-full accent-cyan-400 bg-neutral-800 h-1 cursor-pointer"
                />
                <div className="flex justify-between text-[8px] font-mono-tech text-neutral-500">
                  <span>Mirror Lapped</span>
                  <span>Micro-Blasted</span>
                </div>
              </div>

              {/* Slider 3: Spring Physics Restitution */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono-tech">
                  <span className="text-neutral-400 uppercase flex items-center gap-1">
                    <Activity className="w-3 h-3 text-amber-400" />
                    Cursor Damping
                  </span>
                  <span className="text-white font-bold">{(params.restitution * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="1.0"
                  step="0.02"
                  value={params.restitution}
                  onChange={(e) => setParams((p) => ({ ...p, restitution: Number(e.target.value) }))}
                  className="w-full accent-amber-400 bg-neutral-800 h-1 cursor-pointer"
                />
                <div className="flex justify-between text-[8px] font-mono-tech text-neutral-500">
                  <span>Heavy Damped</span>
                  <span>Elastic Inertia</span>
                </div>
              </div>

              {/* Slider 4: Manual Exploded Separation */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono-tech">
                  <span className="text-neutral-400 uppercase flex items-center gap-1">
                    <Layers className="w-3 h-3 text-emerald-400" />
                    Exploded Spacing
                  </span>
                  <span className="text-white font-bold">{(params.exploded * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.2"
                  step="0.02"
                  value={params.exploded}
                  onChange={(e) => setParams((p) => ({ ...p, exploded: Number(e.target.value) }))}
                  className="w-full accent-emerald-400 bg-neutral-800 h-1 cursor-pointer"
                />
                <div className="flex justify-between text-[8px] font-mono-tech text-neutral-500">
                  <span>Assembled Monolith</span>
                  <span>Full Axonometric</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar inside Dock */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80 text-[10px] font-mono-tech">
              <span className="text-neutral-500">
                SCROLL CHOREOGRAPHY ACTIVE // MOVE CURSOR FOR INERTIAL MAGNETIC DRAG
              </span>
              <div className="flex items-center gap-3">
                {onOpenSpecs && (
                  <button
                    onClick={onOpenSpecs}
                    className="text-neutral-400 hover:text-white uppercase underline"
                  >
                    Compare Specifications
                  </button>
                )}
                {onOpenTuner && (
                  <button
                    onClick={onOpenTuner}
                    className="text-[#D4A373] hover:underline uppercase font-bold"
                  >
                    Deep Tuner Dials →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
