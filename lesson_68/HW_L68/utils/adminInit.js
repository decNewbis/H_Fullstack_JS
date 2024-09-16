import {createNewUser} from "../services/user.services.js";
import {roles} from "../roles.js";

export const initializeAdmin = async () => {
  const adminParams = {
    email: process.env.SUPER_USER_EMAIL,
    password: process.env.SUPER_USER_PASSWORD
  };
  await createNewUser(adminParams, roles.ADMIN);
};