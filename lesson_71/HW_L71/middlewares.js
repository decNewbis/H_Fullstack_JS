import jwt from "jsonwebtoken";
import {ErrorForbidden, ErrorUnauthorized, ErrorUserAlreadyExists} from "./errorHandler.js";
import { validateSignupData } from "./validation.js";
import {getToken} from "./services/user.services.js";
import {getUserByEmail} from "./repositories/user.repository.js";

export const isAuthorized = (roles) => (req, res, next) => {
  const {accessToken} = getToken(req);
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
    next();
  });
};

export const isUserAlreadyExists = async (req, res, next) => {
  const { email } = req.body;
  const isFoundUser = await getUserByEmail(email);
  if (isFoundUser) {
    next(new ErrorUserAlreadyExists("user already exists"));
  }
  next();
};

export const signupMiddlewareArray = [validateSignupData, isUserAlreadyExists];

export const errorHandling = (err, req, res, next) => {
  res.status(err.statusCode).json({"error": err.message});
  next();
}