import { SORT_ORDER } from '../constants/index.js';
import ContactsCollection from '../db/contactModel.js';
import { calculatePaginationdata } from '../utils/calculatePaginationData.js';

export const getContacts = async ({ page = 1, perPage = 10, sortOrder = SORT_ORDER.ASC, sortBy = '_id',}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();
  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(limit).sort({[sortBy] : sortOrder}).exec();

  const paginationData = calculatePaginationdata(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = (id) => ContactsCollection.findById(id);

export const postContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (_id) => {
  const contact = await ContactsCollection.findOneAndDelete({ _id: _id });

  return contact;
};
