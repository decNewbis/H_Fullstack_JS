import { createWriteStream, createReadStream, existsSync, mkdirSync } from "fs";
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
import eventEmitter from "./eventEmits.js";
import sharp from "sharp";

const app = express();
const PORT = process.env.PORT;
const API_PATH = process.env.API_PATH;
const xUserIdKey = process.env.X_USER_ID_KEY;
const productsStore = process.env.PRODUCTS_STORE;
const productImgFormat = process.env.PRODUCT_IMG_FORMAT;
const productVideoFormat = process.env.PRODUCT_VIDEO_FORMAT;
const imgFolderName = process.env.IMG_FOLDER_NAME;
const videosFolderName = process.env.VIDEOS_FOLDER_NAME;
const previewFolderName = process.env.PREVIEWS_FOLDER_NAME;
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

const getCustomProductById = (productId, productsList) => {
  return productsList.find((product) => product.id === productId);
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
    imgFolderName: [],
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

// app.post(`${API_PATH}/product/:productId/image/upload`, isAuthorized, (req, res, next) => {
app.post(`${API_PATH}/product/:productId/image/upload`, (req, res, next) => {
  const filename = `${crypto.randomUUID()}.${productImgFormat}`;
  const previewFilename = `resized_${filename}`;
  const { productId } = req.params;
  const imageFilePath = `./${imgFolderName}/${filename}`;
  const previewImageFilePath = `./${previewFolderName}/${previewFilename}`;
  if (!existsSync(`./${imgFolderName}`)) {
    mkdirSync(`./${imgFolderName}`);
  }
  if (!existsSync(`./${previewFolderName}`)) {
    mkdirSync(`./${previewFolderName}`);
  }

  eventEmitter.emit('fileUploadStart', {productId, filename});
  const writeableStream = createWriteStream(imageFilePath, { encoding: "binary", flags: "w" });
  req.pipe(writeableStream)
    .on('finish', async () => {
      try {
        const customProductsList = await readProductsStore(productsStore);
        const foundProduct = getCustomProductById(`${productId}`, customProductsList);
        foundProduct.images.push(filename);
        foundProduct.previews.push(previewFilename);

        await writeProductsStore(productsStore, customProductsList);
        await sharp(imageFilePath)
          .resize(150, 150)
          .toFile(previewImageFilePath, (err) => {
            next(new ErrorReadWriteFile(err));
          });
        res.status(200).send(foundProduct);
        eventEmitter.emit('fileUploadEnd', {productId, filename});
      } catch (err) {
        eventEmitter.emit('fileUploadFailed', {productId, filename, err});
        next(new ErrorReadWriteFile(err));
      }
    })
    .on('error', (err) => {
      eventEmitter.emit('fileUploadFailed', {productId, filename, err});
      next(new ErrorReadWriteFile(err));
    });
});

app.post(`${API_PATH}/product/:productId/video/upload`, isAuthorized, (req, res, next) => {
  const filename = `${crypto.randomUUID()}.${productVideoFormat}`;
  const { productId } = req.params;
  const videoFilePath = `./${videosFolderName}/${filename}`;
  if (!existsSync(`./${videosFolderName}`)) {
    mkdirSync(`./${videosFolderName}`);
  }

  eventEmitter.emit('fileUploadStart', {productId, filename});
  const writeableStream = createWriteStream(videoFilePath, { encoding: "binary", flags: "w" });
  req.pipe(writeableStream)
    .on('finish', async () => {
      try {
        const customProductsList = await readProductsStore(productsStore);
        const foundProduct = getCustomProductById(productId, customProductsList);
        foundProduct.videos.push(filename);

        await writeProductsStore(productsStore, customProductsList);
        res.status(200).send(foundProduct);
        eventEmitter.emit('fileUploadEnd', {productId, filename});
      } catch (err) {
        eventEmitter.emit('fileUploadFailed', {productId, filename, err});
        next(new ErrorReadWriteFile(err));
      }
    })
    .on('error', (err) => {
      eventEmitter.emit('fileUploadFailed', {productId, filename, err});
      next(new ErrorReadWriteFile(err));
    });
});

app.get(`${API_PATH}/product/image/:filename`, (req, res, next) => {
  const { filename } = req.params;
  const filePath = `./${imgFolderName}/${filename}`;
  if (!existsSync(filePath)) {
    return next(new ErrorReadWriteFile('File not found'));
  }
  const head = {
    "Content-Type": `image/${productImgFormat}`
  };
  res.writeHead(200, head);
  createReadStream(filePath).pipe(res)
    .on('error', (err) => {
      next(new ErrorReadWriteFile(err));
    });
});

app.get(`${API_PATH}/product/video/:filename`, (req, res, next) => {
  const { filename } = req.params;
  const filePath = `./${videosFolderName}/${filename}`;
  if (!existsSync(filePath)) {
    return next(new ErrorReadWriteFile('File not found'));
  }
  const head = {
    "Content-Type": `video/${productVideoFormat}`
  };
  res.writeHead(200, head);
  createReadStream(filePath).pipe(res);
});

app.get(`${API_PATH}/product/preview/:filename`, (req, res, next) => {
  const { filename } = req.params;
  const filePath = `./${previewFolderName}/${filename}`;
  if (!existsSync(filePath)) {
    return next(new ErrorReadWriteFile('File not found'));
  }
  const head = {
    "Content-Type": `image/${productImgFormat}`
  };
  res.writeHead(200, head);
  createReadStream(filePath).pipe(res)
    .on('error', (err) => {
      next(new ErrorReadWriteFile(err));
    });
});

app.use(errorHandling);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));