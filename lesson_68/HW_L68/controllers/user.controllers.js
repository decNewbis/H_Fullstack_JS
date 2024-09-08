import {createNewUser, getUserId, logInUser, updateTokens} from "../services/user.services.js";
import {removeRefreshToken, saveRefreshToken} from "../repositories/user.repository.js";

const xUserIdKey = process.env.X_USER_ID_KEY;

export const signUp = async (req, res) => {
  const newUser = await createNewUser(req.body);

  return res.status(201).json(newUser);
};

export const logIn = (req, res) => {
  const {accessToken, refreshToken, userId} = logInUser(req.body);
  saveRefreshToken(userId, refreshToken);
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    // secure: true,
    maxAge: 60 * 60 * 1000
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    // secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  res.set(xUserIdKey, userId);
  res.set('Authorization', accessToken);

  res.status(200).send('OK');
};

export const logOut = (req, res) => {
  const currentUser = getUserId(req);
  removeRefreshToken(currentUser);
  res.clearCookie('accessToken', {httpOnly: true});
  res.clearCookie('refreshToken', {httpOnly: true});
  res.set(xUserIdKey, '');
  res.set('Authorization', '');
  res.status(200).send('OK');
};

export const renewalTokens = (req, res) => {
  const {newAccessToken, newRefreshToken, userId} = updateTokens(req);
  saveRefreshToken(userId, newRefreshToken);
  res.cookie('accessToken', newAccessToken, {
    httpOnly: true,
    // secure: true,
    maxAge: 60 * 1000
  });
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    // secure: true,
    maxAge: 60 * 1000
  });
  res.set('Authorization', newAccessToken);

  res.status(200).send('OK');
};