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

app.post(`${API_PATH}/register`, (req, res) => {
  const { email, password } = req.body;
  const newUser = {
    id: crypto.randomUUID(),
    email,
    password,
  };

  users.push(newUser);
  const currentUser = users.find((user) => user.id === newUser.id);

  if (currentUser) {
    res.status(201).json({
      id: currentUser.id,
      email: currentUser.email
    });
  } else {
    res.status(500).json({"error": "registration failed"});
  }
});

app.get(`${API_PATH}/products`, (req, res) => {
  const xUserId = req.header("x-user-id");
  const currentUser = getUser(xUserId);

  if (currentUser) {
    res.status(200).json(products);
  } else {
    res.status(401).json({"error": "you do not have access rights to the content"});
  }
});

app.get(`${API_PATH}/products/:productId`, (req, res) => {
  const xUserId = req.header("x-user-id");
  const currentUser = getUser(xUserId);

  if (currentUser) {
    const { productId } = req.params;
    const foundProductById = getProductById(productId);
    if (foundProductById) {
      res.status(200).json(foundProductById);
    } else {
      res.status(404).json({"message": "product not found"});
    }
  } else {
    res.status(401).json({"error": "you do not have access rights to the content"});
  }
});

app.put(`${API_PATH}/cart/:productId`, (req, res) => {
  const xUserId = req.header("x-user-id");
  const currentUser = getUser(xUserId);

  if (currentUser) {
    const { productId } = req.params;
    const foundProductById = getProductById(productId);
    const cart = getCartByUserId(currentUser.id);

    if (foundProductById) {
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
    } else {
      res.status(404).json({"message": "product not found"});
    }
  } else {
    res.status(401).json({"error": "you do not have access rights to the content"});
  }
});

app.delete(`${API_PATH}/cart/:productId`, (req, res) => {
  const xUserId = req.header("x-user-id");
  const currentUser = getUser(xUserId);

  if (currentUser) {
    const { productId } = req.params;
    const cart = getCartByUserId(currentUser.id);

    if (cart) {
      cart.products = cart.products.filter((product) => product.id !== +productId);
      res.status(200).json(cart);
    } else {
      res.status(204);
    }
  } else {
    res.status(401).json({"error": "you do not have access rights to the content"});
  }
});

app.post(`${API_PATH}/cart/checkout`, (req, res) => {})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));