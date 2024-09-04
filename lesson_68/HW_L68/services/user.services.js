import {randomUUID as uuid} from "crypto";
import {addNewUser} from "../repositories/user.repository.js";

export const createNewUser = ({ email, password }) => {
  const newUser = addNewUser({
    id: uuid(),
    email,
    password,
  });

  return {
    id: newUser.id,
    email: newUser.email
  };
};