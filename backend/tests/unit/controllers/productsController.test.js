const { assert } = require('chai');
const sinon = require('sinon');
const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');

describe('Products Controller', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('deve retornar todos os produtos com status 200', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const products = [{ id: 1, name: 'Martelo de Thor' }];
    sinon.stub(productsModel, 'fetchAllProductsFromDB').resolves(products);

    await productsController.fetchAllProducts(req, res);

    assert.isTrue(res.status.calledWith(200));
    assert.isTrue(res.json.calledWith(products));
  });

  it('deve retornar o produto com status 200 se o produto for encontrado', async function () {
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const product = { id: 1, name: 'Martelo de Thor' };
    sinon.stub(productsService, 'checkProductExists').resolves({ status: 'SUCCESS', data: product });

    await productsController.fetchProductById(req, res);

    assert.isTrue(res.status.calledWith(200));
    assert.isTrue(res.json.calledWith(product));
  });

  it('deve retornar 404 se o produto não for encontrado', async function () {
    const req = { params: { id: 999 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productsService, 'checkProductExists').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });

    await productsController.fetchProductById(req, res);

    assert.isTrue(res.status.calledWith(404));
    assert.isTrue(res.json.calledWith({ message: 'Product not found' }));
  });
});