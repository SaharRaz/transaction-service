import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    fromUserId: { type: String, required: true },
    toUserId: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    status: { type: String, default: 'pending' }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;