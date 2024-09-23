import {createNewUser} from "../services/user.services.js";
import {roles} from "../roles.js";
import {getUserByEmail} from "../repositories/user.repository.js";

export const initializeAdmin = async (next) => {
  try {
    const adminParams = {
      email: process.env.SUPER_USER_EMAIL,
      password: process.env.SUPER_USER_PASSWORD,
      role: roles.ADMIN
    };
    const isFoundUser = await getUserByEmail(adminParams.email);
    if (isFoundUser) {
      return;
    }
    await createNewUser(adminParams);
  } catch (err) {
    next(err)
  }
};