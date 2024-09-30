import path from 'path';
import {fileURLToPath} from "url";
import express, {Router} from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import 'dotenv/config';
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import mongoose from "mongoose";

import { errorHandling } from "./middlewares.js";
import userRoutes from "./routes/user.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import productRoutes from "./routes/product.routes.js";
import {initializeAdmin} from "./utils/adminInit.js";

const app = express();
const PORT = process.env.PORT;
const API_PATH = process.env.API_PATH;
const apiRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const openApiStore = process.env.OPEN_API_STORE;
const swaggerSpec = YAML.load(path.join(__dirname, openApiStore));
const swaggerUiOptions = {
  swaggerOptions: {
    defaultModelsExpandDepth: -1,
  },
};
const MONGO_ROOT_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const MONGO_ROOT_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const MONGO_DB_NAME = process.env.MONGO_INITDB_DATABASE;
const MONGO_PORT = process.env.MONGO_INITDB_PORT;
const URI_DB = `mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@mongo:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=${MONGO_ROOT_USERNAME}`;


mongoose
  .connect(URI_DB)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(`DB connection error: ${err}`));

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

apiRouter.use(userRoutes);
apiRouter.use('/cart', cartRoutes);
apiRouter.use('/product', productRoutes);

app.use(`${API_PATH}`, apiRouter);
app.use(errorHandling);

await initializeAdmin();

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));