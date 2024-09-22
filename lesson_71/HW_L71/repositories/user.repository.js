import bcrypt from "bcrypt";
import {User} from "../models/user.js";

export const getUser = async (xUserId) => {
  return User.findById(xUserId);
};

export const addAndSaveNewUser = async (newUser) => {
  return await new User(newUser).save();
};

export const getUserByEmail = async (email) => {
  return User.findOne({email}, {email:1, role: 1, refreshToken: 1});
};

export const getUserByEmailAndPassword = async ({email, password}) => {
  const user = await User.findOne({email});

  if (bcrypt.compare(password, user?.password)) {
    return user;
  }
};

export const saveRefreshToken = async (userId, refreshToken) => {
  const options = { new: false };
  await User.findByIdAndUpdate(
    userId,
    {refreshToken},
    options
  );
};

export const removeRefreshToken = async (userId) => {
  const options = { new: false };
  await User.findByIdAndUpdate(
    userId,
    {refreshToken: ''},
    options
  );
};

export const getStoredRefreshToken = async (userId) => {
  const user = await User.findById(userId, {refreshToken: 1});
  return user?.refreshToken;
};
