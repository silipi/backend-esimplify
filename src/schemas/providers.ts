import * as Joi from 'joi';

const providersSchemas = {
  paramId: {
    params: Joi.object({
      id: Joi.string().uuid().required(),
    }).required(),
  },
  create: {
    body: Joi.object({
      name: Joi.string().required(),
      address: Joi.string().required(),
      cnpj: Joi.string().max(14).required(),
      ie: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().min(8).required(),
    }).required(),
  },
  put: {
    params: Joi.object({
      id: Joi.string().uuid().required(),
    }).required(),
    body: Joi.object({
      name: Joi.string(),
      address: Joi.string(),
      cnpj: Joi.string().max(14),
      ie: Joi.string(),
      phone: Joi.string(),
      email: Joi.string(),
    }).required(),
  },
};

export default providersSchemas;
