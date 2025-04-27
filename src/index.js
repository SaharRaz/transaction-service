import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/dbConnection.js';
import container from './configs/awilix.js';
import { env } from './configs/config.js';
import { SERVICE_NAME } from './configs/constants.js';
import logger from './middleware/logger.js';
import createRoutes from './routes/transaction.routes.js';

dotenv.config();
await connectDB();

const app = express();
app.use(express.json());

const transactionController = container.resolve('transactionController');
const transactionRouter = createRoutes(transactionController);
app.use('/transactions', transactionRouter);

app.listen(env.PORT, () => {
    logger.info(`${SERVICE_NAME}[index] Service running at http://localhost:${env.PORT}`);
});