import {randomUUID as uuid} from "crypto";
import {addNewUser} from "../repositories/user.repository.js";

const xUserIdKey = process.env.X_USER_ID_KEY;

export const signUp = (req, res) => {
  const { email, password } = req.body;
  const newUser = addNewUser({
    id: uuid(),
    email,
    password,
  });

  res.set(xUserIdKey, newUser.id);
  return res.status(201).json({
    id: newUser.id,
    email: newUser.email
  });
};