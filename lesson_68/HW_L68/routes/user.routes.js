import {Router} from "express";
import {signupMiddlewareArray} from "../middlewares.js";
import {signUp, logIn, logOut} from "../controllers/user.controllers.js";

const router = Router();

router.post('/register', signupMiddlewareArray, signUp);
router.post('/login', logIn);
router.post('/logout', logOut);

export default router;