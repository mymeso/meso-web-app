import { Router } from 'express';
import profilesRoutes from './profiles.routes';
import shopsRoutes from './shops.routes';

const router = Router();

router.use('/profiles', profilesRoutes);
router.use('/shops', shopsRoutes);

export default router;