import jwt from "jsonwebtoken";
import { users } from "./storage.js";
import {ErrorForbidden, ErrorUnauthorized, ErrorUserAlreadyExists} from "./errorHandler.js";
import { validateSignupData } from "./validation.js";

export const isAuthorized = (roles) => (req, res, next) => {
  const accessToken = req.header('Authorization');
  if (!accessToken) {
    return next(new ErrorUnauthorized('No token provided'));
  }
  jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      return next(new ErrorUnauthorized('Invalid token'));
    }
    if (!roles.includes(decoded.role)) {
      return next(new ErrorForbidden('Access denied'));
    }
    req.user = decoded;
    next();
  });
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