import Joi from 'joi';

export const createContactsSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Username should be a string',
        'string.min': `Username should have at least ${3} characters`,
        'string.max': `Username should have at most ${20} characters`,
        'any.required': 'Username is required',
    }),

    phoneNumber: Joi.string().min(3).max(20).required(),

    email: Joi.string().email().required(),

    isFavourite: Joi.boolean().default(false).required(),

    contactType: Joi.string().valid('home', 'personal').required(),
});

export const updateContactsSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().min(3).max(20),
    email: Joi.string().email(),
    isFavourite: Joi.boolean().default(false),
    contactType: Joi.string().valid('home', 'personal'),
});
