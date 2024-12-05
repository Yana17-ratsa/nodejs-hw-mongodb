import {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);

    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const { _id: userId } = req.user;
    filter.userId = userId;

    const data = await getContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactsByIdController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  // console.log(id, userId);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createHttpError(400, 'Contact id not found');
  }
  const data = await getContactById(id, userId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found contact!',
    data,
  });
};

export const postContactController = async (req, res) => {
  const { _id: userId } = req.user;

  const data = await postContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const patchContactController = async (req, res, next) => {
  const { _id } = req.params;
  const { _id: userId } = req.user;
  const result = await updateContact(_id, req.body, userId);

  if (!result) {
    next(createHttpError(404, 'Contact not found!'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { _id } = req.params;
  const { _id: userId } = req.user;

  const contact = await deleteContact(_id, userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
