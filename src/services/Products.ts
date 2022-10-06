import AppError from '@/base/AppError';
import prismaClient from '@/database/prismaClient';
import { deleteS3 } from '@/middlewares/uploadS3';

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

  const uploadImages = async (id: string, images: any, changeAll?: boolean) => {
    const existingProduct = await prismaClient.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new AppError(404, 'PRODUCT_NOT_FOUND');
    }

    if (changeAll) {
      let errorsWhileDeletingImages = false;
      const imagesToDelete = existingProduct.images as any[];
      for (const image of imagesToDelete) {
        errorsWhileDeletingImages = !(await deleteS3(image.key));
      }

      if (errorsWhileDeletingImages) {
        throw new AppError(500, 'ERROR_DELETING_IMAGES');
      }

      return await prismaClient.product.update({
        where: { id },
        data: {
          images,
        },
      });
    } else {
      return await prismaClient.product.update({
        where: { id },
        data: {
          images: [
            // @ts-ignore
            ...existingProduct.images, // old images
            ...images, // new images
          ],
        },
      });
    }
  };

  const removeImage = async (id: string, image: any) => {
    const existingProduct = await prismaClient.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new AppError(404, 'PRODUCT_NOT_FOUND');
    }

    const wasDeleted = await deleteS3(image.key);

    if (!wasDeleted) {
      throw new AppError(500, 'ERROR_DELETING_IMAGES');
    }

    // @ts-ignore
    const newImages = existingProduct.images.filter(
      (img: any) => img.key !== image.key
    );

    const product = await prismaClient.product.update({
      where: { id },
      data: {
        images: newImages,
      },
    });

    return product;
  };

  return { get, getAll, create, update, uploadImages, removeImage };
};

export default ProductsService;
