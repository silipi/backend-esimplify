import { Request, Response } from 'express';
import prismaClient from '../database/prismaClient';
import ProvidersService from '../services/Providers';

const ProvidersController = () => {
  const _service = ProvidersService();

  const get = async (req: Request, res: Response) => {
    try {
      const provider = await _service.get(req.params.id);

      if (!provider) {
        return res.status(404).json({
          message: 'Provider not found',
        });
      }

      return res.json(provider);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  const getAll = async (req: Request, res: Response) => {
    try {
      const providers = await _service.getAll();
      return res.json(providers);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  const create = async (req: Request, res: Response) => {
    try {
      const provider = await _service.create(req.body);
      return res.status(201).json(provider);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  const remove = async (req: Request, res: Response) => {
    try {
      const provider = await prismaClient.provider.delete({
        where: { id: req.params.id },
      });

      if (!provider) {
        return res.status(404).json({
          message: 'Provider not found',
        });
      }

      return res.json({ message: 'Provider removed' });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  const update = async (req: Request, res: Response) => {
    try {
      const providerUpdated = await _service.update(req.params.id, req.body);

      return res.status(201).json(providerUpdated);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  const getProducts = async (req: Request, res: Response) => {
    try {
      const products = await _service.getProducts(req.params.id);

      if (!products) {
        return res.status(404).json({
          message: 'This provider does not have products yet',
        });
      }

      return res.json(products);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  return { get, getAll, create, remove, update, getProducts };
};

export default ProvidersController;
