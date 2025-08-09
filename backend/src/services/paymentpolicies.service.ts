import { supabaseAdmin } from '../util/supabase';
import { PaymentPolicy, PaymentPolicySchema, UpsertPaymentPolicySchema } from '../types/paymentpolicies';

export class PaymentPoliciesService {
  async getEffective(shopId: string, serviceId?: string | null): Promise<PaymentPolicy | null> {
    const query = supabaseAdmin
      .from('payment_policies')
      .select('*')
      .eq('shop_id', shopId)
      .order('service_id', { ascending: false, nullsFirst: false });

    if (serviceId) {
      query.in('service_id', [serviceId, null]);
    } else {
      query.is('service_id', null);
    }

    const { data, error } = await query.limit(1).maybeSingle();
    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data ? PaymentPolicySchema.parse(data) : null;
  }

  async upsertShopDefault(shopId: string, payload: unknown): Promise<PaymentPolicy> {
    const body = UpsertPaymentPolicySchema.parse(payload);

    // Try update existing default (service_id is null)
    const { data: existing, error: selErr } = await supabaseAdmin
      .from('payment_policies')
      .select('id')
      .eq('shop_id', shopId)
      .is('service_id', null)
      .maybeSingle();
    if (selErr && selErr.code !== 'PGRST116') throw new Error(selErr.message);

    if (existing) {
      const { data, error } = await supabaseAdmin
        .from('payment_policies')
        .update({ ...body })
        .eq('shop_id', shopId)
        .is('service_id', null)
        .select('*')
        .single();
      if (error) throw new Error(error.message);
      return PaymentPolicySchema.parse(data);
    } else {
      const { data, error } = await supabaseAdmin
        .from('payment_policies')
        .insert({ shop_id: shopId, service_id: null, ...body })
        .select('*')
        .single();
      if (error) throw new Error(error.message);
      return PaymentPolicySchema.parse(data);
    }
  }

  async upsertListing(shopId: string, serviceId: string, payload: unknown): Promise<PaymentPolicy> {
    const body = UpsertPaymentPolicySchema.parse(payload);

    const { data: existing, error: selErr } = await supabaseAdmin
      .from('payment_policies')
      .select('id')
      .eq('shop_id', shopId)
      .eq('service_id', serviceId)
      .maybeSingle();
    if (selErr && selErr.code !== 'PGRST116') throw new Error(selErr.message);

    if (existing) {
      const { data, error } = await supabaseAdmin
        .from('payment_policies')
        .update({ ...body })
        .eq('shop_id', shopId)
        .eq('service_id', serviceId)
        .select('*')
        .single();
      if (error) throw new Error(error.message);
      return PaymentPolicySchema.parse(data);
    } else {
      const { data, error } = await supabaseAdmin
        .from('payment_policies')
        .insert({ shop_id: shopId, service_id: serviceId, ...body })
        .select('*')
        .single();
      if (error) throw new Error(error.message);
      return PaymentPolicySchema.parse(data);
    }
  }

  async deleteListingPolicy(shopId: string, serviceId: string): Promise<void> {
    const { error } = await supabaseAdmin
      .from('payment_policies')
      .delete()
      .eq('shop_id', shopId)
      .eq('service_id', serviceId);
    if (error) throw new Error(error.message);
  }
} 