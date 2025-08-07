import { apiClient } from "./client";

export interface ShopData {
  business_name?: string;
  shop_phone_number?: string;
  first_name?: string;
  subdomain?: string;
}

export interface ShopResponse extends ShopData {
  id: string;
  provider_id: string;
  email: string;
  created_at: string;
}

export const shopsApi = {
  async getShop(providerId: string): Promise<ShopResponse> {
    return apiClient.get(`/shops/${providerId}`);
  },

  async getCurrentUserShop(): Promise<ShopResponse> {
    return apiClient.get('/shops/me');
  },

  async createShop(data: ShopData): Promise<ShopResponse> {
    return apiClient.post('/shops', data);
  },

  async updateShop(data: ShopData): Promise<ShopResponse> {
    return apiClient.put('/shops', data);
  },

  async createOrUpdateShop(data: ShopData): Promise<ShopResponse> {
    return apiClient.put('/shops/upsert', data);
  },

  async deleteShop(): Promise<void> {
    return apiClient.delete('/shops');
  },

  // Helper function to convert form data to API format
  convertFormToApi(formData: Record<string, any>): ShopData {
    return {
      first_name: formData.firstName || undefined,
      business_name: formData.businessName || undefined,
      subdomain: formData.subdomain || undefined,
      shop_phone_number: formData.phoneNumber || undefined,
    };
  },

  // Helper function to convert API data to form format
  convertApiToForm(apiData: ShopResponse): Record<string, any> {
    return {
      firstName: apiData.first_name || '',
      businessName: apiData.business_name || '',
      subdomain: apiData.subdomain || '',
      phoneNumber: apiData.shop_phone_number || '',
      email: apiData.email || '', // Read-only field for display
    };
  }
}; 