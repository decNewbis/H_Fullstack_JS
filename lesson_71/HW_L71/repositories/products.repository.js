import {products} from "../storage.js";

export const getProducts = () => {
  return products;
};

export const getProductById = (productId) => {
  return products.find((product) => product.id === +productId);
};