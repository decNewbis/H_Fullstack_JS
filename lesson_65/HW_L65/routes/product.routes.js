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

const router = Router();

router.post('/', isAuthorized, addProduct);
router.post('/:productId/image/upload', isAuthorized, productImageUpload);
router.post('/:productId/video/upload', isAuthorized, productVideoUpload);
router.get('/image/:filename', isAuthorized, getProductImageByName);
router.get('/video/:filename', isAuthorized, getProductVideoByName);
router.get('/preview/:filename', isAuthorized, getProductPreviewByName);

export default router;