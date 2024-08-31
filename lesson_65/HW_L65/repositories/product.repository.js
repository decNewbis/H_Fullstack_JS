import {readFile, writeFile} from "fs/promises";
import path from "path";
import {ErrorReadWriteFile} from "../errorHandler.js";

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