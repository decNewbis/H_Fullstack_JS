import { createWriteStream, createReadStream, existsSync, mkdirSync } from "fs";
import path from 'path';
import {fileURLToPath} from "url";
import { writeFile, readFile } from "fs/promises";
import express from "express";
import crypto from "crypto";
import bodyParser from "body-parser";
import 'dotenv/config';

import { products, users, carts, orders } from "./storage.js";
import {
  isAuthorized,
  errorHandling,
  // signupMiddlewareArray
} from "./middlewares.js";
import userRoutes from "./routes/user.routes.js";
import productsRoutes from "./routes/products.routes.js";
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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imgFolderNamePath = path.join(__dirname, imgFolderName);
const previewFolderNamePath = path.join(__dirname, previewFolderName);
const videosFolderNamePath = path.join(__dirname, videosFolderName);
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
  return productsList.find((product) => product.id === `${productId}`);
};

const ensureDirectoryExists = (directory) => {
  if (!existsSync(directory)) {
    mkdirSync(directory);
  }
};

const ensureFileExists = (filename) => {
  if (!existsSync(filename)) {
    throw new ErrorObjectNotFound('File not found');
  }
};

const handleFileUpload = async (req, res, next, uploadParams) => {
  const {
    productId,
    filename,
    previewFilename=null,
    filePath,
    previewFilePath=null,
    fileType
  } = uploadParams;

  eventEmitter.emit('fileUploadStart', {productId, filename});
  const writeableStream = createWriteStream(filePath, { encoding: "binary", flags: "w" });
  req.pipe(writeableStream)
    .on('finish', async () => {
      try {
        const customProductsList = await readProductsStore(productsStore);
        const foundProduct = getCustomProductById(productId, customProductsList);
        foundProduct[fileType].push(filename);
        if (fileType === 'images') {
          foundProduct.previews.push(previewFilename)
        }

        await writeProductsStore(productsStore, customProductsList);

        if (fileType === 'images') {
          await sharp(filePath)
            .resize(150, 150)
            .toFile(previewFilePath);
        }
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
};

const getFileByName = (res, next, requestParams) => {
  const {filePath, contentType} = requestParams;
  try {
    ensureFileExists(filePath, next);
  } catch (err) {
    return next(err);
  }
  const head = {
    "Content-Type": contentType
  };
  res.writeHead(200, head);
  createReadStream(filePath).pipe(res);
};

app.use(`${API_PATH}`, userRoutes);
// app.post(`${API_PATH}/register`, signupMiddlewareArray, (req, res) => {
//   const { email, password } = req.body;
//   const newUser = {
//     id: crypto.randomUUID(),
//     email,
//     password,
//   };
//
//   users.push(newUser);
//
//   res.set(xUserIdKey, newUser.id);
//   return res.status(201).json({
//     id: newUser.id,
//     email: newUser.email
//   });
// });

app.use(`${API_PATH}`, productsRoutes);
// app.get(`${API_PATH}/products`, isAuthorized, (req, res) => {
//   res.status(200).json(products);
// });

// app.get(`${API_PATH}/products/:productId`, isAuthorized, (req, res) => {
//   const { productId } = req.params;
//   const foundProductById = getProductById(productId);
//
//   if (!foundProductById) {
//     throw new ErrorObjectNotFound("product not found");
//   }
//   res.status(200).json(foundProductById);
// });

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

app.post(`${API_PATH}/product/:productId/image/upload`, isAuthorized, async (req, res, next) => {
  const filename = `${crypto.randomUUID()}.${productImgFormat}`;
  const previewFilename = `resized_${filename}`;
  const { productId } = req.params;
  const imageFilePath = path.join(imgFolderNamePath, filename);
  const previewImageFilePath = path.join(previewFolderNamePath, previewFilename);
  const fileType = 'images';
  const uploadParams = {
    productId,
    filename,
    previewFilename,
    filePath: imageFilePath,
    previewFilePath: previewImageFilePath,
    fileType
  };

  ensureDirectoryExists(imgFolderNamePath);
  ensureDirectoryExists(previewFolderNamePath);

  await handleFileUpload(req, res, next, uploadParams);
});

app.post(`${API_PATH}/product/:productId/video/upload`, isAuthorized, async (req, res, next) => {
  const filename = `${crypto.randomUUID()}.${productVideoFormat}`;
  const { productId } = req.params;
  const videoFilePath = path.join(videosFolderNamePath, filename);
  const fileType = 'videos';
  const uploadParams = {
    productId,
    filename,
    filePath: videoFilePath,
    fileType
  };

  ensureDirectoryExists(videosFolderNamePath);

  await handleFileUpload(req, res, next, uploadParams);
});

app.get(`${API_PATH}/product/image/:filename`, isAuthorized, (req, res, next) => {
  const { filename } = req.params;
  const filePath = path.join(imgFolderNamePath, filename);
  const contentType = `image/${productImgFormat}`;
  const requestParams = {
    filePath,
    contentType
  };
  getFileByName(res, next, requestParams);
});

app.get(`${API_PATH}/product/video/:filename`, isAuthorized, (req, res, next) => {
  const { filename } = req.params;
  const filePath = path.join(videosFolderNamePath, filename);
  const contentType = `video/${productVideoFormat}`;
  const requestParams = {
    filePath,
    contentType
  };
  getFileByName(res, next, requestParams);
});

app.get(`${API_PATH}/product/preview/:filename`, isAuthorized, (req, res, next) => {
  const { filename } = req.params;
  const filePath = path.join(previewFolderNamePath, filename);
  const contentType = `image/${productImgFormat}`;
  const requestParams = {
    filePath,
    contentType
  };
  getFileByName(res, next, requestParams);
});

app.use(errorHandling);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));