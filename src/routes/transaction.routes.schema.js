import Joi from 'joi';

export const createTransactionSchema = Joi.object({
    sender: Joi.string().required(),
    receiver: Joi.string().required(),
    amount: Joi.number().min(0).required(),
});

export const updateTransactionSchema = Joi.object({
    sender: Joi.string(),
    receiver: Joi.string(),
    amount: Joi.number().min(0),
    status: Joi.string().valid('PENDING', 'COMPLETED', 'FAILED'),
});
