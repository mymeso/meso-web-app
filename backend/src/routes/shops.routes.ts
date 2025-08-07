import { Router } from 'express';
import { ShopsController } from '../controllers/shops.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { CreateShopSchema, UpdateShopSchema } from '../types/shops';

const router = Router();
const shopsController = new ShopsController();

// Protected routes for current user's shop (specific routes first)
// GET /shops/me - Get current user's shop
router.get('/me', authMiddleware, shopsController.getCurrentUserShop.bind(shopsController));

// POST /shops - Create shop
router.post(
  '/',
  authMiddleware,
  validate(CreateShopSchema),
  shopsController.createShop.bind(shopsController)
);

// PUT /shops - Update shop
router.put(
  '/',
  authMiddleware,
  validate(UpdateShopSchema),
  shopsController.updateShop.bind(shopsController)
);

// PUT /shops/upsert - Create or update shop
router.put(
  '/upsert',
  authMiddleware,
  validate(CreateShopSchema),
  shopsController.createOrUpdateShop.bind(shopsController)
);

// DELETE /shops - Delete shop
router.delete('/', authMiddleware, shopsController.deleteShop.bind(shopsController));

// Public route to get shop by provider ID (must come after specific routes)
router.get('/:id', shopsController.getShop.bind(shopsController));

export default router; 