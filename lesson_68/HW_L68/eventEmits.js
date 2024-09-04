import path from 'path';
import {fileURLToPath} from "url";
import EventEmitter from "events";
import {writeFile} from "fs/promises";
import {existsSync, mkdirSync} from "fs";
import {ErrorReadWriteFile} from "./errorHandler.js";

const uploadLogFileName = process.env.UPLOAD_LOG_FILE_NAME;
const logFilesFolderName = process.env.LOG_FILES_FOLDER_NAME;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const eventEmitter = new EventEmitter();
const formatDate = () => {
  const now = new Date();
  return now.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).replaceAll('/', '-').replace(',', '');
};

const writeUploadLog = async (data) => {
  const logFilesFolderNamePath = path.join(__dirname, logFilesFolderName);
  if (!existsSync(logFilesFolderNamePath)) {
    mkdirSync(logFilesFolderNamePath);
  }
  try {
    await writeFile(path.join(logFilesFolderNamePath, uploadLogFileName), data, { encoding: "utf8", flag: "a" });
  } catch (err) {
    throw new ErrorReadWriteFile(err);
  }
};

eventEmitter.on('fileUploadStart', async ({productId, filename}) => {
  await writeUploadLog(
    `${formatDate()} - File upload has started for product ID: "${productId}", filename: "${filename}"\n`
  );
});

eventEmitter.on('fileUploadEnd', async ({productId, filename}) => {
  await writeUploadLog(
    `${formatDate()} - File upload has completed for product ID: "${productId}", filename: "${filename}"\n`
  );
});

eventEmitter.on('fileUploadFailed', async ({productId, filename, err}) => {
  await writeUploadLog(
    `${formatDate()} - File upload failed for product ID: "${productId}", filename: "${filename}". Error: ${err}\n`
  );
});

export default eventEmitter;