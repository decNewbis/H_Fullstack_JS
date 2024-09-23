import {Cart} from "../models/cart.js";
import {Order} from "../models/order.js";

export const getProductsFromCartByUserId = async (userId) => {
  return Cart.findOne({userId}).populate('products', '_id name price');
};

export const findCartByUserIdAndUpdate = async (userId, update) => {
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

export const findOrderByUserIdAndUpdate = async (userId, update) => {
  const options = {
    new: true,
    upsert: true
  }

  return Order.findOneAndUpdate(
    {userId},
    update,
    options
  )
    .populate('userId', '_id email');
};