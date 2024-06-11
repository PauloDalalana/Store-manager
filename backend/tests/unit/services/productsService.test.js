const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

describe('Products Service', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('deve retornar sucesso se o produto existir', async function () {
    const product = { id: 1, name: 'Martelo de Thor' };
    sinon.stub(productModel, 'fetchProductByIdFromDB').resolves(product);

    const result = await productsService.checkProductExists(1);

    expect(result.status).to.equal('SUCCESS');
    expect(result.data).to.deep.equal(product);
  });

  it('deve retornar NOT_FOUND se o produto não existir', async function () {
    sinon.stub(productModel, 'fetchProductByIdFromDB').resolves(null);

    const result = await productsService.checkProductExists(999);

    expect(result.status).to.equal('NOT_FOUND');
    expect(result.data).to.deep.equal({ message: 'Product not found' });
  });
  it('deve cadastrar um novo produto', async function () {
    const product = { id: 4, name: 'ProdutoX' };
    sinon.stub(productModel, 'createProductToDB').resolves({ insertId: 4 });

    const result = await productsService.createProduct(product.name);

    expect(result).to.deep.equal({ id: 4, name: product.name });
  });
  it('deve retornar erro se o produto não for cadastrado', async function () {
    const product = { id: 4, name: 'ProdutoX' };
    sinon.stub(productModel, 'createProductToDB').resolves({ insertId: null });
    try {
      await productsService.createProduct(product.name);
    } catch (error) {
      expect(error.message).to.equal('Product not created');
    }
  });
  it('deve deletar um produto', async function () {
    sinon.stub(productModel, 'fetchProductByIdFromDB').resolves({ id: 1, name: 'ProdutoX' });
    sinon.stub(productModel, 'deleteProductFromDB').resolves(true);

    const result = await productsService.deleteProduct(1);

    expect(result.status).to.equal('NO_CONTENT');
    expect(result.data).to.equal(null);
  });
});