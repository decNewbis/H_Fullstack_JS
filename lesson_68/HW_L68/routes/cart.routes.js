import {Router} from 'express';
import {isAuthorized} from "../middlewares.js";
import {addProductByIdToCart, checkoutOrder, removeProductByIdFromCart} from "../controllers/cart.controllers.js";
import {roles} from "../roles.js";

const router = Router();
const allRoles = [roles.ADMIN, roles.CUSTOMER];

router.put('/:productId', isAuthorized(allRoles), addProductByIdToCart);
router.delete('/:productId', isAuthorized(allRoles), removeProductByIdFromCart);
router.post('/checkout', isAuthorized(allRoles), checkoutOrder);

export default router;