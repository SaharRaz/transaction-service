import Joi from 'joi';

export const createTransactionSchema = Joi.object({
    fromUserId: Joi.string().required(),
    toUserId: Joi.string().required(),
    amount: Joi.number().positive().required(),
    description: Joi.string().optional(),
    status: Joi.string().valid('pending', 'completed', 'failed').optional()
});