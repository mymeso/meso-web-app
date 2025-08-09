import { Request, Response, NextFunction } from 'express';
import { ShopsService } from '../services/shops.service';
import { CancellationPoliciesService } from '../services/cancellationpolicies.service';

const shopsService = new ShopsService();
const service = new CancellationPoliciesService();

export class CancellationPoliciesController {
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
      const serviceId = (req.query.service_id as string) || null;
      const result = await service.getEffective(shopId, serviceId);
      res.status(200).json(result);
    } catch (e) { next(e); }
  };

  upsertShopDefault = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shopId = await this.getShopId(req);
      const result = await service.upsertShopDefault(shopId, req.body);
      res.status(200).json(result);
    } catch (e) { next(e); }
  };

  upsertService = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shopId = await this.getShopId(req);
      const { service_id } = req.body as { service_id: string };
      if (!service_id) return res.status(400).json({ error: 'service_id is required' });
      const result = await service.upsertService(shopId, service_id, req.body);
      res.status(200).json(result);
    } catch (e) { next(e); }
  };

  deleteService = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shopId = await this.getShopId(req);
      const { service_id } = req.params;
      if (!service_id) return res.status(400).json({ error: 'service_id is required' });
      await service.deleteServicePolicy(shopId, service_id);
      res.status(204).send();
    } catch (e) { next(e); }
  };
} 