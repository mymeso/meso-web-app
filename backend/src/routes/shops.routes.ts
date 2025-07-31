import { Router } from 'express';
import { ShopsController } from '../controllers/shops.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const shopsController = new ShopsController();

router.get(
  '/:id',
  authMiddleware,
  shopsController.getShop
);

export default router; 