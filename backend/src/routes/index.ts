import { Router } from 'express';
import profilesRoutes from './profiles.routes';
import shopsRoutes from './shops.routes';
import aboutYouRoutes from './aboutyou.routes';
import paymentPoliciesRoutes from './paymentpolicies.routes';
import cancellationPoliciesRoutes from './cancellationpolicies.routes';

const router = Router();

router.use('/profiles', profilesRoutes);
router.use('/shops', shopsRoutes);
router.use('/aboutyou', aboutYouRoutes);
router.use('/payment-policies', paymentPoliciesRoutes);
router.use('/cancellation-policies', cancellationPoliciesRoutes);

export default router;