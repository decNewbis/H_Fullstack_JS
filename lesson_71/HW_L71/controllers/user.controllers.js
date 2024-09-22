import {createNewUser, getUserId, logInUser, updateTokens} from "../services/user.services.js";
import {removeRefreshToken, saveRefreshToken} from "../repositories/user.repository.js";

const xUserIdKey = process.env.X_USER_ID_KEY;

export const signUp = async (req, res, next) => {
  const newUser = await createNewUser(req.body, next);

  return res.status(201).json(newUser);
};

export const logIn = async (req, res) => {
  const {accessToken, refreshToken, userId} = await logInUser(req.body);
  await saveRefreshToken(userId, refreshToken);
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

  res.status(200).send('OK');
};

export const logOut = async (req, res) => {
  const currentUser = getUserId(req);
  await removeRefreshToken(currentUser);
  res.clearCookie('accessToken', {httpOnly: true});
  res.clearCookie('refreshToken', {httpOnly: true});
  res.set(xUserIdKey, '');
  res.set('Authorization', '');
  res.status(200).send('OK');
};

export const renewalTokens = async (req, res) => {
  const {newAccessToken, newRefreshToken, userId} = await updateTokens(req);
  await saveRefreshToken(userId, newRefreshToken);
  res.cookie('accessToken', newAccessToken, {
    httpOnly: true,
    // secure: true,
    maxAge: 60 * 60 * 1000
  });
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    // secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.status(200).send('OK');
};