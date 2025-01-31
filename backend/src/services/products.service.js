const productsModel = require('../models/products.model');

const checkProductExists = async (id) => {
  const product = await productsModel.fetchProductByIdFromDB(id);
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESS', data: product };
};
const createProduct = async (name) => {
  const product = await productsModel.createProductToDB(name);
  return { id: product.insertId, name };
};
const updateProduct = async (id, name) => {
  const productExists = await productsModel.fetchProductByIdFromDB(id);
  if (!productExists) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  await productsModel.updateProductInDB(id, name);
  return { status: 'SUCCESS', data: { id: Number(id), name } };
};
const deleteProduct = async (id) => {
  const productExists = await productsModel.fetchProductByIdFromDB(id);
  if (!productExists) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  const isDeleted = await productsModel.deleteProductFromDB(id);
  if (isDeleted) {
    return { status: 'NO_CONTENT', data: null };
  }
  return { status: 'ERROR', data: { message: 'Failed to delete product' } };
};

module.exports = {
  checkProductExists,
  createProduct,
  updateProduct,
  deleteProduct,
};