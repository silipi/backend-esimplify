const express = require('express');
const router = express.Router();
import ProductsController from '@/controllers/Products';

import { authorization, schemaValidator } from '@/middlewares';
import { productsSchemas } from '@/schemas';

const controller = ProductsController();

router.post(
  '/',
  schemaValidator(productsSchemas.create),
  authorization('PROVIDER'),
  controller.create
);
router.get('/:id', schemaValidator(productsSchemas.paramId), controller.get);
router.get('/', controller.getAll);
router.put(
  '/:id',
  schemaValidator(productsSchemas.put),
  authorization('PROVIDER'),
  controller.update
);
router.delete(
  '/:id',
  schemaValidator(productsSchemas.paramId),
  authorization('ADMIN'),
  controller.remove
);

module.exports = router;
