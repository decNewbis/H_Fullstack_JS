import express from "express";
import crypto from "crypto";
import bodyParser from "body-parser";
import 'dotenv/config';

import { products, users, carts, orders } from "./storage.js";
import { isAuthorized, isValidEmail, isValidPassword, isUserAlreadyExists, errorHandling } from "./middlewares.js";
import { ErrorObjectNotFound } from "./errorHandler.js";

const app = express();
const PORT = process.env.PORT;
const API_PATH = process.env.API_PATH;
const xUserIdKey = process.env.X_USER_ID_KEY;
app.use(bodyParser.json());

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

app.post(`${API_PATH}/register`, isValidEmail, isValidPassword, isUserAlreadyExists, (req, res) => {
  const { email, password } = req.body;
  const newUser = {
    id: crypto.randomUUID(),
    email,
    password,
  };

  users.push(newUser);

  res.set(xUserIdKey, newUser.id);
  return res.status(201).json({
    id: newUser.id,
    email: newUser.email
  });
});

app.get(`${API_PATH}/products`, isAuthorized, (req, res) => {
  res.status(200).json(products);
});

app.get(`${API_PATH}/products/:productId`, isAuthorized, (req, res, next) => {
  const { productId } = req.params;
  const foundProductById = getProductById(productId);

  if (!foundProductById) {
    throw new ErrorObjectNotFound("product not found");
  }
  res.status(200).json(foundProductById);
});

app.put(`${API_PATH}/cart/:productId`, isAuthorized, (req, res) => {
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
      id: crypto.randomUUID(),
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

app.delete(`${API_PATH}/cart/:productId`, isAuthorized, (req, res) => {
  const xUserId = req.header(xUserIdKey);
  const currentUser = getUser(xUserId);
  const { productId } = req.params;
  const cart = getCartByUserId(currentUser.id);

  if (cart) {
    cart.products = cart.products.filter((product) => product.id !== +productId);
    res.status(200).json(cart);
  }
});

app.post(`${API_PATH}/cart/checkout`, isAuthorized, (req, res) => {
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
      id: crypto.randomUUID(),
      totalPrice
    };
    orders.push(newOrder);
    res.status(200).json(newOrder);
  }
});

app.use(errorHandling);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));