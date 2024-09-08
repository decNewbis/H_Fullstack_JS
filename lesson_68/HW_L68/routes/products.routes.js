import {Router} from "express";
import {isAuthorized} from "../middlewares.js";
import {fetchProducts, fetchProductById} from "../controllers/products.controllers.js";
import {roles} from "../roles.js";

const router = Router();
const allRoles = [roles.ADMIN, roles.CUSTOMER];

router.get('/', isAuthorized(allRoles), fetchProducts);
router.get('/:productId', isAuthorized(allRoles), fetchProductById);

export default router;