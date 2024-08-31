import {createNewUser} from "../services/user.services.js";

const xUserIdKey = process.env.X_USER_ID_KEY;

export const signUp = (req, res) => {
  const newUser = createNewUser(req.body);

  res.set(xUserIdKey, newUser.id);
  return res.status(201).json(newUser);
};