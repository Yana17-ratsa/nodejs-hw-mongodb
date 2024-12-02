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

const router = Router();

router.use(authenticate); //буде застосовуватися до всї роутів

router.get('/', ctrlWrapper(getContactsController));

router.get('/:_id', isValidId, ctrlWrapper(getContactsByIdController));

router.post(
  '/',
  validateBody(createContactsSchema),
  ctrlWrapper(postContactController),
);

router.patch(
  '/:_id',
  validateBody(updateContactsSchema),
  isValidId,
  ctrlWrapper(patchContactController),
);

router.delete('/:_id', ctrlWrapper(deleteContactController));

export default router;
