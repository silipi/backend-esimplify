import { NextFunction, Request, Response } from 'express';
import AppError from '@/base/AppError';
import prismaClient from '@/database/prismaClient';
import ProductsService from '@/services/Products';

const ProductsController = () => {
  const _service = ProductsService();

  const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await _service.get(req.params.id);

      if (!product) {
        throw new AppError(404, 'PRODUCT_NOT_FOUND');
      }

      return res.json(product);
    } catch (error: any) {
      next(error);
    }
  };

  const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await _service.getAll();
      return res.json(products);
    } catch (error: any) {
      next(error);
    }
  };

  const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await _service.create(req.body);

      return res.status(201).json(product);
    } catch (error: any) {
      next(error);
    }
  };

  const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await prismaClient.product.delete({
        where: { id: req.params.id },
      });

      if (!product) {
        throw new AppError(404, 'PRODUCT_NOT_FOUND');
      }

      return res.json({ message: 'Product removed' });
    } catch (error: any) {
      next(error);
    }
  };

  const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productUpdated = await _service.update(req.params.id, req.body);
      res.status(204).json(productUpdated);
    } catch (error: any) {
      next(error);
    }
  };

  return { get, getAll, create, remove, update };
};

export default ProductsController;
