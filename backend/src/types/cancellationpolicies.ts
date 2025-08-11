import { z } from 'zod';

export const TimeUnitEnum = z.enum(['hours', 'days', 'day']);
export const RefundTypeEnum = z.enum(['percentage', 'full_deposit', 'half_deposit', 'no_penalty', 'with_penalty']);
export const PaymentTypeEnum = z.enum(['full_payment', 'deposit', 'card_on_file']);

export const CancellationRuleSchema = z.object({
  payment_type: PaymentTypeEnum,
  cancel_time: z.number().int().min(0),
  time_unit: TimeUnitEnum,
  refund_type: RefundTypeEnum,
  refund_value: z.number().min(0).max(100).nullable().optional(),
  sort_order: z.number().int().min(0).optional().default(0),
}).refine(
  (v) => {
    if (v.refund_type === 'percentage' || v.refund_type === 'with_penalty') {
      return typeof v.refund_value === 'number';
    }
    return true;
  },
  { message: 'refund_value required for percentage/with_penalty', path: ['refund_value'] }
);

export const CancellationPolicySchema = z.object({
  id: z.any().optional(),
  shop_id: z.uuid(),
  service_id: z.uuid().nullable().optional(),
  allow_free_cancellation: z.boolean().default(true),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type CancellationPolicy = z.infer<typeof CancellationPolicySchema>;
export type CancellationRule = z.infer<typeof CancellationRuleSchema>;

export const UpsertCancellationPolicySchema = z.object({
  allow_free_cancellation: z.boolean().default(true),
  rules: z.array(CancellationRuleSchema).max(50).default([]),
}); 