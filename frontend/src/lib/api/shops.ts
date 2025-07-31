import { apiClient } from "./client";

export const shopsApi = {
  async getShopByProviderId(providerId: string) {
    return apiClient.get(`/shops/${providerId}`);
  },
}; 