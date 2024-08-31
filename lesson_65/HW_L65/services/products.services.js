import {getProductById} from "../repositories/products.repository.js";

export const findProductById = (productId) => {
  return getProductById(productId);
};