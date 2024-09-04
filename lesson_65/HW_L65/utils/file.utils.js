import {createReadStream, createWriteStream, existsSync, mkdirSync} from "fs";
import sharp from "sharp";
import {ErrorObjectNotFound, ErrorReadWriteFile} from "../errorHandler.js";
import eventEmitter from "../eventEmits.js";
import {readProductsStore, writeProductsStore} from "../repositories/product.repository.js";
import {getCustomProductById} from "../services/product.services.js";

const productsStore = process.env.PRODUCTS_STORE;

export const ensureFileExists = (filename) => {
  if (!existsSync(filename)) {
    throw new ErrorObjectNotFound('File not found');
  }
};

export const ensureDirectoryExists = (directory) => {
  if (!existsSync(directory)) {
    mkdirSync(directory);
  }
};

export const handleFileUpload = async (req, res, next, uploadParams, callback) => {
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
        eventEmitter.emit('fileUploadEnd', {productId, filename});
        callback(null, foundProduct);
      } catch (err) {
        eventEmitter.emit('fileUploadFailed', {productId, filename, err});
        callback(err);
      }
    })
    .on('error', (err) => {
      eventEmitter.emit('fileUploadFailed', {productId, filename, err});
      callback(err);
    });
};

export const getFileByName = (res, next, requestParams, callback) => {
  const {filePath, contentType} = requestParams;
  try {
    ensureFileExists(filePath, next);
  } catch (err) {
    return callback(err);
  }
  const head = {
    "Content-Type": contentType
  };
  callback(null, head);
  createReadStream(filePath).pipe(res);
};