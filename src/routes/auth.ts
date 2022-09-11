const express = require('express');
const router = express.Router();
import AuthController from '@/controllers/Auth';

import { schemaValidator } from '@/middlewares';
import { authSchema } from '@/schemas';

const controller = AuthController();

router.post(
  '/admin/login',
  schemaValidator(authSchema.loginAdmin),
  controller.loginAdmin
);

router.post('/admin/logout', controller.logoutAdmin);
router.get('/admin/check', controller.checkAdmin);

module.exports = router;
