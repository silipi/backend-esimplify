import prismaClient from '../database/prismaClient';

const ProductsService = () => {
  const create = async (data: any) => {
    const product = await prismaClient.product.create({
      data,
    });

    return product;
  };

  const update = async (id: string, data: any) => {
    const product = await prismaClient.product.update({
      where: { id },
      data,
    });

    return product;
  };

  const get = async (id: string) => {
    const product = await prismaClient.product.findUnique({
      where: { id },
      include: {
        provider: {
          select: { name: true, cnpj: true, email: true },
        },
      },
    });

    return product;
  };

  const getAll = async () => {
    const products = await prismaClient.product.findMany({
      include: {
        provider: {
          select: { name: true, cnpj: true, email: true },
        },
      },
    });

    return products;
  };

  return { get, getAll, create, update };
};

export default ProductsService;
