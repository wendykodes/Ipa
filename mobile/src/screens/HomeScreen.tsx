import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Sparkles, 
  ArrowUpRight,
  ShieldCheck,
  Send,
  MessageSquare
} from 'lucide-react';

interface MobileHomeScreenProps {
  onNavigateTab: (tab: string) => void;
}

export const MobileHomeScreen: React.FC<MobileHomeScreenProps> = ({ onNavigateTab }) => {
  const [approvedNotification, setApprovedNotification] = useState<boolean>(false);

  return (
    <div className="flex-1 overflow-y-auto bg-[#FAF8F5] pb-24 text-stone-900">
      {/* Top Mobile Bar with Safe Area */}
      <div className="bg-white border-b border-[#EDE8E1] px-5 pt-12 pb-4 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#801D31] font-semibold">
              Residence Status · Live
            </span>
            <h1 className="font-serif-luxury text-2xl font-light text-stone-900 leading-tight">
              The Belgravia Residence
            </h1>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F] animate-pulse" />
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Urgent Action Card (Approvals) */}
        {!approvedNotification ? (
          <div className="p-5 rounded-2xl bg-white border border-[#EED5DC] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#801D31] font-bold">
                Action Required
              </span>
              <span className="text-xs text-stone-400">Version 3.0</span>
            </div>
            <h2 className="font-serif-luxury text-lg text-stone-900 font-medium">
              Great Hall & Formal Lounge Finishes
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              Smoked oak joinery and Paonazzo marble bookmatching are ready for your authorization.
            </p>
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => setApprovedNotification(true)}
                className="flex-1 py-3 bg-[#801D31] text-white text-xs font-semibold uppercase tracking-wider rounded-xl active:scale-95 transition-transform"
              >
                Approve Design
              </button>
              <button
                onClick={() => onNavigateTab('approvals')}
                className="px-4 py-3 bg-[#FAF8F5] text-stone-700 text-xs font-medium border border-[#EDE8E1] rounded-xl"
              >
                Review
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-[#F0F7F4] border border-[#B7E4C7] text-[#2D6A4F] text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Design approved. Fabrication scheduled at Nakasero workshop.</span>
          </div>
        )}

        {/* Live Site Progress */}
        <div className="p-5 rounded-2xl bg-white border border-[#EDE8E1] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-luxury text-lg text-stone-900 font-medium">
              Overall Progress
            </h3>
            <span className="font-mono text-xl font-bold text-[#801D31]">68%</span>
          </div>
          <div className="w-full h-2 bg-[#EDE8E1] rounded-full overflow-hidden">
            <div className="h-full bg-[#801D31] rounded-full" style={{ width: '68%' }} />
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono text-stone-600">
            <div>
              <span className="text-stone-400 text-[10px] block uppercase">Next Handover</span>
              <span className="font-bold text-stone-900">15 Nov 2026</span>
            </div>
            <div>
              <span className="text-stone-400 text-[10px] block uppercase">Lead Architect</span>
              <span className="font-bold text-stone-900">D. Ssenyonjo</span>
            </div>
          </div>
        </div>

        {/* Daily Site Log */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-luxury text-lg text-stone-900 font-light">
              Today's Site Notes
            </h3>
            <span className="text-[10px] font-mono text-stone-400">Kampala · 14:30 EAT</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#EDE8E1] space-y-2">
            <div className="aspect-video rounded-xl overflow-hidden bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Site update"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-stone-600 pt-1 leading-relaxed">
              Substructure framing completed in the formal lounge. Marble slabs are currently being dry-laid for vein continuity.
            </p>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => onNavigateTab('shop')}
            className="p-4 rounded-2xl bg-white border border-[#EDE8E1] text-left space-y-2 active:bg-stone-50"
          >
            <Sparkles className="w-5 h-5 text-[#801D31]" />
            <div className="text-xs font-semibold text-stone-900">Atelier Shop</div>
            <div className="text-[10px] text-stone-500">Bespoke joinery & stone</div>
          </button>

          <button
            onClick={() => onNavigateTab('messages')}
            className="p-4 rounded-2xl bg-white border border-[#EDE8E1] text-left space-y-2 active:bg-stone-50"
          >
            <MessageSquare className="w-5 h-5 text-[#801D31]" />
            <div className="text-xs font-semibold text-stone-900">Message Team</div>
            <div className="text-[10px] text-stone-500">Direct architect chat</div>
          </button>
        </div>
      </div>
    </div>
  );
};
