import path from "path";
import {fileURLToPath} from "url";
import {readFile, writeFile} from "fs/promises";
import {ErrorReadWriteFile} from "../errorHandler.js";
import {Video} from "../models/video.js";
import {Image} from "../models/image.js";
import {Preview} from "../models/preview.js";
import {Product} from "../models/product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readProductsStore = async (filename) => {
  try {
    const data = await readFile(path.join(__dirname, '../', filename), { encoding: "utf8" });
    return JSON.parse(data);
  } catch (err) {
    throw new ErrorReadWriteFile(err);
  }
};

export const writeProductsStore = async (filename, data) => {
  try {
    await writeFile(path.join(__dirname, '../', filename), JSON.stringify(data), { encoding: "utf8", flag: "w" });
  } catch (err) {
    throw new ErrorReadWriteFile(err);
  }
};

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