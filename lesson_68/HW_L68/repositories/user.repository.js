import bcrypt from "bcrypt";
import {users} from "../storage.js";

export const getUser = (xUserId) => {
  return users.find((user) => user.id === xUserId);
};

export const addNewUser = (newUser) => {
  users.push(newUser);
  return newUser;
};

export const getUserByEmailAndPassword = ({email, password}) => {
  return users.find((user) => user.email === email && bcrypt.compare(password, user.password));
};

export const saveRefreshToken = (userId, refreshToken) => {
  const user = users.find((user) => user.id === userId);
  user.refreshToken = refreshToken;
};

export const removeRefreshToken = (userId) => {
  const user = users.find((user) => user.id === userId);
  delete user?.refreshToken;
};

export const getStoredRefreshToken = (userId) => {
  const user = users.find((user) => user.id === userId);
  return user?.refreshToken;
};
