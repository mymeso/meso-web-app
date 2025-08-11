import { supabaseAdmin } from '../util/supabase';
import { CancellationPolicy, CancellationPolicySchema, UpsertCancellationPolicySchema, CancellationRule, CancellationRuleSchema } from '../types/cancellationpolicies';

export class CancellationPoliciesService {
  async getEffective(shopId: string, serviceId?: string | null): Promise<{ policy: CancellationPolicy | null; rules: CancellationRule[] }> {
    let query = supabaseAdmin
      .from('cancellation_policies')
      .select('*')
      .eq('shop_id', shopId)
      .order('service_id', { ascending: false, nullsFirst: false });

    if (serviceId) query.in('service_id', [serviceId, null]);
    else query.is('service_id', null);

    const { data: policyRow, error: policyErr } = await query.limit(1).maybeSingle();
    if (policyErr && policyErr.code !== 'PGRST116') throw new Error(policyErr.message);

    if (!policyRow) return { policy: null, rules: [] };
    const policy = CancellationPolicySchema.parse(policyRow);

    const { data: rules, error: rulesErr } = await supabaseAdmin
      .from('cancellation_policy_rules')
      .select('*')
      .eq('policy_id', policy.id)
      .order('sort_order', { ascending: true })
      .order('id', { ascending: true });
    if (rulesErr) throw new Error(rulesErr.message);

    return { policy, rules: (rules || []).map(r => CancellationRuleSchema.parse(r)) };
  }

  private async replaceRules(policyId: any, rules: CancellationRule[]) {
    const { error: delErr } = await supabaseAdmin
      .from('cancellation_policy_rules')
      .delete()
      .eq('policy_id', policyId);
    if (delErr) throw new Error(delErr.message);

    if (rules.length === 0) return;

    const { error: insErr } = await supabaseAdmin
      .from('cancellation_policy_rules')
      .insert(rules.map((r, i) => ({ ...r, policy_id: policyId, sort_order: r.sort_order ?? i })));
    if (insErr) throw new Error(insErr.message);
  }

  async upsertShopDefault(shopId: string, payload: unknown) {
    const body = UpsertCancellationPolicySchema.parse(payload);

    const { data: existing, error: selErr } = await supabaseAdmin
      .from('cancellation_policies')
      .select('id')
      .eq('shop_id', shopId)
      .is('service_id', null)
      .maybeSingle();
    if (selErr && selErr.code !== 'PGRST116') throw new Error(selErr.message);

    if (existing) {
      const { data, error } = await supabaseAdmin
        .from('cancellation_policies')
        .update({ allow_free_cancellation: body.allow_free_cancellation })
        .eq('shop_id', shopId)
        .is('service_id', null)
        .select('*')
        .single();
      if (error) throw new Error(error.message);
      await this.replaceRules(data.id, body.rules);
      return { policy: data, rules: body.rules };
    } else {
      const { data, error } = await supabaseAdmin
        .from('cancellation_policies')
        .insert({ shop_id: shopId, service_id: null, allow_free_cancellation: body.allow_free_cancellation })
        .select('*')
        .single();
      if (error) throw new Error(error.message);
      await this.replaceRules(data.id, body.rules);
      return { policy: data, rules: body.rules };
    }
  }

  async upsertService(shopId: string, serviceId: string, payload: unknown) {
    const body = UpsertCancellationPolicySchema.parse(payload);

    const { data: existing, error: selErr } = await supabaseAdmin
      .from('cancellation_policies')
      .select('id')
      .eq('shop_id', shopId)
      .eq('service_id', serviceId)
      .maybeSingle();
    if (selErr && selErr.code !== 'PGRST116') throw new Error(selErr.message);

    if (existing) {
      const { data, error } = await supabaseAdmin
        .from('cancellation_policies')
        .update({ allow_free_cancellation: body.allow_free_cancellation })
        .eq('shop_id', shopId)
        .eq('service_id', serviceId)
        .select('*')
        .single();
      if (error) throw new Error(error.message);
      await this.replaceRules(data.id, body.rules);
      return { policy: data, rules: body.rules };
    } else {
      const { data, error } = await supabaseAdmin
        .from('cancellation_policies')
        .insert({ shop_id: shopId, service_id: serviceId, allow_free_cancellation: body.allow_free_cancellation })
        .select('*')
        .single();
      if (error) throw new Error(error.message);
      await this.replaceRules(data.id, body.rules);
      return { policy: data, rules: body.rules };
    }
  }

  async deleteServicePolicy(shopId: string, serviceId: string) {
    const { error } = await supabaseAdmin
      .from('cancellation_policies')
      .delete()
      .eq('shop_id', shopId)
      .eq('service_id', serviceId);
    if (error) throw new Error(error.message);
  }
} 