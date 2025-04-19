import express from 'express';
import transactionsController from '../controller/transactions.controller.js';
import validateSchema from '../middleware/transactions.validateSchema.middleware.js';
import { createTransactionSchema, updateTransactionSchema } from './transaction.routes.schema.js';

const router = express.Router();

// Create a new transaction
router.post('/', validateSchema(createTransactionSchema), async (req, res) => {
    try {
        const transaction = await transactionsController.createTransaction(req.body);
        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await transactionsController.getAllTransactions();
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get transaction by ID
router.get('/:id', async (req, res) => {
    try {
        const transaction = await transactionsController.getTransactionById(req.params.id);
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
        res.status(200).json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const transactions = await transactionsController.getTransactionsByUserId(req.params.userId);
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Update transaction
router.put('/:id', validateSchema(updateTransactionSchema), async (req, res) => {
    try {
        const updatedTransaction = await transactionsController.updateTransaction(req.params.id, req.body);
        if (!updatedTransaction) return res.status(404).json({ error: 'Transaction not found' });
        res.status(200).json(updatedTransaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete transaction
router.delete('/:id', async (req, res) => {
    try {
        const deletedTransaction = await transactionsController.deleteTransaction(req.params.id);
        if (!deletedTransaction) return res.status(404).json({ error: 'Transaction not found' });
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
