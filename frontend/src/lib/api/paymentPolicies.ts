import { apiClient } from './client';

export type PaymentRequirement = 'full_payment' | 'deposit' | 'card_on_file' | 'no_upfront';
export type DepositType = 'percentage' | 'fixed' | null;

export interface PaymentPolicyPayload {
  requirement: PaymentRequirement;
  deposit_type?: DepositType;
  deposit_percent?: number | null;
  deposit_amount?: number | null;
  online_methods?: string[];
  onsite_methods?: string[];
}

export interface PaymentPolicyResponse extends PaymentPolicyPayload {
  id: string;
  shop_id: string;
  listing_id: string | null;
  created_at: string;
  updated_at: string;
}

export const paymentPoliciesApi = {
  async getEffective(listingId?: string) {
    const query = listingId ? `?listing_id=${encodeURIComponent(listingId)}` : '';
    return apiClient.get(`/payment-policies/effective${query}`);
  },

  async upsertShopDefault(payload: PaymentPolicyPayload) {
    return apiClient.put('/payment-policies', payload);
  },

  async upsertListing(payload: PaymentPolicyPayload & { listing_id: string }) {
    return apiClient.put('/payment-policies/listing', payload);
  },

  async deleteListing(listingId: string) {
    return apiClient.delete(`/payment-policies/listing/${encodeURIComponent(listingId)}`);
  },
}; 