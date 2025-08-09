import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { UpsertPaymentPolicySchema } from '../types/paymentpolicies';
import { PaymentPoliciesController } from '../controllers/paymentpolicies.controller';

const router = Router();
const controller = new PaymentPoliciesController();

router.use(authMiddleware);

// GET /payment-policies/effective?listing_id=...
router.get('/effective', controller.getEffective);

// PUT /payment-policies (shop default upsert)
router.put('/', validate(UpsertPaymentPolicySchema), controller.upsertShopDefault);

// PUT /payment-policies/listing (listing-level upsert)
router.put('/listing', validate(UpsertPaymentPolicySchema.extend({ listing_id: (val:any)=>val } as any)), controller.upsertListing);

// DELETE /payment-policies/listing/:listing_id
router.delete('/listing/:listing_id', controller.deleteListing);

export default router; 