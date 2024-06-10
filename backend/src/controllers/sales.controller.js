const salesService = require('../services/sales.service');
const HTTPStatus = require('../utils/HTTPStatus');

const fetchAllSales = async (req, res) => {
  const serviceResponse = await salesService.getAllSales();
  res.status(HTTPStatus(serviceResponse.status)).json(serviceResponse.data);
};
const fetchSaleById = async (req, res) => {
  const { id } = req.params;
  const serviceResponse = await salesService.getSaleById(id);
  if (serviceResponse.status === 'NOT_FOUND') {
    return res.status(HTTPStatus(serviceResponse.status)).json(serviceResponse.data);
  }
  res.status(HTTPStatus(serviceResponse.status)).json(serviceResponse.data);
};
const createSale = async (req, res) => {
  const saleData = req.body;
  const serviceResponse = await salesService.createSale(saleData);
  res.status(HTTPStatus(serviceResponse.status)).json(serviceResponse.data);
};

module.exports = {
  fetchAllSales,
  fetchSaleById,
  createSale,
};