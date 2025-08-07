import { Request, Response, NextFunction } from 'express';
import { AboutYouService } from '../services/aboutyou.service';
import { ShopsService } from '../services/shops.service';

const aboutYouService = new AboutYouService();
const shopsService = new ShopsService();

export class AboutYouController {
  async getAboutYou(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Get the user's shop
      const shop = await shopsService.getShopByProviderId(userId);
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found for user' });
      }

      const aboutYou = await aboutYouService.getAboutYou(shop.id);

      if (!aboutYou) {
        return res.status(404).json({ error: 'About You data not found' });
      }

      res.status(200).json(aboutYou);
    } catch (error) {
      next(error);
    }
  }

  async createAboutYou(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Get the user's shop
      const shop = await shopsService.getShopByProviderId(userId);
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found for user' });
      }

      const aboutYou = await aboutYouService.createAboutYou(shop.id, req.body);
      res.status(201).json(aboutYou);
    } catch (error) {
      next(error);
    }
  }

  async updateAboutYou(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Get the user's shop
      const shop = await shopsService.getShopByProviderId(userId);
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found for user' });
      }

      const aboutYou = await aboutYouService.updateAboutYou(shop.id, req.body);
      res.status(200).json(aboutYou);
    } catch (error) {
      next(error);
    }
  }

  async createOrUpdateAboutYou(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Get the user's shop
      const shop = await shopsService.getShopByProviderId(userId);
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found for user' });
      }

      const aboutYou = await aboutYouService.createOrUpdateAboutYou(shop.id, req.body);
      res.status(200).json(aboutYou);
    } catch (error) {
      next(error);
    }
  }

  async deleteAboutYou(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Get the user's shop
      const shop = await shopsService.getShopByProviderId(userId);
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found for user' });
      }

      await aboutYouService.deleteAboutYou(shop.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
} 