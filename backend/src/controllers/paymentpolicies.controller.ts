import { Request, Response, NextFunction } from 'express';
import { PaymentPoliciesService } from '../services/paymentpolicies.service';
import { ShopsService } from '../services/shops.service';

const service = new PaymentPoliciesService();
const shopsService = new ShopsService();

export class PaymentPoliciesController {
  private async getShopId(req: Request): Promise<string> {
    const userId = req.user?.id;
    if (!userId) throw new Error('Unauthorized');
    const shop = await shopsService.getShopByProviderId(userId);
    if (!shop) throw new Error('Shop not found');
    return shop.id;
  }

  getEffective = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shopId = await this.getShopId(req);
      const listingId = (req.query.listing_id as string) || null;
      const policy = await service.getEffective(shopId, listingId);
      res.status(200).json(policy);
    } catch (err) { next(err); }
  };

  upsertShopDefault = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shopId = await this.getShopId(req);
      const policy = await service.upsertShopDefault(shopId, req.body);
      res.status(200).json(policy);
    } catch (err) { next(err); }
  };

  upsertListing = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shopId = await this.getShopId(req);
      const { listing_id } = req.body as { listing_id: string };
      if (!listing_id) return res.status(400).json({ error: 'listing_id is required' });
      const policy = await service.upsertListing(shopId, listing_id, req.body);
      res.status(200).json(policy);
    } catch (err) { next(err); }
  };

  deleteListing = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shopId = await this.getShopId(req);
      const { listing_id } = req.params;
      if (!listing_id) return res.status(400).json({ error: 'listing_id is required' });
      await service.deleteListingPolicy(shopId, listing_id);
      res.status(204).send();
    } catch (err) { next(err); }
  };
} 