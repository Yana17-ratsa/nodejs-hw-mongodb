import { getContacts, getContactById } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (_, res, next) => {
  try {
    const data = await getContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactsByIdController = async (req, res) => {
  const { _id } = req.params;
  const data = await getContactById(_id);

  if (!data) {
    throw createHttpError(404, `Contact with id=${_id} not found!`);
  }

  res.json({
    status: 200,
    message: 'Successfully found contact!',
    data,
  });
};
