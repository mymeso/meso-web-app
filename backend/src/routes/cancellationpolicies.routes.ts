import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { CancellationPoliciesController } from '../controllers/cancellationpolicies.controller';

const router = Router();
const controller = new CancellationPoliciesController();

router.use(authMiddleware);

router.get('/effective', controller.getEffective);

router.put('/', controller.upsertShopDefault);

router.put('/service', controller.upsertService);

router.delete('/service/:service_id', controller.deleteService);

export default router; 