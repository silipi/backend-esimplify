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
      color: Joi.string(),
      attributes: Joi.object(),
      stock: Joi.number(),
      providerId: Joi.string().uuid().required(),
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
      color: Joi.string(),
      attributes: Joi.object(),
      stock: Joi.number(),
      providerId: Joi.string().uuid(),
    }).required(),
  },
};

export default productsSchema;
