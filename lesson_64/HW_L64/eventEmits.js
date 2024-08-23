import EventEmitter from "events";
import {writeFile} from "fs/promises";
import {ErrorReadWriteFile} from "./errorHandler.js";
import {existsSync, mkdirSync} from "fs";

const uploadLogFileName = process.env.UPLOAD_LOG_FILE_NAME;
const logFilesFolderName = process.env.LOG_FILES_FOLDER_NAME;

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
  if (!existsSync(`./${logFilesFolderName}`)) {
    mkdirSync(`./${logFilesFolderName}`);
  }
  try {
    await writeFile(`./${logFilesFolderName}/${uploadLogFileName}`, data, { encoding: "utf8", flag: "a" });
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