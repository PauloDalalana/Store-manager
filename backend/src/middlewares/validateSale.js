const Joi = require('joi');

const saleSchema = Joi.array().items(Joi.object({
  productId: Joi.number().integer().positive().required()
    .messages({
      'any.required': '"productId" is required',
    }),
  quantity: Joi.number().integer().greater(0).required()
    .messages({
      'any.required': '"quantity" is required',
      'number.greater': '"quantity" must be greater than or equal to 1',
    }),
})).required();

const validateSale = (req, res, next) => {
  const { error } = saleSchema.validate(req.body);
  if (error) {
    const { message } = error.details[0];
    const statusCode = message.includes('required') ? 400 : 422;
    return res.status(statusCode).json({ message });
  }
  next();
};

module.exports = validateSale;