const { expect } = require('chai');
const sinon = require('sinon');
const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const HTTPStatus = require('../../../src/utils/HTTPStatus');

describe('Products Controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('deve retornar 404 quando o produto não for encontrado', async function () {
    const req = { params: { id: 1 }, body: { name: 'Produto Teste' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productsService, 'updateProduct').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });

    await productsController.updateProduct(req, res);

    expect(res.status.calledWith(HTTPStatus('NOT_FOUND'))).to.be.equal(true);
    expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
  });

  it('deve retornar 200 quando o produto for atualizado com sucesso', async function () {
    const req = { params: { id: 1 }, body: { name: 'Produto Atualizado' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productsService, 'updateProduct').resolves({ status: 'SUCCESS', data: { id: 1, name: 'Produto Atualizado' } });

    await productsController.updateProduct(req, res);

    expect(res.status.calledWith(HTTPStatus('SUCCESS'))).to.be.equal(true);
    expect(res.json.calledWith({ id: 1, name: 'Produto Atualizado' })).to.be.equal(true);
  });

  it('deve retornar 404 quando o produto não for encontrado em fetchProductById', async function () {
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productsService, 'checkProductExists').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });

    await productsController.fetchProductById(req, res);

    expect(res.status.calledWith(HTTPStatus('NOT_FOUND'))).to.be.equal(true);
    expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
  });

  it('deve retornar 204 se o produto for deletado com sucesso', async function () {
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      end: sinon.stub(),
    };
    sinon.stub(productsService, 'deleteProduct').resolves({ status: 'NO_CONTENT', data: null });

    await productsController.deleteProduct(req, res);

    expect(res.status.calledWith(204)).to.be.equal(true);
    expect(res.end.calledOnce).to.be.equal(true);
  });
});