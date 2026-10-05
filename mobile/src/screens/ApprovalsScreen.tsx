import React, { useState } from 'react';
import { Check, CheckCircle2, X, MessageSquare, AlertCircle } from 'lucide-react';

export const MobileApprovalsScreen: React.FC = () => {
  const [approvedIds, setApprovedIds] = useState<string[]>([]);
  const [feedbackInput, setFeedbackInput] = useState<string>('');
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);

  const pendingApprovals = [
    {
      id: 'appr-01',
      title: 'Formal Dining Paonazzo Table & Joinery',
      room: 'Dining Atelier',
      version: '3.0',
      designer: 'David Ssenyonjo',
      renderUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
      description: 'Bookmatched Italian marble tabletop with twin fluted smoked oak architectural pedestals.'
    },
    {
      id: 'appr-02',
      title: 'Master Dressing Room Smoked Eucalyptus Closets',
      room: 'Master Suite',
      version: '2.0',
      designer: 'Elena Rossi',
      renderUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      description: 'Concealed LED wash lighting, textured brass pull profiles, and soft suede-lined drawers.'
    }
  ];

  const handleApprove = (id: string) => {
    setApprovedIds([...approvedIds, id]);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#FAF8F5] pb-24 text-stone-900">
      <div className="bg-white border-b border-[#EDE8E1] px-5 pt-12 pb-4 sticky top-0 z-20">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#801D31] font-semibold">
          Design Sign-Offs
        </span>
        <h1 className="font-serif-luxury text-2xl font-light text-stone-900">
          Approvals
        </h1>
      </div>

      <div className="p-5 space-y-6">
        <p className="text-xs text-stone-600 leading-relaxed font-light">
          Review and approve room renders and joinery drawings to release them for workshop fabrication.
        </p>

        {pendingApprovals.map((appr) => {
          const isDone = approvedIds.includes(appr.id);

          return (
            <div
              key={appr.id}
              className={`p-5 rounded-3xl bg-white border transition-all space-y-4 ${
                isDone ? 'border-[#B7E4C7]' : 'border-[#EDE8E1] shadow-xs'
              }`}
            >
              <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100">
                <img src={appr.renderUrl} alt={appr.title} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#801D31] font-semibold">{appr.room}</span>
                  <span className="text-stone-400">v{appr.version} · {appr.designer}</span>
                </div>
                <h3 className="font-serif-luxury text-lg font-medium text-stone-900">
                  {appr.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  {appr.description}
                </p>
              </div>

              {isDone ? (
                <div className="p-3 rounded-xl bg-[#F0F7F4] text-[#2D6A4F] text-xs flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Approved · Workshop PO Generated</span>
                </div>
              ) : (
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => handleApprove(appr.id)}
                    className="flex-1 py-3 rounded-xl bg-[#801D31] text-white text-xs font-semibold uppercase tracking-wider active:scale-95 transition-transform flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve Specification</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
