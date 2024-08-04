import express from "express";
import crypto from "crypto";
import bodyParser from "body-parser";

import { products, users, carts, orders } from "./storage.js";

const app = express();
const PORT = 3000;
const API_PATH = '/api';
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

const sendProductNotFoundResponse = (res) => {
  return res.status(404).json({"message": "product not found"});
};

const sendUnauthorizedResponse = (res) => {
  res.status(401).json({"error": "you do not have access rights to the content"});
};

app.post(`${API_PATH}/register`, (req, res) => {
  const { email, password } = req.body;

  const isUserAlreadyExists = users.some((user) => user.email === email);
    if (isUserAlreadyExists) {
    return res.status(409).json({"error": "user already exists"});
  }

  const newUser = {
    id: crypto.randomUUID(),
    email,
    password,
  };
  users.push(newUser);

  return res.status(201).json({
    id: newUser.id,
    email: newUser.email
  });
});

app.get(`${API_PATH}/products`, (req, res) => {
  const xUserId = req.header("x-user-id");
  const currentUser = getUser(xUserId);

  if (currentUser) {
    res.status(200).json(products);
  } else {
    // res.status(401).json({"error": "you do not have access rights to the content"});
    sendUnauthorizedResponse(res);
  }
});

app.get(`${API_PATH}/products/:productId`, (req, res) => {
  const xUserId = req.header("x-user-id");
  const currentUser = getUser(xUserId);

  if (!currentUser) {
    return sendUnauthorizedResponse(res);
  }
  const { productId } = req.params;
  const foundProductById = getProductById(productId);
  if (foundProductById) {
    res.status(200).json(foundProductById);
  } else {
    sendProductNotFoundResponse(res);
  }
});

app.put(`${API_PATH}/cart/:productId`, (req, res) => {
  const xUserId = req.header("x-user-id");
  const currentUser = getUser(xUserId);

  if (!currentUser) {
    return sendUnauthorizedResponse(res);
  }

  const { productId } = req.params;
  const foundProductById = getProductById(productId);
  const cart = getCartByUserId(currentUser.id);

  if (!foundProductById) {
    return sendProductNotFoundResponse(res);
  }
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

app.delete(`${API_PATH}/cart/:productId`, (req, res) => {
  const xUserId = req.header("x-user-id");
  const currentUser = getUser(xUserId);

  if (!currentUser) {
    return sendUnauthorizedResponse(res);
  }

  const { productId } = req.params;
  const cart = getCartByUserId(currentUser.id);

  if (cart) {
    cart.products = cart.products.filter((product) => product.id !== +productId);
    res.status(200).json(cart);
  } else {
    res.status(204);
  }
});

app.post(`${API_PATH}/cart/checkout`, (req, res) => {
  const xUserId = req.header("x-user-id");
  const currentUser = getUser(xUserId);

  if (!currentUser) {
    return sendUnauthorizedResponse(res);
  }
  const cart = getCartByUserId(currentUser.id);
  const order = getOrderByUserId(currentUser.id);

  if (!cart) {
    return sendProductNotFoundResponse(res);
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

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));