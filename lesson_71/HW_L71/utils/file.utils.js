import {createReadStream, createWriteStream, existsSync, mkdirSync} from "fs";
import sharp from "sharp";
import {ErrorObjectNotFound} from "../errorHandler.js";
import eventEmitter from "../eventEmits.js";
import {
  addAndSaveNewImage, addAndSaveNewPreview,
  addAndSaveNewVideo, findByIdAndUpdate,
} from "../repositories/product.repository.js";

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
  try {
    let file;
    let preview;

    if (fileType === 'images') {
      file = await addAndSaveNewImage(filename);
      preview = await addAndSaveNewPreview(previewFilename);
    } else {
      file = await addAndSaveNewVideo(filename);
    }

    let product = await findByIdAndUpdate(
      productId,
      {$push: {[fileType]: file._id}}
    );

    const writeableStream = await createWriteStream(filePath, {encoding: "binary", flags: "w"});

    req.pipe(writeableStream)
      .on('finish', async () => {
        if (fileType === 'images') {
          await sharp(filePath)
            .resize(150, 150)
            .toFile(previewFilePath);
          product = await findByIdAndUpdate(
            productId,
            {$push: {previews: preview._id}}
          );
        }

        eventEmitter.emit('fileUploadEnd', {productId, filename});
        callback(null, product);
      })
      .on('error', (err) => {
        eventEmitter.emit('fileUploadFailed', {productId, filename, err});
        callback(err);
      });
  } catch (err) {
    eventEmitter.emit('fileUploadFailed', {productId, filename, err});
    callback(err);
  }
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