import { apiClient } from './client';

export type TimeUnit = 'hours' | 'days' | 'day';
export type RefundType = 'percentage' | 'full_deposit' | 'half_deposit' | 'no_penalty' | 'with_penalty';
export type PaymentType = 'full_payment' | 'deposit' | 'card_on_file';

export interface CancellationRulePayload {
  payment_type: PaymentType;
  cancel_time: number;
  time_unit: TimeUnit;
  refund_type: RefundType;
  refund_value?: number | null;
  sort_order?: number;
}

export interface CancellationPolicyPayload {
  allow_free_cancellation: boolean;
  rules: CancellationRulePayload[];
}

export interface CancellationPolicyResponse {
  policy: {
    id: number | string;
    shop_id: string;
    service_id: string | null;
    allow_free_cancellation: boolean;
    created_at: string;
    updated_at: string;
  } | null;
  rules: CancellationRulePayload[];
}

export const cancellationPoliciesApi = {
  async getEffective(serviceId?: string): Promise<CancellationPolicyResponse> {
    const query = serviceId ? `?service_id=${encodeURIComponent(serviceId)}` : '';
    return apiClient.get(`/cancellation-policies/effective${query}`);
  },

  async upsertShopDefault(payload: CancellationPolicyPayload): Promise<CancellationPolicyResponse> {
    return apiClient.put('/cancellation-policies', payload);
  },

  async upsertService(serviceId: string, payload: CancellationPolicyPayload): Promise<CancellationPolicyResponse> {
    return apiClient.put('/cancellation-policies/service', { service_id: serviceId, ...payload });
  },

  async deleteService(serviceId: string): Promise<void> {
    return apiClient.delete(`/cancellation-policies/service/${encodeURIComponent(serviceId)}`);
  },
}; 