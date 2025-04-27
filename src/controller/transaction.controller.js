import { SERVICE_NAME } from '../configs/constants.js';

export default class TransactionController {
    constructor({ Transaction, logger, axios, notificationUrl }) {
        this.Transaction = Transaction;
        this.logger = logger;
        this.axios = axios;
        this.notificationUrl = notificationUrl;
    }

    async createTransaction(data) {
        try {
            console.log('[createTransaction] req.body:', data);
            this.logger.info(`${SERVICE_NAME}[createTransaction] Notification URL: ${this.notificationUrl}`);
            const transaction = new this.Transaction(data);
            console.log('[createTransaction] Transaction instance:', transaction);
            const saved = await transaction.save();

            this.logger.info(`${SERVICE_NAME}[createTransaction] Transaction created`, { transactionId: saved._id });

            await this.axios.post(this.notificationUrl, {
                transactionId: saved._id,
                message: `💸 Transaction from ${saved.fromUserId} to ${saved.toUserId} created successfully!`,
            });

            return saved;
        } catch (err) {
            this.logger.error(`${SERVICE_NAME}[createTransaction] Error:`, { error: err.message });
            throw err;
        }
    }

    async getAllTransactions() {
        try {
            const transactions = await this.Transaction.find().lean();
            this.logger.info(`${SERVICE_NAME}[getAllTransactions] Fetched all transactions`, { count: transactions.length });
            return transactions;
        } catch (err) {
            this.logger.error(`${SERVICE_NAME}[getAllTransactions] Error:`, { error: err.message });
            throw err;
        }
    }

    async getTransactionById(id) {
        try {
            const transaction = await this.Transaction.findById(id).lean();
            if (!transaction) {
                this.logger.warn(`${SERVICE_NAME}[getTransactionById] Not found`, { id });
                return null;
            }
            this.logger.info(`${SERVICE_NAME}[getTransactionById] Found`, { id });
            return transaction;
        } catch (err) {
            this.logger.error(`${SERVICE_NAME}[getTransactionById] Error:`, { error: err.message });
            throw err;
        }
    }

    async getTransactionsByUserId(userId) {
        try {
            const transactions = await this.Transaction.find({
                $or: [{ fromUserId: userId }, { toUserId: userId }]
            }).lean();
            this.logger.info(`${SERVICE_NAME}[getTransactionsByUserId] Found transactions`, { userId, count: transactions.length });
            return transactions;
        } catch (err) {
            this.logger.error(`${SERVICE_NAME}[getTransactionsByUserId] Error:`, { error: err.message });
            throw err;
        }
    }

    async updateTransaction(transactionId,data) {
        try {
            const updated = await this.Transaction.findByIdAndUpdate(
                transactionId,
                { status: data.status },
                { new: true }
            ).lean();

            if (!updated) {
                this.logger.warn(`${SERVICE_NAME}[updateTransaction] Not found`, { transactionId: data.transactionId });
                return null;
            }

            this.logger.info(`${SERVICE_NAME}[updateTransaction] Success`, { transactionId: data.transactionId });
            return updated;
        } catch (err) {
            this.logger.error(`${SERVICE_NAME}[updateTransaction] Error:`, { error: err.message });
            throw err;
        }
    }

    async deleteTransaction(id) {
        try {
            const deleted = await this.Transaction.findByIdAndDelete(id).lean();
            if (!deleted) {
                this.logger.warn(`${SERVICE_NAME}[deleteTransaction] Not found`, { id });
                return null;
            }

            this.logger.info(`${SERVICE_NAME}[deleteTransaction] Success`, { id });
            return deleted;
        } catch (err) {
            this.logger.error(`${SERVICE_NAME}[deleteTransaction] Error:`, { error: err.message });
            throw err;
        }
    }
}
