const { assert } = require('chai');
const sinon = require('sinon');
const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.service');

describe('Sales Controller', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Deve retornar o status NOT_FOUND se a venda não for encontrada', async function () {
    const req = { params: { id: 999 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(salesService, 'getSaleById').resolves({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });

    await salesController.fetchSaleById(req, res);

    assert.isTrue(res.status.calledWith(404));
    assert.isTrue(res.json.calledWith({ message: 'Sale not found' }));
  });

  it('Deve retornar a venda com status 200 se a venda for encontrada', async function () {
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const sale = { saleId: 1, date: '2021-09-09T04:54:29.000Z', productId: 1, quantity: 2 };
    sinon.stub(salesService, 'getSaleById').resolves({ status: 'SUCCESS', data: sale });

    await salesController.fetchSaleById(req, res);

    assert.isTrue(res.status.calledWith(200));
    assert.isTrue(res.json.calledWith(sale));
  });
});