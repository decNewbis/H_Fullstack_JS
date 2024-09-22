import {Video} from "../models/video.js";
import {Image} from "../models/image.js";
import {Preview} from "../models/preview.js";
import {Product} from "../models/product.js";

export const addAndSaveNewProduct = async (data) => {
  return await new Product(data).save();
};

export const addAndSaveNewVideo = async (filename) => {
  return await new Video({name: `${filename}`}).save();
};

export const addAndSaveNewImage = async (filename) => {
  return await new Image({name: `${filename}`}).save();
};

export const addAndSaveNewPreview = async (filename) => {
  return await new Preview({name: `${filename}`}).save();
};

export const findByIdAndUpdate = async (productId, update) => {
  const options = { new: true };

  return Product
    .findByIdAndUpdate(
      productId,
      update,
      options
    )
    .populate('videos images previews', '_id name');
};

export const getProducts = async () => {
  return Product.find();
};

export const getProductById = async (productId) => {
  return Product.findById(productId);
};