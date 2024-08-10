import { users } from "./storage.js";
import {ErrorUnauthorized, ErrorUserAlreadyExists, ErrorValidation } from "./errorHandler.js";

const xUserIdKey = process.env.X_USER_ID_KEY;

export const isAuthorized = (req, res, next) => {
  const xUserId = req.header(xUserIdKey);
  const isFoundUser = users.some((user) => user.id === xUserId);
  if (!isFoundUser) {
    throw new ErrorUnauthorized("you do not have access rights to the content");
  }
  next();
};

export const isUserAlreadyExists = (req, res, next) => {
  const { email } = req.body;
  const isFoundUser = users.some((user) => user.email === email);
  if (isFoundUser) {
    throw new ErrorUserAlreadyExists("user already exists");
  }
  next();
};

export const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  const maxLength = 254;
  const emailNamingRegExp = /^(([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,}))/iu;

  if(!emailNamingRegExp.test(email) || email.length > maxLength) {
    throw new ErrorValidation("Invalid email");
  }
  next();
};

export const isValidPassword = (req, res, next) => {
  const { password } = req.body;
  const minimum8CharsRegExp = /^.{8,15}$/;
  const withoutSpacesRegExp = /^\S{8,15}$/;
  const containsSymbolsRegExp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]/;

  if (!minimum8CharsRegExp.test(password)
    || !withoutSpacesRegExp.test(password)
    || !containsSymbolsRegExp.test(password)) {
    throw new ErrorValidation("Invalid password");
  }
  next();
};

export const errorHandling = (err, req, res, next) => {
  res.status(err.statusCode).json({"error": err.message});
  next();
}