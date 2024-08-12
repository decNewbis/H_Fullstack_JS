import { users } from "./storage.js";
import { ErrorUnauthorized, ErrorUserAlreadyExists, ErrorValidation } from "./errorHandler.js";
import { validateSignupData } from "./validation.js";

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

export const signupMiddlewareArray = [validateSignupData, isUserAlreadyExists];

export const errorHandling = (err, req, res, next) => {
  res.status(err.statusCode).json({"error": err.message});
  next();
}