import {Router} from "express";
import {isAuthorized} from "../middlewares.js";
import {products} from "../storage.js";
import {ErrorObjectNotFound} from "../errorHandler.js";

const router = Router();

const getProductById = (productId) => {
  return products.find((product) => product.id === +productId);
};

router.get('/', isAuthorized, (req, res) => {
  res.status(200).json(products);
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