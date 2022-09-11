const express = require('express');
const router = express.Router();
import ProvidersController from '@/controllers/Providers';

import { authentication, authorization, schemaValidator } from '@/middlewares';
import { providersSchemas } from '@/schemas';

const controller = ProvidersController();

router.post(
  '/',
  schemaValidator(providersSchemas.create),
  authorization('ADMIN'),
  controller.create
);
router.get(
  '/:id',
  schemaValidator(providersSchemas.paramId),
  authorization('ADMIN'),
  controller.get
);
router.get('/', authorization('ADMIN'), controller.getAll);
router.put(
  '/:id',
  schemaValidator(providersSchemas.put),
  authorization('ADMIN'),
  controller.update
);
router.delete(
  '/:id',
  schemaValidator(providersSchemas.paramId),
  authorization('ADMIN'),
  controller.remove
);
router.get(
  '/:id/products',
  schemaValidator(providersSchemas.paramId),
  authentication,
  controller.getProducts
);

module.exports = router;
