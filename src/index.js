import express from 'express';
import connectDB from './db/dbConnection.js';
import transactionsRoutes from './routes/transaction.routes.js';
import logger from './systems/logger.js';

// Initialize MongoDB Connection
const initializeDatabase = async () => {
    try {
        await connectDB();
        logger.info('Database connection established successfully.');
    } catch (error) {
        logger.error('Failed to initialize database connection:', { error: error.message });
        process.exit(1); // Exit the process if database connection fails
    }
};

const startServices = async () => {
    const app = express();
    app.use(express.json());

    app.use('/transactions', transactionsRoutes);


    // Define ports for each service
    const PORT = 5002;

    // Start an instance of the app for each service
    app.listen(PORT, () => {
        logger.info(`Service ${PORT} running on port ${PORT}`);
        console.log(`Service ${PORT} running on http://localhost:${PORT}`);
    });
};

// Initialize Database Connection and Start Services
initializeDatabase().then(() => {
    startServices().then(() => {});
});
