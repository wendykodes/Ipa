import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useIpaData } from '../context/IpaDataContext';
import { formatMoney } from '../types/ipaBrand';
import { 
  ArrowLeft, 
  Bookmark, 
  Compass, 
  ArrowRight
} from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, currency, savedSpaceIds, toggleSaveSpace } = useIpaData();
  const [sliderPos, setSliderPos] = useState<number>(50);

  const project = projects.find(p => p.id === id) || projects[0];
  const isSaved = savedSpaceIds.includes(project.id);
  const totalArea = project.areaSqm || project.rooms.reduce((acc, r) => acc + (r.floorAreaSqm || 0), 0) || 520;

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 text-stone-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        {/* Back navigation */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-stone-600 hover:text-[#801D31] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Architectural Portfolio</span>
        </Link>

        {/* Hero Header */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EDE8E1] pb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider">
                <span className="text-[#801D31] font-semibold">{project.location.city}</span>
                <span aria-hidden="true">·</span>
                <span>Completed {project.targetHandoverDate?.split(' ')[2] || '2026'}</span>
                <span aria-hidden="true">·</span>
                <span>{project.typology}</span>
              </div>

              <h1 className="font-serif-luxury text-4xl sm:text-6xl font-light text-stone-900 tracking-tight">
                {project.title}
              </h1>

              <div className="text-xs font-mono text-stone-500">
                <span>{project.location.address}</span>
                <span className="text-stone-300 mx-2">·</span>
                <span>Lead Architect: {project.leadArchitect}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleSaveSpace(project.id)}
                className={`px-5 py-3 text-xs font-mono uppercase tracking-wider border rounded-[2px] flex items-center gap-2 transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-[#801D31] text-white border-[#801D31]'
                    : 'bg-white text-stone-800 border-[#EDE8E1] hover:border-stone-900'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{isSaved ? 'Saved to Vault' : 'Save Residence'}</span>
              </button>

              <button
                onClick={() => navigate('/design-my-space')}
                className="px-6 py-3 bg-[#801D31] hover:bg-[#6B1727] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-[2px] transition-all cursor-pointer flex items-center gap-2 shadow-xs"
              >
                <span>Commission Similar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Full-width Hero image */}
          <div className="aspect-[21/9] w-full overflow-hidden bg-stone-100 border border-[#EDE8E1] rounded-[2px]">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Specifications & Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-white border border-[#EDE8E1] rounded-[2px] text-xs font-mono shadow-xs">
          <div>
            <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Internal Area</span>
            <span className="text-stone-900 font-semibold text-lg mt-1 block tabular-nums">
              {totalArea} m²
            </span>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Contract Fit-out</span>
            <span className="text-stone-900 font-semibold text-lg mt-1 block tabular-nums">
              {formatMoney(project.totalContractValueUgx, currency)}
            </span>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Project Timeline</span>
            <span className="text-stone-900 font-semibold text-lg mt-1 block">
              Jan – Jun 2026
            </span>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Warranty Status</span>
            <span className="text-emerald-700 font-semibold text-lg mt-1 block">
              24 Mo. Active
            </span>
          </div>
        </div>

        {/* Narrative & Before/After */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif-luxury text-3xl font-light text-stone-900">
              Architectural Concept & Realization
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed font-light">
              {project.tagline}. Every detail of this private residence was custom manufactured by the IPA team. Structural modifications were carried out to allow maximum natural light into the lateral reception rooms, while custom double acoustic pivot doors provide peaceful zoning.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed font-light">
              Materials were curated directly with European fabricators: bookmatched Italian marble from Carrara quarries, smoked European oak millwork, and aged patinated bronze ironmongery.
            </p>

            <div className="pt-4 border-t border-[#EDE8E1]">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 block mb-2">
                Turnkey Scope of Delivery
              </span>
              <ul className="text-xs text-stone-600 space-y-2 font-light list-disc pl-5">
                <li>Architectural structural engineering, MEP fit-out, and laser spatial survey.</li>
                <li>Full-height bespoke millwork, dressing suites, and concealed bar joinery.</li>
                <li>Direct stone importation, slab cutting, and bookmatching installation.</li>
                <li>Lutron architectural lighting integration and motorized acoustic drapery.</li>
              </ul>
            </div>
          </div>

          {/* Before & After Interactive Slider */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#801D31] font-semibold block">
              Interactive Transformation
            </span>
            <div className="relative aspect-[4/3] w-full overflow-hidden select-none border border-[#EDE8E1] rounded-[2px] bg-stone-100 shadow-sm">
              <img
                src={project.afterImage || project.heroImage}
                alt="After"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={project.beforeImage || project.heroImage}
                  alt="Before"
                  className="absolute inset-y-0 left-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%', height: '100%', minWidth: '100%' }}
                />
                <div className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest text-white bg-black/70 px-2.5 py-1 border border-white/20">
                  Raw Shell
                </div>
              </div>

              <div className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest text-stone-900 bg-white/95 px-2.5 py-1 border border-[#EDE8E1]">
                Delivered
              </div>

              {/* Slider Line */}
              <div
                className="absolute inset-y-0 w-0.5 bg-[#801D31] cursor-ew-resize z-20 shadow-md"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-[#801D31] shadow-md flex items-center justify-center text-[#801D31]">
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
            <div className="text-[11px] font-mono text-stone-400 text-center">
              Drag slider to inspect turnkey transformation
            </div>
          </div>
        </div>

        {/* Spatial Room Breakdown if available */}
        {project.rooms.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-[#EDE8E1]">
            <h2 className="font-serif-luxury text-3xl font-light text-stone-900">
              Configured Spatial Areas
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {project.rooms.map((room) => (
                <div key={room.id} className="p-6 bg-white border border-[#EDE8E1] rounded-[2px] space-y-4">
                  <div className="aspect-[16/9] overflow-hidden bg-stone-100 border border-[#EDE8E1] rounded-[2px]">
                    <img src={room.conceptRenderUrl} alt={room.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif-luxury text-xl text-stone-900 font-light">{room.name}</h3>
                    <div className="text-xs font-mono text-stone-500">
                      <span>{room.floorAreaSqm} m²</span> · <span>{room.ceilingHeightM}m ceiling</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed font-light">{room.designNotes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
