import {Router} from "express";
import {signupMiddlewareArray} from "../middlewares.js";
import {signUp} from "../controllers/user.controllers.js";

const router = Router();

router.post('/register', signupMiddlewareArray, signUp);

export default router;