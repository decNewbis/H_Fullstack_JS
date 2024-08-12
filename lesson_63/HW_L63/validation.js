import {ErrorValidation} from "./errorHandler.js";

export const isValidEmail = (email) => {
  const maxLength = 254;
  const emailNamingRegExp = /^(([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,}))/iu;

  if(!emailNamingRegExp.test(email) || email.length > maxLength) {
    throw new ErrorValidation("Invalid email");
  }
};

export const isValidPassword = (password) => {
  const minimum8CharsRegExp = /^.{8,15}$/;
  const withoutSpacesRegExp = /^\S{8,15}$/;
  const containsSymbolsRegExp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]/;

  if (!minimum8CharsRegExp.test(password)
    || !withoutSpacesRegExp.test(password)
    || !containsSymbolsRegExp.test(password)) {
    throw new ErrorValidation("Invalid password");
  }
};

export const validateSignupData = (req, res, next) => {
  const { email, password } = req.body;
  try {
    isValidEmail(email);
    isValidPassword(password);
    next();
  } catch (err) {
    next(err);
  }
};