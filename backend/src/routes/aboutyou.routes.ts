import { Router } from 'express';
import { AboutYouController } from '../controllers/aboutyou.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { CreateAboutYouSchema, UpdateAboutYouSchema } from '../types/aboutyou';

const router = Router();
const aboutYouController = new AboutYouController();

// All routes require authentication
router.use(authMiddleware);

// GET /aboutyou - Get current user's AboutYou data
router.get('/', aboutYouController.getAboutYou.bind(aboutYouController));

// POST /aboutyou - Create AboutYou data
router.post(
  '/',
  validate(CreateAboutYouSchema),
  aboutYouController.createAboutYou.bind(aboutYouController)
);

// PUT /aboutyou - Update AboutYou data
router.put(
  '/',
  validate(UpdateAboutYouSchema),
  aboutYouController.updateAboutYou.bind(aboutYouController)
);

// PUT /aboutyou/upsert - Create or update AboutYou data
router.put(
  '/upsert',
  validate(CreateAboutYouSchema),
  aboutYouController.createOrUpdateAboutYou.bind(aboutYouController)
);

// DELETE /aboutyou - Delete AboutYou data
router.delete('/', aboutYouController.deleteAboutYou.bind(aboutYouController));

export default router; 