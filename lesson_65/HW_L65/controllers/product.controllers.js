import path from "path";
import {fileURLToPath} from "url";
import {randomUUID as uuid} from "crypto";
import {readProductsStore, writeProductsStore} from "../repositories/product.repository.js";
import {ensureDirectoryExists, handleFileUpload, getFileByName} from "../services/product.services.js";
import {ErrorReadWriteFile} from "../errorHandler.js";

const productsStore = process.env.PRODUCTS_STORE;
const productImgFormat = process.env.PRODUCT_IMG_FORMAT;
const productVideoFormat = process.env.PRODUCT_VIDEO_FORMAT;
const imgFolderName = process.env.IMG_FOLDER_NAME;
const videosFolderName = process.env.VIDEOS_FOLDER_NAME;
const previewFolderName = process.env.PREVIEWS_FOLDER_NAME;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imgFolderNamePath = path.join(__dirname, '../', imgFolderName);
const previewFolderNamePath = path.join(__dirname, '../', previewFolderName);
const videosFolderNamePath = path.join(__dirname, '../', videosFolderName);

export const addProduct = async (req, res, next) => {
  const { name, description, price } = req.body;
  const newProduct = {
    id: uuid(),
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
};

export const productImageUpload = async (req, res, next) => {
  const filename = `${uuid()}.${productImgFormat}`;
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
};

export const productVideoUpload = async (req, res, next) => {
  const filename = `${uuid()}.${productVideoFormat}`;
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
};

export const getProductImageByName = (req, res, next) => {
  const { filename } = req.params;
  const filePath = path.join(imgFolderNamePath, filename);
  const contentType = `image/${productImgFormat}`;
  const requestParams = {
    filePath,
    contentType
  };
  getFileByName(res, next, requestParams);
};

export const getProductVideoByName = (req, res, next) => {
  const { filename } = req.params;
  const filePath = path.join(videosFolderNamePath, filename);
  const contentType = `video/${productVideoFormat}`;
  const requestParams = {
    filePath,
    contentType
  };
  getFileByName(res, next, requestParams);
};

export const getProductPreviewByName = (req, res, next) => {
  const { filename } = req.params;
  const filePath = path.join(previewFolderNamePath, filename);
  const contentType = `image/${productImgFormat}`;
  const requestParams = {
    filePath,
    contentType
  };
  getFileByName(res, next, requestParams);
};