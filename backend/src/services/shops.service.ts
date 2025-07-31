import { supabaseAdmin } from "../util/supabase";
import { Shop, ShopSchema } from "../types/shops";

export class ShopsService {
  async getShopByProviderId(providerId: string): Promise<Shop | null> {
    const { data, error } = await supabaseAdmin
      .from('shops')
      .select('*')
      .eq('provider_id', providerId)
      .single();

    if (error && error.code !== 'PGRST116') { // Ignore 'not found' errors
      throw new Error(error.message);
    }

    return data ? ShopSchema.parse(data) : null;
  }
} 