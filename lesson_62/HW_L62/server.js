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

});

app.put(`${API_PATH}/cart/:productId`, (req, res) => {

});

app.delete(`${API_PATH}/cart/:productId`, (req, res) => {

});

app.post(`${API_PATH}/cart/checkout`, (req, res) => {})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));