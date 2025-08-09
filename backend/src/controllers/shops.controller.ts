import { Request, Response, NextFunction } from 'express';
import { ShopsService } from '../services/shops.service';

const shopsService = new ShopsService();

export class ShopsController {
  async getShop(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ error: 'Provider ID is required' });
        return;
      }

      const shop = await shopsService.getShopByProviderId(id);
      res.status(200).json(shop);
    } catch (error) {
      next(error);
    }
  }

  async getCurrentUserShop(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const shop = await shopsService.getShopByProviderId(userId);
      
      if (!shop) {
        res.status(404).json({ error: 'Shop not found' });
        return;
      }

      res.status(200).json(shop);
    } catch (error) {
      next(error);
    }
  }

  async createShop(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const shop = await shopsService.createShop(userId, req.body);
      res.status(201).json(shop);
    } catch (error) {
      next(error);
    }
  }

  async updateShop(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const shop = await shopsService.updateShop(userId, req.body);
      res.status(200).json(shop);
    } catch (error) {
      next(error);
    }
  }

  async createOrUpdateShop(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const shop = await shopsService.createOrUpdateShop(userId, req.body);
      res.status(200).json(shop);
    } catch (error) {
      next(error);
    }
  }

  async deleteShop(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      await shopsService.deleteShop(userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
} 