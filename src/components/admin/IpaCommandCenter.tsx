import React, { useState } from 'react';
import { useIpaData } from '../../context/IpaDataContext';
import { formatMoney } from '../../types/ipaBrand';
import { 
  Users, 
  Briefcase, 
  Truck, 
  CreditCard, 
  Check, 
  AlertCircle
} from 'lucide-react';

export const IpaCommandCenter: React.FC = () => {
  const { 
    currentUser, 
    projects, 
    leads, 
    updateLeadStage, 
    currency, 
    updateProcurementStatus, 
    resolveSnag
  } = useIpaData();

  const [activeModule, setActiveModule] = useState<'crm' | 'projects' | 'procurement' | 'financials'>('crm');

  const totalPipelineUgx = leads.reduce((sum, l) => sum + l.estimatedBudgetUgx, 0);
  const totalBilledUgx = projects.reduce((sum, p) => sum + p.totalContractValueUgx, 0);
  const totalCollectedUgx = projects.reduce((sum, p) => sum + p.totalPaidUgx, 0);

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 text-stone-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-10">
        {/* 1. Header with Operational Status */}
        <div className="p-8 sm:p-10 bg-white border border-[#EDE8E1] rounded-[2px] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider">
              <span className="text-[#801D31] font-semibold">Studio Operations OS</span>
              <span aria-hidden="true">·</span>
              <span>Role: {currentUser.role.replace('_', ' ')}</span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light text-stone-900 tracking-tight">
              Executive Command Center
            </h1>

            <p className="text-xs text-stone-500 font-light">
              Global estate delivery pipeline, client CRM, procurement logistics & financial ledger.
            </p>
          </div>

          {/* Financial KPI summary */}
          <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l border-[#EDE8E1] pt-4 md:pt-0 md:pl-10">
            <div>
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Gross Contracted</div>
              <div className="font-mono text-xl font-semibold text-stone-900 tabular-nums mt-0.5">
                {formatMoney(totalBilledUgx, currency)}
              </div>
            </div>
            <div className="h-10 w-px bg-[#EDE8E1]" />
            <div>
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Settled Capital</div>
              <div className="font-mono text-xl font-semibold text-emerald-800 tabular-nums mt-0.5">
                {formatMoney(totalCollectedUgx, currency)}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Command Navigation Modules (Clean segmented control) */}
        <div className="flex items-center gap-1 p-1 bg-white border border-[#EDE8E1] rounded-[2px] overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveModule('crm')}
            className={`px-4 py-2.5 transition-colors flex items-center gap-2 cursor-pointer rounded-[2px] whitespace-nowrap ${
              activeModule === 'crm'
                ? 'bg-[#801D31] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF9F6]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Private Inquiries & CRM</span>
            <span className="text-[10px] text-stone-400">({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveModule('projects')}
            className={`px-4 py-2.5 transition-colors flex items-center gap-2 cursor-pointer rounded-[2px] whitespace-nowrap ${
              activeModule === 'projects'
                ? 'bg-[#801D31] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF9F6]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Active Residences</span>
            <span className="text-[10px] text-stone-400">({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveModule('procurement')}
            className={`px-4 py-2.5 transition-colors flex items-center gap-2 cursor-pointer rounded-[2px] whitespace-nowrap ${
              activeModule === 'procurement'
                ? 'bg-[#801D31] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF9F6]'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>International Orders</span>
          </button>

          <button
            onClick={() => setActiveModule('financials')}
            className={`px-4 py-2.5 transition-colors flex items-center gap-2 cursor-pointer rounded-[2px] whitespace-nowrap ${
              activeModule === 'financials'
                ? 'bg-[#801D31] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF9F6]'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Wire Drawdowns</span>
          </button>
        </div>

        {/* MODULE 1: CRM LEAD PIPELINE */}
        {activeModule === 'crm' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#EDE8E1] pb-4">
              <div>
                <h2 className="font-serif-luxury text-2xl font-light text-stone-900">
                  Private Client Inquiries & Registrations
                </h2>
                <p className="text-xs text-stone-500 font-light mt-0.5">
                  Total Active Pipeline: <strong className="text-[#801D31] font-mono tabular-nums">{formatMoney(totalPipelineUgx, currency)}</strong>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-6 bg-white border border-[#EDE8E1] rounded-[2px] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif-luxury text-xl text-stone-900 font-light">
                        {lead.fullName}
                      </h3>
                      <span className="text-[10px] font-mono text-stone-400">· {lead.source}</span>
                    </div>

                    <p className="text-xs text-stone-600 font-light">
                      {lead.projectScope} ({lead.propertyLocation})
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 font-mono pt-1">
                      <span>{lead.email}</span>
                      <span>·</span>
                      <span>{lead.phone}</span>
                      <span>·</span>
                      <span className="text-stone-800 font-semibold">Liaison: {lead.assignedTeamMember}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-6 shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] uppercase text-stone-400 font-mono block">Estimated Allocation</span>
                      <div className="font-mono text-base font-semibold text-stone-900 tabular-nums">
                        {formatMoney(lead.estimatedBudgetUgx, currency)}
                      </div>
                    </div>

                    {/* Stage Switcher */}
                    <select
                      value={lead.stage}
                      onChange={(e) => updateLeadStage(lead.id, e.target.value as any)}
                      className="px-3.5 py-2.5 bg-[#FAF9F6] border border-[#EDE8E1] rounded-[2px] text-xs font-mono text-stone-800 focus:outline-none focus:border-[#801D31]"
                    >
                      <option value="new_lead">New inquiry</option>
                      <option value="contacted">Contacted</option>
                      <option value="consultation_scheduled">Consultation scheduled</option>
                      <option value="proposal_sent">Proposal issued</option>
                      <option value="contract_won">Commission won</option>
                      <option value="nurture">Nurturing</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 2: PROJECTS & SNAGGING */}
        {activeModule === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#EDE8E1] pb-4">
              <h2 className="font-serif-luxury text-2xl font-light text-stone-900">
                Active Residential Fit-outs
              </h2>
              <span className="text-xs font-mono text-stone-500">{projects.length} Commissions in Execution</span>
            </div>

            <div className="space-y-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-8 bg-white border border-[#EDE8E1] rounded-[2px] space-y-6 shadow-xs"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#EDE8E1]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#801D31] font-semibold">{proj.projectCode}</span>
                        <h3 className="font-serif-luxury text-2xl text-stone-900 font-light">
                          {proj.title}
                        </h3>
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5 font-mono">
                        Client: {proj.clientName} · Lead: {proj.leadArchitect}
                      </div>
                    </div>

                    <div className="text-xs font-mono uppercase tracking-wider text-stone-600">
                      Stage: <strong className="text-[#801D31]">{proj.stage.replace(/_/g, ' ')}</strong>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-stone-500">
                      <span>Milestone Execution</span>
                      <span className="text-stone-900 font-semibold tabular-nums">{proj.progressPercentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-100 overflow-hidden rounded-[1px]">
                      <div className="h-full bg-[#801D31]" style={{ width: `${proj.progressPercentage}%` }} />
                    </div>
                  </div>

                  {/* Snags Management */}
                  {proj.snags.length > 0 && (
                    <div className="pt-4 border-t border-[#EDE8E1] space-y-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-stone-700 block">
                        On-Site Quality Checks ({proj.snags.filter(s => s.status !== 'verified_by_architect').length} open)
                      </span>
                      <div className="space-y-2">
                        {proj.snags.map((snag) => (
                          <div
                            key={snag.id}
                            className="p-3 bg-[#FAF9F6] border border-[#EDE8E1] text-xs flex items-center justify-between rounded-[2px]"
                          >
                            <div className="space-y-0.5">
                              <span className="font-medium text-stone-800">{snag.description}</span>
                              <div className="text-[10px] font-mono text-stone-400">Severity: {snag.severity.replace('_', ' ')} · Logged {snag.loggedDate}</div>
                            </div>
                            {snag.status === 'verified_by_architect' ? (
                              <span className="text-emerald-700 font-mono text-[11px] font-semibold">Verified</span>
                            ) : (
                              <button
                                onClick={() => resolveSnag(proj.id, snag.id)}
                                className="px-3 py-1 bg-stone-900 text-white text-[10px] uppercase font-mono rounded-[2px] cursor-pointer hover:bg-[#801D31]"
                              >
                                Sign off
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 3: PROCUREMENT */}
        {activeModule === 'procurement' && (
          <div className="space-y-6">
            <div className="border-b border-[#EDE8E1] pb-4">
              <h2 className="font-serif-luxury text-2xl font-light text-stone-900">
                International Material Procurement Orders
              </h2>
              <p className="text-xs text-stone-500 font-light mt-0.5">
                Container freight tracking, custom clearance, and atelier joinery delivery status.
              </p>
            </div>

            <div className="space-y-4">
              {projects.flatMap(p => p.procurementItems).map((po) => (
                <div
                  key={po.id}
                  className="p-6 bg-white border border-[#EDE8E1] rounded-[2px] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="text-[10px] font-mono uppercase text-[#801D31] tracking-wider font-semibold">
                      {po.poNumber} · {po.supplierLocation}
                    </div>
                    <h3 className="font-serif-luxury text-xl text-stone-900 font-light">
                      {po.itemDescription}
                    </h3>
                    <div className="text-xs font-mono text-stone-500">
                      Supplier: {po.supplierName} · Ref: {po.trackingReference}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-6">
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-stone-400 block">Total Item Cost</span>
                      <span className="font-mono text-base font-semibold text-stone-900 tabular-nums">
                        {formatMoney(po.totalCostUgx, currency)}
                      </span>
                    </div>

                    <select
                      value={po.status}
                      onChange={(e) => updateProcurementStatus(projects[0].id, po.id, e.target.value as any)}
                      className="px-3.5 py-2.5 bg-[#FAF9F6] border border-[#EDE8E1] rounded-[2px] text-xs font-mono text-stone-800 focus:outline-none focus:border-[#801D31]"
                    >
                      <option value="po_drafted">Drafted</option>
                      <option value="supplier_confirmed">Supplier Confirmed</option>
                      <option value="freight_in_transit">Freight in Transit</option>
                      <option value="customs_cleared">Customs Cleared</option>
                      <option value="delivered_to_site">Delivered to Site</option>
                      <option value="installed_and_checked">Installed & Checked</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 4: FINANCIAL DRAWDOWN LEDGER */}
        {activeModule === 'financials' && (
          <div className="space-y-6">
            <div className="border-b border-[#EDE8E1] pb-4">
              <h2 className="font-serif-luxury text-2xl font-light text-stone-900">
                Milestone Drawdowns & Wire Reconciliations
              </h2>
              <p className="text-xs text-stone-500 font-light mt-0.5">
                Executive view of all issued, settled, and draft client drawdown invoices across active residences.
              </p>
            </div>

            <div className="space-y-4">
              {projects.flatMap(p => p.invoices).map((inv) => (
                <div
                  key={inv.id}
                  className="p-6 bg-white border border-[#EDE8E1] rounded-[2px] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="text-[10px] font-mono uppercase text-[#801D31] tracking-wider font-semibold">
                      {inv.invoiceNumber} · Due {inv.dueDate}
                    </div>
                    <h3 className="font-serif-luxury text-xl text-stone-900 font-light">
                      {inv.title}
                    </h3>
                    <p className="text-xs text-stone-500 font-light">
                      {inv.milestoneDescription}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-stone-400 block">Milestone Amount</span>
                      <span className="font-mono text-base font-semibold text-stone-900 tabular-nums">
                        {formatMoney(inv.amountUgx, currency)}
                      </span>
                    </div>

                    <span className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-[2px] ${
                      inv.status === 'paid_in_full'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-600/30 font-semibold'
                        : 'bg-[#FAF9F6] text-stone-700 border border-[#EDE8E1]'
                    }`}>
                      {inv.status === 'paid_in_full' ? 'Settled' : 'Outstanding'}
                    </span>
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
