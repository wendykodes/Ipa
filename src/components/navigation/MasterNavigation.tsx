import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useIpaData } from '../../context/IpaDataContext';
import { CurrencyCode } from '../../types/ipaBrand';
import { UserRole } from '../../types/ipaDomain';
import { 
  Menu, 
  X, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { IpaLogo } from '../IpaLogo';

export const MasterNavigation: React.FC = () => {
  const location = useLocation();
  const { currentUser, switchRole, currency, setCurrency } = useIpaData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [portalDrawerOpen, setPortalDrawerOpen] = useState<boolean>(false);

  const roles: { role: UserRole; title: string; desc: string }[] = [
    { role: 'customer', title: 'Private Client (My Home)', desc: 'Room plans, material approvals, site progress & payments' },
    { role: 'designer', title: 'Interior Architect', desc: 'Spatial revisions, 3D renderings, finishes & specifications' },
    { role: 'project_manager', title: 'Project Director', desc: 'Site timeline, procurement orders, snags & contractor logistics' },
    { role: 'admin', title: 'Studio Executive', desc: 'Full business OS, contracts, banking reconciliations & global pipeline' }
  ];

  const navLinks = [
    { to: '/projects', label: 'Projects' },
    { to: '/design-my-space', label: 'Design Studio' },
    { to: '/shop', label: 'The Atelier' },
    { to: '/my-home', label: 'My Home' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* STRICT TOP BAR CONTRACT (3 ZONES, 1 ROW) */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#EDE8E1] transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* ZONE 1: BRAND TITLE & EMBLEM */}
          <Link 
            to="/" 
            className="flex items-center gap-3 select-none hover:opacity-85 transition-opacity"
          >
            <IpaLogo size={34} showTagline={false} />
            <span className="font-serif-luxury text-2xl sm:text-[1.65rem] tracking-[0.18em] uppercase text-stone-900 font-light whitespace-nowrap">
              IPA Interiors
            </span>
          </Link>

          {/* ZONE 2: 4-5 TEXT NAVIGATION LINKS (SINGLE-LINE WITH HOVER UNDERLINES) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-xs uppercase tracking-[0.2em] font-medium text-stone-600">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`py-1 transition-colors whitespace-nowrap relative ${
                    active ? 'text-[#801D31] font-semibold' : 'hover:text-stone-900'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span className="absolute -bottom-2 inset-x-0 h-0.5 bg-[#801D31]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ZONE 3: 1-2 PRIMARY ACTIONS */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPortalDrawerOpen(true)}
              className="text-xs uppercase font-mono tracking-[0.18em] text-stone-600 hover:text-stone-900 flex items-center gap-2 py-2 px-1 cursor-pointer transition-colors"
              title="Client Portal & Studio Settings"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#801D31]" />
              <span className="hidden sm:inline">Portal</span>
              <span className="text-[11px] text-stone-400 font-normal">({currency})</span>
            </button>

            <Link
              to="/design-my-space"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-stone-900 hover:bg-[#801D31] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-[2px] transition-all whitespace-nowrap"
            >
              Start Project
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN EDITORIAL DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-[#FAF9F6] border-t border-[#EDE8E1] md:hidden flex flex-col justify-between p-8 overflow-y-auto">
          <div className="space-y-6">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#801D31] font-semibold">
              Navigation
            </span>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif-luxury text-3xl font-light text-stone-900 hover:text-[#801D31] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6 pt-8 border-t border-[#EDE8E1]">
            <Link
              to="/design-my-space"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 bg-[#801D31] text-white text-xs uppercase tracking-[0.22em] font-medium rounded-[2px] flex items-center justify-center gap-2"
            >
              <span>Commission a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setPortalDrawerOpen(true);
              }}
              className="w-full py-3.5 border border-stone-300 text-stone-800 text-xs uppercase tracking-[0.2em] font-medium rounded-[2px]"
            >
              Studio Portal & Currency ({currency})
            </button>

            <div className="text-[11px] font-mono text-stone-400 tracking-wider text-center">
              London · Kampala · Dubai
            </div>
          </div>
        </div>
      )}

      {/* REFINED CLIENT PORTAL & STUDIO SETTINGS SLIDE-OVER */}
      {portalDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-stone-950/40 backdrop-blur-xs transition-opacity"
            onClick={() => setPortalDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FAF9F6] border-l border-[#EDE8E1] shadow-2xl flex flex-col justify-between p-8 z-50">
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-[#EDE8E1] pb-5">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#801D31] font-semibold block">
                    Client & Team Gateway
                  </span>
                  <h3 className="font-serif-luxury text-2xl font-light text-stone-900 mt-1">
                    Studio Access
                  </h3>
                </div>
                <button
                  onClick={() => setPortalDrawerOpen(false)}
                  className="p-2 text-stone-400 hover:text-stone-900 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* CURRENCY SELECTOR */}
              <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-stone-500 block">
                  Regional Currency
                </span>
                <div className="grid grid-cols-5 gap-1.5 p-1 bg-white border border-[#EDE8E1] rounded-[2px]">
                  {(['GBP', 'EUR', 'USD', 'AED', 'UGX'] as CurrencyCode[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`py-2 text-xs font-mono tracking-wider transition-colors cursor-pointer rounded-[2px] ${
                        currency === c
                          ? 'bg-[#801D31] text-white font-semibold'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF9F6]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* ROLE SWITCHER */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-stone-500">
                    Switch Workspace Role
                  </span>
                  <span className="text-[10px] font-mono text-[#801D31] uppercase">
                    Active: {currentUser.role.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-2">
                  {roles.map((r) => {
                    const isCurrent = currentUser.role === r.role;
                    return (
                      <button
                        key={r.role}
                        onClick={() => {
                          switchRole(r.role);
                        }}
                        className={`w-full text-left p-3.5 border transition-all cursor-pointer rounded-[2px] flex items-start justify-between gap-3 ${
                          isCurrent
                            ? 'bg-white border-[#801D31] shadow-xs'
                            : 'bg-white/60 border-[#EDE8E1] hover:bg-white hover:border-stone-400'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-medium ${isCurrent ? 'text-[#801D31]' : 'text-stone-900'}`}>
                              {r.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 leading-relaxed font-light">
                            {r.desc}
                          </p>
                        </div>
                        {isCurrent && (
                          <Check className="w-4 h-4 text-[#801D31] shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* FOOTER ACTIONS */}
            <div className="pt-6 border-t border-[#EDE8E1] space-y-3">
              <Link
                to="/my-home"
                onClick={() => setPortalDrawerOpen(false)}
                className="w-full py-3.5 bg-[#801D31] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-[2px] flex items-center justify-center gap-2 hover:bg-[#6B1727] transition-colors"
              >
                <span>Enter My Home Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/admin"
                onClick={() => setPortalDrawerOpen(false)}
                className="w-full py-3 border border-stone-300 text-stone-700 text-xs uppercase tracking-[0.2em] font-medium rounded-[2px] flex items-center justify-center hover:bg-white transition-colors"
              >
                Team Command Center
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
