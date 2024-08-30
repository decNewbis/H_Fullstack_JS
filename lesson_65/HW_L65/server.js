import express from "express";
import {Router} from "express";
import bodyParser from "body-parser";
import 'dotenv/config';

import { errorHandling } from "./middlewares.js";
import userRoutes from "./routes/user.routes.js";
import productsRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();
const PORT = process.env.PORT;
const API_PATH = process.env.API_PATH;
const apiRouter = Router();

app.use(bodyParser.json());

apiRouter.use(userRoutes);
apiRouter.use('/products', productsRoutes);
apiRouter.use('/cart', cartRoutes);
apiRouter.use('/product', productRoutes);

app.use(`${API_PATH}`, apiRouter);
app.use(errorHandling);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));