import {
  createNewProduct,
  uploadNewImage,
  uploadNewVideo,
  retrieveProductImage,
  retrieveProductVideo,
  retrieveProductPreview
} from "../services/product.services.js";
import {ErrorReadWriteFile} from "../errorHandler.js";

export const addProduct = async (req, res, next) => {
  try {
    const newProduct = await createNewProduct(req.body);
    res.status(201).send(newProduct);
  } catch (err) {
    next(new ErrorReadWriteFile(err));
  }
};

export const productImageUpload = async (req, res, next) => {
  await uploadNewImage(req, res, next);
};

export const productVideoUpload = async (req, res, next) => {
  await uploadNewVideo(req, res, next);
};

export const getProductImageByName = (req, res, next) => {
  retrieveProductImage(req, res, next);
};

export const getProductVideoByName = (req, res, next) => {
  retrieveProductVideo(req, res, next);
};

export const getProductPreviewByName = (req, res, next) => {
  retrieveProductPreview(req, res, next);
};