import {Router} from "express";
import {isAuthorized} from "../middlewares.js";
import {fetchProducts, fetchProductById} from "../controllers/products.controllers.js";

const router = Router();

router.get('/', isAuthorized, fetchProducts);
router.get('/:productId', isAuthorized, fetchProductById);

export default router;