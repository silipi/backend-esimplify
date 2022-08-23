const express = require('express');
const router = express.Router();
import AuthController from '../controllers/Auth';

import { schemaValidator } from '../middlewares';
import { authSchema } from '../schemas';

const controller = AuthController();

router.post(
  '/admin/login',
  schemaValidator(authSchema.loginAdmin),
  controller.loginAdmin
);

module.exports = router;
