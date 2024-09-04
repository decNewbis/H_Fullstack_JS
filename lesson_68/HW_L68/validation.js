import Joi from 'joi';
import {ErrorValidation} from "./errorHandler.js";

const signUpValidationSchema = Joi.object({
  email: Joi.string()
    .max(254)
    .pattern(new RegExp(/^(([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,}))/, "iu"))
    .required(),

  password: Joi.string()
    .min(8)
    .max(15)
    .pattern(new RegExp(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]/))
    .required(),
});

export const validateSignupData = (req, res, next) => {
  const {error} = signUpValidationSchema.validate(req.body);
  if (error) {
    throw new ErrorValidation(error);
  }
  next();
};