import {carts, orders} from "../storage.js";
import {Cart} from "../models/cart.js";

export const getCartByUserId = async (userId) => {
  return carts.find((cart) => cart.userId === userId);
};

export const findByUserIdAndUpdate = async (userId, update) => {
  const options = {
    new: true,
    upsert: true
  }
  return Cart.findOneAndUpdate(
    {userId},
    update,
    options
  ).populate('products', '_id name description price');
};

export const getOrderByUserId = (userId) => {
  return orders.find((order) => order.userId === userId);
};

export const createNewCart = (newCart) => {
  carts.push(newCart);
  return newCart;
};

export const addNewOrder = (newOrder) => {
  orders.push(newOrder);
  return newOrder;
};