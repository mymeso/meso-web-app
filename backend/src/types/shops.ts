import { z } from 'zod';

export const ShopSchema = z.object({
  id: z.uuid(),
  provider_id: z.uuid(),
  business_name: z.string().nullable().optional(),
  created_at: z.string(),
  shop_phone_number: z.string().nullable().optional(),
  first_name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  subdomain: z.string().nullable().optional(),
});

export const CreateShopSchema = z.object({
  business_name: z.string().min(2, 'Business name must be at least 2 characters').max(100).optional(),
  shop_phone_number: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone format').optional(),
  first_name: z.string().min(2, 'First name must be at least 2 characters').max(50).optional(),
  subdomain: z.string().min(3, 'Subdomain must be at least 3 characters').max(50).optional(),
});

export const UpdateShopSchema = z.object({
  business_name: z.string().min(2, 'Business name must be at least 2 characters').max(100).optional(),
  shop_phone_number: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone format').optional(),
  first_name: z.string().min(2, 'First name must be at least 2 characters').max(50).optional(),
  subdomain: z.string().min(3, 'Subdomain must be at least 3 characters').max(50).optional(),
});

export type Shop = z.infer<typeof ShopSchema>;
export type CreateShopData = z.infer<typeof CreateShopSchema>;
export type UpdateShopData = z.infer<typeof UpdateShopSchema>; 