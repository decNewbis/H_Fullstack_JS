import {users} from "../storage.js";

export const getUser = (xUserId) => {
  return users.find((user) => user.id === xUserId);
};

export const addNewUser = (newUser) => {
  users.push(newUser);
  return newUser;
};