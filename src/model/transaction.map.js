import { TransactionStatus } from './transaction.enum.js';

export const transactionStatusMap = {
    [TransactionStatus.PENDING]: {
        label: 'Pending',
        color: 'yellow',
        icon: '⏳'
    },
    [TransactionStatus.COMPLETED]: {
        label: 'Completed',
        color: 'green',
        icon: '✅'
    },
    [TransactionStatus.FAILED]: {
        label: 'Failed',
        color: 'red',
        icon: '❌'
    }
};
