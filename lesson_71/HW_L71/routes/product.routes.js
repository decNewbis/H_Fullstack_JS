import {Router} from "express";
import {isAuthorized} from "../middlewares.js";
import {
  addProduct,
  getProductImageByName,
  getProductPreviewByName,
  getProductVideoByName,
  productImageUpload,
  productVideoUpload
} from "../controllers/product.controllers.js";
import {roles} from "../roles.js";
import {fetchProductById, fetchProducts} from "../controllers/product.controllers.js";

const router = Router();
const admin  = [roles.ADMIN];
const allRoles = [roles.ADMIN, roles.CUSTOMER];

router.post('/', isAuthorized(admin), addProduct);
router.get('/all', isAuthorized(allRoles), fetchProducts);
router.get('/:productId', isAuthorized(allRoles), fetchProductById);
router.post('/:productId/image/upload', isAuthorized(admin), productImageUpload);
router.post('/:productId/video/upload', isAuthorized(admin), productVideoUpload);
router.get('/image/:filename', isAuthorized(allRoles), getProductImageByName);
router.get('/video/:filename', isAuthorized(allRoles), getProductVideoByName);
router.get('/preview/:filename', isAuthorized(allRoles), getProductPreviewByName);

export default router;