import {Router} from "express";
import {randomUUID as uuid} from "crypto";
import {signupMiddlewareArray} from "../middlewares.js";
import {users} from "../storage.js";

const router = Router();
const xUserIdKey = process.env.X_USER_ID_KEY;

router.post(`/register`, signupMiddlewareArray, (req, res) => {
  const { email, password } = req.body;
  const newUser = {
    id: uuid(),
    email,
    password,
  };

  users.push(newUser);

  res.set(xUserIdKey, newUser.id);
  return res.status(201).json({
    id: newUser.id,
    email: newUser.email
  });
});

export default router;