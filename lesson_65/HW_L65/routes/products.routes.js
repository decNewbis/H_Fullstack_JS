import {Router} from "express";
import {isAuthorized} from "../middlewares.js";
import {ErrorObjectNotFound} from "../errorHandler.js";
import {getProducts, getProductById} from "../repositories/products.repository.js";

const router = Router();

router.get('/', isAuthorized, (req, res) => {
  res.status(200).json(getProducts());
});

router.get('/:productId', isAuthorized, (req, res) => {
  const { productId } = req.params;
  const foundProductById = getProductById(productId);

  if (!foundProductById) {
    throw new ErrorObjectNotFound("product not found");
  }
  res.status(200).json(foundProductById);
});

export default router;