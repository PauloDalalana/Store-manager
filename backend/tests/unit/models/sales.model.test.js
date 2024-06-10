const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');

describe('Sales Model', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Deve retornar todas as vendas', async function () {
    const expectedSales = [
      { saleId: 1, date: '2021-09-09T04:54:29.000Z', productId: 1, quantity: 2 },
      { saleId: 2, date: '2021-09-09T04:54:54.000Z', productId: 2, quantity: 3 },
    ];
    sinon.stub(connection, 'execute').resolves([expectedSales]);

    const result = await salesModel.getAllSales();

    expect(result).to.deep.equal(expectedSales);
  });
});