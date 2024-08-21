import { writeFileSync, readFileSync } from "fs";
import { writeFile, readFile } from "fs/promises";
import express from "express";
import crypto from "crypto";
import bodyParser from "body-parser";
import 'dotenv/config';

import { products, users, carts, orders } from "./storage.js";
import {
  isAuthorized,
  errorHandling,
  signupMiddlewareArray
} from "./middlewares.js";
import { ErrorObjectNotFound, ErrorReadWriteFile } from "./errorHandler.js";

const app = express();
const PORT = process.env.PORT;
const API_PATH = process.env.API_PATH;
const xUserIdKey = process.env.X_USER_ID_KEY;
const productsStore = process.env.PRODUCTS_STORE;
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

const readProductsStore = async (filename) => {
  try {
    const data = await readFile(`${filename}`, { encoding: "utf8" });
    return JSON.parse(data);
  } catch (err) {
    throw new ErrorReadWriteFile(err);
  }
};

const writeProductsStore = async (filename, data) => {
  try {
    await writeFile(`${filename}`, JSON.stringify(data), { encoding: "utf8", flag: "w" });
  } catch (err) {
    throw new ErrorReadWriteFile(err);
  }
};

app.post(`${API_PATH}/register`, signupMiddlewareArray, (req, res) => {
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

app.get(`${API_PATH}/products/:productId`, isAuthorized, (req, res) => {
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

app.post(`${API_PATH}/product`, isAuthorized, async (req, res, next) => {
  const { name, description, price } = req.body;
  const newProduct = {
    id: crypto.randomUUID(),
    name,
    description,
    price,
    videos: [],
    images: [],
    previews: []
  }

  try {
    const customProductsList = await readProductsStore(productsStore);
    customProductsList.push(newProduct);
    
    await writeProductsStore(productsStore, customProductsList);
    res.status(201).send(newProduct);
  } catch (err) {
    next(new ErrorReadWriteFile(err));
  }
});

app.use(errorHandling);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));