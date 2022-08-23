const express = require('express');
const router = express.Router();
import ProductsController from '../controllers/Products';

import { schemaValidator } from '../middlewares';
import { productsSchemas } from '../schemas';

const controller = ProductsController();

router.post('/', schemaValidator(productsSchemas.create), controller.create);
router.get('/:id', schemaValidator(productsSchemas.paramId), controller.get);
router.get('/', controller.getAll);
router.put('/:id', schemaValidator(productsSchemas.put), controller.update);
router.delete(
  '/:id',
  schemaValidator(productsSchemas.paramId),
  controller.remove
);

module.exports = router;
