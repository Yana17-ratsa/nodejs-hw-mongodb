import { Router } from 'express';
import * as authConrollers from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authLoginSchema, authRegisterSchema } from '../validation/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrlWrapper(authConrollers.registerController),
);

authRouter.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(authConrollers.loginController),
);

authRouter.post(
  '/refresh',
  ctrlWrapper(authConrollers.refreshSessionController),
);

authRouter.post('/logout', ctrlWrapper(authConrollers.logoutController));

export default authRouter;
