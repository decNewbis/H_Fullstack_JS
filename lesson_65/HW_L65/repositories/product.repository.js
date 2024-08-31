import path from "path";
import {fileURLToPath} from "url";
import {readFile, writeFile} from "fs/promises";
import {ErrorReadWriteFile} from "../errorHandler.js";

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