import { Request, Response, NextFunction } from 'express';
import { ShopsService } from '../services/shops.service';

const shopsService = new ShopsService();

export class ShopsController {
  async getShop(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: 'Provider ID is required' });
      }

      const shop = await shopsService.getShopByProviderId(id);
      res.status(200).json(shop);
    } catch (error) {
      next(error);
    }
  }
} 