import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import prismaClient, { excludeFields } from '../database/prismaClient';

const ProvidersService = () => {
  const get = async (id: string) => {
    const provider = await prismaClient.provider.findUnique({
      where: { id },
      select: excludeFields(Prisma.ProviderScalarFieldEnum, ['password']),
    });

    return provider;
  };

  const getAll = async () => {
    const providers = await prismaClient.provider.findMany({
      select: excludeFields(Prisma.ProviderScalarFieldEnum, ['password']),
    });

    return providers;
  };

  const create = async (data: any) => {
    const cnpjExists = await prismaClient.provider.findUnique({
      where: { cnpj: data.cnpj },
    });

    if (cnpjExists) {
      throw new Error('CNPJ already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const result = await prismaClient.provider.create({
      data: {
        ...data,
        password: await bcrypt.hash(data.password, salt),
      },
    });

    return result;
  };

  const update = async (id: string, data: any) => {
    const provider = await prismaClient.provider.findUnique({
      where: { id },
    });

    if (!provider) {
      throw new Error('Provider not found');
    }

    if (data.cnpj && data.cnpj === provider.cnpj) {
      throw new Error('CNPJ already exists');
    }

    const result = await prismaClient.provider.update({
      where: { id },
      data,
    });

    return result;
  };

  const getProducts = async (providerId: string) => {
    const products = await prismaClient.product.findMany({
      where: { provider: { id: providerId } },
    });
    return products;
  };

  return { get, getAll, create, update, getProducts };
};

export default ProvidersService;
