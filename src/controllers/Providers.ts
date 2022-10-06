import { NextFunction, Request, Response } from 'express';
import AppError from '@/base/AppError';
import prismaClient from '@/database/prismaClient';
import ProvidersService from '@/services/Providers';

const ProvidersController = () => {
  const _service = ProvidersService();

  const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const provider = await _service.get(req.params.id);

      if (!provider) {
        throw new AppError(404, 'PROVIDER_NOT_FOUND');
      }

      return res.json(provider);
    } catch (error: any) {
      next(error);
    }
  };

  const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const providers = await _service.getAll();
      return res.json(providers);
    } catch (error: any) {
      next(error);
    }
  };

  const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const provider = await _service.create(req.body);
      return res.status(201).json(provider);
    } catch (error: any) {
      next(error);
    }
  };

  const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await prismaClient.product.findMany({
        where: { providerId: req.params.id },
      });

      if (products.length > 0) {
        // throw new AppError(400, 'PROVIDER_HAS_PRODUCTS');
      }

      await prismaClient.product.deleteMany({
        where: { providerId: req.params.id },
      });

      const provider = await prismaClient.provider.delete({
        where: { id: req.params.id },
      });

      if (!provider) {
        throw new AppError(500, 'PROVIDER_NOT_FOUND');
      }

      return res.json({ message: 'Provider removed' });
    } catch (error: any) {
      next(error);
    }
  };

  const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const providerUpdated = await _service.update(req.params.id, req.body);

      return res.status(201).json(providerUpdated);
    } catch (error: any) {
      next(error);
    }
  };

  const getProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const products = await _service.getProducts(req.params.id);

      if (!products) {
        throw new AppError(404, 'PROVIDER_PRODUCTS_NOT_FOUND');
      }

      return res.json(products);
    } catch (error: any) {
      next(error);
    }
  };

  return { get, getAll, create, remove, update, getProducts };
};

export default ProvidersController;
