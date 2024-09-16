import {Router} from "express";
import {isAuthorized, signupMiddlewareArray} from "../middlewares.js";
import {signUp, logIn, logOut, renewalTokens} from "../controllers/user.controllers.js";
import {roles} from "../roles.js";

const router = Router();
const allRoles = [roles.ADMIN, roles.CUSTOMER];

router.post('/register', signupMiddlewareArray, signUp);
router.post('/login', logIn);
router.post('/logout', logOut);
router.post('/tokens', isAuthorized(allRoles), renewalTokens);

export default router;