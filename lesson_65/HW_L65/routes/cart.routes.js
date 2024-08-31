import {Router} from 'express';
import {isAuthorized} from "../middlewares.js";
import {addProductByIdToCart, checkoutOrder, removeProductByIdFromCart} from "../controllers/cart.controllers.js";

const router = Router();

router.put('/:productId', isAuthorized, addProductByIdToCart);
router.delete('/:productId', isAuthorized, removeProductByIdFromCart);
router.post('/checkout', isAuthorized, checkoutOrder);

export default router;