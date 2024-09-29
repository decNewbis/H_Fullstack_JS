import {
  createNewProduct,
  uploadNewImage,
  uploadNewVideo,
  retrieveProductImage,
  retrieveProductVideo,
  retrieveProductPreview
} from "../services/product.services.js";
import {ErrorReadWriteFile} from "../errorHandler.js";
import {getProducts} from "../repositories/product.repository.js";
import {findProductById} from "../services/product.services.js";

export const addProduct = async (req, res, next) => {
  try {
    const newProduct = await createNewProduct(req.body, next);
    res.status(201).send(newProduct);
  } catch (err) {
    next(new ErrorReadWriteFile(err));
  }
};

const handleResponseUploadMedia = (res, next) => (err, product) => {
  if (err) {
    return next(err);
  }
  res.status(200).send(product);
};

const handleResponseGetMedia = (res, next) => (err, head) => {
  if (err) {
    return next(new ErrorReadWriteFile(err));
  }
  res.writeHead(200, head);
};

export const productImageUpload = async (req, res, next) => {
  await uploadNewImage(req, res, next, handleResponseUploadMedia(res, next));
};

export const productVideoUpload = async (req, res, next) => {
  await uploadNewVideo(req, res, next, handleResponseUploadMedia(res, next));
};

export const getProductImageByName = (req, res, next) => {
  retrieveProductImage(req, res, next, handleResponseGetMedia(res, next));
};

export const getProductVideoByName = (req, res, next) => {
  retrieveProductVideo(req, res, next, handleResponseGetMedia(res, next));
};

export const getProductPreviewByName = (req, res, next) => {
  retrieveProductPreview(req, res, next, handleResponseGetMedia(res, next));
};

export const fetchProducts = async (req, res) => {
  const allProducts = await getProducts();
  res.status(200).json(allProducts);
};

export const fetchProductById = async (req, res, next) => {
  try {
    const foundProductById = await findProductById(req.params);

    res.status(200).json(foundProductById);
  } catch (err) {
    next(err);
  }
};