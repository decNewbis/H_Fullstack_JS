import {getProductById} from "../repositories/product.repository.js";
import {ErrorObjectNotFound} from "../errorHandler.js";
import {getUser} from "../repositories/user.repository.js";
import {
  addNewOrder,
  createNewCart,
  findByUserIdAndUpdate,
  getCartByUserId,
  getOrderByUserId
} from "../repositories/cart.repository.js";
import {randomUUID as uuid} from "crypto";

export const addProductToCart = async (xUserId, {productId}) => {
  const foundProductById = await getProductById(productId);
  if (!foundProductById) {
    throw new ErrorObjectNotFound("product not found");
  }

  const currentUser = await getUser(xUserId);
  if (!currentUser) {
    throw new ErrorObjectNotFound("user not found");
  }

  return await findByUserIdAndUpdate(
    currentUser._id,
    {$push: {products: foundProductById._id}}
  );
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
  // TODO: add counting by DB
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