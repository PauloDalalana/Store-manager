const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../src/services/sales.service');
const salesModel = require('../../../src/models/sales.model');

describe('Sales Service', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('deve buscar todas as vendas do banco de dados', async function () {
    const expectedSales = [
      { saleId: 1, date: '2021-09-09T04:54:29.000Z', productId: 1, quantity: 2 },
      { saleId: 1, date: '2021-09-09T04:54:54.000Z', productId: 2, quantity: 2 },
    ];
    sinon.stub(salesModel, 'getAllSales').resolves(expectedSales);

    const result = await salesService.getAllSales();

    expect(result).to.deep.equal({ status: 'SUCCESS', data: expectedSales });
  });
  it('Deve retornar erro se a venda não existir', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves(undefined);

    try {
      await salesService.getSaleById(999);
    } catch (error) {
      expect(error.message).to.equal('Sale not found');
    }
  });
  it('Deve buscar uma venda específica por ID', async function () {
    const expectedSale = { saleId: 1, date: '2021-09-09T04:54:29.000Z', productId: 1, quantity: 2 };
    sinon.stub(salesModel, 'getSaleById').resolves(expectedSale);

    const result = await salesService.getSaleById(1);

    expect(result).to.deep.equal({ status: 'SUCCESS', data: expectedSale });
  });
  it('Deve criar uma nova venda', async function () {
    const saleData = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 2 },
    ];
    sinon.stub(salesModel, 'createSale').resolves(1);
    sinon.stub(salesModel, 'createSaleProduct');

    const result = await salesService.createSale(saleData);

    expect(result).to.deep.equal({ status: 'CREATED', data: { id: 1, itemsSold: saleData } });
  });
});