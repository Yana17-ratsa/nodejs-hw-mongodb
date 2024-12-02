import Joi from 'joi';
import { emailRegexp } from '../constants/index.js';

//signup
export const authRegisterSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).max(20).required(),
});

//signin
export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).max(20).required(),
});
