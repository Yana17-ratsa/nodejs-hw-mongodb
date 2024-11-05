import { Router } from 'express';
import {
  deleteContactController,
  getContactsByIdController,
  getContactsController,
  patchContactController,
  postContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:_id', ctrlWrapper(getContactsByIdController));

router.post('/contacts', ctrlWrapper(postContactController));

router.patch('/contacts/:_id', ctrlWrapper(patchContactController));

router.delete('/contacts/:_id', ctrlWrapper(deleteContactController));

export default router;
