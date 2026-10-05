import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIpaData } from '../context/IpaDataContext';
import { formatMoney } from '../types/ipaBrand';
import { Bookmark, ArrowRight, MapPin } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { projects, currency, savedSpaceIds, toggleSaveSpace } = useIpaData();
  const [filterCity, setFilterCity] = useState<string>('All');

  const cities = ['All', 'Kampala', 'London', 'Dubai'];
  const filtered = filterCity === 'All'
    ? projects
    : projects.filter(p => p.location.city.toLowerCase() === filterCity.toLowerCase());

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 text-stone-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        {/* Header */}
        <div className="border-b border-[#EDE8E1] pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#801D31] font-semibold block">
              Architectural Portfolio
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl font-light text-stone-900 tracking-tight">
              Selected Residences & Estates
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl font-light leading-relaxed">
              Private residences, villas, and penthouses designed, engineered, and delivered turnkey across East Africa and the UK.
            </p>
          </div>

          {/* Interactive City Filter Tabs (Functional buttons with active states) */}
          <div className="flex items-center gap-1 p-1 bg-white border border-[#EDE8E1] rounded-[2px]">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setFilterCity(city)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer rounded-[2px] ${
                  filterCity === city
                    ? 'bg-[#801D31] text-white font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF9F6]'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {filtered.map((proj) => {
            const isSaved = savedSpaceIds.includes(proj.id);
            const totalArea = proj.areaSqm || proj.rooms.reduce((acc, r) => acc + (r.floorAreaSqm || 0), 0) || 520;

            return (
              <div
                key={proj.id}
                className="group flex flex-col justify-between border-b border-[#EDE8E1] pb-10 space-y-6"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 border border-[#EDE8E1]">
                  <img
                    src={proj.heroImage}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSaveSpace(proj.id);
                    }}
                    className={`absolute top-4 right-4 p-2.5 backdrop-blur-md transition-colors cursor-pointer border ${
                      isSaved
                        ? 'bg-[#801D31] text-white border-[#801D31]'
                        : 'bg-white/90 text-stone-700 border-[#EDE8E1] hover:text-[#801D31]'
                    }`}
                    title={isSaved ? "Saved to your space" : "Save to my space"}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                    <span>{proj.location.city}</span>
                    <span aria-hidden="true">·</span>
                    <span>{proj.location.address}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{totalArea} m²</span>
                  </div>

                  <Link
                    to={`/projects/${proj.id}`}
                    className="block font-serif-luxury text-3xl font-light text-stone-900 group-hover:text-[#801D31] transition-colors leading-tight"
                  >
                    {proj.title}
                  </Link>

                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 font-light leading-relaxed">
                    {proj.tagline || `Turnkey architectural residence featuring bespoke millwork, imported stone, and comprehensive MEP engineering.`}
                  </p>

                  <div className="pt-3 flex items-center justify-between border-t border-[#EDE8E1] text-xs font-mono">
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Contract Value</span>
                      <span className="text-stone-900 font-semibold text-sm tabular-nums">{formatMoney(proj.totalContractValueUgx, currency)}</span>
                    </div>

                    <Link
                      to={`/projects/${proj.id}`}
                      className="inline-flex items-center gap-2 text-[#801D31] font-semibold uppercase tracking-[0.18em] text-[11px] hover:translate-x-1 transition-transform"
                    >
                      <span>Explore Monograph</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
