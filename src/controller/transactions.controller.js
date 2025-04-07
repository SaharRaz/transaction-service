import Transaction from '../model/transaction.model.js';

const transactionsController = {
    // Create a new transaction
    async createTransaction(data) {
        try {
            const transaction = new Transaction(data);
            const savedTransaction = await transaction.save();
            console.info('Transaction created successfully', { id: savedTransaction._id });
            return savedTransaction;
        } catch (err) {
            console.error('Error creating transaction', { error: err.message });
            throw err;
        }
    },

    // Retrieve all transactions
    async getAllTransactions() {
        try {
            const transactions = await Transaction.find();
            console.info('Fetched all transactions');
            return transactions;
        } catch (err) {
            console.error('Error fetching transactions', { error: err.message });
            throw err;
        }
    },

    // Retrieve transaction history by user ID
    async getTransactionsByUserId(userId) {
        try {
            const transactions = await Transaction.find({ userId });
            if (!transactions || transactions.length === 0) {
                console.warn('No transactions found for user', { userId });
                return [];
            }
            console.info('Fetched transactions for user', { userId });
            return transactions;
        } catch (err) {
            console.error('Error fetching transactions by user ID', { error: err.message });
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
