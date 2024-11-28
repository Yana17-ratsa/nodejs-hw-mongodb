import { Router } from 'express';
import {
  deleteContactController,
  getContactsByIdController,
  getContactsController,
  patchContactController,
  postContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { registerUserController } from '../controllers/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:_id', isValidId, ctrlWrapper(getContactsByIdController));

router.post(
  '/register',
  validateBody(createContactsSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/contacts',
  validateBody(createContactsSchema),
  ctrlWrapper(postContactController),
);

router.patch(
  '/:_id',
  validateBody(updateContactsSchema),
  isValidId,
  ctrlWrapper(patchContactController),
);

router.delete(':_id', ctrlWrapper(deleteContactController));

export default router;
