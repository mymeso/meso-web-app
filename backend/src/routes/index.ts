import { Router } from 'express';
import profilesRoutes from './profiles.routes';
import shopsRoutes from './shops.routes';
import aboutYouRoutes from './aboutyou.routes';
import paymentPoliciesRoutes from './paymentpolicies.routes';

const router = Router();

router.use('/profiles', profilesRoutes);
router.use('/shops', shopsRoutes);
router.use('/aboutyou', aboutYouRoutes);
router.use('/payment-policies', paymentPoliciesRoutes);

export default router;