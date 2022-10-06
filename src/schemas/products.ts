import * as Joi from 'joi';

const productsSchema = {
  paramId: {
    params: Joi.object({
      id: Joi.string().uuid().required(),
    }).required(),
  },
  create: {
    body: Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string(),
      color: Joi.string()
        .optional()
        .empty('')
        .regex(/^#[0-9a-f]{6}$/i),
      attributes: Joi.array().items(
        Joi.object({
          value: Joi.string().required(),
          key: Joi.string().required(),
        })
      ),
      stock: Joi.number(),
      providerId: Joi.string().uuid().required(),
      images: Joi.any(),
    }).required(),
  },
  put: {
    params: Joi.object({
      id: Joi.string().uuid().required(),
    }).required(),
    body: Joi.object({
      name: Joi.string(),
      price: Joi.number(),
      description: Joi.string(),
      color: Joi.string()
        .optional()
        .empty('')
        .regex(/^#[0-9a-f]{6}$/i),
      stock: Joi.number(),
      providerId: Joi.string().uuid(),
      attributes: Joi.array().items(
        Joi.object({
          value: Joi.string().required(),
          key: Joi.string().required(),
        })
      ),
      images: Joi.any(),
    }).required(),
  },
};

export default productsSchema;
