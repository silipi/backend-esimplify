import * as Joi from 'joi';

const authSchema = {
  loginAdmin: {
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }).required(),
  },
};

export default authSchema;
