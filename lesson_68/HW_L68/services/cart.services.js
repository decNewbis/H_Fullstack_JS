import {getProductById} from "../repositories/products.repository.js";
import {ErrorObjectNotFound} from "../errorHandler.js";
import {getUser} from "../repositories/user.repository.js";
import {addNewOrder, createNewCart, getCartByUserId, getOrderByUserId} from "../repositories/cart.repository.js";
import {randomUUID as uuid} from "crypto";

export const addProductToCart = (xUserId, {productId}) => {
  const foundProductById = getProductById(productId);

  if (!foundProductById) {
    throw new ErrorObjectNotFound("product not found");
  }

  const currentUser = getUser(xUserId);
  let cart = getCartByUserId(currentUser.id);

  if (!cart) {
    const products = [foundProductById];
    cart = createNewCart({
      id: uuid(),
      userId: currentUser.id,
      products
    });
  } else {
    cart.products.push(foundProductById);
  }

  return cart;
};

export const removeProductFromCart = (xUserId, {productId}) => {
  const currentUser = getUser(xUserId);
  const cart = getCartByUserId(currentUser.id);

  if (cart) {
    cart.products = cart.products.filter((product) => product.id !== +productId);
  }
  return cart;
};

export const createCheckoutOrder = (xUserId) => {
  const currentUser = getUser(xUserId);
  const cart = getCartByUserId(currentUser.id);
  let order = getOrderByUserId(currentUser.id);

  if (!cart) {
    throw new ErrorObjectNotFound("cart not found");
  }

  const totalPrice = cart.products.reduce((total, product) => {
    return total + product.price;
  }, 0);

  if (order) {
    order.products = cart.products;
    order.totalPrice = totalPrice;
  } else {
    order = addNewOrder({
      ...cart,
      id: uuid(),
      totalPrice
    });
  }
  return order;
};