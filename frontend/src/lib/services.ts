export interface Address {
  id: number;
  line1: string;
  line2: string;
  city: string;
  zip: string;
  country: string;
  isHome: boolean;
  enabled: boolean;
  radius?: number;
} 