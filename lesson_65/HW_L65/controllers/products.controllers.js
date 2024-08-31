import {getProductById, getProducts} from "../repositories/products.repository.js";
import {ErrorObjectNotFound} from "../errorHandler.js";

export const fetchProducts = (req, res) => {
  res.status(200).json(getProducts());
};

export const fetchProductById = (req, res) => {
  const { productId } = req.params;
  const foundProductById = getProductById(productId);

  if (!foundProductById) {
    throw new ErrorObjectNotFound("product not found");
  }
  res.status(200).json(foundProductById);
};