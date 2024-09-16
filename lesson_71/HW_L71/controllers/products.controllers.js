import {getProducts} from "../repositories/products.repository.js";
import {ErrorObjectNotFound} from "../errorHandler.js";
import {findProductById} from "../services/products.services.js";

export const fetchProducts = (req, res) => {
  res.status(200).json(getProducts());
};

export const fetchProductById = (req, res) => {
  const foundProductById = findProductById(req.params);

  if (!foundProductById) {
    throw new ErrorObjectNotFound("product not found");
  }
  res.status(200).json(foundProductById);
};