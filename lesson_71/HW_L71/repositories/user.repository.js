import bcrypt from "bcrypt";
import {User} from "../models/user.js";
import {users} from "../storage.js";

export const getUser = (xUserId) => {
  return users.find((user) => user.id === xUserId);
};

export const addAndSaveNewUser = async (newUser) => {
  return await new User(newUser).save();
};

export const getUserByEmail = async (email) => {
  return User.findOne({email});
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
