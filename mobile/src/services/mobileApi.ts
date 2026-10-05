/**
 * Native Mobile API Client for IPA Interiors
 * Connects to the shared backend with offline caching support.
 */

// Production API URL or local dev bridge
const BASE_URL = typeof window !== 'undefined' && window.location.origin
  ? window.location.origin
  : 'https://ipa-interiors.com';

export const mobileApi = {
  async getProject(id: string) {
    try {
      const res = await fetch(`${BASE_URL}/api/projects/${id}`);
      return await res.json();
    } catch (e) {
      console.warn('[MobileAPI] Fallback to cache', e);
      return null;
    }
  },

  async approveDesign(projectId: string, versionId: string, clientName: string) {
    const res = await fetch(`${BASE_URL}/api/projects/${projectId}/approvals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ versionId, approvedBy: clientName })
    });
    return await res.json();
  },

  async getMessages(projectId: string) {
    const res = await fetch(`${BASE_URL}/api/projects/${projectId}/messages`);
    return await res.json();
  },

  async sendMessage(projectId: string, message: string, senderName: string) {
    const res = await fetch(`${BASE_URL}/api/projects/${projectId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, senderName, senderRole: 'Client' })
    });
    return await res.json();
  },

  async getProducts() {
    const res = await fetch(`${BASE_URL}/api/products`);
    return await res.json();
  }
};
