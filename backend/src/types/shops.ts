import { z } from 'zod';

export const ShopSchema = z.object({
  id: z.uuid(),
  provider_id: z.uuid(),
  shop_name: z.string(),
  shop_description: z.string(),
  photo_url: z.string(),
  logo_url: z.string(),
  socials_url: z.array(z.url()),
  shop_phone_number: z.string(),
  created_at: z.string(),
});

export type Shop = z.infer<typeof ShopSchema>;

export const CreateShopSchema = ShopSchema.pick({
  provider_id: true,
});

export type CreateShopData = z.infer<typeof CreateShopSchema>; 