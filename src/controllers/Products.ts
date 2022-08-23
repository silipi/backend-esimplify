import { Request, Response } from 'express';
import prismaClient from '../database/prismaClient';
import ProductsService from '../services/Products';

const ProductsController = () => {
  const _service = ProductsService();

  const get = async (req: Request, res: Response) => {
    try {
      const product = await _service.get(req.params.id);

      if (!product) {
        return res.status(404).json({
          message: 'Product not found',
        });
      }

      return res.json(product);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  const getAll = async (req: Request, res: Response) => {
    try {
      const products = await _service.getAll();
      return res.json(products);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  const create = async (req: Request, res: Response) => {
    try {
      const product = await _service.create(req.body);

      return res.status(201).json(product);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  const remove = async (req: Request, res: Response) => {
    try {
      const product = await prismaClient.product.delete({
        where: { id: req.params.id },
      });

      if (!product) {
        return res.status(404).json({
          message: 'Product not found',
        });
      }

      return res.json({ message: 'Product removed' });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  const update = async (req: Request, res: Response) => {
    try {
      const productUpdated = await _service.update(req.params.id, req.body);
      res.status(204).json(productUpdated);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  return { get, getAll, create, remove, update };
};

export default ProductsController;
