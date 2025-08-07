import { supabaseAdmin } from "../util/supabase";
import { AboutYou, CreateAboutYouData, UpdateAboutYouData, AboutYouSchema } from "../types/aboutyou";

export class AboutYouService {
  async getAboutYou(shopId: string): Promise<AboutYou | null> {
    const { data, error } = await supabaseAdmin
      .from('about_you')
      .select('*')
      .eq('shop_id', shopId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows found
        return null;
      }
      throw new Error(error.message);
    }

    return data ? AboutYouSchema.parse(data) : null;
  }

  async createAboutYou(shopId: string, aboutYouData: CreateAboutYouData): Promise<AboutYou> {
    const { data, error } = await supabaseAdmin
      .from('about_you')
      .insert({ 
        shop_id: shopId, 
        ...aboutYouData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return AboutYouSchema.parse(data);
  }

  async updateAboutYou(shopId: string, aboutYouData: UpdateAboutYouData): Promise<AboutYou> {
    const { data, error } = await supabaseAdmin
      .from('about_you')
      .update({ 
        ...aboutYouData,
        updated_at: new Date().toISOString(),
      })
      .eq('shop_id', shopId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return AboutYouSchema.parse(data);
  }

  async createOrUpdateAboutYou(shopId: string, aboutYouData: CreateAboutYouData | UpdateAboutYouData): Promise<AboutYou> {
    const existing = await this.getAboutYou(shopId);
    
    if (existing) {
      return this.updateAboutYou(shopId, aboutYouData);
    } else {
      return this.createAboutYou(shopId, aboutYouData as CreateAboutYouData);
    }
  }

  async deleteAboutYou(shopId: string): Promise<void> {
    const { error } = await supabaseAdmin
      .from('about_you')
      .delete()
      .eq('shop_id', shopId);

    if (error) {
      throw new Error(error.message);
    }
  }
} 