import {randomUUID as uuid} from "crypto";
import path from "path";
import {fileURLToPath} from "url";
import {readProductsStore, writeProductsStore} from "../repositories/product.repository.js";
import {ensureDirectoryExists, handleFileUpload, getFileByName} from "../utils/file.utils.js";

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

export const getCustomProductById = (productId, productsList) => {
  return productsList.find((product) => product.id === `${productId}`);
};

export const createNewProduct = async ({name, description, price}) => {
  const newProduct = {
    id: uuid(),
    name,
    description,
    price,
    videos: [],
    images: [],
    previews: []
  }

  const customProductsList = await readProductsStore(productsStore);
  customProductsList.push(newProduct);
  await writeProductsStore(productsStore, customProductsList);

  return newProduct;
};

export const uploadNewImage = async (req, res, next, callback) => {
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

  await handleFileUpload(req, res, next, uploadParams, callback);
};

export const uploadNewVideo = async (req, res, next, callback) => {
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

  await handleFileUpload(req, res, next, uploadParams, callback);
};

export const retrieveProductImage = (req, res, next, callback) => {
  const { filename } = req.params;
  const filePath = path.join(imgFolderNamePath, filename);
  const contentType = `image/${productImgFormat}`;

  const requestParams = {
    filePath,
    contentType
  };

  getFileByName(res, next, requestParams, callback);
};

export const retrieveProductVideo = (req, res, next, callback) => {
  const { filename } = req.params;
  const filePath = path.join(videosFolderNamePath, filename);
  const contentType = `video/${productVideoFormat}`;

  const requestParams = {
    filePath,
    contentType
  };

  getFileByName(res, next, requestParams, callback);
};

export const retrieveProductPreview = (req, res, next, callback) => {
  const { filename } = req.params;
  const filePath = path.join(previewFolderNamePath, filename);
  const contentType = `image/${productImgFormat}`;

  const requestParams = {
    filePath,
    contentType
  };

  getFileByName(res, next, requestParams, callback);
};