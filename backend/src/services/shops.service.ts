import { supabaseAdmin } from "../util/supabase";
import { Shop, CreateShopData, UpdateShopData, ShopSchema } from "../types/shops";

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

  async createShop(providerId: string, shopData: CreateShopData): Promise<Shop> {
    // Get user email from auth.users table (this is where Supabase stores the primary email)
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.getUserById(providerId);

    if (authError || !authUser.user) {
      throw new Error(`Failed to get user: ${authError?.message || 'User not found'}`);
    }

    const { data, error } = await supabaseAdmin
      .from('shops')
      .insert({ 
        provider_id: providerId,
        email: authUser.user.email, // Auto-populate from auth user
        ...shopData,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return ShopSchema.parse(data);
  }

  async updateShop(providerId: string, shopData: UpdateShopData): Promise<Shop> {
    const { data, error } = await supabaseAdmin
      .from('shops')
      .update(shopData)
      .eq('provider_id', providerId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return ShopSchema.parse(data);
  }

  async createOrUpdateShop(providerId: string, shopData: CreateShopData | UpdateShopData): Promise<Shop> {
    const existing = await this.getShopByProviderId(providerId);
    
    if (existing) {
      return this.updateShop(providerId, shopData as UpdateShopData);
    } else {
      return this.createShop(providerId, shopData as CreateShopData);
    }
  }

  async deleteShop(providerId: string): Promise<void> {
    const { error } = await supabaseAdmin
      .from('shops')
      .delete()
      .eq('provider_id', providerId);

    if (error) {
      throw new Error(error.message);
    }
  }
} 