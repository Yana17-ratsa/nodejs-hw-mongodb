import ContactsCollection from '../db/contactModel.js';

export const getContacts = () => ContactsCollection.find();

export const getContactById = (id) => ContactsCollection.findById(id);

export const postContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (_id) => {
  const contact = await ContactsCollection.findOneAndDelete({ _id });

  return contact;
};
