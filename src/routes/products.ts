const express = require('express');
const router = express.Router();
import ProductsController from '../controllers/Products';

import { authentication, authorization, schemaValidator } from '../middlewares';
import { productsSchemas } from '../schemas';

const controller = ProductsController();

router.post(
  '/',
  schemaValidator(productsSchemas.create),
  authorization('ADMIN'),
  controller.create
);
router.get(
  '/:id',
  schemaValidator(productsSchemas.paramId),
  authentication,
  controller.get
);
router.get('/', authentication, controller.getAll);
router.put(
  '/:id',
  schemaValidator(productsSchemas.put),
  authorization('ADMIN'),
  controller.update
);
router.delete(
  '/:id',
  schemaValidator(productsSchemas.paramId),
  authorization('ADMIN'),
  controller.remove
);

module.exports = router;
