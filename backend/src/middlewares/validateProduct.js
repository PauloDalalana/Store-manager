const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'any.required': '"name" is required',
    'string.min': '"name" length must be at least 5 characters long',
  }),
});

const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    const { message } = error.details[0];
    const statusCode = message.includes('required') ? 400 : 422;
    return res.status(statusCode).json({ message });
  }
  next();
};

module.exports = validateProduct;