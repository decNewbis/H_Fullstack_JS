import {carts, orders} from "../storage.js";

export const getCartByUserId = (userId) => {
  return carts.find((cart) => cart.userId === userId);
};

export const getOrderByUserId = (userId) => {
  return orders.find((order) => order.userId === userId);
};

export const addNewCart = (newCart) => {
  carts.push(newCart);
  return newCart;
};

export const addNewOrder = (newOrder) => {
  orders.push(newOrder);
  return newOrder;
};