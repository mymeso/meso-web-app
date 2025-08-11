import { z } from 'zod';

export const PaymentRequirementEnum = z.enum(['full_payment','deposit','card_on_file','no_upfront']);
export const DepositTypeEnum = z.enum(['percentage','fixed']).nullable();

export const PaymentPolicySchema = z.object({
  id: z.uuid().optional(),
  shop_id: z.uuid(),
  listing_id: z.uuid().nullable().optional(),
  requirement: PaymentRequirementEnum,
  deposit_type: z.enum(['percentage','fixed']).nullable().optional(),
  deposit_percent: z.number().min(0).max(100).nullable().optional(),
  deposit_amount: z.number().min(0).nullable().optional(),
  online_methods: z.array(z.string()).default([]),
  onsite_methods: z.array(z.string()).default([]),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type PaymentPolicy = z.infer<typeof PaymentPolicySchema>;

export const UpsertPaymentPolicySchema = PaymentPolicySchema.pick({
  requirement: true,
  deposit_type: true,
  deposit_percent: true,
  deposit_amount: true,
  online_methods: true,
  onsite_methods: true,
}); 