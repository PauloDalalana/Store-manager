const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return { status: 'SUCCESS', data: sales };
};
const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  if (!sale) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESS', data: sale };
};
const createSale = async (saleData) => {
  const productIds = saleData.map((item) => item.productId);
  const products = await Promise.all(productIds.map((id) => productsModel
    .fetchProductByIdFromDB(id)));
  
  if (products.includes(null)) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  const saleId = await salesModel.createSale();
  await Promise.all(saleData.map((item) => salesModel
    .createSaleProduct(saleId, item.productId, item.quantity)));

  return { status: 'CREATED', data: { id: saleId, itemsSold: saleData } };
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
};