import {addProductToCart, createCheckoutOrder, removeProductFromCart} from "../services/cart.services.js";
import {getUserId} from "../services/user.services.js";

export const addProductByIdToCart = async (req, res, next) => {
  try {
    const cart = await addProductToCart(getUserId(req), req.params);
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

export const removeProductByIdFromCart = (req, res, next) => {
  try {
    const cart = removeProductFromCart(getUserId(req), req.params);
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

export const checkoutOrder =(req, res, next) => {
  try {
    const order = createCheckoutOrder(getUserId(req));
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};