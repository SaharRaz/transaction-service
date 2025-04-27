import express from 'express';
import validateSchema from '../validations/transaction.validateSchema.middleware.js';
import { createTransactionSchema } from '../schema/transaction.schema.js';

export default function (controller) {
    const router = express.Router();

    router.post('/createTransaction', validateSchema(createTransactionSchema), async (req, res) => {
        try {
            const transaction = await controller.createTransaction(req.body);
            res.status(201).json(transaction);
        } catch (err) {
            console.error('POST /createTransaction - Error:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    router.get('/getAllTransactions', async (req, res) => {
        try {
            const transactions = await controller.getAllTransactions();
            res.status(200).json(transactions);
        } catch (err) {
            console.error('GET /getAllTransactions - Error:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    router.get('/getTransactionById/:transactionId', async (req, res) => {
        try {
            const transaction = await controller.getTransactionById(req.params.transactionId);
            if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
            res.status(200).json(transaction);
        } catch (err) {
            console.error('GET /getTransactionById/:transactionId - Error:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    router.get('/getTransactionsByUserId/:userId', async (req, res) => {
        try {
            const transactions = await controller.getTransactionsByUserId(req.params.userId);
            res.status(200).json(transactions);
        } catch (err) {
            console.error('GET /getTransactionsByUserId/:userId - Error:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    router.put('/updateTransaction/:transactionId', async (req, res) => {
        try {
            const updated = await controller.updateTransaction(req.params.transactionId, req.body);
            if (!updated) return res.status(404).json({ error: 'Transaction not found' });
            res.status(200).json(updated);
        } catch (err) {
            console.error('PUT /updateTransaction/:transactionId - Error:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    router.delete('/deleteTransaction/:transactionId', async (req, res) => {
        try {
            const deleted = await controller.deleteTransaction(req.params.transactionId);
            if (!deleted) return res.status(404).json({ error: 'Transaction not found' });
            res.status(200).json({ message: 'Transaction deleted successfully' });
        } catch (err) {
            console.error('DELETE /deleteTransaction/:transactionId - Error:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    return router;
}
