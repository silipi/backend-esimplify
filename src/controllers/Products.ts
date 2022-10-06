import { NextFunction, Request, Response } from 'express';
import AppError from '@/base/AppError';
import prismaClient from '@/database/prismaClient';
import ProductsService from '@/services/Products';
import { deleteS3 } from '@/middlewares/uploadS3';

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
      let errorsWhileDeletingImages = false;
      for (const image of req.body.images) {
        errorsWhileDeletingImages = !(await deleteS3(image));
      }

      if (errorsWhileDeletingImages) {
        throw new AppError(500, 'ERROR_DELETING_IMAGES');
      }

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
      const { id, createdAt, updatedAt, ...data } = req.body;

      const productUpdated = await _service.update(req.params.id, data);
      res.status(204).json(productUpdated);
    } catch (error: any) {
      next(error);
    }
  };

  const addNewImages = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const product = await _service.uploadImages(req.params.id, req.files);

      return res.json(product);
    } catch (error: any) {
      next(error);
    }
  };

  const changeAllImages = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const product = await _service.uploadImages(
        req.params.id,
        req.files,
        true
      );

      return res.json(product);
    } catch (error: any) {
      next(error);
    }
  };

  const removeImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const product = await _service.removeImage(req.params.id, req.body);

      return res.json(product);
    } catch (error: any) {
      next(error);
    }
  };

  return {
    get,
    getAll,
    create,
    remove,
    update,
    addNewImages,
    changeAllImages,
    removeImage,
  };
};

export default ProductsController;
