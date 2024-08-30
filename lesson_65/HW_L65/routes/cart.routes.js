import {Router} from 'express';
import {randomUUID as uuid} from "crypto";
import {isAuthorized} from "../middlewares.js";
import {ErrorObjectNotFound} from "../errorHandler.js";
import {carts, orders, products, users} from "../storage.js";

const router = Router();
const xUserIdKey = process.env.X_USER_ID_KEY;

const getUser = (xUserId) => {
  return users.find((user) => user.id === xUserId);
};

const getProductById = (productId) => {
  return products.find((product) => product.id === +productId);
};

const getCartByUserId = (userId) => {
  return carts.find((cart) => cart.userId === userId);
};

const getOrderByUserId = (userId) => {
  return orders.find((order) => order.userId === userId);
};

router.put('/cart/:productId', isAuthorized, (req, res) => {
  const { productId } = req.params;
  const foundProductById = getProductById(productId);

  if (!foundProductById) {
    throw new ErrorObjectNotFound("product not found");
  }

  const xUserId = req.header(xUserIdKey);
  const currentUser = getUser(xUserId);
  const cart = getCartByUserId(currentUser.id);

  if (!cart) {
    const products = [];
    products.push(foundProductById);
    const newCart = {
      id: uuid(),
      userId: currentUser.id,
      products
    };
    carts.push(newCart);
    res.status(200).json(newCart);
  } else {
    cart.products.push(foundProductById);
    res.status(200).json(cart);
  }
});

router.delete('/cart/:productId', isAuthorized, (req, res) => {
  const xUserId = req.header(xUserIdKey);
  const currentUser = getUser(xUserId);
  const { productId } = req.params;
  const cart = getCartByUserId(currentUser.id);

  if (cart) {
    cart.products = cart.products.filter((product) => product.id !== +productId);
    res.status(200).json(cart);
  }
});

router.post('/cart/checkout', isAuthorized, (req, res) => {
  const xUserId = req.header(xUserIdKey);
  const currentUser = getUser(xUserId);
  const cart = getCartByUserId(currentUser.id);
  const order = getOrderByUserId(currentUser.id);

  if (!cart) {
    throw new ErrorObjectNotFound("cart not found");
  }

  const totalPrice = cart.products.reduce((total, product) => {
    return total + product.price;
  }, 0);

  if (order) {
    order.products = cart.products;
    order.totalPrice = totalPrice;
    res.status(200).json(order);
  } else {
    const newOrder = {
      ...cart,
      id: uuid(),
      totalPrice
    };
    orders.push(newOrder);
    res.status(200).json(newOrder);
  }
});

export default router;