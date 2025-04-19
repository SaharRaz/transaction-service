import Transaction from '../model/transaction.model.js';
import { transactionStatusMap } from '../model/transaction.map.js';
import axios from 'axios';
import mongoose from 'mongoose';


const { NOTIFICATION_SERVICE_URL } = process.env ;

const transactionsController = {
    async createTransaction(data) {
        const transaction = new Transaction(data);
        const saved = await transaction.save();
        console.log('🔗 Notification URL:', NOTIFICATION_SERVICE_URL);
        console.log('🔗 Notification URL:', process.env.NOTIFICATION_SERVICE_URL);
        // Notify users
        try {
            await axios.post(process.env.NOTIFICATION_SERVICE_URL, {
                userId: saved.sender,
                message: `💸 You sent ${saved.amount} to user ${saved.receiver}`
            }, {
                headers: { 'x-source-service': 'transaction-service' }
            });

            await axios.post(process.env.NOTIFICATION_SERVICE_URL, {
                userId: saved.receiver,
                message: `💰 You received ${saved.amount} from user ${saved.sender}`
            }, {
                headers: { 'x-source-service': 'transaction-service' }
            });
        } catch (err) {
            console.error('[Notification Service] Failed:', err.message);
        }

        return saved;
    },
// };






    // Retrieve all transactions
    async getAllTransactions() {
        try {
            const transactions = await Transaction.find();
            const enriched = transactions.map(trx => ({
                ...trx.toObject(),
                statusMeta: transactionStatusMap[trx.status] || {}
            }));

            console.info('Fetched all transactions');
            return enriched;
        } catch (err) {
            console.error('Error fetching transactions', { error: err.message });
            throw err;
        }
    },


    // Get a transaction by ID
    async getTransactionById(transactionId) {
        try {
            const transaction = await Transaction.findById(transactionId);
            if (!transaction) {
                console.warn('Transaction not found', { id: transactionId });
                return null;
            }
            console.info('Fetched transaction by ID', { id: transactionId });
            return transaction;
        } catch (err) {
            console.error('Error fetching transaction by ID', { error: err.message });
            throw err;
        }
    },

    async getTransactionsByUserId(userId) {
        try {
            const objectId = new mongoose.Types.ObjectId(userId);
            const transactions = await Transaction.find({ sender: objectId }); // filter by sender
            const enriched = transactions.map(trx => ({
                ...trx.toObject(),
                statusMeta: transactionStatusMap[trx.status] || {}
            }));

            console.info('Fetched transactions for user (sender)', { userId });
            return enriched;
        } catch (err) {
            console.error('Error fetching transactions by user ID', { error: err.message });
            throw err;
        }
    },


    // Update a transaction by ID
    async updateTransaction(transactionId, updateData) {
        try {
            const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId, updateData, { new: true });
            if (!updatedTransaction) {
                console.warn('Transaction not found for update', { id: transactionId });
                return null;
            }
            console.info('Transaction updated successfully', { id: transactionId });
            return updatedTransaction;
        } catch (err) {
            console.error('Error updating transaction', { error: err.message });
            throw err;
        }
    },

    // Delete a transaction by ID
    async deleteTransaction(transactionId) {
        try {
            const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
            if (!deletedTransaction) {
                console.warn('Transaction not found for deletion', { id: transactionId });
                return null;
            }
            console.info('Transaction deleted successfully', { id: transactionId });
            return deletedTransaction;
        } catch (err) {
            console.error('Error deleting transaction', { error: err.message });
            throw err;
        }
    },
};

export default transactionsController;
