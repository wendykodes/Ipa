import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { IpaDataProvider } from './context/IpaDataContext';
import { MasterNavigation } from './components/navigation/MasterNavigation';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { DesignMySpacePage } from './pages/DesignMySpacePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { MyHomePage } from './pages/MyHomePage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { AuthPage } from './pages/AuthPage';
import { IpaLogo } from './components/IpaLogo';

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 flex flex-col font-sans-ui selection:bg-[#FDF6F8] selection:text-[#801D31]">
      <MasterNavigation />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/design-my-space" element={<DesignMySpacePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/my-home/*" element={<MyHomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Master Architectural Monograph Footer */}
      <footer className="border-t border-[#EDE8E1] bg-white text-stone-600 pt-16 pb-12 px-6 lg:px-12 text-xs">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand Monogram */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <IpaLogo size={34} showTagline={false} />
                <span className="font-serif-luxury text-xl tracking-[0.18em] uppercase text-stone-900 font-light">
                  IPA Interiors
                </span>
              </div>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                International interior architecture, bespoke joinery, and turnkey private residence delivery across East Africa, the UK, and the Emirates.
              </p>
              <div className="text-[10px] font-mono tracking-widest text-[#801D31] uppercase">
                Uganda · United Kingdom · UAE
              </div>
            </div>

            {/* London Studio */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone-900 font-semibold block">
                London Atelier
              </span>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                14 Berkeley Square, Mayfair<br />
                London W1J 5AE, United Kingdom<br />
                <span className="font-mono text-[11px] text-stone-700">+44 20 7946 0888</span>
              </p>
            </div>

            {/* Kampala Headquarters */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone-900 font-semibold block">
                Kampala Headquarters
              </span>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Plot 28 Upper Kololo Terrace, Nakasero Ridge<br />
                Kampala, Uganda<br />
                <span className="font-mono text-[11px] text-stone-700">+256 772 345 678</span>
              </p>
            </div>

            {/* Dubai Representative Office */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone-900 font-semibold block">
                Dubai Office
              </span>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Gate Precinct 4, DIFC<br />
                Dubai, United Arab Emirates<br />
                <span className="font-mono text-[11px] text-stone-700">+971 4 312 8900</span>
              </p>
            </div>
          </div>

          <div className="border-t border-[#EDE8E1] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-stone-500">
            <div>
              © 2026 IPA Interiors International Ltd. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link to="/projects" className="hover:text-stone-900 transition-colors">Projects</Link>
              <Link to="/shop" className="hover:text-stone-900 transition-colors">The Atelier</Link>
              <Link to="/my-home" className="hover:text-stone-900 transition-colors">Client Portal</Link>
              <Link to="/admin" className="hover:text-stone-900 transition-colors">Team Gateway</Link>
              <Link to="/contact" className="hover:text-stone-900 transition-colors">Inquiries</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <IpaDataProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </IpaDataProvider>
  );
}
