import {Router} from 'express';
import {randomUUID as uuid} from "crypto";
import {isAuthorized} from "../middlewares.js";
import {ErrorObjectNotFound} from "../errorHandler.js";
import {getUser} from "../repositories/user.repository.js";
import {getProductById} from "../repositories/products.repository.js";
import {getCartByUserId, getOrderByUserId, createNewCart, addNewOrder} from "../repositories/cart.repository.js";

const router = Router();
const xUserIdKey = process.env.X_USER_ID_KEY;

router.put('/:productId', isAuthorized, (req, res) => {
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
    const newCart = createNewCart({
      id: uuid(),
      userId: currentUser.id,
      products
    });
    res.status(200).json(newCart);
  } else {
    cart.products.push(foundProductById);
    res.status(200).json(cart);
  }
});

router.delete('/:productId', isAuthorized, (req, res) => {
  const xUserId = req.header(xUserIdKey);
  const currentUser = getUser(xUserId);
  const { productId } = req.params;
  const cart = getCartByUserId(currentUser.id);

  if (cart) {
    cart.products = cart.products.filter((product) => product.id !== +productId);
    res.status(200).json(cart);
  }
});

router.post('/checkout', isAuthorized, (req, res) => {
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
    const newOrder = addNewOrder({
      ...cart,
      id: uuid(),
      totalPrice
    });
    res.status(200).json(newOrder);
  }
});

export default router;