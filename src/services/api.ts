/**
 * Client API Service for IPA Interiors
 * Connects both Web and Mobile client surfaces to the shared IPA API.
 */

const API_BASE = '/api';

export const apiClient = {
  // Health
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  },

  // Auth
  async login(email: string, password?: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  async register(name: string, email: string, phone?: string, role?: string) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, role })
    });
    return res.json();
  },

  async getCurrentUser() {
    const res = await fetch(`${API_BASE}/auth/me`);
    return res.json();
  },

  // Projects
  async getProjects() {
    const res = await fetch(`${API_BASE}/projects`);
    return res.json();
  },

  async getProjectById(id: string) {
    const res = await fetch(`${API_BASE}/projects/${id}`);
    return res.json();
  },

  async approveDesignVersion(projectId: string, versionId: string, approvedBy?: string) {
    const res = await fetch(`${API_BASE}/projects/${projectId}/approvals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ versionId, approvedBy })
    });
    return res.json();
  },

  async approveChangeOrder(projectId: string, orderId: string) {
    const res = await fetch(`${API_BASE}/projects/${projectId}/change-orders/${orderId}/approve`, {
      method: 'POST'
    });
    return res.json();
  },

  async payInvoice(projectId: string, invoiceId: string, paymentMethod?: string) {
    const res = await fetch(`${API_BASE}/projects/${projectId}/invoices/${invoiceId}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentMethod })
    });
    return res.json();
  },

  // Messaging
  async getMessages(projectId: string) {
    const res = await fetch(`${API_BASE}/projects/${projectId}/messages`);
    return res.json();
  },

  async sendMessage(projectId: string, message: string, senderName: string, senderRole: string) {
    const res = await fetch(`${API_BASE}/projects/${projectId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, senderName, senderRole })
    });
    return res.json();
  },

  // Products
  async getProducts(category?: string) {
    const url = category && category !== 'All' 
      ? `${API_BASE}/products?category=${encodeURIComponent(category)}`
      : `${API_BASE}/products`;
    const res = await fetch(url);
    return res.json();
  },

  async getProductById(id: string) {
    const res = await fetch(`${API_BASE}/products/${id}`);
    return res.json();
  },

  // Design Briefs
  async submitDesignBrief(briefData: any) {
    const res = await fetch(`${API_BASE}/design-briefs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(briefData)
    });
    return res.json();
  },

  // CRM Leads
  async getLeads() {
    const res = await fetch(`${API_BASE}/leads`);
    return res.json();
  },

  async updateLeadStage(leadId: string, stage: string) {
    const res = await fetch(`${API_BASE}/leads/${leadId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage })
    });
    return res.json();
  }
};
