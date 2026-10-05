import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  FullProject, 
  CommerceProduct, 
  CrmLead, 
  UserProfile, 
  ReferralRecord,
  UserRole
} from '../types/ipaDomain';
import { 
  INITIAL_PROJECTS, 
  INITIAL_PRODUCTS, 
  INITIAL_LEADS, 
  INITIAL_USER_PROFILES, 
  INITIAL_REFERRALS 
} from '../data/ipaDatabase';
import { CurrencyCode } from '../types/ipaBrand';

interface IpaDataContextType {
  // Current Active Persona
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  switchRole: (role: UserRole) => void;
  
  // Global Currency
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;

  // Domain Entities
  projects: FullProject[];
  activeProject: FullProject;
  setActiveProject: (proj: FullProject) => void;
  products: CommerceProduct[];
  leads: CrmLead[];
  referrals: ReferralRecord[];

  // Saved client spaces / products
  savedProductIds: string[];
  toggleSaveProduct: (id: string) => void;
  savedSpaceIds: string[];
  toggleSaveSpace: (id: string) => void;

  // Mutations
  addLead: (lead: Omit<CrmLead, 'id' | 'createdAt' | 'lastContactedAt'>) => void;
  updateLeadStage: (leadId: string, newStage: CrmLead['stage']) => void;
  approveDesignVersion: (projectId: string, versionId: string, approvedBy: string) => void;
  requestDesignRevision: (projectId: string, versionId: string, comment: string) => void;
  approveChangeOrder: (projectId: string, changeOrderId: string) => void;
  recordInvoicePayment: (projectId: string, invoiceId: string, method: string) => void;
  updateProcurementStatus: (projectId: string, poId: string, status: any) => void;
  updateRoomProductStatus: (projectId: string, roomId: string, productId: string, status: any) => void;
  resolveSnag: (projectId: string, snagId: string) => void;
  submitDesignMySpaceRequest: (data: { roomType: string; style: string; dimensions: string; budgetUgx: number; notes: string }) => void;
}

const IpaDataContext = createContext<IpaDataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROJECTS: 'ipa_estate_projects_v1',
  PRODUCTS: 'ipa_estate_products_v1',
  LEADS: 'ipa_estate_leads_v1',
  SAVED_PRODUCTS: 'ipa_saved_products_v1',
  SAVED_SPACES: 'ipa_saved_spaces_v1',
  CURRENCY: 'ipa_preferred_currency_v1',
  USER_ID: 'ipa_active_user_id_v1'
};

export const IpaDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER_PROFILES[0]);
  const [currency, setCurrencyState] = useState<CurrencyCode>('UGX');
  const [projects, setProjects] = useState<FullProject[]>(INITIAL_PROJECTS);
  const [activeProjectId, setActiveProjectId] = useState<string>(INITIAL_PROJECTS[0].id);
  const [products, setProducts] = useState<CommerceProduct[]>(INITIAL_PRODUCTS);
  const [leads, setLeads] = useState<CrmLead[]>(INITIAL_LEADS);
  const [referrals, setReferrals] = useState<ReferralRecord[]>(INITIAL_REFERRALS);
  const [savedProductIds, setSavedProductIds] = useState<string[]>(['prod-001', 'prod-003']);
  const [savedSpaceIds, setSavedSpaceIds] = useState<string[]>(['proj-kla-01']);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCurr = localStorage.getItem(STORAGE_KEYS.CURRENCY) as CurrencyCode;
      if (savedCurr) setCurrencyState(savedCurr);

      const savedProjs = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (savedProjs) setProjects(JSON.parse(savedProjs));

      const savedLeads = localStorage.getItem(STORAGE_KEYS.LEADS);
      if (savedLeads) setLeads(JSON.parse(savedLeads));

      const savedProdIds = localStorage.getItem(STORAGE_KEYS.SAVED_PRODUCTS);
      if (savedProdIds) setSavedProductIds(JSON.parse(savedProdIds));

      const savedSpIds = localStorage.getItem(STORAGE_KEYS.SAVED_SPACES);
      if (savedSpIds) setSavedSpaceIds(JSON.parse(savedSpIds));
    } catch (e) {
      console.warn('Could not read from local storage', e);
    }
  }, []);

  const setCurrency = (curr: CurrencyCode) => {
    setCurrencyState(curr);
    localStorage.setItem(STORAGE_KEYS.CURRENCY, curr);
  };

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];

  const setActiveProject = (proj: FullProject) => {
    setActiveProjectId(proj.id);
  };

  const switchRole = (role: UserRole) => {
    const found = INITIAL_USER_PROFILES.find(u => u.role === role);
    if (found) {
      setCurrentUser(found);
    } else {
      setCurrentUser({
        ...currentUser,
        role,
        title: role.replace('_', ' ').toUpperCase()
      });
    }
  };

  const toggleSaveProduct = (id: string) => {
    setSavedProductIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem(STORAGE_KEYS.SAVED_PRODUCTS, JSON.stringify(next));
      return next;
    });
  };

  const toggleSaveSpace = (id: string) => {
    setSavedSpaceIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem(STORAGE_KEYS.SAVED_SPACES, JSON.stringify(next));
      return next;
    });
  };

  const addLead = (leadData: Omit<CrmLead, 'id' | 'createdAt' | 'lastContactedAt'>) => {
    const newLead: CrmLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: 'Just now',
      lastContactedAt: 'Awaiting initial outreach'
    };
    const nextLeads = [newLead, ...leads];
    setLeads(nextLeads);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(nextLeads));
  };

  const updateLeadStage = (leadId: string, newStage: CrmLead['stage']) => {
    const nextLeads = leads.map(l => l.id === leadId ? { ...l, stage: newStage, lastContactedAt: 'Just now' } : l);
    setLeads(nextLeads);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(nextLeads));
  };

  const approveDesignVersion = (projectId: string, versionId: string, approvedBy: string) => {
    setProjects(prev => {
      const updated = prev.map(p => {
        if (p.id !== projectId) return p;
        const updatedVersions = p.designVersions.map(v => {
          if (v.id === versionId) {
            return {
              ...v,
              status: 'approved' as const,
              approvedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
              approvedBy
            };
          }
          return v;
        });
        return {
          ...p,
          stage: 'procurement_and_joinery' as const,
          progressPercentage: Math.max(p.progressPercentage, 50),
          designVersions: updatedVersions
        };
      });
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      return updated;
    });
  };

  const requestDesignRevision = (projectId: string, versionId: string, comment: string) => {
    setProjects(prev => {
      const updated = prev.map(p => {
        if (p.id !== projectId) return p;
        const updatedVersions = p.designVersions.map(v => {
          if (v.id === versionId) {
            return {
              ...v,
              status: 'changes_requested' as const,
              revisionComment: comment
            };
          }
          return v;
        });
        return {
          ...p,
          designVersions: updatedVersions
        };
      });
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      return updated;
    });
  };

  const approveChangeOrder = (projectId: string, changeOrderId: string) => {
    setProjects(prev => {
      const updated = prev.map(p => {
        if (p.id !== projectId) return p;
        const co = p.changeOrders.find(c => c.id === changeOrderId);
        if (!co) return p;

        const updatedCos = p.changeOrders.map(c => 
          c.id === changeOrderId ? { ...c, status: 'invoiced_and_active' as const, approvedDate: 'Today' } : c
        );

        // Update project total contract value
        const newTotal = p.totalContractValueUgx + co.costDeltaUgx;

        // Auto-generate financial invoice for the change order
        const newInvoice = {
          id: `inv-co-${Date.now()}`,
          invoiceNumber: `INV-CO-${p.projectCode}-${co.changeOrderNumber}`,
          projectId: p.id,
          title: `Change Order Approved: ${co.title}`,
          milestoneDescription: co.description,
          amountUgx: co.costDeltaUgx,
          status: 'issued' as const,
          dueDate: '14 days'
        };

        return {
          ...p,
          totalContractValueUgx: newTotal,
          changeOrders: updatedCos,
          invoices: [...p.invoices, newInvoice]
        };
      });
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      return updated;
    });
  };

  const recordInvoicePayment = (projectId: string, invoiceId: string, method: string) => {
    setProjects(prev => {
      const updated = prev.map(p => {
        if (p.id !== projectId) return p;
        const targetInv = p.invoices.find(i => i.id === invoiceId);
        if (!targetInv || targetInv.status === 'paid_in_full') return p;

        const updatedInvoices = p.invoices.map(i => {
          if (i.id === invoiceId) {
            return {
              ...i,
              status: 'paid_in_full' as const,
              paidDate: 'Just now',
              paymentMethod: method as any,
              transactionReference: `TX-${Date.now().toString().slice(-8)}`
            };
          }
          return i;
        });

        const newTotalPaid = p.totalPaidUgx + targetInv.amountUgx;

        return {
          ...p,
          totalPaidUgx: newTotalPaid,
          invoices: updatedInvoices
        };
      });
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      return updated;
    });
  };

  const updateProcurementStatus = (projectId: string, poId: string, status: any) => {
    setProjects(prev => {
      const updated = prev.map(p => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          procurementItems: p.procurementItems.map(item => item.id === poId ? { ...item, status } : item)
        };
      });
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      return updated;
    });
  };

  const updateRoomProductStatus = (projectId: string, roomId: string, productId: string, status: any) => {
    setProjects(prev => {
      const updated = prev.map(p => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          rooms: p.rooms.map(r => {
            if (r.id !== roomId) return r;
            return {
              ...r,
              keyProducts: r.keyProducts.map(kp => kp.productId === productId ? { ...kp, status } : kp)
            };
          })
        };
      });
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      return updated;
    });
  };

  const resolveSnag = (projectId: string, snagId: string) => {
    setProjects(prev => {
      const updated = prev.map(p => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          snags: p.snags.map(s => s.id === snagId ? { ...s, status: 'rectified' as const } : s)
        };
      });
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      return updated;
    });
  };

  const submitDesignMySpaceRequest = (data: { roomType: string; style: string; dimensions: string; budgetUgx: number; notes: string }) => {
    addLead({
      fullName: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone,
      source: 'Website Design My Space',
      stage: 'new_lead',
      estimatedBudgetUgx: data.budgetUgx,
      propertyLocation: 'Client Submitted Space',
      projectScope: `${data.roomType} (${data.dimensions}) - Style: ${data.style}`,
      assignedTeamMember: 'Lead Architect',
      notes: data.notes
    });
  };

  return (
    <IpaDataContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        currency,
        setCurrency,
        projects,
        activeProject,
        setActiveProject,
        products,
        leads,
        referrals,
        savedProductIds,
        toggleSaveProduct,
        savedSpaceIds,
        toggleSaveSpace,
        addLead,
        updateLeadStage,
        approveDesignVersion,
        requestDesignRevision,
        approveChangeOrder,
        recordInvoicePayment,
        updateProcurementStatus,
        updateRoomProductStatus,
        resolveSnag,
        submitDesignMySpaceRequest
      }}
    >
      {children}
    </IpaDataContext.Provider>
  );
};

export const useIpaData = () => {
  const context = useContext(IpaDataContext);
  if (!context) {
    throw new Error('useIpaData must be used within an IpaDataProvider');
  }
  return context;
};
