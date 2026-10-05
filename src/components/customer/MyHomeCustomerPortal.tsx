import React, { useState } from 'react';
import { useIpaData } from '../../context/IpaDataContext';
import { formatMoney } from '../../types/ipaBrand';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Check, 
  X, 
  ExternalLink,
  Bookmark,
  Share2,
  Gift,
  ArrowRight
} from 'lucide-react';

interface MyHomeCustomerPortalProps {
  initialSection?: 'overview' | 'design_approvals' | 'change_orders' | 'finances' | 'saved_vault' | 'aftercare';
}

export const MyHomeCustomerPortal: React.FC<MyHomeCustomerPortalProps> = ({
  initialSection = 'overview'
}) => {
  const { 
    currentUser, 
    activeProject, 
    currency, 
    products, 
    savedProductIds, 
    toggleSaveProduct,
    approveDesignVersion, 
    requestDesignRevision, 
    approveChangeOrder, 
    recordInvoicePayment,
    referrals 
  } = useIpaData();

  const [activeSection, setActiveSection] = useState<'overview' | 'design_approvals' | 'change_orders' | 'finances' | 'saved_vault' | 'aftercare'>(initialSection);
  const [revisionComment, setRevisionComment] = useState<string>('');
  const [selectedVersionForRevision, setSelectedVersionForRevision] = useState<string | null>(null);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState<string | null>(null);

  // Find saved products
  const savedProductsList = products.filter(p => savedProductIds.includes(p.id));

  const handleApproveDesign = (versionId: string) => {
    approveDesignVersion(activeProject.id, versionId, currentUser.name);
  };

  const handleSendRevision = (versionId: string) => {
    if (!revisionComment.trim()) return;
    requestDesignRevision(activeProject.id, versionId, revisionComment);
    setRevisionComment('');
    setSelectedVersionForRevision(null);
  };

  const handlePayInvoice = (invoiceId: string) => {
    recordInvoicePayment(activeProject.id, invoiceId, 'Bank Wire (Stanbic/Barclays)');
    setPaymentSuccessMessage(`Payment recorded successfully. Bank receipt issued.`);
    setTimeout(() => setPaymentSuccessMessage(null), 3500);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 text-stone-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-10">
        {/* 1. Header with Residence Identity */}
        <div className="p-8 sm:p-10 bg-white border border-[#EDE8E1] rounded-[2px] flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-xs">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider">
              <span className="text-[#801D31] font-semibold">Private Residence Portal</span>
              <span aria-hidden="true">·</span>
              <span>Project #{activeProject.projectCode}</span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light text-stone-900 tracking-tight">
              {activeProject.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600 font-light">
              <span className="font-medium text-stone-900">{currentUser.name}</span>
              <span className="text-stone-300">·</span>
              <span>{activeProject.location.address}</span>
              <span className="text-stone-300">·</span>
              <span className="text-stone-500">Lead Architect: {activeProject.leadArchitect}</span>
            </div>
          </div>

          {/* Financial & Completion Metrics */}
          <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l border-[#EDE8E1] pt-6 md:pt-0 md:pl-10">
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-stone-400">Execution Progress</div>
              <div className="font-serif-luxury text-3xl text-[#801D31] font-light mt-0.5">
                {activeProject.progressPercentage}%
              </div>
              <div className="text-[11px] font-mono text-stone-500 mt-0.5">Handover: {activeProject.targetHandoverDate}</div>
            </div>

            <div className="h-12 w-px bg-[#EDE8E1]" />

            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-stone-400">Total Contract</div>
              <div className="font-mono text-xl text-stone-900 font-semibold mt-0.5 tabular-nums">
                {formatMoney(activeProject.totalContractValueUgx, currency)}
              </div>
              <div className="text-[11px] font-mono text-emerald-700 mt-0.5 tabular-nums">
                {formatMoney(activeProject.totalPaidUgx, currency)} settled
              </div>
            </div>
          </div>
        </div>

        {paymentSuccessMessage && (
          <div className="p-4 bg-white border-l-2 border-emerald-600 border border-[#EDE8E1] text-emerald-800 text-xs flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{paymentSuccessMessage}</span>
          </div>
        )}

        {/* 2. Customer Navigation Tabs (Clean segmented control) */}
        <div className="flex items-center gap-1 p-1 bg-white border border-[#EDE8E1] rounded-[2px] overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveSection('overview')}
            className={`px-4 py-2.5 transition-colors cursor-pointer rounded-[2px] whitespace-nowrap ${
              activeSection === 'overview'
                ? 'bg-[#801D31] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF9F6]'
            }`}
          >
            Residence Rooms
          </button>

          <button
            onClick={() => setActiveSection('design_approvals')}
            className={`px-4 py-2.5 transition-colors flex items-center gap-2 cursor-pointer rounded-[2px] whitespace-nowrap ${
              activeSection === 'design_approvals'
                ? 'bg-[#801D31] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF9F6]'
            }`}
          >
            <span>Design Approvals</span>
            {activeProject.designVersions.some(v => v.status === 'shared_with_client') && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            )}
          </button>

          <button
            onClick={() => setActiveSection('change_orders')}
            className={`px-4 py-2.5 transition-colors flex items-center gap-2 cursor-pointer rounded-[2px] whitespace-nowrap ${
              activeSection === 'change_orders'
                ? 'bg-[#801D31] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF9F6]'
            }`}
          >
            <span>Change Authorizations</span>
            {activeProject.changeOrders.some(c => c.status === 'pending_client_approval') && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            )}
          </button>

          <button
            onClick={() => setActiveSection('finances')}
            className={`px-4 py-2.5 transition-colors cursor-pointer rounded-[2px] whitespace-nowrap ${
              activeSection === 'finances'
                ? 'bg-[#801D31] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF9F6]'
            }`}
          >
            Milestone Invoices
          </button>

          <button
            onClick={() => setActiveSection('saved_vault')}
            className={`px-4 py-2.5 transition-colors flex items-center gap-2 cursor-pointer rounded-[2px] whitespace-nowrap ${
              activeSection === 'saved_vault'
                ? 'bg-[#801D31] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF9F6]'
            }`}
          >
            <span>Saved Specifications</span>
            <span className="text-[10px] text-stone-400">({savedProductsList.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('aftercare')}
            className={`px-4 py-2.5 transition-colors cursor-pointer rounded-[2px] whitespace-nowrap ${
              activeSection === 'aftercare'
                ? 'bg-[#801D31] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF9F6]'
            }`}
          >
            Warranty & Aftercare
          </button>
        </div>

        {/* SECTION: OVERVIEW (ROOMS) */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#EDE8E1] pb-4">
              <div>
                <h2 className="font-serif-luxury text-2xl font-light text-stone-900">
                  Spatial Areas & Room Progression
                </h2>
                <p className="text-xs text-stone-500 font-light mt-0.5">
                  Detailed status of architectural finishes, bespoke joinery, and fittings across each room.
                </p>
              </div>
              <span className="text-xs text-stone-500 font-mono">
                {activeProject.rooms.length} Configured Areas
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {activeProject.rooms.map((room) => {
                const statusLabel = room.status === 'in_production' ? 'In Fabrication' : room.status === 'client_review' ? 'Awaiting Signoff' : 'Installed';
                return (
                  <div
                    key={room.id}
                    className="p-6 bg-white border border-[#EDE8E1] rounded-[2px] space-y-5 hover:border-stone-400 transition-colors shadow-xs"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-stone-100 border border-[#EDE8E1]">
                      <img
                        src={room.conceptRenderUrl}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 bg-white/95 backdrop-blur-md text-[10px] font-mono uppercase text-stone-900 font-semibold border border-[#EDE8E1]">
                        {statusLabel}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif-luxury text-2xl text-stone-900 font-light">
                        {room.name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-stone-500 font-mono">
                        <span className="tabular-nums">{room.floorAreaSqm} m² floor area</span>
                        <span className="text-stone-300">·</span>
                        <span className="tabular-nums">{room.ceilingHeightM}m ceiling clearance</span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed font-light">
                        {room.designNotes}
                      </p>
                    </div>

                    {/* Key Specified Products */}
                    <div className="pt-3 border-t border-[#EDE8E1] space-y-2">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">
                        Specified Atelier Millwork & Fixtures
                      </span>
                      {room.keyProducts.map((kp, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-[#FAF9F6] border border-[#EDE8E1] text-xs flex items-center justify-between rounded-[2px]"
                        >
                          <span className="text-stone-800 font-medium">{kp.productTitle}</span>
                          <span className="text-[10px] font-mono text-[#801D31] uppercase">
                            {kp.status === 'delivered' ? 'Delivered to site' : kp.status === 'installed' ? 'Fitted' : 'In Production'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION: DESIGN VERSION APPROVALS */}
        {activeSection === 'design_approvals' && (
          <div className="space-y-6">
            <div className="border-b border-[#EDE8E1] pb-4">
              <h2 className="font-serif-luxury text-2xl font-light text-stone-900">
                Architectural Sign-offs & Render Approvals
              </h2>
              <p className="text-xs text-stone-500 font-light mt-0.5">
                Review and approve 3D spatial models and material specifications to authorize trade fabrication.
              </p>
            </div>

            <div className="space-y-6">
              {activeProject.designVersions.map((version) => {
                const isApproved = version.status === 'approved';
                const statusText = isApproved ? 'Signed & Authorized' : version.status === 'shared_with_client' ? 'Pending Client Approval' : 'Archived Iteration';
                return (
                  <div
                    key={version.id}
                    className={`p-6 sm:p-8 bg-white border rounded-[2px] transition-all ${
                      isApproved 
                        ? 'border-emerald-600/40 shadow-xs' 
                        : 'border-[#801D31]/40 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EDE8E1]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-[#801D31] font-semibold">
                            v{version.versionNumber}.0
                          </span>
                          <h3 className="font-serif-luxury text-xl text-stone-900 font-light">
                            {version.title}
                          </h3>
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5 font-mono">
                          Created {version.createdAt} · Architect: {version.createdByDesigner}
                        </div>
                      </div>

                      <div className="text-xs font-mono uppercase tracking-wider text-stone-700">
                        Status: <strong className={isApproved ? 'text-emerald-700' : 'text-[#801D31]'}>{statusText}</strong>
                      </div>
                    </div>

                    {/* Render preview */}
                    <div className="grid sm:grid-cols-2 gap-4 py-5">
                      {version.renderUrls.map((url, i) => (
                        <div key={i} className="aspect-video overflow-hidden bg-stone-100 border border-[#EDE8E1] rounded-[2px]">
                          <img src={url} alt="Room design render" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>

                    {version.revisionComment && (
                      <div className="p-4 bg-[#FAF9F6] border border-[#EDE8E1] text-xs text-stone-700 rounded-[2px]">
                        <strong className="text-[#801D31] block mb-1">Client Revision Directive:</strong>
                        {version.revisionComment}
                      </div>
                    )}

                    {isApproved ? (
                      <div className="text-xs text-emerald-800 flex items-center gap-2 pt-3 font-mono">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Authorized on {version.approvedAt} by {version.approvedBy}</span>
                      </div>
                    ) : (
                      <div className="pt-4 flex flex-wrap items-center gap-4">
                        <button
                          onClick={() => handleApproveDesign(version.id)}
                          className="px-6 py-3 bg-[#801D31] hover:bg-[#6B1727] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-[2px] transition-all cursor-pointer flex items-center gap-2 shadow-xs"
                        >
                          <Check className="w-4 h-4" />
                          <span>Approve This Specification</span>
                        </button>

                        <button
                          onClick={() => setSelectedVersionForRevision(version.id)}
                          className="px-6 py-3 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs uppercase tracking-[0.18em] font-medium rounded-[2px] transition-all cursor-pointer"
                        >
                          Request Revision
                        </button>
                      </div>
                    )}

                    {/* Revision Modal / Input Box */}
                    {selectedVersionForRevision === version.id && (
                      <div className="mt-4 p-5 bg-[#FAF9F6] border border-[#EDE8E1] space-y-3 rounded-[2px]">
                        <span className="text-xs font-mono uppercase tracking-wider text-stone-700 block">
                          Revision Instructions for Lead Architect
                        </span>
                        <textarea
                          rows={3}
                          value={revisionComment}
                          onChange={(e) => setRevisionComment(e.target.value)}
                          placeholder="e.g. Please alter the joinery finish in the master dressing suite from natural oak to smoked eucalyptus."
                          className="w-full p-3 bg-white border border-[#EDE8E1] text-xs text-stone-900 focus:outline-none focus:border-[#801D31] rounded-[2px]"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setSelectedVersionForRevision(null)}
                            className="px-4 py-2 border border-stone-300 bg-white text-xs uppercase tracking-wider rounded-[2px] cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSendRevision(version.id)}
                            className="px-5 py-2 bg-[#801D31] text-white text-xs uppercase tracking-wider rounded-[2px] cursor-pointer font-medium"
                          >
                            Transmit Directives
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION: CHANGE ORDERS */}
        {activeSection === 'change_orders' && (
          <div className="space-y-6">
            <div className="border-b border-[#EDE8E1] pb-4">
              <h2 className="font-serif-luxury text-2xl font-light text-stone-900">
                Change Orders & Material Variations
              </h2>
              <p className="text-xs text-stone-500 font-light mt-0.5">
                Authorized variations to materials, stone slabs, or spatial layouts recorded during fabrication.
              </p>
            </div>

            <div className="space-y-4">
              {activeProject.changeOrders.map((co) => (
                <div
                  key={co.id}
                  className="p-6 bg-white border border-[#EDE8E1] rounded-[2px] space-y-4 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EDE8E1] pb-3">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-[#801D31] tracking-wider font-semibold">
                        {co.changeOrderNumber} · {co.reason.replace('_', ' ')}
                      </div>
                      <h3 className="font-serif-luxury text-xl text-stone-900 font-light mt-0.5">
                        {co.title}
                      </h3>
                    </div>
                    <div className="text-xs font-mono uppercase text-stone-600">
                      Cost Delta: <strong className="text-stone-900 font-semibold tabular-nums">+{formatMoney(co.costDeltaUgx, currency)}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed font-light">
                    {co.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono bg-[#FAF9F6] p-4 border border-[#EDE8E1] rounded-[2px]">
                    <div>
                      <span className="text-stone-400 block uppercase text-[10px]">Previous Scope</span>
                      <span className="text-stone-800">{co.originalScope}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block uppercase text-[10px]">Revised Approved Scope</span>
                      <span className="text-stone-900 font-medium">{co.revisedScope}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-xs font-mono">
                    <span className="text-stone-500">Requested by: {co.requestedBy}</span>
                    {co.status === 'pending_client_approval' ? (
                      <button
                        onClick={() => approveChangeOrder(activeProject.id, co.id)}
                        className="px-5 py-2.5 bg-[#801D31] text-white text-xs uppercase tracking-wider font-medium rounded-[2px] cursor-pointer"
                      >
                        Authorize Variation
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-semibold uppercase">Authorized & Active</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION: FINANCES (INVOICES) */}
        {activeSection === 'finances' && (
          <div className="space-y-6">
            <div className="border-b border-[#EDE8E1] pb-4">
              <h2 className="font-serif-luxury text-2xl font-light text-stone-900">
                Milestone Drawdowns & Wire Reconciliations
              </h2>
              <p className="text-xs text-stone-500 font-light mt-0.5">
                Contract billing schedule linked directly to verifiable construction and procurement milestones.
              </p>
            </div>

            <div className="space-y-4">
              {activeProject.invoices.map((inv) => {
                const isPaid = inv.status === 'paid_in_full';
                return (
                  <div
                    key={inv.id}
                    className="p-6 bg-white border border-[#EDE8E1] rounded-[2px] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs"
                  >
                    <div className="space-y-1.5 max-w-xl">
                      <div className="text-[10px] font-mono uppercase text-[#801D31] tracking-wider font-semibold">
                        {inv.invoiceNumber} · Due {inv.dueDate}
                      </div>
                      <h3 className="font-serif-luxury text-xl text-stone-900 font-light">
                        {inv.title}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed font-light">
                        {inv.milestoneDescription}
                      </p>
                      {isPaid && (
                        <div className="text-[11px] font-mono text-emerald-700 pt-1">
                          Settled via {inv.paymentMethod} · Ref: {inv.transactionReference}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 border-t md:border-t-0 md:border-l border-[#EDE8E1] pt-4 md:pt-0 md:pl-8">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">Milestone Amount</span>
                        <span className="font-mono text-xl font-semibold text-stone-900 tabular-nums">
                          {formatMoney(inv.amountUgx, currency)}
                        </span>
                      </div>

                      {isPaid ? (
                        <div className="px-4 py-2 border border-emerald-600/30 bg-emerald-50 text-emerald-800 text-xs font-mono uppercase tracking-wider font-semibold rounded-[2px]">
                          Settled
                        </div>
                      ) : (
                        <button
                          onClick={() => handlePayInvoice(inv.id)}
                          className="px-6 py-3 bg-[#801D31] hover:bg-[#6B1727] text-white text-xs uppercase tracking-[0.18em] font-medium rounded-[2px] transition-all cursor-pointer whitespace-nowrap"
                        >
                          Execute Wire Remittance
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION: SAVED PIECES VAULT */}
        {activeSection === 'saved_vault' && (
          <div className="space-y-6">
            <div className="border-b border-[#EDE8E1] pb-4">
              <h2 className="font-serif-luxury text-2xl font-light text-stone-900">
                Saved Atelier Pieces & Stone Selections
              </h2>
              <p className="text-xs text-stone-500 font-light mt-0.5">
                Your private moodboard of saved bespoke furniture, stone surfaces, and lighting fixtures.
              </p>
            </div>

            {savedProductsList.length === 0 ? (
              <div className="p-12 bg-white border border-[#EDE8E1] rounded-[2px] text-center space-y-3">
                <Bookmark className="w-8 h-8 text-stone-300 mx-auto" />
                <h3 className="font-serif-luxury text-xl font-light text-stone-900">Your curation is currently empty</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto font-light">
                  Explore The Atelier catalog and bookmark bespoke furniture and lighting pieces to discuss with your architect.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {savedProductsList.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-5 bg-white border border-[#EDE8E1] rounded-[2px] space-y-4 shadow-xs flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 border border-[#EDE8E1]">
                      <img src={prod.heroImage} alt={prod.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => toggleSaveProduct(prod.id)}
                        className="absolute top-3 right-3 p-2 bg-white/95 text-[#801D31] border border-[#EDE8E1] cursor-pointer"
                        title="Remove from saved"
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                        {prod.category} · {prod.provenance.split(',')[0]}
                      </span>
                      <h4 className="font-serif-luxury text-xl font-light text-stone-900">
                        {prod.title}
                      </h4>
                      <div className="font-mono text-sm font-semibold text-stone-900 tabular-nums">
                        {formatMoney(prod.basePriceUgx, currency)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION: WARRANTY & AFTERCARE */}
        {activeSection === 'aftercare' && (
          <div className="space-y-6">
            <div className="border-b border-[#EDE8E1] pb-4">
              <h2 className="font-serif-luxury text-2xl font-light text-stone-900">
                Comprehensive Warranty & White-Glove Care
              </h2>
              <p className="text-xs text-stone-500 font-light mt-0.5">
                Every IPA turnkey fit-out includes a 24-month comprehensive builder warranty and direct concierge access.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#EDE8E1] rounded-[2px] space-y-6 shadow-xs">
              <div className="grid sm:grid-cols-3 gap-6 border-b border-[#EDE8E1] pb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase text-stone-400 block">Warranty Period</span>
                  <span className="font-serif-luxury text-2xl font-light text-stone-900">24 Months Turnkey</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-stone-400 block">Coverage Active Until</span>
                  <span className="font-mono text-sm font-semibold text-[#801D31]">{activeProject.warrantyExpiryDate}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-stone-400 block">Dedicated Liaison</span>
                  <span className="font-mono text-sm font-semibold text-stone-900">{activeProject.projectManager}</span>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-stone-700 block">
                  Bespoke Joinery & Stone Care Manual
                </span>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  Your Italian Calacatta and Arabescato surfaces have been treated with anti-stain micro-penetrating impregnators. For ongoing care, use pH-neutral stone conditioners. All Blum concealed hinge mechanisms in your dressing suite carry lifetime mechanical warranties.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="mailto:aftercare@ipainteriors.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white text-xs uppercase tracking-[0.18em] font-medium rounded-[2px] hover:bg-[#801D31] transition-colors"
                >
                  <span>Contact Private Concierge</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
