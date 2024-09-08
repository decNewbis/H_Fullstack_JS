import {randomUUID as uuid} from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  addNewUser,
  getStoredRefreshToken,
  getUserByEmailAndPassword,
  removeRefreshToken
} from "../repositories/user.repository.js";
import {ErrorForbidden, ErrorUnauthorized, ErrorValidation} from "../errorHandler.js";
import {roles} from "../roles.js";

const xUserIdKey = process.env.X_USER_ID_KEY;
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

export const createNewUser = async ({ email, password }, role=roles.CUSTOMER) => {
  const hash = await bcrypt.hash(password, saltRounds);
  const newUser = addNewUser({
    id: uuid(),
    email,
    password: hash,
    role
  });

  return {
    id: newUser.id,
    email: newUser.email,
  };
};

export const getUserId = (req) => {
  return req.header(xUserIdKey);
};

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1h'});
};
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '7d'});
};

export const logInUser = ({email, password}) => {
  const user = getUserByEmailAndPassword({email, password});
  if (!user) {
    throw new ErrorValidation('Incorrect email or password');
  }
  const role = user.role;
  const accessToken = generateAccessToken({role});
  const refreshToken = generateRefreshToken({role});

  return {
    accessToken,
    refreshToken,
    userId: user.id
  };
};

const getRefreshToken = (req) => {
  const {refreshToken} = req.cookies;
  if (!refreshToken) {
    throw new ErrorUnauthorized('No token provided');
  }
  return refreshToken;
};

export const updateTokens = (req) => {
  const currentUser = getUserId(req);
  const refreshToken = getRefreshToken(req);
  const storedRefreshToken = getStoredRefreshToken(currentUser);
  let newAccessToken = null;
  let newRefreshToken = null;

  if (refreshToken !== storedRefreshToken) {
    throw new ErrorForbidden('Invalid refresh token');
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      removeRefreshToken(currentUser);
      throw new ErrorForbidden('Invalid refresh token');
    }
    const payload = { role: decoded.role };
    newAccessToken = generateAccessToken(payload);
    newRefreshToken = generateRefreshToken(payload);
  });

  return {
    newAccessToken,
    newRefreshToken,
    userId: currentUser
  };
};