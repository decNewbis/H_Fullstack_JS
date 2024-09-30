import {getProductById} from "../repositories/product.repository.js";
import {ErrorObjectNotFound} from "../errorHandler.js";
import {getUser} from "../repositories/user.repository.js";
import {
  findCartByUserIdAndUpdate,
  findOrderByUserIdAndUpdate,
  getProductsFromCartByUserId,
} from "../repositories/cart.repository.js";

export const addProductToCart = async (xUserId, {productId}) => {
  const foundProductById = await getProductById(productId);
  if (!foundProductById) {
    throw new ErrorObjectNotFound("product not found");
  }

  const currentUser = await getUser(xUserId);
  if (!currentUser) {
    throw new ErrorObjectNotFound("user not found");
  }

  return await findCartByUserIdAndUpdate(
    currentUser._id,
    {$push: {products: foundProductById._id}}
  );
};

export const removeProductFromCart = async (xUserId, {productId}) => {
  const currentUser = await getUser(xUserId);
  if (!currentUser) {
    throw new ErrorObjectNotFound("user not found");
  }
  return await findCartByUserIdAndUpdate(
    currentUser._id,
    {$pull: {products: productId}}
  );
};

export const createCheckoutOrder = async (xUserId) => {
  const currentUser = await getUser(xUserId);
  if (!currentUser) {
    throw new ErrorObjectNotFound("user not found");
  }
  const cart = await getProductsFromCartByUserId(currentUser.id);
  if (!cart) {
    throw new ErrorObjectNotFound('Cart not found');
  }
  const products = cart.products.map((product) => {
    return {
      productId: product._id,
      name: product.name,
      price: product.price
    };
  });
  const totalPrice = products.reduce((sum, product) => {
    return sum + product.price;
  }, 0);

  return await findOrderByUserIdAndUpdate(
    currentUser.id,
    {
      products,
      totalPrice
    }
  );
};