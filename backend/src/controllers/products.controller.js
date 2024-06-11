const { productsService } = require('../services');
const productsModel = require('../models/products.model');
const HTTPStatus = require('../utils/HTTPStatus');

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const serviceResponse = await productsService.updateProduct(id, name);
  if (serviceResponse.status === 'NOT_FOUND') {
    return res.status(HTTPStatus(serviceResponse.status)).json(serviceResponse.data);
  }
  return res.status(HTTPStatus(serviceResponse.status)).json(serviceResponse.data);
};
const fetchAllProducts = async (req, res) => {
  const products = await productsModel.fetchAllProductsFromDB();
  res.status(200).json(products);
};
const fetchProductById = async (req, res) => {
  const { id } = req.params;
  const serviceResponse = await productsService.checkProductExists(id);
  if (serviceResponse.status === 'NOT_FOUND') {
    return res.status(HTTPStatus(serviceResponse.status)).json(serviceResponse.data);
  }
  res.status(HTTPStatus(serviceResponse.status)).json(serviceResponse.data);
};
const createProduct = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productsService.createProduct(name);
  return res.status(201).json(newProduct);
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const serviceResponse = await productsService.deleteProduct(id);
  if (serviceResponse.status === 'NOT_FOUND') {
    return res.status(HTTPStatus(serviceResponse.status)).json(serviceResponse.data);
  }
  return res.status(HTTPStatus(serviceResponse.status)).end();
};

module.exports = {
  fetchAllProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};