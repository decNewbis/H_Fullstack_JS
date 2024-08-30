import {Router} from "express";
import {randomUUID as uuid} from "crypto";
import {signupMiddlewareArray} from "../middlewares.js";
import {addNewUser} from "../repositories/user.repository.js";

const router = Router();
const xUserIdKey = process.env.X_USER_ID_KEY;

router.post('/register', signupMiddlewareArray, (req, res) => {
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
});

export default router;