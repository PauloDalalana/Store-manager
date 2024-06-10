const connection = require('./connection');

const getAllSales = async () => {
  const query = `
    SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
    FROM sales_products AS sp
    JOIN sales AS s ON sp.sale_id = s.id
    ORDER BY sp.sale_id, sp.product_id;
  `;
  const [sales] = await connection.execute(query);
  return sales;
};

const getSaleById = async (id) => {
  const query = `
    SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM sales_products AS sp
    JOIN sales AS s ON sp.sale_id = s.id
    WHERE sp.sale_id = ?
    ORDER BY sp.product_id;
  `;
  
  const [sale] = await connection.execute(query, [id]);
  return sale.length > 0 ? sale : null;
};
const createSale = async () => {
  const [result] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );
  return result.insertId;
};

const createSaleProduct = async (saleId, productId, quantity) => {
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  createSaleProduct,
};