const { expect } = require('chai');
const sinon = require('sinon');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const HTTPStatus = require('../../../src/utils/HTTPStatus');

describe('Sales Controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('deve retornar todas as vendas', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(salesService, 'getAllSales').resolves({ status: 'SUCCESS', data: [] });

    await salesController.fetchAllSales(req, res);

    expect(res.status.calledWith(HTTPStatus('SUCCESS'))).to.be.equal(true);
    expect(res.json.calledWith([])).to.be.equal(true);
  });

  it('deve retornar 404 quando o produto não for encontrado em fetchProductById', async function () {
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(salesService, 'getSaleById').resolves({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });

    await salesController.fetchSaleById(req, res);

    expect(res.status.calledWith(HTTPStatus('NOT_FOUND'))).to.be.equal(true);
    expect(res.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
  });
});