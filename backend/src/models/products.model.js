const connection = require('./connection');

const fetchAllProductsFromDB = async () => {
  const [products] = await connection.execute('SELECT * FROM products ORDER BY id ASC');
  return products;
};
const fetchProductByIdFromDB = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product.length ? product[0] : null;
};
const createProductToDB = async (name) => {
  const [result] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return result;
};
const updateProductInDB = async (id, name) => {
  const [result] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );
  return result.affectedRows > 0;
};
const deleteProductFromDB = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
  return result.affectedRows > 0;
};

module.exports = {
  fetchAllProductsFromDB,
  fetchProductByIdFromDB,
  createProductToDB,
  updateProductInDB,
  deleteProductFromDB,
};