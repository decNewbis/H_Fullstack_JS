import {Router} from "express";
import {isAuthorized} from "../middlewares.js";
import crypto from "crypto";
import {ErrorReadWriteFile, ErrorObjectNotFound} from "../errorHandler.js";
import path from "path";
import {readFile, writeFile} from "fs/promises";
import {fileURLToPath} from "url";
import {createReadStream, createWriteStream, existsSync, mkdirSync} from "fs";
import eventEmitter from "../eventEmits.js";
import sharp from "sharp";

const router = Router();
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

const readProductsStore = async (filename) => {
  try {
    const data = await readFile(path.join(__dirname, '../', filename), { encoding: "utf8" });
    return JSON.parse(data);
  } catch (err) {
    throw new ErrorReadWriteFile(err);
  }
};

const writeProductsStore = async (filename, data) => {
  try {
    await writeFile(path.join(__dirname, '../', filename), JSON.stringify(data), { encoding: "utf8", flag: "w" });
  } catch (err) {
    throw new ErrorReadWriteFile(err);
  }
};

const getCustomProductById = (productId, productsList) => {
  return productsList.find((product) => product.id === `${productId}`);
};

const ensureFileExists = (filename) => {
  if (!existsSync(filename)) {
    throw new ErrorObjectNotFound('File not found');
  }
};

const ensureDirectoryExists = (directory) => {
  if (!existsSync(directory)) {
    mkdirSync(directory);
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

router.post('/', isAuthorized, async (req, res, next) => {
  const { name, description, price } = req.body;
  const newProduct = {
    id: crypto.randomUUID(),
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
});

router.post('/:productId/image/upload', isAuthorized, async (req, res, next) => {
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

router.post('/:productId/video/upload', isAuthorized, async (req, res, next) => {
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

router.get('/image/:filename', isAuthorized, (req, res, next) => {
  const { filename } = req.params;
  const filePath = path.join(imgFolderNamePath, filename);
  const contentType = `image/${productImgFormat}`;
  const requestParams = {
    filePath,
    contentType
  };
  getFileByName(res, next, requestParams);
});

router.get('/video/:filename', isAuthorized, (req, res, next) => {
  const { filename } = req.params;
  const filePath = path.join(videosFolderNamePath, filename);
  const contentType = `video/${productVideoFormat}`;
  const requestParams = {
    filePath,
    contentType
  };
  getFileByName(res, next, requestParams);
});

router.get('/preview/:filename', isAuthorized, (req, res, next) => {
  const { filename } = req.params;
  const filePath = path.join(previewFolderNamePath, filename);
  const contentType = `image/${productImgFormat}`;
  const requestParams = {
    filePath,
    contentType
  };
  getFileByName(res, next, requestParams);
});

export default router;