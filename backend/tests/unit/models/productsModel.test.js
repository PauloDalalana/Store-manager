const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');

describe('Products Model', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('deve retornar todos os produtos', async function () {
    const products = [{ id: 1, name: 'Martelo de Thor' }];
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productsModel.fetchAllProductsFromDB();

    expect(result).to.deep.equal(products);
  });
  it('deve retornar um erro se o produto não for encontrado', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);

    try {
      await productsModel.fetchProductByIdFromDB(999);
    } catch (error) {
      expect(error.message).to.equal('Product not found');
    }
  });
  it('deve retornar o produto se o produto for encontrado', async function () {
    const product = { id: 1, name: 'Martelo de Thor' };
    sinon.stub(connection, 'execute').resolves([[product]]);

    const result = await productsModel.fetchProductByIdFromDB(1);

    expect(result).to.deep.equal(product);
  });
});