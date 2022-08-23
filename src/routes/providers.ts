const express = require('express');
const router = express.Router();
import ProvidersController from '../controllers/Providers';

import { schemaValidator } from '../middlewares';
import { providersSchemas } from '../schemas';

const controller = ProvidersController();

router.post('/', schemaValidator(providersSchemas.create), controller.create);
router.get('/:id', schemaValidator(providersSchemas.paramId), controller.get);
router.get('/', controller.getAll);
router.put('/:id', schemaValidator(providersSchemas.put), controller.update);
router.delete(
  '/:id',
  schemaValidator(providersSchemas.paramId),
  controller.remove
);
router.get(
  '/:id/products',
  schemaValidator(providersSchemas.paramId),
  controller.getProducts
);

module.exports = router;
