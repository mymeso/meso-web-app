import { apiClient } from "./client";

export interface AboutYouData {
  service_description?: string;
  experience?: string;
  exp_years?: number;
  certifications?: string;
  style?: string;
  fun_fact?: string;
  languages?: string[];
  gallery?: string[];
}

export interface AboutYouResponse extends AboutYouData {
  shop_id: string;
  created_at: string;
  updated_at: string;
}

export const aboutYouApi = {
  async getAboutYou(): Promise<AboutYouResponse> {
    return apiClient.get('/aboutyou');
  },

  async createAboutYou(data: AboutYouData): Promise<AboutYouResponse> {
    return apiClient.post('/aboutyou', data);
  },

  async updateAboutYou(data: AboutYouData): Promise<AboutYouResponse> {
    return apiClient.put('/aboutyou', data);
  },

  async createOrUpdateAboutYou(data: AboutYouData): Promise<AboutYouResponse> {
    return apiClient.put('/aboutyou/upsert', data);
  },

  async deleteAboutYou(): Promise<void> {
    return apiClient.delete('/aboutyou');
  },

  // Helper function to convert form data to API format
  convertFormToApi(formData: Record<string, any>): AboutYouData {
    return {
      service_description: formData.whatIDo || undefined,
      experience: formData.myExperience || undefined,
      exp_years: formData.yearsOfExperience || undefined,
      certifications: formData.certifications || undefined,
      style: formData.myStyle || undefined,
      fun_fact: formData.funFact || undefined,
      languages: formData.languages || [],
      gallery: formData.gallery || [],
    };
  },

  // Helper function to convert API data to form format
  convertApiToForm(apiData: AboutYouResponse): Record<string, any> {
    return {
      profilePhoto: null, // Not stored in database, handled separately
      whatIDo: apiData.service_description || '',
      myExperience: apiData.experience || '',
      certifications: apiData.certifications || '',
      yearsOfExperience: apiData.exp_years || 0,
      myStyle: apiData.style || '',
      funFact: apiData.fun_fact || '',
      languages: apiData.languages || [],
      gallery: apiData.gallery || [],
    };
  }
}; 