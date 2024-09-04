import {addProductToCart, createCheckoutOrder, removeProductFromCart} from "../services/cart.services.js";

const xUserIdKey = process.env.X_USER_ID_KEY;

export const addProductByIdToCart = (req, res, next) => {
  try {
    const cart = addProductToCart(req.header(xUserIdKey), req.params);
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

export const removeProductByIdFromCart = (req, res, next) => {
  try {
    const cart = removeProductFromCart(req.header(xUserIdKey), req.params);
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

export const checkoutOrder =(req, res, next) => {
  try {
    const order = createCheckoutOrder(req.header(xUserIdKey));
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};