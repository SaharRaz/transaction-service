import { createContainer, asClass, asValue } from 'awilix';
import axios from 'axios';
import logger from '../middleware/logger.js';
import Transaction from '../model/transaction.model.js'; // <-- IMPORT YOUR MODEL
import TransactionController from '../controller/transaction.controller.js';
import { env } from './config.js';

const axiosClient = axios.create({
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
});

const container = createContainer();

container.register({
    axios: asValue(axiosClient),
    logger: asValue(logger),
    Transaction: asValue(Transaction),  // <-- REGISTER THE MODEL
    notificationUrl: asValue(env.NOTIFICATION_SERVICE_URL),
    transactionController: asClass(TransactionController)
        .inject(() => ({
            Transaction: container.resolve('Transaction'),  // <-- INJECT it properly
            logger: container.resolve('logger'),
            axios: container.resolve('axios'),
            notificationUrl: container.resolve('notificationUrl'),
        }))
        .singleton()
});

export default container;
