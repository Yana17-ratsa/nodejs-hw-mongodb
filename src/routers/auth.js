import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registeredUserschema } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  logoutUserController,
  registerUserController,
} from '../controllers/auth.js';

import { refreshUsersSessionController } from '../controllers/auth.js';

import { loginUserController } from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registeredUserschema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUsersSessionController));

export default router;
