import Joi from 'joi';

export const registeredUserschema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(10).max(30).required(),
  password: Joi.string().min(8).max(20).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
