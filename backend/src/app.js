const express = require('express');
const { productsController, salesController } = require('./controllers');
const validateProduct = require('./middlewares/validateProduct');
const validateSale = require('./middlewares/validateSale');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});
app.get('/products', productsController.fetchAllProducts);
app.get('/products/:id', productsController.fetchProductById);
app.post('/products', validateProduct, productsController.createProduct);
app.put('/products/:id', validateProduct, productsController.updateProduct);

app.get('/sales', salesController.fetchAllSales);
app.get('/sales/:id', salesController.fetchSaleById);
app.post('/sales', validateSale, salesController.createSale);

module.exports = app;